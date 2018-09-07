<script>
export default {
  created () {
    let that = this
    let showmsg = null
    let loadTime=null
    that.getquick()
    that.getTips()
    this.$socket.on('connect', () => {
      clearTimeout(loadTime)
      loadTime = null
      wx.hideLoading()
      clearTimeout(showmsg)
      showmsg = null
      if (!that.$store.state.user.userid) {
        that.getLogin()
      }
    })
    this.$socket.on('disconnect', d => {
      console.log(d)
       wx.showLoading({
         mask: true
       })
      clearInterval(loadTime)
      loadTime = null
      loadTime = setInterval(() => {
        if ((url !== 'pages/alone/main') && (url !== 'pages/pkanswer/main') && (url !== 'pages/team/main') ){
//          wx.hideLoading()
           wx.showLoading({
             mask: true
           })
        }
      }, 1000)
      that.$store.commit('getsocket', false)
      let pagesArr = getCurrentPages()
      let currentPage = pagesArr[pagesArr.length - 1]
      let url = currentPage.route
      if ((url === 'pages/alone/main') || (url === 'pages/pkanswer/main') || (url === 'pages/team/main') ){
        showmsg = setTimeout(() => {
          if (that.$store.state.modalshow) {
            that.$store.commit('getmodal', false)
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '网络出现问题,请稍后重试',
              showCancel: false,
              confirmText: '确认',
              confirmColor: '#df5c3e',
              mask: true,
              complete: res => {
                wx.switchTab({
                  url: '/pages/index/main'
                })
                that.$store.commit('getmodal', true)
              }
            })
          }
        }, 15000)
      }
    })
    this.$socket.on('reconnect', d => {
      if (!that.$store.state.issocket) {
        if (that.$store.state.user.userid) {
          console.log('app login')
          that.$socket.emit('data_chain', {
            cmd: 'login',
            u_id: that.$store.state.user.userid,
            nickname: that.$store.state.userinfo.nickName,
            picpath: that.$store.state.userinfo.avatarUrl
          })
          that.$store.commit('getsocket')
        }
      }
      console.log(d)
      let pagesArr = getCurrentPages()
      let currentPage = pagesArr[pagesArr.length - 1]
      let url = currentPage.route
      if ((url === 'pages/alone/main') || (url === 'pages/pkanswer/main')) {
        console.log(`页面路径${url}`)
        if (that.$store.state.modalshow) {
          that.$store.commit('getmodal', false)
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '游戏已结束',
            showCancel: false,
            confirmText: '返回首页',
            confirmColor: '#df5c3e',
            mask: true,
            complete: res => {
              wx.switchTab({
                url: '/pages/index/main'
              })
              that.$store.commit('getmodal', true)
            }
          })
        }
      } else if (url === 'pages/team/main') {
        that.$socket.emit('data_chain', {
          cmd: 'left',
          room_id: that.$store.state.room_id,
          u_id: that.$store.state.user.userid,
          game_cfg_id: 2,
          game_type: 2
        })
        that.$socket.emit('data_chain', {
          cmd: 'fight',
          game_cfg_id: 2,
          game_type: 2,
          u_id: that.$store.state.user.userid,
          to_u_id: currentPage.options.id,
          game_style: 2
        })
      }
    })

    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

