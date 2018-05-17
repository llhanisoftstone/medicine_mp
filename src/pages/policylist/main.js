import Vue from 'vue'
import App from './policylist'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    pages: ['pages/policylist/main']
  }
}
