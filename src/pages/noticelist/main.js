import Vue from 'vue'
import App from './noticelist.vue'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    'enablePullDownRefresh': true,
    pages: ['pages/noticelist/main'],
    navigationBarTitleText: '通知列表'
  }
}