//    wx.onNetworkStatusChange(function(network) {
//      if(!network.isConnected){
//        wx.hideLoading()
//        wx.showModal({
//          title: '提示',
//          content: '网络异常,请检查您的网络！',
//          showCancel: false,
//          confirmText: '确定',
//          confirmColor: '#df5c3e',
//          mask: true
//        })
//      }
//    })
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
              }else{
                that.$store.commit("getauthreturn")
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
          if (!res.userInfo) {
            return
          }
          that.$store.commit('getuser', res.userInfo)
          that.$store.commit('getauth')
          that.$store.commit("getauthreturn")
          that.$get('/weapp/login', {code: that.$store.state.code, encryptedData: res.encryptedData, iv: res.iv}).then(res => {
            if (res.code === 200) {
              for (let i = 0; i < res.tools.length; i++) {
                if (!res.tools[i].amount) {
                  res.tools[i].amount = 0
                }
              }
              that.$store.commit('getm_user', res)
              that.$socket.on('data_chain', d => {
                if (d.cmd === 'login') {
                  that.$store.commit('getsocket')
                }
              })
              if (!that.$store.state.issocket) {
                that.$socket.emit('data_chain', {
                  cmd: 'login',
                  u_id: res.userid,
                  nickname: that.$store.state.userinfo.nickName,
                  picpath: that.$store.state.userinfo.avatarUrl
                })
              }
              that.$socket.on('global_chain', d => {
                console.log(d)
                if (d.cmd === 'error') {
                  if (d.errcode === 601) {
                    if (that.$store.state.modalshow) {
                      let pagesArr = getCurrentPages()
                      let currentPage = pagesArr[pagesArr.length - 1]
                      let url = currentPage.route
                      if ((url !== 'pages/authfight/main') && (url !== 'pages/authmulti/main')&& (url !== 'pages/index/main')) {
                        that.$store.commit('getmodal', false)
                        wx.hideLoading()
//                      wx.showLoading({
//                        mask:true
//                      })
                        wx.showModal({
                          title: '提示',
                          content: '无法获取好友信息,请重试',
                          showCancel: false,
                          confirmText: '确定',
                          confirmColor: '#df5c3e',
                          mask: true,
                          complete: res => {
                            console.log(`重新登录${that.$store.state.user.userid}`)
                            that.$socket.emit('data_chain', {
                              cmd: 'login',
                              u_id: that.$store.state.user.userid,
                              nickname: that.$store.state.userinfo.nickName,
                              picpath: that.$store.state.userinfo.avatarUrl
                            })
                            that.$store.commit('getmodal', true)
                            wx.switchTab({
                              url: '/pages/index/main'
                            })
                          }
                        })
                      } else {
                        that.$socket.emit('data_chain', {
                          cmd: 'login',
                          u_id: that.$store.state.user.userid,
                          nickname: that.$store.state.userinfo.nickName,
                          picpath: that.$store.state.userinfo.avatarUrl
                        })
                      }
                    }
                  } else if (d.errcode === 404) {
                    if (that.$store.state.modalshow) {
                      that.$store.commit('getmodal', false)
                      wx.hideLoading()
                      wx.showModal({
                        title: '提示',
                        content: '您已错过入场时间,请下次再来',
                        showCancel: false,
                        confirmText: '返回首页',
                        confirmColor: '#df5c3e',
                        mask: true,
                        complete: res => {
                          wx.switchTab({
                            url: '/pages/index/main'
                          })
                          that.$store.commit('getmodal', true)
                        }
                      })
                    }
                  } else if (d.errcode === 301) {
                    if (that.$store.state.modalshow) {
                      that.$store.commit('getmodal', false)
                      wx.hideLoading()
                      wx.showModal({
                        title: '提示',
                        content: '连接已断开',
                        showCancel: false,
                        confirmText: '返回首页',
                        confirmColor: '#df5c3e',
                        mask: true,
                        complete: res => {
                          wx.switchTab({
                            url: '/pages/index/main'
                          })
                          that.$store.commit('getmodal', true)
                        }
                      })
                    }
                  }
                }else if(d.cmd === 'upgrade') {
                  let user = that.$store.state.user
                  user.rank_code = d.rank_code
                  user.rank_name = d.rank_name
                  user.experience = d.experience
                  that.$store.commit('getm_user', user)
                }
              })
//                console.log(res)
            }
          })
        }
      })
    },
    getquick () {
      let that = this
      that.$get('/rs/phrase_set', {order: 'order_code desc', page: 1, size: 6}).then(res=>{
        if (res.code == 200) {
          that.$store.commit('quick', res.rows)
        }
      })
    },
    getTips () {
      let that = this
      this.$get('/rs/hint_set', {category: 1, page: 1, size: 20}).then(res => {
        if (res.code === 200) {
          that.$store.commit('successTips', res.rows)
        }
      })
      this.$get('/rs/hint_set', {category: 2, page: 1, size: 20}).then(res => {
        if (res.code === 200) {
          that.$store.commit('errorTips', res.rows)
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
</style>
