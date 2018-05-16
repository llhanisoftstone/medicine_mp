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
      navigationBarBackgroundColor: '#df5c3e',
      backgroundColor: '#df5c3e',
      navigationBarTitleText: '政策答题',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      selectedColor: '#df3c5e',
      color: '#666666',
      list: [
        {
          pagePath: 'pages/index/main',
          text: '趣味答题',
          iconPath: '/static/img/answer.png',
          selectedIconPath: '/static/img/answer_2.png'
        },
        {
          pagePath: 'pages/index/main',
          text: '政策百科',
          iconPath: '/static/img/policy.png',
          selectedIconPath: '/static/img/policy_2.png'},
        {
          pagePath: 'pages/index/main',
          text: '个人中心',
          iconPath: '/static/img/my.png',
          selectedIconPath: '/static/img/my_2.png'
        }]
    }
  }
}
