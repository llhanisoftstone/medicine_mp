import Vue from 'vue'
import App from './mapdetail'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    pages: ['pages/mapdetail/main'],
    navigationBarTitleText: '定位'
  }
}
