<template>
  <div class="container" :class="{fixed:!isauth&&authreturn}">
    <div class="user_box">
      <userinfo :username="userinfo.nickName" :imgurl="userinfo.avatarUrl" :points="points">
        <div slot="userRight">
          <a href="/pages/signcount/main" class="btn_sign">签到</a>
        </div>
      </userinfo>
    </div>
    <div class="match_box">
      <a href="/pages/challengemap/main" class="challenge_b">
        <div class="challenge" @click="challengemap">
          <h2>闯关赛</h2>
          <h4 style="padding-bottom: 3px">已有<span style="font-weight: bold;">{{p_number}}</span>人获得礼物</h4>
          <h4>就算闯关没有礼物</h4>
          <h4>我也势必要去挑战的！</h4>
        </div>
      </a>
      <div class="challenge_box">
        <a href="/pages/loadpk/main?from=2">
          <div class="item_1">
            <h2>全网挑战</h2>
            <h4>世界那么大</h4>
            <h4>我就想看看我排第几</h4>
          </div>
        </a>
        <a href="/pages/friendpk/main">
          <div class="item_2">
            <h2>好友PK</h2>
            <h4>真正的友谊经得起挑战</h4>
            <h4>看看谁跟我志同道合</h4>
          </div>
        </a>
      </div>
    </div>
    <div class="gitf_box" v-if="win_treasure.length>0">
      <div class="gift">
        <div class="gift_text">
          <h2>为礼物而战</h2>
          <p><span>礼物有诱惑，政策福利更吸引我</span><span class="toduo" @click.stop="tonewpage('giftlist')">更多礼物&gt;</span></p>
        </div>
        <i class="gift_img" @click.stop="tonewpage('giftlist')">
          <image src="/static/img/lw.png"></image>
        </i>
      </div>
    </div>
    <!--<div class="gift_title"><span></span><i></i><image src="/static/img/liwu.png"></image>为礼物而挑战<i></i><span></span></div>-->
    <ul class="gift_list">
      <li v-for="(v,i) in win_treasure" >
        <main @click.stop="tonewpage('giftsdetail','tid='+v.tickt_id+'&vid='+v.id)">
          <div class="itemheadk">
            <div>
              <image :src="v.picpath"></image>
              <div class="itemmodel">查看详情&gt;</div>
            </div>
          </div>
          <h3>{{v.ticket_name}}</h3>
        </main>
        <a @click="reward(v.id)">挑战</a>
      </li>
    </ul>
  </div>
</template>

