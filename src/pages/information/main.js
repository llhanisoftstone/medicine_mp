import Vue from 'vue'
import App from './information.vue'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    'enablePullDownRefresh': true,
    navigationBarTitleText: '美恒药物警戒'
  }
}
