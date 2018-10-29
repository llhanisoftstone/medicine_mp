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
        <counddown :time="times" v-if="istimes"></counddown>
      </div>
      <h3>第 {{nub}} 题</h3>
      <div class="answer_box">
        <div class="fraction_box fraction_my">
          <p>{{mynumber}}</p>
          <fraction :number="mynumber" color="#ffc02a"></fraction>
        </div>
        <div>
          <!--<answer title="题库由西安市人社局失业保险处提供" :answer="answer.name" distance="0">-->
          <answer :title="answer.category_name+', 本题由'+answer.comp_name+'提供'" :answer="answer.name" distance="0">
            <div slot="list">
              <ul :class="{'bottom1_an':isanimation&&(step!=1),'bottom_an':isanimation&&(step==1),'answer_box':true}">
                <li :class="{'my':index==i,'opponent':other==i,'correct':v.right&&isshow,'n_correct':index==i&&isshow&&!v.right,'n_correct':other==i&&isshow&&!v.right}" v-for="(v,i) in answer.answer_json" v-on:click="submit(i,v.right)"><span class="ismy"></span>{{v.answer}}<span class="nomy"></span></li>
              </ul>
            </div>
          </answer>
        </div>
        <div class="fraction_box fraction_vs">
          <p>{{usernumber}}</p>
          <fraction :number="usernumber" color="#df5c3e"></fraction>
        </div>
      </div>
      <!--<p class="provide">本题由{{answer.organiz_name}}提供</p>-->
      <div class="prop_box">
        <prop :tips="tips" :surplus="times<10"  :istimes="false" :answer="answernub" :times="timenub" v-on:userTools="userTools"></prop>
      </div>
      <mptoast/>
    </div>
</template>

