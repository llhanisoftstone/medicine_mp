import Vue from 'vue'
import App from './toknow'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    navigationBarTitleText: '我要了解'
  }
}