<script type="javascript">
  import userinfo from '../../components/userinfo'
  export default {

  data () {
    return {
      p_number:0,
      win_treasure: [],
      r_id:0,
      points:0,
      tickt_id:''
    }
  },

  components: {
    userinfo
  },

  methods: {
    async getuserperson(){
      let aa = await this.$get('/rs/member',{id:this.$store.state.user.userid});
      if(aa.code==200){
        this.$store.commit('get_sliver',aa.rows[0].points);
        this.$store.commit('get_openid',aa.rows[0].open_id);
        this.points=aa.rows[0].points;
      }
    },
    async getpage(){
        let that = this
      let tdata={
        order:'order_code desc'
      }
        let res = await that.$get('/rs/first_page',tdata)
      if(res.code == 200){
            that.p_number = res.present_count
          for(let i = 0;i<res.win_treasure.length;i++){
            res.win_treasure[i].picpath = that.$store.state.url+ res.win_treasure[i].piclogo
            res.win_treasure[i].tickt_id = res.win_treasure[i].level_json[0].reward[0].id
          }
            that.win_treasure = res.win_treasure

        }else{
          that.p_number=0
          that.win_treasure=[]
        }
    },
    reward(r_id){
        this.r_id=r_id
        this.$socket.emit('data_chain',{
            cmd:'fight',
            u_id: this.$store.state.user.userid,
            game_cfg_id: r_id,
            game_type:1,
            level:1
        })
    },
    watchsocket(){
      let that=this
      that.$socket.removeAllListeners('data_chain')
      that.$socket.on('data_chain',d=>{
        if(d.cmd == 'answer'&&d.step == 1){
          that.$socket.removeAllListeners('data_chain')
          that.$store.commit('get_answer',d.details[0])
          that.$store.commit('get_step',d.step)
          that.$store.commit('get_level',1)
          that.$store.commit('get_room',d.room_id)
          that.$store.commit('get_max_nub',d.max_step)
          wx.navigateTo({
            url:`/pages/alone/main?id=${that.r_id}`
          })
        }
      })
    },
    tonewpage(urlname,data){
      wx.navigateTo({
        url:`/pages/${urlname}/main?${data}`
      })
    },
  },
  computed:{
    isauth(){
      if(this.$store.state.isauth){
        wx.showTabBar({animation:true})
      }else{
        if(this.$store.state.authreturn){
          wx.hideTabBar({animation:true})
        }
      }
      return this.$store.state.isauth
    },
    authreturn(){
      return this.$store.state.authreturn
    },
    userinfo(){
        return this.$store.state.userinfo
    },
    user(){
        return this.$store.state.user
    }
  },
    watch:{
      user(val,oldval){
        this.getuserperson()
      }
    },
  created () {
    // 调用应用实例的方法获取全局数据
//    this.getLogin()
  },
    onLoad(){
      this.watchsocket()
    },
    onShow(){
      this.$store.commit('getorganizid','');
      if(this.$store.state.isauth){
        wx.showTabBar({animation:true})
      }else{
        if(this.$store.state.authreturn){
          wx.hideTabBar({animation:true})
        }
      }
      if(this.$store.state.user.userid){
        this.getuserperson()
      }
      this.watchsocket()
      this.getpage()
    },
    onHide(){
      this.$socket.removeAllListeners('data_chain')
    },
    onShareAppMessage(res){
      let that=this;
      let title='边玩边学，游戏学习两不误！';
      let img=`${that.$store.state.url}/admin/img/1.jpg`;
      let url='/pages/index/main'
      return {
        title:title,
        path: url,
        imageUrl: img,
        success: (r)=>{
        },
        fail: (err)=>{
        }
      }
    },
}
</script>

