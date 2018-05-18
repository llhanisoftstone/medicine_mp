import Vue from 'vue'
import App from './giftshopdetail'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    pages: ['pages/giftshopdetail/main'],
    navigationBarTitleText: '卡券详情'
  }
}
