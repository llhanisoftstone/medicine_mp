import Vue from 'vue'
import App from './questionsmain'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    'enablePullDownRefresh': true,
    pages: ['pages/questionsmain/main'],
    navigationBarTitleText: '问题详情'
  }
}
