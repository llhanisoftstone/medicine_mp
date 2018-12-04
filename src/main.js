import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import {post} from './require/post.js'
import {get} from './require/get.js'
import {put} from './require/put.js'
import commons from './static/js/common.js'
import {uploadImg} from './static/js/uploadImg.js'
import {startManager,stopManager,playAudio,stopAudio,stopRecorder,voice} from './static/js/recorderManager.js'
import {callWXPAY} from './static/js/CallWXPay.js'
import io from '../static/js/weapp.socket.io.js'
import mpvueToastRegistry from 'mptoast/registry'
var nvoice=new voice();
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$put = put
Vue.prototype.commons = commons
Vue.prototype.$uploadImg = uploadImg
Vue.prototype.$startManager = startManager
Vue.prototype.$stopManager = stopManager
Vue.prototype.$playAudio = playAudio
Vue.prototype.$stopAudio = stopAudio
Vue.prototype.$stopRecorder = stopRecorder
Vue.prototype.$voice = nvoice
Vue.prototype.$callWXPAY = callWXPAY
Vue.prototype.$socket = io(Vue.prototype.$store.state.ws_server)

App.mpType = 'app'
mpvueToastRegistry(Vue)
const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main', 'pages/policy/main', 'pages/policydetails/main', 'pages/policylist/main', 'pages/ticket/main', 'pages/paysuccess/main', 'pages/test/main', 'pages/address/main', 'pages/report/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#df5c3e',
      backgroundColor: '#df5c3e',
      navigationBarTitleText: '政策大咖',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      selectedColor: '#df5c3e',
      color: '#666666',
      list: [
        {
          pagePath: 'pages/index/main',
          text: '趣味答题',
          iconPath: '/static/img/answer.png',
          selectedIconPath: '/static/img/answer_2.png'
        },
        {
          pagePath: 'pages/traininglist/main',
          text: '培训监管',
          iconPath: '/static/img/policy.png',
          selectedIconPath: '/static/img/policy_2.png'},
        {
          pagePath: 'pages/policy/main',
          text: '政策百科',
          iconPath: '/static/img/policy.png',
          selectedIconPath: '/static/img/policy_2.png'},
        {
          pagePath: 'pages/personcenter/main',
          text: '个人中心',
          iconPath: '/static/img/my.png',
          selectedIconPath: '/static/img/my_2.png'
        }]
    }
  }
}
