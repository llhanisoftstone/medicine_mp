import Vue from 'vue'
import App from './input_drugs.vue'

const app = new Vue(App)
app.$mount()
export default {
  // 这个字段走 app.json
  config: {
    navigationBarTitleText: '输入药品信息'
  }
}
