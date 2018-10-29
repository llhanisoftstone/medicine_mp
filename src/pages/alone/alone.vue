<template>
    <div>
      <div class="bg">
        <div class="user_box">
          <div class="gift_box">
            <!--<div class="img_box" :style="'left:'+left+'px'">-->
            <div class="img_box">
              <image :src="userinfo.avatarUrl" v-if="userinfo.avatarUrl"></image>
              <div class="user_info">
                <div class="username">{{userinfo.nickName}}</div>
                <div class="userlevel">{{user.rank_name}}</div>
              </div>
            </div>
            <div class="gift_img" @click="showgz()">
              <image src="/static/img/gift_img.png"></image>
            </div>
          </div>
          <div class="time_box">
            <counddown :time="times" v-if="istimes"></counddown>
          </div>
          <h2 v-if="isprop">您使用了延迟针，时间延长了20s</h2>
        </div>
        <div class="answer">
          <!--<answer :title="answer.category_name+', 本题由'+answer.organiz_name+'提供'" :answer="answer.name" distance="1">-->
          <answer title="题库由西安市人社局失业保险处提供" :answer="answer.name" distance="1">
            <div slot="list">
              <ul :class="{'bottom1_an':isanimation&&(step!=1),'bottom_an':isanimation&&(step==1),'answer_box_ul':true}">
                <template v-if="question_type == 1">
                  <li  :class="{'correct':isshow&&(index==idx)}" v-for="(v,idx) in answer.answer_json" v-on:click="submit(idx,v.right)">{{v.answer}}</li>
                </template>
               <template v-else >
                 <li :class="{'correct':v.right&&isshow,'n_correct':index==i&&isshow&&!v.right}" v-for="(v,i) in answer.answer_json" v-on:click="submit(i,v.right)">{{v.answer}}</li>
               </template>
              </ul>
            </div>
          </answer>
        </div>
        <!--<p class="provide">本题由{{answer.organiz_name}}提供</p>-->
        <div class="prop_box" v-if="question_type != 1">
          <!--isreward = 9表示问卷调查类型-->
          <prop :tips="tips" :surplus="times<10" :istimeused="istime" :istimes="true" :answer="answernub" :times="timenub" v-on:userTools="userTools"></prop>
        </div>
        <div class="prop_box" v-else>
          <p class="tips" v-if="tips">{{tips}}</p>
        </div>
      </div>
      <div class="bg_shade gzk" v-if="gzshow" @click="hidegz" catchtouchmove='true'>
        <div class="pick_box" @click.stop="">
          <h2>游戏规则</h2>
          <div class="pick_item_box">
            <p><i>1</i>闯关分为单人闯关和多人闯关，多人闯关可邀请好友一起参加；</p>
            <p><i>2</i>每答对一题可增加10经验值；</p>
            <p><i>3</i>每过一关可获得20银两；</p>
            <p><i>4</i>第5和第10关为礼物关，过关可获得神秘大礼，可在个人中心-战利品中查看。</p>
            <div class="closebtn" @click="hidegz">我知道了</div>
          </div>
        </div>
      </div>
      <mptoast/>
    </div>
</template>

