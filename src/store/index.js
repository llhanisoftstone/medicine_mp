// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // url: 'https://policy.lifeonway.com',
    url: 'https://pol.lifeonway.com',
    // url: 'https://pk.lifeonway.com',
    // url: 'http://192.168.1.10:5000',
    // ws_server: 'https://pol.lifeonway.com',
    // ws_server: 'https://pk.lifeonway.com',
    ws_server: 'https://policy.lifeonway.com',
    // ws_server: 'http://192.168.1.10:5000',
    userinfo: {},    //  微信返回用户信息
    code: '',
    isauth: false,      // 是否授权
    authreturn: false,    // 授权返回
    issocket: false,     // socket是否登录
    sid: '',
    user: {},            //  用户id
    vsuser: {            //  对战用户信息
      picpath: '/static/img/user.png',
      nickname: '',
      id: ''
    },
    sliver: {},
    openid: {},
    answer: {},             //  题目信息
    room_id: '',           //  房间id
    myscore: 0,           //  我的分数
    vsscore: 0,          //   对方分数
    step: 0,              //   第几题
    prize: {},             //  奖品
    level: 0,                 // 当前进行的关卡
    question_type: 0,                 // 题目类型：0单选，1选什么都对(问卷题)
    f_level: 0,                 // 亲友团进行的关卡
    max_nub: 0,                    // 关卡题目数量
    modalshow: true,               // 是否显示弹窗
    quick: [],                        // 快捷语
    successTips: [],                 // 正确提示
    errorTips: [],                    // 错误提示
    failTips:[],                       //失败提示语
    rightTitle: 0,                    // 正确题目数量
    allTitle: 0,                      // 所有题目
    useTime: 0,                        // 答题所用时间
    organizcookie: '',                        // 政策百科机构id临时存储
    phoneModal:'',
    platform:'',
    signdata:{},   //用户打卡签到信息
    compid:'',
    rlstatus:0//人脸识别结果
  },
  mutations: {
    getrlstatus: (state, status) => {
      const obj = state
      obj.rlstatus = status
    },
    getphoneModal: (state, phone) => {
      const obj = state
      obj.phoneModal = phone
    },
    getplatform: (state, phone) => {
      const obj = state
      obj.platform = phone
    },
    rightTitle: (state, nub) => {
      const obj = state
      if (nub === 0) {
        obj.rightTitle = 0
      } else {
        obj.rightTitle += 1
      }
    },
    allTitle: (state, nub) => {
      const obj = state
      if (nub === 0) {
        obj.allTitle = 0
      } else {
        obj.allTitle += 1
      }
    },
    useTime: (state, nub) => {
      const obj = state
      if (nub === 0) {
        obj.useTime = 0
      } else {
        obj.useTime += nub
      }
    },
    quick: (state, arr) => {
      const obj = state
      obj.quick = arr
    },
    successTips: (state, arr) => {
      const obj = state
      obj.successTips = arr
    },
    errorTips: (state, arr) => {
      const obj = state
      obj.errorTips = arr
    },
    failTips: (state, arr) => {
      const obj = state
      obj.failTips = arr
    },
    getsocket: (state, islogin = true) => {
      const obj = state
      obj.issocket = islogin
    },
    getmodal: (state, res) => {
      const obj = state
      obj.modalshow = res
    },
    getuser: (state, res) => {
      const obj = state
      obj.userinfo = res
    },
    getauth: (state) => {
      const obj = state
      obj.isauth = true
    },
    getauthreturn: (state) => {
      const obj = state
      obj.authreturn = true
    },
    getsid: (state, sids) => {
      const obj = state
      obj.sid = sids
    },
    getcode: (state, code) => {
      const obj = state
      obj.code = code
    },
    getm_user: (state, user) => {
      const obj = state
      obj.user = user
    },
    get_sliver: (state, sliver) => {
      const obj = state
      obj.sliver = sliver
    },
    get_answer: (state, answer) => {
      const obj = state
      obj.answer = answer
    },
    get_vsuser: (state, vsuser) => {
      const obj = state
      obj.vsuser = vsuser
    },
    get_room: (state, room) => {
      const obj = state
      obj.room_id = room
    },
    get_myscore: (state, myscore) => {
      const obj = state
      obj.myscore += myscore
    },
    clear_score: (state) => {
      const obj = state
      obj.vsscore = 0
      obj.myscore = 0
    },
    get_vsscore: (state, vsscore) => {
      const obj = state
      obj.vsscore += vsscore
    },
    get_step: (state, step) => {
      const obj = state
      obj.step = step
    },
    get_prize: (state, prize) => {
      const obj = state
      obj.prize = prize
    },
    get_level: (state, level) => {
      const obj = state
      obj.level = level
    },
    get_f_level: (state, level) => {
      const obj = state
      obj.f_level = level
    },
    get_max_nub: (state, maxnub) => {
      const obj = state
      obj.max_nub = maxnub
    },
    get_que_type: (state, type) => {
      const obj = state
      obj.question_type = type
    },
    get_openid: (state, openid) => {
      const obj = state
      obj.openid = openid
    },
    getorganizid: (state, organizcookie) => {
      const obj = state
      obj.organizcookie = organizcookie
    },
    setSignData: (state, signObj) => {
      const obj = state
      // pics:[] 现场照
      // act_id ：活动ID
      // remark ： 备注
      // province ：省
      // city ：市
      // zone ：区
      // address ：详细地址
      // member_pic ：人脸识别上传的照片
      // face_result ：人脸识别结果
      // face_msg ：人脸识别信息
      // longitude ：经纬度
      // latitude：经纬度
      if(signObj.longitude){
        obj.signdata.longitude = signObj.longitude
      }
      if(signObj.latitude){
        obj.signdata.latitude = signObj.latitude
      }
      if(signObj.remark){
        obj.signdata.remark = signObj.remark
      }
      if(signObj.member_pic){
        obj.signdata.member_pic = signObj.member_pic
      }
      if(signObj.face_result !== ''){
        obj.signdata.face_result = signObj.face_result
      }
      if(signObj.face_json){
        obj.signdata.face_json = signObj.face_json
      }
      if(signObj.province){
        obj.signdata.province = signObj.province
      }
      if(signObj.city){
        obj.signdata.city = signObj.city
      }
      if(signObj.zone){
        obj.signdata.zone = signObj.zone
      }
      if(signObj.address){
        obj.signdata.address = signObj.address
      }

    },
    getcompid: (state, compid) => {
      const obj = state
      obj.compid = compid
    }
  }
})

export default store
