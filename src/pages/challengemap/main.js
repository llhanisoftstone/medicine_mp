import Vue from 'vue'
import App from './challengemap'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    navigationBarTitleText: '闯关赛',
    pages: ['pages/alone/main', 'pages/aloneresult/main']
  }
}