<script type="javascript">
  import counddown from '../../components/countdown.vue'
  import fraction from '../../components/fraction.vue'
  import answer from '../../components/answer.vue'
  import prop from '../../components/prop.vue'
  import mptoast from '../../components/mptoast'



  export default {
        name: 'pkanswer',
        data(){
            return {
                from: 2,    //  1 好友  2全网
                istimes:false,     //是否显示倒计时
                surplus:false,   //剩余十秒
                times:30,   //倒计时
                answernub:0,   //查看答案道具
                timenub:0,   //延时道具
                isshow:false,   //是否显示答案
                index:-1,       //选择的答案
                isclick:false,    //是否选择
                vsisclick:false,    //对方是否选择答案
                other: -1,           //对方选择的答案
                gameover:false,      //是否游戏结束
                tool_id:[],               //使用过的道具id
                timesfn:null,           //定时器
                isanimation:false,         //是否显示动画
                tanswer:'',
                setfn:null,
                tips:'',                  //答题提示语
              category_id:''
            }
        },
        methods: {
          userTools(id){
              if(this.isclick){
                  return
              }
              if(this.gameover){
                  return
              }
              if(this.isanimation){
                return
              }
            console.log(`使用道具${id}`)
            if(Number(id) == 1){
              for(let i=0;i<this.$store.state.answer.answer_json.length;i++){
                if(this.$store.state.answer.answer_json[i].right){
                  let use = this.$store.state.user
                  use.tools[0].amount = use.tools[0].amount-1
                  this.$store.commit('getm_user',use)
                  this.answernub = this.$store.state.user.tools[0].amount
                  this.timenub = this.$store.state.user.tools[1].amount
                  this.tool_id.push(Number(id))
                  this.submit(i,this.$store.state.answer.answer_json[i].right)
                }
              }
            }
          },
          countdownfn(){     //倒计时
              let that=this
              clearInterval(that.timesfn)
              that.timesfn = setInterval(function(){
                if(that.gameover){
                  clearInterval(that.timesfn)
                }
                if(that.times == 0){
                  return
                }
                if(that.isanimation){
                  return
                }
                that.times=that.times-1;
                if(that.times<10){
                  that.surplus=true;
                }
              },1000)
          },
          cleardata(){
            this.times=30
            this.answernub=this.$store.state.user.tools[0].amount
            this.timenub=this.$store.state.user.tools[1].amount
            this.isshow=false
            this.index=-1
            this.isclick=false
            this.vsisclick=false
            this.other= -1
            this.gameover=false
            this.$store.commit('clear_score')
            this.timesfn=null
          },
          submit(index,right){     //提交答案
            if(this.isanimation){
                return
            }
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
              this.tips = this.$store.state.successTips[Math.floor(Math.random()*this.$store.state.successTips.length)].details
            }else{
              this.tips = this.$store.state.errorTips[Math.floor(Math.random()*this.$store.state.errorTips.length)].details
            }
            setTimeout(()=>{
              this.tips=''
            },2000)
            for(let i=0;i<reply/10;i++){
//              this.$store.commit('get_myscore',reply)
              setTimeout(()=>{
                this.$store.commit('get_myscore',10)
              },30*i)
            }
            this.$socket.emit('data_chain', {
              cmd:'answer',
              room_id:this.$store.state.room_id,
              u_id:this.$store.state.user.userid,
              reply:index,   //回答内容
              score:reply,   // 得分
              tool_id: this.tool_id,   // 使用道具
              use_time:30-this.times,   //使用时间   -1 自己延时   -2  对方延时
              step:this.$store.state.step,
              category_id:this.category_id,
            })
            if(reply!=0){
              this.$store.commit('rightTitle',1)
              let user = this.$store.state.user
              user.experience +=10
              this.$store.commit('getm_user', user)
            }
            if((30-this.times)>0){
              this.$store.commit('useTime',30-this.times)
            }
            this.$store.commit('allTitle',1)
          },
          overtime(){   //超时自动提交一次
            let that=this
            if(!that.isclick){
              that.$socket.emit('data_chain', {
                cmd:'answer',
                room_id:that.$store.state.room_id,
                u_id:that.$store.state.user.userid,
                tool_id: that.tool_id,   // 使用道具
                use_time:-1,   //使用时间   -1 自己延时   -2  对方延时
                step:that.$store.state.step,
                category_id:that.category_id,
              })
              this.$store.commit('useTime',30)
              that.$store.commit('allTitle',1)
            }
            if(!that.vsisclick){
              that.$socket.emit('data_chain', {
                cmd:'answer',
                room_id:that.$store.state.room_id,
                u_id:that.$store.state.user.userid,
                use_time:-2,   //使用时间   -1 自己延时   -2  对方延时
                step:that.$store.state.step,
                category_id:that.category_id,
              })
            }
          }
        },
        components: {
          counddown,
          fraction,
          answer,
          prop,
          mptoast
        },
        computed:{
          userinfo(){
            return this.$store.state.userinfo
          },
          vsuser(){
              return this.$store.state.vsuser
          },
          answer(){
            this.tanswer=this.$store.state.answer.name
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
          },
          step(){
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
            },
          tanswer(val,oldval){
            let pagesArr = getCurrentPages()
            let currentPage = pagesArr[pagesArr.length - 1]
            let url = currentPage.route
            if(url == 'pages/pkanswer/main'){
              this.isanimation=true
              this.istimes=false
              clearTimeout(this.setfn)
              this.setfn=null
//              if(this.$store.state.step == 1){
                this.setfn=setTimeout(()=>{
                  this.times=30
                  this.istimes=true
                  this.isanimation=false
                },2500)
//              }else{
//                this.setfn=setTimeout(()=>{
//                  this.times=30
//                  this.istimes=true
//                  this.isanimation=false
//                },2500)
//              }
            }
          }
        },
      onLoad(option){
        this.cleardata()
        this.from = option.from;
        this.category_id=option.category_id;
        if(this.from == 1){
          wx.setNavigationBarTitle({
            title: '对战'
          })
        }else{
          wx.setNavigationBarTitle({
            title: '好友对战'
          })
        }

        let that=this
        that.isanimation=true
        that.istimes=false
        that.$store.commit('rightTitle',0)
        that.$store.commit('useTime',0)
        that.$store.commit('allTitle',0)
        setTimeout(()=>{
          that.times=30
          that.istimes=true
          that.isanimation=false
        },2500)
        this.$socket.on('data_chain', d=>{    //接收题目
          if(d.step != 1){
            if(d.cmd == 'answer'){
              that.vs=true
              if(d.other_reply.use_time!=-1&&d.other_reply.use_time!=-2){
                that.other = d.other_reply.reply
                for(let i=0;i<d.other_reply.score/10;i++){
                    setTimeout(()=>{
                      that.$store.commit('get_vsscore',10)
                    },30*i)
                }
              }
              if(d.content_type == 1){
                if(d.step>1){
                  that.isshow = true
                  setTimeout(function(){
                    that.$store.commit('get_answer',d.details[0])
                    that.$store.commit('get_step',d.step)
                    that.times = 30
                    that.isshow = false
                    that.index = -1
                    that.isclick=false
                    that.other= -1
                    that.tool_id=[]
                  },2000)
                }
              }else if(d.content_type == 2){
                that.gameover=true   //延时跳转页面
                if(d.details){
                  that.$store.commit('get_prize',d.details[0])
                }else{
                  that.$store.commit('get_prize',{})
                }
                setTimeout(function(){
                  that.$socket.removeAllListeners('data_chain')
                  wx.redirectTo({
                    url:`/pages/result/main?from=${that.from}`
                  })
                },2000)
              }
              that.$store.commit('get_room',d.room_id)
            }
          }
        })
      },
      onUnload(){
        let that=this
        that.surplus=false
        that.$store.commit('get_answer',{})
        that.gameover=true
        clearTimeout(that.setfn)
        that.setfn=null
          that.$socket.emit('data_chain',{
              cmd:'left',
              room_id:this.$store.state.room_id,
              u_id:this.$store.state.user.userid,
              tool_id: this.tool_id,   // 使用道具
              game_cfg_id:1,
              game_type:that.from
          })
      }

    }
