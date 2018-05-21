import Vue from 'vue'
import App from './ticket'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    'enablePullDownRefresh': true,
    pages: ['pages/ticketdetails/main', 'pages/writeoff/main'],
    navigationBarTitleText: '优惠券'
  }
}
