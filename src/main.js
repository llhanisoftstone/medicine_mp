import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import {post} from './require/post.js'
import {get} from './require/get.js'
import {put} from './require/put.js'
import {uploadImg} from './static/js/uploadImg.js'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$put = put
Vue.prototype.$uploadImg = uploadImg

App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
}
