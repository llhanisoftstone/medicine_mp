import Vue from 'vue'
import App from './aboutus'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '关于我们'
  }
}