<script type="javascript">
  import counddown from '../../components/countdown.vue'
  import answer from '../../components/answer.vue'
  import prop from '../../components/prop.vue'
  import mptoast from '../../components/mptoast'

  export default {
        name: 'alone',
        data(){
            return {
              gzshow:false,
              istimes:false,     //是否显示倒计时
              times:30,         //倒计时
              surplus:false,   //剩余十秒
              isprop:false,    //道具提示
              isshow:false,    //显示答案
              isclick:false,   //是否选择
              index:-1,        //选择的答案
              answernub:0,      //查看答案数量
              timenub:0,         //延时道具数量
              gameover:false,     //当前关卡是否结束
              tool_id:[],              //使用的道具
              isreward:0,             //是否是首页直接进入的奖励关卡      0不是
              istime:false,             //是否使用过延时
              atimefn:null,
              left:0,                     //用户头像偏移量
              hreftime:null,              //跳转页面时间函数
              isanimation:false,           //是否显示动画
              tanswer:'',
              setfn:null,
              tips:'',                   //答题提示语
              category_id:''
            }
        },
        methods: {
          showgz(){
            if(this.isreward!=0 || this.$store.state.question_type==1){
                return;
            }
            this.gzshow=true;
          },
          hidegz(){
            this.gzshow=false;
          },
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
                          let use =this.$store.state.user
                          use.tools[0].amount = use.tools[0].amount-1
                          this.$store.commit('getm_user',use)
                          this.answernub = this.$store.state.user.tools[0].amount
                          this.timenub = this.$store.state.user.tools[1].amount
                          this.tool_id.push(Number(id))
                          this.submit(i,this.$store.state.answer.answer_json[i].right)
                      }
                  }
            }else if(Number(id) == 2){
                if(this.istime){
                    this.$mptoast('一道题目只能使用一次');
                    return
                }
                if(this.times==0){
                    return
                }
                this.istime=true
                this.isprop=true
                this.times += 20
                let use =this.$store.state.user
                use.tools[1].amount = use.tools[1].amount-1
                this.$store.commit('getm_user',use)
                this.answernub = this.$store.state.user.tools[0].amount
                this.timenub = this.$store.state.user.tools[1].amount
              this.$socket.emit('data_chain',{
                cmd:'tool',
                u_id: this.$store.state.user.userid,
                tool_id: Number(id),
                room_id: this.$store.state.room_id
              })
              setTimeout(()=>{
                  this.isprop=false
                },2000)
            }
          },
          countdownfn(){     //倒计时
            let that=this
            if(that.gameover){
              return
            }
            if(that.isclick){
                return
            }
            if(that.times == 0){
              return
            }
            if(that.isanimation){
              return
            }
            that.times=that.times-1
            if(that.times<10){
              that.surplus=true;
            }
          },
          submit(index,right){
              if(this.isanimation){
                return
              }
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
                that.tips = that.$store.state.successTips[Math.floor(Math.random()*that.$store.state.successTips.length)].details
              }else{
                that.tips = that.$store.state.errorTips[Math.floor(Math.random()*that.$store.state.errorTips.length)].details
              }
              setTimeout(()=>{
                that.tips=''
              },2000)
              that.$socket.emit('data_chain', {
                cmd:'answer',
                room_id:that.$store.state.room_id,
                u_id:that.$store.state.user.userid,
                level:that.$store.state.level,
                reply:index,   //回答内容
                score:reply,   // 得分
                tool_id: that.tool_id,   // 使用道具
                use_time:(30-this.times)>0?30-this.times:0,   //使用时间   -1 自己延时
                step:that.$store.state.step,
                type:that.$store.state.question_type,  //问题类型
                category_id:that.category_id
              })
            if(reply==1){
              that.$store.commit('rightTitle',1)
              let user = that.$store.state.user
              user.experience +=10
              that.$store.commit('getm_user', user)
            }
            if((30-this.times)>0){
              that.$store.commit('useTime',30-this.times)
            }
            that.$store.commit('allTitle',1)
          },
          overtime(){
            let that=this
            if(!that.gameover){
              if(!that.isclick){
                that.$socket.emit('data_chain', {
                  cmd:'answer',
                  room_id:that.$store.state.room_id,
                  u_id:that.$store.state.user.userid,
                  level:that.$store.state.level,
                  tool_id: that.tool_id,   // 使用道具
                  use_time:-1,   //使用时间   -1 自己延时
                  step:that.$store.state.step,
                  category_id:that.category_id
                })
                that.$store.commit('useTime',30)
                that.$store.commit('allTitle',1)
              }
            }
          },
          cleardata(){
            let that =this
            that.istime=false
            that.times = 30
            that.answernub = this.$store.state.user.tools[0].amount
            that.timenub = this.$store.state.user.tools[1].amount
            that.isshow = false
            that.index = -1
            that.isclick=false
            that.gameover=false
            that.tool_id=[]
          }
        },
        components: {
          counddown,
          answer,
          prop,
          mptoast
        },
        computed:{
          userinfo(){
            return this.$store.state.userinfo
          },
          user(){
            return this.$store.state.user
          },
          answer(){
            this.tanswer=this.$store.state.answer.name
            return this.$store.state.answer
          },
          step(){
              return this.$store.state.step
          },
          question_type(){
            return this.$store.state.question_type
          },
        },
        mounted(){
        },
      watch:{
        times(val,oldval){
          if(val == 0){
            this.overtime()
          }
        },
        tanswer(val,oldval){
          this.istimes=false
          this.isanimation=true
          clearTimeout(this.setfn)
          this.setfn=null
          this.setfn=setTimeout(()=>{
            this.times=30
            this.isanimation=false
            this.istimes=true
          },2500)
        }
      },
    onLoad(option){
      let that =this
      that.left=0;
      that.category_id=option.category_id;
      that.isanimation=true
      setTimeout(()=>{
        that.isanimation=false
      },2500)
      that.cleardata()
      that.$store.commit('rightTitle',0)
      that.$store.commit('useTime',0)
      that.$store.commit('allTitle',0)
      clearInterval(that.atimefn)
      clearTimeout(that.hreftime)
      that.atimefn=null
      that.hreftime=null
      that.atimefn=setInterval(()=>{
        that.countdownfn()
      },1000)
      if(option){
          if(option.id){
            this.isreward=option.id
          }
      }
      wx.setNavigationBarTitle({
        title:`第${this.$store.state.step}/${this.$store.state.max_nub}题`
      })
      this.$socket.on('data_chain',d=>{
        console.log(d)
        if(d.content_type == 1){
          if(d.cmd == 'answer'&&d.level==that.$store.state.level){
            clearTimeout(that.hreftime)
            that.hreftime=null
            that.hreftime=setTimeout(function(){
              that.left = ((d.step - 1)/d.max_step)*175
              if(d.type==1){
                let answerjson=d.details[0].answer_json;
                for(let val of answerjson){
                  val.right='true';
                }
                d.details[0].answer_json=answerjson;
              }
              that.$store.commit('get_answer',d.details[0])
              that.$store.commit('get_step',d.step)
              wx.setNavigationBarTitle({
                title:`第${that.$store.state.step}/${that.$store.state.max_nub}题`
              })
              that.cleardata()
            },2000)
          }else if(d.cmd == 'answer'&&d.level!=that.$store.state.level){    //当前关卡挑战结束
            clearTimeout(that.hreftime)
            that.hreftime=null
            that.hreftime=setTimeout(function(){
              that.left=0
              let useri = that.$store.state.user
              if(Number(d.level)>Number(useri.game_level)){
                useri.game_level = d.level
                that.$store.commit('getm_user',useri)
              }
              that.$store.commit('get_level',d.level)
//              that.$store.commit('get_answer',d.details[0])
              that.$store.commit('get_step',d.step)
              that.$store.commit('get_max_nub',d.max_step)
              if(d.details[0]){
                that.$store.commit('get_prize',d.details[0])
              }else{
                that.$store.commit('get_prize',{})
              }
              that.gameover=true
              that.$socket.removeAllListeners('data_chain')
              clearInterval(that.atimefn)
              that.atimefn=null
              wx.redirectTo({
                url:'/pages/aloneresult/main?result=2&&category_id='+that.category_id
              })
            },2000)
          }
        }else if(d.content_type == 2){    //全部挑战结束
          clearTimeout(that.hreftime)
          that.hreftime=null
          that.hreftime=setTimeout(function(){
            that.left=0
            if(d.details[0]){
              that.$store.commit('get_prize',d.details[0])
            }else{
              that.$store.commit('get_prize',{})
            }
            that.gameover=true
            that.$socket.removeAllListeners('data_chain')
            that.$store.commit('get_level',11)
            clearInterval(that.atimefn)
            that.atimefn=null
            if(that.isreward!=0){
              wx.redirectTo({
                url:`/pages/aloneresult/main?result=2&&id=${that.isreward}&&category_id=${that.category_id}`
              })
              that.isreward=0
            }else{
              wx.redirectTo({
                url:'/pages/aloneresult/main?result=2&&category_id='+that.category_id
              })
            }
          },2000)
        }else if(d.content_type == 3){    //挑战失败
          clearTimeout(that.hreftime)
          that.hreftime=null
          that.hreftime=setTimeout(function(){
            that.left=0
            that.$store.commit('get_prize',{})
            that.gameover=true
            that.$socket.removeAllListeners('data_chain')
            clearInterval(that.atimefn)
            that.atimefn=null
            if(that.isreward!=0){
              wx.redirectTo({
                url:`/pages/aloneresult/main?result=0&&id=${that.isreward}&&category_id=${that.category_id}`
              })
              that.isreward=0
            }else{
              wx.redirectTo({
                url:'/pages/aloneresult/main?result=0&&category_id='+that.category_id
              })
            }
          },2000)
        }
      })
    },
    onShow(){
      this.gzshow=false;
    },
    onUnload(){
      let that = this
      that.surplus=false
      that.gameover=true
      that.isreward=0
      that.left=0
      that.$socket.removeAllListeners('data_chain')
      that.$store.commit('get_answer',{})
      that.cleardata()
      clearInterval(that.atimefn)
      clearTimeout(that.hreftime)
      that.atimefn=null
      that.hreftime=null
      this.$socket.emit('data_chain',{
            cmd:'left',
            u_id:that.$store.state.user.userid,
            room_id:that.$store.state.room_id,
            game_cfg_id:2,
            game_type:1
        })
    }

    }
