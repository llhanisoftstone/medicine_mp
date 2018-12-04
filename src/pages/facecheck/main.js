import Vue from 'vue'
import App from './facecheck'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    pages: ['pages/facecheck/main'],
    navigationBarTitleText: '人脸识别'
  }
}
