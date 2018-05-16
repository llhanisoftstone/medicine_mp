<template>
  <div class="container">
    <userinfo :username="$store.state.userinfo.nickName" :imgurl="$store.state.userinfo.avatarUrl">
      <div slot="userRight">
        <a href="" class="wallet">1000</a>
      </div>
    </userinfo>
    <div class="middle">
      <ul>
        <li class="money"><div class="title">银两</div><p class="messagealert">储备仓</p><span class="listimg moneyimg"></span></li>
        <li class="store"><div class="title">兑换店</div><p class="messagealert">精美礼品等你拿</p><span class="listimg storeimg"></span></li>
        <li class="usermoot"><div class="title">道具</div><p class="messagealert">优惠道具等你来购</p><span class="listimg userimg"></span></li>
        <li class="groupcard"><div class="title">优惠券</div><p class="messagealert">优惠券发放</p><span class="listimg cardimg"></span></li>
        <li class="setting"><a href="/pages/setting/main"><div class="title">设置</div><p class="messagealert">设置</p><span class="listimg settingimg"></span></a></li>
      </ul>
    </div>
  </div>
</template>

<script type="javascript">
  export default {

    data () {
      return {
        userInfo: {},
        isnewuser: true
      }
    },
    components: {
        userinfo
    },
    methods: {
      getUserInfo () {
        let that = this
        // 调用登录接口
        wx.login({
          success: () => {
            wx.getSetting({
              success: function(res){
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                  wx.getUserInfo({
                    success: function(res) {
                      console.log(res.userInfo)
                      that.$store.commit('getuser', res.userInfo)
                      that.$store.commit('getauth')
                    }
                  })
                }else{
                  wx.authorize({
                    scope: 'scope.userInfo',
                    success() {
                      wx.startRecord()
                    },
                    fail(err){
                      console.log(err)
                    }
                  })
                }
              }
            })
          }
        })
      },
      bindGetUserInfo(e){
        console.log(e.detail.userInfo)
      }
    },

    created () {
      // 调用应用实例的方法获取全局数据
      this.getUserInfo()
    }
    }
</script>

<style scoped lang="css">
  .container{
    margin-top:10px;
  }
 .middle>ul{
   overflow:hidden;
   padding:0 13px;
 }
  .middle>ul>li{
    float:left;
    margin-top:9px;
    margin-right:9px;
    width:170px;
    height:110px;
    border-radius:5px;
    color:#fff;
    position:relative;
  }
 .middle>ul>li div{
   margin-top:25px;
   font-size:17px;
   font-weight:bold;
   margin-left:15px;
 }
 .middle>ul>li p{
   margin-top:20px;
   font-size:14px;
   margin-left:15px;
 }
 .middle>ul>li:nth-child(2n){
   margin-right:0;
 }
  .money{
    background:#c9e14b;
  }
  .store{
    background:#ffc02a;
  }
  .usermoot{
    background:#ff862d;
  }
  .groupcard{
    background:#df5c3e;
  }
  .setting{
    background:#76caff;
  }
  .listimg{
    position:absolute;
    top:13px;
    right:15px;
    width:36px;
    height:41px;
  }
  .moneyimg{
    background:url(../../../static/img/my_11.png) no-repeat center center;
    background-size:cover;
  }
 .userimg{
   background:url(../../../static/img/my_17.png) no-repeat center center;
   background-size:cover;
 }
 .storeimg{
   background:url(../../../static/img/my_13.png) no-repeat center center;
   background-size:cover;
 }
 .cardimg{
   background:url(../../../static/img/my_18.png) no-repeat center center;
   background-size:cover;
 }
 .settingimg{
   background:url(../../../static/img/my_21.png) no-repeat center center;
   background-size:cover;
 }
  .wallet{
    padding-left:26px;
    height:19px;
    background:url(../../../static/img/my_06.png) no-repeat left center;
    background-size:26px 19px;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    color: #df5c3e;
    font-size: 24px;
  }
</style>

