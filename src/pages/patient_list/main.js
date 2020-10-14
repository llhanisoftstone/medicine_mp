import Vue from 'vue'
import App from './patient_list.vue'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'enablePullDownRefresh': true,
    navigationBarTitleText: '患者信息'
  }
}
