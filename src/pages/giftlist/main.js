import Vue from 'vue'
import App from './giftlist'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    'enablePullDownRefresh': true,
    pages: ['pages/giftlist/main'],
    navigationBarTitleText: '礼物列表'
  }
}