<style scoped lang="less">
  @import "../../static/less/common.less";
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
  a{
    background: transparent;
    opacity: 1;
  }
  .user_box{
    padding-top: 13px/2;
    padding-bottom: 15px/2;
  }
  .btn_sign{
    width: 120px/2;
    height: 50px/2;
    border-radius: 50px/2;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 26px/2;
    background: @bg_color;
    box-shadow: #923c3c 2px/2 5px/2 15px/2;
    margin-top: 40px/2;
  }
  .container{
    background: #fff url(../../../static/img/yetou.jpg) center top no-repeat;
    background-size: 100% auto;
    &.fixed{
      display: block;
      position: fixed;
      top:0;
      left:0;
      overflow: hidden;
      height:100%;
    }
  }
  .match_box{
    padding: 0 26px/2;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
    display: flex;
  .challenge_b{
    width: 46.333%;
    height: 412px/2;
  }
    .challenge{
      width: 100%;
      height: 412px/2;
      border-radius: 10px/2;
      background: #ff862d url(../../../static/img/paiming.png) no-repeat;
      background-position: 155px/2 245px/2;
      background-size: 146px/2 148px/2;
      box-sizing: border-box;
      padding: 0 28px/2;
      padding-top: 53px/2;
      h2{
        color: #fff;
        font-size: 33px/2;
        margin:0;
        font-weight: bold;
        padding-bottom: 7px/2;
      }
      h4{
        padding-top: 8px/2;
        font-size: 26px/2;
        color: #fff;
        line-height: 26px/2;
      }
    }
    .challenge_box{
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      width: 51.2%;
      height: 380px/2;
    a{
      width: 100%;
      height: 183px/2;
    }
      div{
        width: 100%;
        height: 183px/2;
        box-sizing: border-box;
        padding: 0 20px/2;
        padding-top: 43px/2;
        border-radius: 10px/2;
        h2{
          color: #fff;
          font-size: 33px/2;
          margin:0;
          font-weight: bold;
          line-height: 33px/2;
          padding-bottom: 30px/2;
        }
        h4{
          padding-bottom: 5px/2;
          font-size: 26px/2;
          color: #fff;
          line-height: 26px/2;
        }
      }
      .item_1{
        background: #ffc02a url(../../../static/img/jiangbei.png) no-repeat;
        background-position: 94.21% 10px/2;
        background-size: 99px/2 99px/2;
      }
      .item_2{
        height: 215px/2;
        background: #76caff url(../../../static/img/huangguan.png) no-repeat;
        background-size: 99px/2 111px/2;
        background-position: 93.21% 16px/2;
        h2{
          padding-bottom: 62px/2;
        }
      }
    }
  }
  .gitf_box{
    width: 100%;
    height: 182px/2;
    padding: 0 26px/2;
    box-sizing: border-box;
    .gift{
      width: 100%;
      padding-left: 25px/2;
      padding-right: 50px/2;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .gift_text{
        width: 100%;
        h2{
          padding-top: 60px/2;
          padding-bottom: 11px/2;
          font-size: 40px/2;
          color: #df5c3e;
          line-height: 40px/2;
          font-weight: bold;
        }
        p{
          padding-top: 11px/2;
          padding-bottom: 36px/2;
          font-size: 26px/2;
          color: #df5c3e;
          line-height: 26px/2;
          display: flex;
          justify-content: space-between;
          .toduo{
            padding-right:40/2px;
          }
        }
      }
      i{
        animation: gift 3s infinite;
        width: 98px/2;
        height: 123px/2;
        position: absolute;
        right: 0;
        image{
          width: 98px/2;
          height: 123px/2;
        }
      }
    }
  }
  .gift_list{
    width: 100%;
    box-sizing: border-box;
    padding: 0 26px/2;
    display: flex;
    flex-flow: wrap;
    align-content: space-between;
    justify-content: space-between;
    li{
      width: 219px/2;
      height: 327px/2;
      box-shadow: #acacac 4px/2 5px/2 15px/2;
      margin-bottom:20px/2;
      border-radius: 10px/2;
      background: #fff;
      margin-right:11px/2;
      &:nth-of-type(3n){
        margin-right: 0;
      }
      div.itemheadk{
        width: 219px/2;
        height: 220px/2;
        box-sizing: border-box;
        padding: 20px/2;
        div{
          position: relative;
          width: 100%;
          height: 100%;
          .itemmodel{
            position: absolute;
            bottom:0;
            left:0;
            width:100%;
            font-size: 16/2px;
            padding:6/2px;
            padding-top: 20/2px;
            line-height: 16/2px;
            height: 22/2+20/2px;
            text-align: right;
            color: #fff;
            box-sizing: border-box;
            background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.4));
          }
          image{
            width: 100%;
            height: 100%;
          }
        }
      }
      h3{
        width: 100%;
        padding: 0 17px/2;
        font-size:28px/2;
        color: #333;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
      a{
        margin:0 auto;
        margin-top:16px/2;
        display: flex;
        width: 100px/2;
        height: 43px/2;
        border-radius: 50px/2;
        font-size: 30px/2;
        box-sizing: border-box;
        line-height: normal;
        color: #fff;
        justify-content: center;
        align-items: center;
        align-content: center;
        padding-bottom: 2px/2;
        background: @bg_color;
      }
    }
    li:nth-of-type(3n){
      margin-right: 0;
    }
  }
</style>
