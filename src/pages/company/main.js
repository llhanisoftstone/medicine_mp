import Vue from 'vue'
import App from './company.vue'

const app = new Vue(App)
app.$mount()
export default {
  // 这个字段走 app.json
  config: {
    navigationBarTitleText: '公司主页',
    // 'enablePullDownRefresh': true
  }
}
