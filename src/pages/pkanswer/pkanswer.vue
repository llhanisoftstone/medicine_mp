<template>
    <div class="bg">
      <div class="user_box">
        <div class="user_box_item">
          <div>
            <image :src="userinfo.avatarUrl"></image>
          </div>
          <p>{{userinfo.nickName}}</p>
        </div>
        <div class="user_box_item">
          <div>
            <image :src="vsuser.picpath"></image>
          </div>
          <p>{{vsuser.nickname}}</p>
        </div>
      </div>
      <div class="time_box">
        <counddown :time="times"></counddown>
      </div>
      <h3>第 {{nub}} 题</h3>
      <div class="answer_box">
        <div class="fraction_box">
          <p>{{mynumber}}</p>
          <fraction :number="mynumber" color="#ffc02a"></fraction>
        </div>
        <div>
          <answer :title="answer.category_name" :answer="answer.name">
            <ul slot="list" class="answer_box">
              <!--<li class="my n_correct"><span class="ismy"></span>答案1<span class="nomy"></span></li>&lt;!&ndash;自己错误&ndash;&gt;-->
              <!--<li class="opponent n_correct"><span class="ismy"></span>答案2<span class="nomy"></span></li>&lt;!&ndash;对方错误&ndash;&gt;    未完成-->
              <!--<li class="correct"><span class="ismy"></span>答案3<span class="nomy"></span></li>&lt;!&ndash;正确答案&ndash;&gt;-->
              <!--<li :class="{'my':index==i,'correct':v.right&&isshow,'n_correct':ismy&&isshow&&!v.right}" v-for="(v,i) in answer.answer_json" v-on:click="submit(i,v.right)"><span class="ismy"></span>{{v.answer}}<span class="nomy"></span></li>-->
              <li :class="{'my':index==i,'opponent':other==i,'correct':v.right&&isshow,'n_correct':index==i&&isshow&&!v.right,'n_correct':other==i&&isshow&&!v.right}" v-for="(v,i) in answer.answer_json" v-on:click="submit(i,v.right)"><span class="ismy"></span>{{v.answer}}<span class="nomy"></span></li>
            </ul>
          </answer>
        </div>
        <div class="fraction_box">
          <p>{{usernumber}}</p>
          <fraction :number="usernumber" color="#df5c3e"></fraction>
        </div>
      </div>
      <p class="provide">本题由{{answer.organiz_name}}提供</p>
      <div class="prop_box">
        <prop :istimes="false" :answer="answernub" :times="timenub"></prop>
      </div>
    </div>
</template>

