import Vue from 'vue'
import App from './shop'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    'enablePullDownRefresh': true,
    pages: ['pages/policylist/main'],
    navigationBarTitleText: '公司主页'
  }
}
