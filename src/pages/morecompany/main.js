import Vue from 'vue'
import App from './morecompany'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    'enablePullDownRefresh': true,
    pages: ['pages/morecompany/main'],
    navigationBarTitleText: '更多企业'
  }
}
