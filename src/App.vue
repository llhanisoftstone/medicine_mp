<script>
  export default {
    created () {
      let phoneNews = wx.getSystemInfoSync()
      console.log(phoneNews)
      this.$store.commit('getplatform', phoneNews.platform)
      // 调用API从本地缓存中获取数据
      const logs = wx.getStorageSync('logs') || []
      let storageuserdata = wx.getStorageSync('userdata') || {}
      this.$store.commit('getm_user', storageuserdata)
      logs.unshift(Date.now())
      if (!this.$store.state.user.userid) {
        this.getLogin()
      }
      wx.setStorageSync('logs', logs)
      console.log('app create and cache logs by setStorageSyn')
      wx.onNetworkStatusChange(function (res) {
        if (!res.isConnected) {
          wx.showLoading({
            title: '网络已断开，请稍后重试',
            mask: true
          })
        } else {
          wx.hideLoading()
        }
      })
    },
    methods: {
      getLogin () {
        let that = this
        // 调用登录接口
        wx.login({
          success: (code) => {  // code
            console.log(code.code)
            that.$store.commit('getcode', code.code)
            wx.getSetting({
              success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                  that.getUserinfo(code)
                } else {
                  that.$store.commit('getauthreturn')
                }
              }
            })
          }
        })
      },
      getUserinfo () {
        let that = this
        wx.getUserInfo({   //
          success: function (res) {
            if (!res.userInfo) {
              return
            }
            that.$store.commit('getuser', res.userInfo)
            that.$store.commit('getauth')
            that.$store.commit('getauthreturn')
            that.$get('/weapp/login', {code: that.$store.state.code, encryptedData: res.encryptedData, iv: res.iv}).then(res => {
              if (res.code === 200) {
                that.$store.commit('getm_user', res)
              }
            })
          }
        })
      }
    }
  }
</script>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
  a{
    background: transparent;
    opacity: 1;
  }
  .details{
    width: 100%;
    height: auto;
  }
  .imgSty{
    width: 100%;
    height: auto;
  }
  .rich_div{
    margin: 0;
    padding:0;
  }
  .mpvue-picker__action:last-child{
    color:#497214;
  }
</style>
