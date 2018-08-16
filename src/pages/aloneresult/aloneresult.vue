<template>
  <!--<div>-->
    <!--<div class="user_box">-->
      <!--<h1>-->
        <!--<image src="/static/img/suc.png" v-if="win==2"></image>-->
        <!--<image src="/static/img/failt.png" v-if="win==0"></image>-->
      <!--</h1>-->
      <!--<div class="user">-->
        <!--<div class="user_item" :class="{'success':win==2}">-->
          <!--<div><i></i><image :src="userinfo.avatarUrl"></image></div>-->
        <!--</div>-->
        <!--<h4>{{userinfo.nickName}}</h4>-->
        <!--<p>{{myscore}}</p>-->
      <!--</div>-->
      <!--<div class="cap_box">-->
        <!--<capture :win="win" :iscard="iscard" :card="card"></capture>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div :class="{'btn_box':true,'btn_win':win==2,'btn_loss':win!=2}">-->
      <!--<a href="" v-if="(win==2)&&isreward==0&&level<11" @click="toalone">挑战下一关</a>-->
      <!--<a href="" v-if="win==0" @click="repeat">重新开始</a>-->
      <!--<button open-type="share" v-if="win==2">分享战绩</button>-->
    <!--</div>-->
  <!--</div>-->
  <div>
    <div class="user_box">
      <div class="cap_box">
        <capture :win="win" :iscard="iscard" :card="card"></capture>
      </div>
      <div class="user">
        <div class="user_item" :class="{'success':win==2}">
          <div><i></i><image :src="userinfo.avatarUrl"></image></div>
          <!--<h4>{{userinfo.nickName}}</h4>-->
          <p>{{myscore}}</p>
        </div>
      </div>
    </div>
    <div :class="{'btn_box':true,'btn_win':myscore>vsscore,'btn_loss':!(myscore>vsscore)}">
      <navigator href="" v-if="(win==2)&&isreward==0&&level<11" @click="toalone">下一关</navigator>
      <navigator :href="'/pages/report/main?roomid=0'" v-if="win==2">炫耀成绩单</navigator>
      <button open-type="share" v-if="win==2">分享战绩</button>
      <button open-type="share" v-if="win!=2">考考好友</button>
    </div>
  </div>
</template>

<script type="javascript">
  import capture from '../../components/capture.vue'
  export default {
    name: 'aloneresult',
    data(){
      return {
        win:2,    //2赢  1平局  0输
        iscard:false,
        card:{},
        isreward:0         //是否是首页进入的奖励关卡   0 不是
      }
    },
    methods: {
      cleardata(){
        this.win = 0
        this.iscard=false
        this.card={}
        this.isreward=0
      },
      toalone(){
        this.$socket.emit('data_chain',{
          cmd:'fight',
          u_id: this.$store.state.user.userid,
          game_cfg_id: 2,
          game_type:1,
          level:this.$store.state.level,
        })
//        wx.redirectTo({
//          url:'/pages/alone/main'
//        })
      },
      repeat(){
        let that =this
        if(this.isreward == 0){
          this.$socket.emit('data_chain',{
            cmd:'fight',
            u_id: that.$store.state.user.userid,
            game_cfg_id: 2,
            game_type:1,
            level:that.$store.state.level,
          })
        }else{
          this.$socket.emit('data_chain',{
            cmd:'fight',
            u_id: that.$store.state.user.userid,
            game_cfg_id: this.isreward,
            game_type:1,
            level:1,
          })
        }
      }
    },
    components: {
      capture
    },
    computed:{
      userinfo(){
        return this.$store.state.userinfo
      },
      level(){
        return this.$store.state.level
      }
    },
    mounted(){
      if(this.$store.state.prize.id){
        this.iscard = true
        this.card=this.$store.state.prize
        this.card.ticket_pic = this.$store.state.url + this.card.ticket_pic
      }
    },
    onShareAppMessage(res){
      let that =this
      let title='边玩边学，游戏学习两不误！';
      let img=`${that.$store.state.url}/admin/img/1.jpg`;
      let url='/pages/index/main';
      if(that.isreward == 0){//礼物挑战
        if(that.win==2){
          title="@你 答题赢礼品，千种礼券任你选"
          img=`${that.$store.state.url}/admin/img/2.jpg`;
          url='/pages/report/main?roomid=0';
        }else{
          title="@你 为礼物而战，我还会再回来的"
          img=`${that.$store.state.url}/admin/img/3.jpg`;
        }
      }else{
        if(that.win==2){
          title="@你 答题赢好礼，千种礼券任你选"
          img=`${that.$store.state.url}/admin/img/2.jpg`;
          url='/pages/report/main?roomid=0';
        }else{
          title="@你 这道题有点难哦，快来帮帮我吧！"
          img=`${that.$store.state.url}/admin/img/3.jpg`;
        }
      }

      if (res.from === 'menu') {
        // 来自页面内转发按钮
        title='边玩边学，游戏学习两不误！';
        img=`${that.$store.state.url}/admin/img/1.jpg`;
        url='/pages/index/main'
        console.log(res.target)
      }
      return {
        title: title,
        path: url,
        imageUrl: img,
        success: (r)=>{
          console.log(r)
        },
        fail: (err)=>{
          console.log(err)
        }
      }
    },
    onLoad(option){
      wx.hideShareMenu()
      this.cleardata()
      this.win=option.result
      if(option.id){
        this.isreward=option.id
        wx.setNavigationBarTitle({
          title:`挑战结果`
        })
      }else{
        this.isreward=0
        wx.setNavigationBarTitle({
          title:`闯关结果`
        })
      }
      let that=this
      that.$socket.on('data_chain',d=>{
        if(d.cmd == 'answer'){
          if(d.step==1&&d.level==that.$store.state.level){
            console.log(d)
            that.$store.commit('get_answer',d.details[0])
            that.$store.commit('get_step',d.step)
            that.$store.commit('get_room',d.room_id)
            that.$store.commit('get_level',d.level)
            that.$store.commit('get_max_nub',d.max_step)
            that.$socket.removeAllListeners('data_chain')
            if(that.id!=0){
              wx.redirectTo({
                url:`/pages/alone/main?id=${that.isreward}`
              })
            }else{
              wx.redirectTo({
                url:'/pages/alone/main'
              })
            }
          }
        }
      })
    }

  }
