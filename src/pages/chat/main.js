import Vue from 'vue'
import App from './chat'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    navigationBarTitleText: '聊天',
    pages: ['pages/chat/main']
  }
}
