import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import {post} from './require/post.js'
import {get} from './require/get.js'
import {put} from './require/put.js'
import commons from './static/js/common.js'
import {uploadImg} from './static/js/uploadImg.js'
import {callWXPAY} from './static/js/CallWXPay.js'
import mpvueToastRegistry from 'mptoast/registry'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$put = put
Vue.prototype.commons = commons
Vue.prototype.$uploadImg = uploadImg
Vue.prototype.$callWXPAY = callWXPAY

App.mpType = 'app'
mpvueToastRegistry(Vue)
const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main', 'pages/transfer/main', 'pages/search_drugs/main', 'pages/drugs_details/main', 'pages/feedback/main', 'pages/patient_list/main', 'pages/input_drugs/main', 'pages/patient_information/main', 'pages/adverse_reaction/main', 'pages/drugs/main', 'pages/my/main', 'pages/alarm_list/main', 'pages/information/main', 'pages/patient_details/main', 'pages/aboutus/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#2dc9aa',
      backgroundColor: '#2dc9aa',
      navigationBarTitleText: '美恒医药不良药品监察平台',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      selectedColor: '#2dc9aa',
      color: '#666666',
      list: [
        {
          pagePath: 'pages/index/main',
          text: '药品目录',
          iconPath: '/static/img/icon2.png',
          selectedIconPath: '/static/img/icon1.png'
        },
        {
          pagePath: 'pages/feedback/main',
          text: '不良反应',
          iconPath: '/static/img/icon4.png',
          selectedIconPath: '/static/img/icon3.png'
        },
        {
          pagePath: 'pages/my/main',
          text: '我的',
          iconPath: '/static/img/icon6.png',
          selectedIconPath: '/static/img/icon5.png'
        }]
    }
  }
}
