import Vue from 'vue'
import App from './report'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '炫耀成绩单'
  }
}
