import Vue from 'vue'
import App from './search_drugs.vue'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    'enablePullDownRefresh': true,
    navigationBarTitleText: '药品搜索'
  }
}
