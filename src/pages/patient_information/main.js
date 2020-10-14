import Vue from 'vue'
import App from './patient_information.vue'

const app = new Vue(App)
app.$mount()
export default {
  // 这个字段走 app.json
  config: {
    navigationBarTitleText: '患者信息'
  }
}
