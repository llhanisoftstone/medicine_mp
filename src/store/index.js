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
    userinfo: {},
    code: '',
    isauth: false,
    sid: '',
    user: {},
    vsuser: {
      picpath: '/static/img/user.png',
      nickname: '',
      id: ''
    },
    sliver: {},
    answer: {},
    room_id: '',
    myscore: 0,
    vsscore: 0,
    step: 0
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
    get_vsscore: (state, vsscore) => {
      const obj = state
      obj.vsscore += vsscore
    },
    get_step: (state, step) => {
      const obj = state
      obj.step = step
    }
  }
})

export default store
