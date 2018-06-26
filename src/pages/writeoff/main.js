import Vue from 'vue'
import App from './writeoff'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '核销优惠券'
  }
}