<script type="javascript">
  import counddown from '../../components/countdown.vue'
  import fraction from '../../components/fraction.vue'
  import answer from '../../components/answer.vue'
  import prop from '../../components/prop.vue'
    export default {
        name: 'pkanswer',
        data(){
            return {
                from: 2,    //  1 好友  2全网
                times:30,   //倒计时
                answernub:0,   //查看答案道具
                timenub:0,   //延时道具
                isshow:false,   //是否显示答案
                index:-1,       //选择的答案
                isclick:false,    //是否选择
                vsisclick:false,    //对方是否选择答案
                other: -1,           //对方选择的答案
                gameover:false      //是否游戏结束
            }
        },
        methods: {
          countdownfn(){     //倒计时
              let that=this
              let timefn = setInterval(function(){
                  if(that.gameover){
                      clearInterval(timefn)
                  }
                  if(that.times == 0){
                      return
                  }
                  that.times=that.times-1
              },1000)
          },
          cleardata(){
            this.times=30
            this.answernub=0
            this.timenub=0
            this.isshow=false
            this.index=-1
            this.isclick=false
            this.vsisclick=false
            this.other= -1
            this.gameover=false
            this.$store.commit('clear_score')
          },
          submit(index,right){     //提交答案
            if(this.times<=0){
                return
            }
            if(this.isclick){
                  return
              }
              this.isclick=true
              let reply=0
              this.index=index
              this.isshow=true
            if(right){           //正确计算分数
                  if(this.times>20){
                    reply=100
                  }else if(this.times>10){
                    reply=60
                  }else{
                    reply=40
                  }
            }
            this.$store.commit('get_myscore',reply)
            this.$socket.emit('data_chain', {
              cmd:'answer',
              room_id:this.$store.state.room_id,
              u_id:this.$store.state.user.userid,
              reply:index,   //回答内容
              score:reply,   // 得分
//              tool_id: '',   // 使用道具
              use_time:30-this.times,   //使用时间   -1 自己延时   -2  对方延时
              step:this.$store.state.step
            })
          },
          overtime(){   //超时自动提交一次
            let that=this
            if(!that.isclick){
              that.$socket.emit('data_chain', {
                cmd:'answer',
                room_id:that.$store.state.room_id,
                u_id:that.$store.state.user.userid,
                use_time:-1,   //使用时间   -1 自己延时   -2  对方延时
                step:that.$store.state.step
              })
            }
            if(!that.vsisclick){
              that.$socket.emit('data_chain', {
                cmd:'answer',
                room_id:that.$store.state.room_id,
                u_id:that.$store.state.user.userid,
                use_time:-2,   //使用时间   -1 自己延时   -2  对方延时
                step:that.$store.state.step
              })
            }
          }
        },
        components: {
          counddown,
          fraction,
          answer,
          prop
        },
        computed:{
          userinfo(){
            return this.$store.state.userinfo
          },
          vsuser(){
              return this.$store.state.vsuser
          },
          answer(){
              return this.$store.state.answer
          },
          mynumber(){
              return this.$store.state.myscore
          },
          usernumber(){
            return this.$store.state.vsscore
          },
          nub(){
              return this.$store.state.step
          }
        },
        mounted(){
          this.cleardata()
          this.countdownfn()

        },
        watch:{
            times(val,oldval){
                if(val == 0){
                    this.overtime()
                }
            }
        },
      onLoad(option){
            this.from = option.from
        let that=this
        this.$socket.on('data_chain', d=>{    //接收题目
          if(d.step != 1){
            if(d.cmd == 'answer'){
              that.vs=true
              if(d.users){
                for(let i=0;i<d.users.length;i++){
                  if(d.users[i].id != that.$store.state.user.userid){
                    that.$store.commit('get_vsuser',d.users[i])
                  }
                }
              }
              if(d.other_reply.use_time!=-1&&d.other_reply.use_time!=-2){
                that.other = d.other_reply.reply
                if(that.$store.state.answer.answer_json[that.other].right==true){
                  if(that.times>20){
                    that.$store.commit('get_vsscore',100)
                  }else if(that.times>10){
                    that.$store.commit('get_vsscore',60)
                  }else{
                    that.$store.commit('get_vsscore',40)
                  }
                }
              }
              if(d.content_type == 1){
                if(d.step>1){
                  setTimeout(function(){
                    that.$store.commit('get_answer',d.details[0])
                    that.$store.commit('get_step',d.step)
                    that.times = 30
                    that.answernub = 0
                    that.timenub = 0
                    that.isshow = false
                    that.index = -1
                    that.isclick=false
                    that.other= -1
                  },1000)
                }
              }else if(d.content_type == 2){
                that.gameover=true   //延时跳转页面
                if(d.details){
                  that.$store.commit('get_prize',d.details[0])
                }else{
                  that.$store.commit('get_prize',{})
                }
                setTimeout(function(){
                  wx.redirectTo({
                    url:`/pages/result/main?from=${that.from}`
                  })
                },1000)
              }
              that.$store.commit('get_room',d.room_id)
            }
          }
        })
      }

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .bg{
      background: #fff3f3;
      width: 100%;
      height: 100%;
      position: relative;
      padding-bottom: 110px/2;
    }
  .user_box{
    width: 100%;
    padding-top:70px/2;
    justify-content: space-between;
    display: flex;
    /*height: ;*/
    .user_box_item{

    div{
      width: 160px/2;
      height: 108px/2;
      padding: 5px/2;
      box-sizing: border-box;
    }
      image{
        width: 98px/2;
        height: 98px/2;
        border-radius: 50%;
      }
      p{
        width: 160px/2;
        font-size: 28px/2;
        color: #333;
        height: 28px/2;
        display: flex;
        align-items: center;
        margin-top:17px/2;
      }
    }
    .user_box_item:nth-last-child(1) {
    div{
      background: @bg_color;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
      display: flex;
      justify-content: flex-start;
    }
    p{
      justify-content: flex-start;
      padding-left: 54px/2;
      box-sizing: border-box;
    }
    }
    .user_box_item:nth-of-type(1) {
    div{
      background: #ffc02a;
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
      display: flex;
      justify-content: flex-end;
    }
    p{
      justify-content: flex-end;
      padding-right: 54px/2;
      box-sizing: border-box;
    }
    }
  }
    .time_box{
      position: absolute;
      top:125px/2;
      left:0;
      right:0;
      margin:auto;
      width: 120px/2;
      height: 120px/2;
    }
  h3{
    margin-top:100px/2;
    width: 100%;
    height: 40px/2;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  .answer_box{
    display: flex;
    margin-top:24px/2;
    align-items: flex-end;
    justify-content: space-between;
    .fraction_box{
      /* 56-44 */
      width: 101px/2;
      height: auto;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      p{
        width: 101px/2;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px/2;
        color: #df5c3e;
        marign-bottom:18px/2;
      }
    }
  }
    .answer_box{
      width: 524px/2;
      height: auto;
      li{
        width: 524px/2;
        padding: 0 24px/2;
        box-sizing: border-box;
        height: 80px/2;
        margin-bottom:53px/2;
        border-radius: 50px;
        background: #d6d6d6;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 30px/2;
        color: #fff;
        span{
          width: 16px/2;
          height: 16px/2;
          border-radius: 50%;
          background: transparent;
        }
      }
      li:nth-last-child(1){
        margin-bottom: 0;
      }
      .my .ismy{
        background: #fff;
      }
      .opponent .nomy{
        background: #fff;
      }
      .correct{
        background: #86d132;
      }
      .n_correct{
        background: #df5c3e;
      }
    }

    .provide{
      margin-bottom: 86px/2;
      font-size:24px/2;
      margin-top:46px/2;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  .prop_box{
    position: fixed;
    bottom:0;
    left:0;
    width: 100%;
    height: 110px/2;
    z-index: 3;
  }
</style>
