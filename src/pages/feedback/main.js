import Vue from 'vue'
import App from './feedback.vue'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    'enablePullDownRefresh': true,
    navigationBarTitleText: '不良反应'
  }
}
