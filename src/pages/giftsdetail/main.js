import Vue from 'vue'
import App from './giftsdetail.vue'

const app = new Vue(App)
app.$mount()
export default {
  // 这个字段走 app.json
  config: {
    navigationBarTitleText: '礼物详情',
    'enablePullDownRefresh': true
  }
}
