// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    url: 'https://policy.lifeonway.com',
    ws_server: 'https://policy.lifeonway.com',
    // ws_server: 'http://192.168.1.12:5000',
    userinfo: {},    //  微信返回用户信息
    code: '',
    isauth: false,      // 是否授权
    authreturn:false,    //授权返回
    issocket: false,     // socket是否登录
    sid: '',
    user: {},            //  用户id
    vsuser: {            //  对战用户信息
      picpath: '/static/img/user.png',
      nickname: '',
      id: ''
    },
    sliver: {},
    openid: {},
    answer: {},             //  题目信息
    room_id: '',           //  房间id
    myscore: 0,           //  我的分数
    vsscore: 0,          //   对方分数
    step: 0,              //   第几题
    prize: {},             //  奖品
    level: 0,                 // 当前进行的关卡
    f_level: 0,                 // 亲友团进行的关卡
    max_nub: 0,                    // 关卡题目数量
    modalshow: true,               // 是否显示弹窗
    quick: []                        //快捷语
  },
  mutations: {
    quick: (state, arr) => {
      const obj = state
      obj.quick = arr
    },
    getsocket: (state, islogin = true) => {
      const obj = state
      obj.issocket = islogin
    },
    getmodal: (state, res) => {
      const obj = state
      obj.modalshow = res
    },
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
    getsid: (state, sids) => {
      const obj = state
      obj.sid = sids
    },
    getcode: (state, code) => {
      const obj = state
      obj.code = code
    },
    getm_user: (state, user) => {
      const obj = state
      obj.user = user
    },
    get_sliver: (state, sliver) => {
      const obj = state
      obj.sliver = sliver
    },
    get_answer: (state, answer) => {
      const obj = state
      obj.answer = answer
    },
    get_vsuser: (state, vsuser) => {
      const obj = state
      obj.vsuser = vsuser
    },
    get_room: (state, room) => {
      const obj = state
      obj.room_id = room
    },
    get_myscore: (state, myscore) => {
      const obj = state
      obj.myscore += myscore
    },
    clear_score: (state) => {
      const obj = state
      obj.vsscore = 0
      obj.myscore = 0
    },
    get_vsscore: (state, vsscore) => {
      const obj = state
      obj.vsscore += vsscore
    },
    get_step: (state, step) => {
      const obj = state
      obj.step = step
    },
    get_prize: (state, prize) => {
      const obj = state
      obj.prize = prize
    },
    get_level: (state, level) => {
      const obj = state
      obj.level = level
    },
    get_f_level: (state, level) => {
      const obj = state
      obj.f_level = level
    },
    get_max_nub: (state, maxnub) => {
      const obj = state
      obj.max_nub = maxnub
    },
    get_openid: (state, openid) => {
      const obj = state
      obj.openid = openid
    }
  }
})

export default store
