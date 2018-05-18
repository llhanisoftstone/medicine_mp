<template>
  <div class="container">
    <div class="user_box">
      <userinfo :username="$store.state.userinfo.nickName" :imgurl="$store.state.userinfo.avatarUrl">
        <div slot="userRight">
          <a href="/pages/signcount/main" class="btn_sign">签到</a>
        </div>
      </userinfo>
    </div>
    <div class="match_box">
      <a href="/pages/challengemap/main">
        <div class="challenge">
          <h2>闯关赛</h2>
          <h4>成功闯关拿礼物</h4>
          <h4>已有{{p_number}}人获得礼物</h4>
        </div>
      </a>
      <div class="challenge_box">
        <a :href="'/pages/loadpk/main?id='+$store.state.user.userid">
          <div class="item_1">
            <h2>全网挑战</h2>
            <h4>冲顶排位赛一战即发</h4>
          </div>
        </a>
        <a href="/pages/friendpk/main">
          <div class="item_2">
            <h2>好友PK</h2>
            <h4>看看好友的排名吧</h4>
          </div>
        </a>
      </div>
    </div>
    <div class="gift_title"><span></span><i></i><image src="/static/img/liwu.png"></image>礼物店<i></i><span></span></div>
    <ul class="gift_list">
      <li v-for="(v,i) in win_treasure">
        <div>
          <image :src="v.picpath"></image>
        </div>
        <h3>{{v.name}}</h3>
        <a href="" :_id="v.id">挑战</a>
      </li>
    </ul>
  </div>
</template>

<script type="javascript">
  import userinfo from '@/components/userinfo'


  export default {

  data () {
    return {
      p_number:0,
      win_treasure: []
    }
  },

  components: {
    userinfo
  },

  methods: {
//      enters(){
//          console.log(1111111)
//          this.$socket.emit('event','123')
//      },

    getLogin () {
      let that = this
      // 调用登录接口
      wx.login({
        success: (code) => {  //code
          that.$store.commit('getcode', code.code)
          wx.getSetting({
            success: function(res){
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称  weapp/login
                that.getUserinfo(code)
              }
            }
          })
        }
      })
    },
    getUserinfo(){
      let that = this
      wx.getUserInfo({   //
        success: function(res) {
          console.log(res)
          that.$store.commit('getuser', res.userInfo)
          that.$store.commit('getauth')
          that.$get('/weapp/login',{code:that.$store.state.code,encryptedData:res.encryptedData,iv:res.iv}).then(res=>{
              if(res.code == 200){
                that.$store.commit('getm_user', res)
//                console.log(res)
              }
          })
        }
      })
    },
    async getpage(){
        let that = this
        let res = await that.$get('/rs/first_page')
        if(res.code == 200){
            that.p_number = res.present_count
          for(let i = 0;i<res.win_treasure.length;i++){
            res.win_treasure[i].picpath = that.$store.state.url+ res.win_treasure[i].picpath
          }
            that.win_treasure = res.win_treasure
        }
    }
  },
  mounted(){
    this.getpage()
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getLogin()
  }
}
</script>

<style scoped lang="less">
  @import "../../static/less/common.less";
  a{
    background: transparent;
    opacity: 1;
  }
  .user_box{
    padding-top: 13px/2;
    padding-bottom: 15px/2;
  }
  .btn_sign{
    width: 100px/2;
    height: 45px/2;
    border-radius: 50px/2;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 26px/2;
    background: @bg_color;
    box-shadow: #923c3c 2px/2 5px/2 15px/2;
  }
  .container{
    background: #fff3f3 url(../../../static/img/yetou.png) center top no-repeat;
    background-size: 100% auto;
  }
  .match_box{
    padding: 0 26px/2;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    .challenge{
      width: 325px/2;
      height: 380px/2;
      border-radius: 10px/2;
      background: #ff862d url(../../../static/img/paiming.png) no-repeat;
      background-position: 113px/2 195px/2;
      background-size: 183px/2 162px/2;
      box-sizing: border-box;
      padding: 0 28px/2;
      padding-top: 53px/2;
      margin-right:15px/2;
      h2{
        color: #fff;
        font-size: 33px/2;
        margin:0;
        font-weight: bold;
      }
      h4{
        padding-top: 15px/2;
        font-size: 26px/2;
        color: #fff;
        line-height: 26px/2;
      }
    }
    .challenge_box{
      width: 358px/2;
      height: 380px/2;
      div{
        width: 358px/2;
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
        }
        h4{
          padding-top: 36px/2;
          font-size: 26px/2;
          color: #fff;
          line-height: 26px/2;
        }
      }
      .item_1{
        background: #ffc02a url(../../../static/img/jiangbei.png) no-repeat;
        background-position: 280px/2 24px/2;
        background-size: 59px/2 59px/2;
        margin-bottom:14px/2;
      }
      .item_2{
        background: #76caff url(../../../static/img/huangguan.png) no-repeat;
        background-size: 77px/2 49px/2;
        background-position: 270px/2 24px/2;
      }
    }
  }
  .gift_title{
    margin-top:35px/2;
    margin-bottom: 35px/2;
    height: 30px/2;
    padding: 0 143px/2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px/2;
    color: #333;
    box-sizing: border-box;
    image{
      width: 44px/2;
      height: 41px/2;
    }
    span{
      width: 150px/2;
      height: 1px;
      background: #333;
     }
    i{
      width: 14px/2;
    }
  }
  .gift_list{
    width: 100%;
    box-sizing: border-box;
    padding: 0 26px/2;
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    li{
      width: 220px/2;
      height: 280px/2;
      box-shadow: #acacac 4px/2 5px/2 15px/2;
      margin-bottom:20px/2;
      border-radius: 10px/2;
      background: #fff;
      div{
        width: 220px/2;
        height: 173px/2;
        box-sizing: border-box;
        padding: 20px/2;
        image{
          width: 100%;
          height: 100%;
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
        color: #fff;
        justify-content: center;
        background: @bg_color;
      }
    }
  }
</style>