</script>

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
    @keyframes user {
      0%{
        transform: translateY(-200px);
      }
      100%{
        transform: translateY(0px);
      }
    }
    @keyframes gift {
      1% {
        transform: translate(0, 0) rotate(6.5deg)
      }

      2% {
        transform: translate(0, 0) rotate(3.5deg)
      }

      3% {
        transform: translate(0, 0) rotate(-3.5deg)
      }

      4% {
        transform: translate(0, 0) rotate(5.5deg)
      }

      5% {
        transform: translate(0, 0) rotate(-4.5deg)
      }

      6% {
        transform: translate(0, 0) rotate(-4.5deg)
      }

      7% {
        transform: translate(0, 0) rotate(-6.5deg)
      }

      8% {
        transform: translate(0, 0) rotate(2.5deg)
      }

      9% {
        transform: translate(0, 0) rotate(-5.5deg)
      }

      10% {
        transform: translate(0, 0) rotate(.5deg)
      }

      11% {
        transform: translate(0, 0) rotate(-3.5deg)
      }

      12% {
        transform: translate(0, 0) rotate(-6.5deg)
      }

      13% {
        transform: translate(0, 0) rotate(6.5deg)
      }

      14% {
        transform: translate(0, 0) rotate(1.5deg)
      }

      15% {
        transform: translate(0, 0) rotate(-5.5deg)
      }

      16% {
        transform: translate(0, 0) rotate(7.5deg)
      }

      17% {
        transform: translate(0, 0) rotate(-3.5deg)
      }

      18% {
        transform: translate(0, 0) rotate(7.5deg)
      }

      19% {
        transform: translate(0, 0) rotate(-5.5deg)
      }

      20% {
        transform: translate(0, 0) rotate(3.5deg)
      }
      0%,21%,50%,100% {
        transform: translate(0, 0) rotate(0)
      }
    }
    .bg{
      background: #fff;
      width: 100%;
      height: 100%;
      position: relative;
      padding-bottom: 110px/2;
    }
    .bg_shade{
      width: 100%;
      height: 100%;
      position: fixed;
      top:0;
      left:0;
      background: rgba(0,0,0,.7);
      z-index:10;
      &.gzk{
        .pick_item_box{
          padding: 31/2px 34/2px
        }
        p{
          position: relative;
          padding: 0 0 10/2px 52/2px;
          line-height: 35/2px;
          color: #333;
          font-size: 26/2px;
          i{
            position: absolute;
            top:3/2px;
            left:0;
            width: 31/2px;
            height:31/2px;
            border-radius: 50%;
            color: #fff;
            text-align: center;
            line-height: 31/2px;
            background: #df5c3e;
          }
        }
        .closebtn{
          position: absolute;
          left:0;
          right:0;
          bottom:37/2px;
          width: 227/2px;
          height: 67/2px;
          border-radius: 67/4px;
          margin:0 auto;
          font-size: 30/2px;
          line-height: 67/2px;
          text-align: center;
          background: #df5c3e;
          color: #fff;
        }
      }
    }
    .pick_box{
      width: 560px/2;
      height: 508px/2;
      border-radius: 30px/2;
      background: #ffffff;
      position: absolute;
      top:354px/2;
      left:0;
      right:0;
      margin:auto;
      animation: showan .3s ease;
      padding-top: 36px/2;
      padding-bottom: 6px/2;
      box-sizing: border-box;
      h2{
        font-size: 41px/2;
        color: #fff;
        width: 100%;
        height: 69px/2;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #df5c3e;
      }
    }
  .user_box{
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  .gift_box{
    width: 100%;
    height: 180px/2;
    box-sizing: border-box;
    padding-top: 27px/2;
    position: relative;
    animation: user 1s linear;
  }
  .img_box{
    width: 438px/2;
    position: absolute;
    bottom:0;
    left:0;   /*350px/2*/
    z-index:2;
    transition: all .3s ease;
    margin-left: 61px/2;
    /*overflow: hidden;*/
    height: 138px/2;
    /*border-radius: 50%;*/
    image{
      width: 138px/2;
      height: 138px/2;
      border:3px solid #fff;
      box-sizing: border-box;
      border-radius: 50%;
      overflow: hidden;
    }
    .user_info{
      float: right;
      width: 300/2px;
      padding-left: 18/2px;
      box-sizing: border-box;
      height:138px/2;
      padding-top: 5px/2;
      .username{
        padding: 30/2px 0 8/2px;
        height: 30/2px;
        line-height: 30/2px;
        font-size: 30/2px;
        color: #333;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .userlevel{
        padding: 8/2px 0 8/2px;
        height: 30/2px;
        line-height: 30/2px;
        font-size: 26/2px;
        color: #999;
        color: #df5c3e;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
    .gift_img{
      animation: gift 3s ease-in-out;
      animation-delay:2s;
      transform-origin: center center;
      width: 246px/2;
      position: absolute;
      bottom:0;
      right:0;
      z-index:1;
      height: 153px/2;
      image{
        width: 100%;
        height: 100%;
      }
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
      /*<!--width: 120px/2;-->*/
      width: 100%;
      height: 120px/2;
      margin-top:33px/2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    h2{
      position: absolute;
      top:180px/2;
      left:0;
      width: 100%;
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
      margin-top:27px/2;
      width: 524px/2;
      height: auto;
    }
    .answer{
      li{
        width: 524px/2;
        padding: 0 24px/2;
        box-sizing: border-box;
        height: 80px/2;
        margin-bottom:40px/2;
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
    .bottom_an{
      transform-origin: 50% 50% 0;
      animation: showbottom 2s ease-out;
    }
    .bottom1_an{
      transform-origin: 50% 50% 0;
      animation: showbottom1 2.5s ease-out;
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
    .tips{
      flex:1;
      width:524px/2;
      margin:0 auto;
      height: 60px/2;
      background: #f1f1f1;
      color: #df5c3e;
      font-size: 28px/2;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50px/2;
    }
</style>
