<template>
    <div>
      <div class="bg">
        <div class="user_box">
          <image :src="userinfo.avatarUrl"></image>
          <p>{{userinfo.nickName}}</p>
          <div class="time_box">
            <counddown :time="times"></counddown>
          </div>
          <h2 v-if="isprop">您使用了延时针，时间延长了10s</h2>
        </div>
        <div class="answer">
          <answer :title="answer.category_name" :answer="answer.name">
            <ul slot="list" class="answer_box_ul">
              <li :class="{'correct':v.right&&isshow,'n_correct':index==i&&isshow&&!v.right}" v-for="(v,i) in answer.answer_json" v-on:click="submit(i,v.right)">{{v.answer}}</li>
            </ul>
          </answer>
          <!--<answer title="分类" answer="题目" distance="1">-->
            <!--<ul slot="list" class="answer_box_ul">-->
              <!--<li :class="{'correct':v.right&&isshow,'n_correct':index==i&&isshow&&!v.right}" v-for="(v,i) in an" v-on:click="submit(i,v.right)">{{v.answer}}</li>-->
            <!--</ul>-->
          <!--</answer>-->
        </div>
        <p class="provide">本题由{{answer.organiz_name}}提供</p>
        <div class="prop_box">
          <prop :istimes="true" :answer="answernub" :times="timenub"></prop>
        </div>
      </div>
    </div>
</template>

<script type="javascript">
  import counddown from '../../components/countdown.vue'
  import answer from '../../components/answer.vue'
  import prop from '../../components/prop.vue'



  export default {
        name: 'alone',
        data(){
            return {
              times:30,         //倒计时
              isprop:false,    //道具提示
              isshow:false,    //显示答案
              isclick:false,   //是否选择
              index:-1,        //选择的答案
              answernub:0,      //查看答案数量
              timenub:0,         //延时道具数量
              gameover:false     //当前关卡是否结束
            }
        },
        methods: {
          countdownfn(){     //倒计时
            let that=this
            let timefn
            clearInterval(timefn)
            timefn = setInterval(function(){
              if(that.gameover){
                clearInterval(timefn)
              }
              if(that.times == 0){
                return
              }
              that.times=that.times-1
            },1000)
          },
          submit(index,right){
              if(this.isclick){
                  return
              }
              this.index=index
              this.isclick=true
              this.isshow = true    //提交答案
              let that =this
              let reply=0
              if(right){
                  reply=1
              }
              that.$socket.emit('data_chain', {
                cmd:'answer',
                room_id:that.$store.state.room_id,
                u_id:that.$store.state.user.userid,
                level:that.$store.state.level,
                reply:index,   //回答内容
                score:1,   // 得分
//              tool_id: '',   // 使用道具
                use_time:(30-this.times)>0?30-this.times:0,   //使用时间   -1 自己延时
                step:that.$store.state.step
              })
          },
          overtime(){
            let that=this
            if(!that.isclick){
              that.$socket.emit('data_chain', {
                cmd:'answer',
                room_id:that.$store.state.room_id,
                u_id:that.$store.state.user.userid,
                level:that.$store.state.level,
                use_time:-1,   //使用时间   -1 自己延时
                step:that.$store.state.step
              })
            }
          },
          cleardata(){
            let that =this
            that.times = 30
            that.answernub = 0
            that.timenub = 0
            that.isshow = false
            that.index = -1
            that.isclick=false
            that.gameover=false
          }
        },
        components: {
          counddown,
          answer,
          prop
        },
        computed:{
          userinfo(){
            return this.$store.state.userinfo
          },
          answer(){
            return this.$store.state.answer
          }
        },
        mounted(){

        },
      watch:{
        times(val,oldval){
          if(val == 0){
            this.overtime()
          }
        }
      },
    onLoad(){
      this.cleardata()
      wx.setNavigationBarTitle({
        title:`第${this.$store.state.step}/${this.$store.state.max_nub}题`
      })
      this.countdownfn()
      let that =this
      this.$socket.on('data_chain',d=>{
        console.log(d)
        if(d.content_type == 1){
          if(d.cmd == 'answer'&&d.level==that.$store.state.level){
            let til
            clearInterval(til)
            til=setTimeout(function(){
              that.$store.commit('get_answer',d.details[0])
              that.$store.commit('get_step',d.step)
              wx.setNavigationBarTitle({
                title:`第${that.$store.state.step}/${that.$store.state.max_nub}题`
              })
              that.cleardata()
            },1000)
          }else if(d.cmd == 'answer'&&d.level!=that.$store.state.level){    //当前关卡挑战结束
            setTimeout(function(){
              let useri = that.$store.state.user
              useri.game_level = d.level
              that.$store.commit('getm_user',useri)
              that.$store.commit('get_level',d.level)
              that.$store.commit('get_answer',d.details[0])
              that.$store.commit('get_step',d.step)
              that.$store.commit('get_max_nub',d.max_step)
              if(d.details[1].code == 200){
                that.$store.commit('get_prize',d.details[1].rows[0])
              }else{
                that.$store.commit('get_prize',{})
              }
              that.gameover=true
              that.$socket.removeAllListeners('data_chain')
              wx.redirectTo({
                url:'/pages/aloneresult/main?result=2'
              })
            },1000)
          }
        }else if(d.content_type == 2){    //全部挑战结束

        }else if(d.content_type == 3){    //挑战失败
          setTimeout(function(){
            that.$store.commit('get_prize',{})
            that.gameover=true
            that.$socket.removeAllListeners('data_chain')
            wx.redirectTo({
              url:'/pages/aloneresult/main?result=0'
            })
          },1000)
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
    height: auto;
    display: flex;
    padding-top: 33px/2;
    flex-wrap: wrap;
    justify-content: center;
    image{
      width: 156px/2;
      height: 156px/2;
      border:3px solid #fff;
      box-sizing: border-box;
      border-radius: 50%;
    }
    p{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px/2;
      color: #333;
      height: 28px/2;
      margin-top:8px/2;
    }
    .time_box{
      width: 120px/2;
      height: 120px/2;
      margin-top:33px/2;
    }
    h2{
      width: 100%;
      margin-top:30px/2;
      color: @bg_color;
      font-size: 30px/2;
      height: 30px/2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
    .answer{
      margin:0 auto;
      margin-top:37px/2;
      width: 524px/2;
      height: auto;
    }
    .answer{
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
        justify-content: center;
        font-size: 30px/2;
        color: #fff;
      }
      li:nth-last-child(1){
        margin-bottom: 0;
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
