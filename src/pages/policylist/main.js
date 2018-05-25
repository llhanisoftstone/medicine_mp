import Vue from 'vue'
import App from './policylist'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    'enablePullDownRefresh': true,
    pages: ['pages/policylist/main'],
    navigationBarTitleText: '政策列表'
  }
}
