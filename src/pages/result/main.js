import Vue from 'vue'
import App from './result.vue'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    'enablePullDownRefresh': true,
    navigationBarTitleText: '提交结果'
  }
}
