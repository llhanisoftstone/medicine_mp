import Vue from 'vue'
import App from './questionlist'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    'enablePullDownRefresh': true,
    pages: ['pages/questionlist/main'],
    navigationBarTitleText: '我的咨询'
  }
}
