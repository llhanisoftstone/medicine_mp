import Vue from 'vue'
import App from './questions'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    'enablePullDownRefresh': true,
    pages: ['pages/questions/main'],
    navigationBarTitleText: '我要咨询'
  }
}
