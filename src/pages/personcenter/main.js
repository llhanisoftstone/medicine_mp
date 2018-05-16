import Vue from 'vue'
import App from './personcenter'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // pages: ['pages/index/main', 'pages/personcenter/main'],
    navigationBarTitleText: '个人中心'
  }
}
