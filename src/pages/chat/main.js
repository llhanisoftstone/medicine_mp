import Vue from 'vue'
import App from './chat.vue'

const app = new Vue(App)
app.$mount()
export default {
  // 这个字段走 app.json
  config: {
    navigationBarTitleText: '聊天',
    'enablePullDownRefresh': true,
    backgroundColor:'#f2f2f2'
  }
}
