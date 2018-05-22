<script>
export default {
  created () {
    this.getLogin()
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  },
  methods: {
    getLogin () {
      let that = this
      // 调用登录接口
      wx.login({
        success: (code) => {  // code
          that.$store.commit('getcode', code.code)
          wx.getSetting({
            success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称  weapp/login
                that.getUserinfo(code)
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
          console.log(res)
          that.$store.commit('getuser', res.userInfo)
          that.$store.commit('getauth')
          that.$get('/weapp/login', {code: that.$store.state.code, encryptedData: res.encryptedData, iv: res.iv}).then(res => {
            if (res.code === 200) {
              that.$store.commit('getm_user', res)
              that.$socket.on('data_chain', d => {
                if (d.cmd === 'login') {
                  that.$store.commit('getsocket')
                }
                console.log(d)
              })
              that.$socket.emit('data_chain', {
                cmd: 'login',
                u_id: res.userid,
                nickname: that.$store.state.userinfo.nickName,
                picpath: that.$store.state.userinfo.avatarUrl
              })
//                console.log(res)
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
</style>
