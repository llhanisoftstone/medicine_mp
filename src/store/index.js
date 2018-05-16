// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    url: 'http://192.168.1.146:3003',
    ws_server: 'ws://47.93.248.40:1666',
    userinfo: {}
  },
  mutations: {
    increment: (state) => {
      const obj = state
      obj.count += 1
    },
    decrement: (state) => {
      const obj = state
      obj.count -= 1
    },
    getuser: (state,res) => {
      const obj = state
      obj.userinfo = res
    }
  }
})

export default store
