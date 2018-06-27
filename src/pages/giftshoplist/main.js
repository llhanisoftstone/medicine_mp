import Vue from 'vue'
import App from './giftshoplist'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    'enablePullDownRefresh': false,
    pages: ['pages/giftshoplist/main'],
    navigationBarTitleText: '礼物店'
  }
}
