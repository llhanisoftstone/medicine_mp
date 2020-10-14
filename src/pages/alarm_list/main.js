import Vue from 'vue'
import App from './alarm_list.vue'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    navigationBarTitleText: '告警列表'
  }
}
