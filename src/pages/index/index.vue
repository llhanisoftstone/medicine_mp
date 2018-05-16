<template>
  <div class="container">
    <userinfo :username="123" :imgurl="12323">
      <div slot="userRight">
        <a href="" class="btn_sign">签到</a>
      </div>
    </userinfo>
    <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" v-if="isnewuser">授权登录</button>
  </div>
</template>

<script type="javascript">
  import userinfo from '@/components/userinfo'


  export default {

  data () {
    return {
      userInfo: {},
      isnewuser: true
    }
  },

  components: {
    userinfo
  },

  methods: {
    getUserInfo () {
        let that = this
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getSetting({
            success: function(res){
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function(res) {
                    that.userInfo = res.userInfo
                    that.isnewuser = false
                  }
                })
              }else{
                wx.authorize({
                  scope: 'scope.userInfo',
                  success() {
                    // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                    wx.startRecord()
                  },
                  fail(err){
                      console.log(err)
                  }
                })
              }
            }
          })
        }
      })
    },
    bindGetUserInfo(e){
        console.log(e.detail.userInfo)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped lang="less">
  @import "../../static/less/common.less";
  .btn_sign{
    width: 100px/2;
    height: 45px/2;
    border-radius: 50px/2;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 26px/2;
    background: @bg_color;
  }
</style>