</script>

<style>
  page{
    height: 100%;
    background: #ffffff;
  }
</style>
<style lang="less" scoped>
    @import '../../static/less/common.less';
    @keyframes showbottom1 {
      0%{
        transform: translateY(0px) scale(1,1);
        opacity: 1;
      }
      24%{
        transform: translateY(200px) scale(1,1);
        opacity: 0;
      }
      48%{
        transform: translateY(200px) scale(1,1);
        opacity: 0;
      }
      70%{
        transform: translateY(200px) scale(1,1);
        opacity: 0;
      }
      85%{
        transform: translateY(0px) scale(1,1);
        opacity: 1;
      }
      88%{
        transform: translateY(-8px) scale(1,0.93);
        opacity: 1;
      }
      100%{
        transform: translateY(0px) scale(1,1);
        opacity: 1;
      }
    }
    @keyframes showbottom {
      0%{
        transform: translateY(200px) scale(0,0);
        opacity: 0;
      }
      60%{
        transform: translateY(200px) scale(1,1);
        opacity: 0;
      }
      77%{
        transform: translateY(0px) scale(1,1);
        opacity: 1;
      }
      90%{
        transform: translateY(-8px) scale(1,0.93);
        opacity: 1;
      }
      100%{
        transform: translateY(0px) scale(1,1);
        opacity: 1;
      }
    }
    @keyframes info_box {
      0%{
        width: 200%;
        margin-left: -50%;
      }
      100%{
        width: 100%;
        margin-left: 0;
      }
    }
    @keyframes fraction_my {
      0%{
        transform: translateX(-100px);
      }
      75%{
        transform: translateX(-100px);
      }
      100%{
        transform: translateX(0px);
      }
    }
    @keyframes fraction_vs {
      0%{
        transform: translateX(100px);
      }
      75%{
        transform: translateX(100px);
      }
      100%{
        transform: translateX(0px);
      }
    }
    .fraction_my{
      animation: fraction_my 2s linear;
    }
    .fraction_vs{
      animation: fraction_vs 2s linear;
    }
    .bg{
      background: #ffffff;
      width: 100%;
      height: 100%;
      position: relative;
      padding-bottom: 130px/2;
    }
  .user_box{
    animation: info_box 1s linear;
    width: 100%;
    padding-top:70px/2;
    justify-content: space-between;
    display: flex;
    /*height: ;*/
    .user_box_item{
      width:160px/2;

    div{
      width: 100%;
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
        box-sizing: border-box;
        font-size: 28px/2;
        color: #333;
        margin-top:17px/2;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal!important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-align: center;
        padding-bottom: 5px/2;
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
      box-sizing: border-box;
      padding-left: 2px/2;
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
    margin-top:20px/2;
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
    ul.answer_box{
      width: 100%;
      display: block;
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
    .bottom_an{
      transform-origin: 50% 50% 0;
      animation: showbottom 2s ease;
    }
    .bottom1_an{
      transform-origin: 50% 50% 0;
      animation: showbottom1 2.5s ease;
      li{
        color: #d6d6d6;
      }
    }

    .provide{
      margin-bottom: 16px/2;
      font-size:24px/2;
      margin-top:16px/2;
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