</script>

<style lang="less" scoped>
  @import '../../static/less/common.less';
  @keyframes title {
    0%{
      opacity: 0;
      transform: scale(1.5);
    }
    49%{
      opacity: 0;
      transform: scale(1.5);
    }
    50%{
      opacity: 1;
      transform: scale(2);
    }
    95%{
      opacity: 1;
      transform: scale(0.9);
    }
    100%{
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes btn_win {
    0%{
      opacity: 0;
    }
    83%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes btn {
    0%{
      opacity: 0;
    }
    67%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  .user_box{
    width: 100%px/2;
    height: auto;
    position: relative;
    h1{
      animation: title .8s ease;
      position: absolute;
      top:-71px/2;
      left:0;
      right:0;
      width: 493px/2;
      height: 110px/2;
      margin:auto;
      image{
        width: 100%;
        height: 100%;
      }
    }
    .user{
      position: absolute;
      top:0;
      left:0;
      right:0;
      margin:auto;
      padding: 120px/2 91px/2 29px/2;
      width: 100%;
      height: auto;
      display: flex;
      box-sizing: border-box;
      justify-content: space-between;
      .user_item{
        max-width:257px/2;
        margin:15/2px auto;
        div{
          width: 151px/2;
          height: 151px/2;
          border-radius: 50%;
          position: relative;
          box-sizing: border-box;
          image{
            width: 143px/2;
            height: 143px/2;
            border-radius: 50%;
            border:9px/4 solid #ffffff;
          }
        }
        h4{
          margin-top:15px/2;
          font-size: 28px/2;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #333;
          height: 32px/2;
          line-height: 32px/2;
          display: block;
          text-align: center;
          white-space: nowrap;
          width:151px/2;
        }
        p{
          margin-top:6px/2;
          max-width:151px/2;
          font-size: 28px/2;
          color: #333;
          height: 28px/2;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .success{
        div{
          image{
            border:9px/4 solid @bg_color;
          }
          i{
            background: url(../../../static/img/sucu.png) center no-repeat;
            background-size: 100px/2 78px/2;
            display: block;
            width: 100px/2;
            height: 78px/2;
            position: absolute;
            top:-42px/2;
            left:-25px/2;
          }
        }
      }
      .fail{
        div{
          image{
            border:9px/4 solid @bg_color;
          }
          i{
            background: url(../../../static/img/sucv.png) center no-repeat;
            background-size: 96px/2 87px/2;
            display: block;
            width: 96px/2;
            height: 87px/2;
            position: absolute;
            top:-39px/2;
            right:-31px/2;
          }
        }
      }
      .vs_icon{
        width: 90px/2;
        image{
          width: 90px/2;
          height: 72px/2;
          margin-top:60px/2;
        }
      }
    }
  }
  .cap_box{
    width: 100%;
    margin:0 auto;
  }
  .btn_box{
    width: 414px/2;
    margin:0 auto;
    margin-top:96px/2;
    height: auto;
    navigator{
      width: 100%;
      height: 68px/2;
      border-radius: 50px;
      background: @bg_color;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size:32px/2;
      margin-bottom: 23px/2;
      box-shadow: #ffffff 4px/2 -3rpx 0px, #df5c3e 7px/2 -8px/2px 0px;
    }
    button{
      width: 100%;
      height: 68px/2;
      border-radius: 50px;
      background: @bg_color;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size:32px/2;
      margin:0;
      box-shadow: #ffffff 4px/2 -3rpx 0px, #df5c3e 7px/2 -8px/2px 0px;
      &:after{
        border:none;
      }
    }
  }
  .btn_win{
    animation: btn_win 3s ease;
  }
  .btn_loss{
    animation: btn 1.5s ease;
  }
</style>
