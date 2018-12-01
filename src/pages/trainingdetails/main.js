import Vue from 'vue'
import App from './trainingdetails'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    navigationBarTitleText: '培训详情'
  }
}
