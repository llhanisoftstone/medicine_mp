// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    url: 'https://www.meihengcdr.com', // 小程序域名
    // url: 'http://10.61.181.65:5001',
    imgUrl: 'http://www.meihengcdr.com/admin',
    appid: 'wx496970ab6d9fdb7c',
    path: '/pages/index/index',
    code: '',
    userinfo: {},    //  微信返回用户信息
    sid: '',
    user: {},            //  用户id
    compid: '',
    isauth: false,      // 是否授权
    authreturn: false,    // 授权返回
    beforeUrl: '',
    nickname: '',
    headpic: ''
  },
  mutations: {
    getuser: (state, res) => {
      const obj = state
      obj.userinfo = res
    },
    getauth: (state) => {
      const obj = state
      obj.isauth = true
    },
    getauthreturn: (state) => {
      const obj = state
      obj.authreturn = true
    },
    getcode: (state, code) => {
      const obj = state
      obj.code = code
    },
    getsid: (state, sids) => {
      const obj = state
      obj.sid = sids
    },
    getplatform: (state, phone) => {
      const obj = state
      obj.platform = phone
    },
    getm_user: (state, user) => {
      const obj = state
      obj.user = user
    },
    get_openid: (state, openid) => {
      const obj = state
      obj.openid = openid
    },
    getUrl: (state, url) => {
      const obj = state
      obj.beforeUrl = url
    },
    get_nickname: (state, nickname) => {
      const obj = state
      obj.nickname = nickname
    },
    get_headpic: (state, headpic) => {
      const obj = state
      obj.headpic = headpic
    },
    compid: (state, compid) => {
      const obj = state
      obj.compid = compid
    }
  }
})

export default store
