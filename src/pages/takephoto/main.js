import Vue from 'vue'
import App from './takephoto'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    pages: ['pages/takephoto/main'],
    navigationBarTitleText: '现场拍照'
  }
}
