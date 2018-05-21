import Vue from 'vue'
import App from './policymain'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    pages: ['pages/policydetails/main'],
    navigationBarTitleText: '政策百科'
  }
}
