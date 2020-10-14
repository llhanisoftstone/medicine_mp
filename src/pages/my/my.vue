<template>
  <div>
    <div class="nav">
      <div class="navtop">
        <img src="/static/img/bg.png">
        <div class="navhead">
          <img v-if="isLogin == true" :src="picpath"/>
          <img v-else="" src="/static/img/default_user.png">
          <p v-if="isLogin == true">{{nickname}}</p>
          <button v-else="" class="act_btn" plain="true" hover-class="none" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">点击登陆</button>
        </div>
      </div>
      <div class="page">
        <div v-if="isLogin == true" class="fo-1" @click.stop="tonewpage('patient_list')">
          <div class="text-1">患者信息</div>
          <div class="icon-1"></div>
        </div>
        <button v-else="" class="fo-1" plain="true" hover-class="none" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
          <div class="text-1">患者信息</div>
          <div class="icon-1"></div>
        </button>
        <div v-if="isShow" class="fo-2" @click.stop="tonewpage('alarm_list')">
          <div class="text-2">告警提醒<span v-if="isCount" class="count">{{alarm_count}}</span></div>
          <div class="icon-2"></div>
        </div>
        <div class="fo-3" @click.stop="tonewpage('aboutus','')">
          <div class="text-3">关于美恒</div>
          <div class="icon-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isLogin: false,
        isShow: false,
        isCount: false,
        picpath: '',
        nickname: '',
        alarm_count: 0,
        uid: ''
      }
    },
    components: {

    },

    methods: {
      tonewpage (urlname, data) {
        if (!urlname) { return }
        wx.navigateTo({
          url: `/pages/${urlname}/main?${data}`
        })
      },
      bindGetUserInfo: function (e) {
        let that = this
        if (!e.target.userInfo) {
          return
        }
        wx.login({
          success: (code) => {  // code
            that.$store.commit('getcode', code.code)
            that.$store.commit('getuser', e.target.userInfo)
            that.nickname = e.target.userInfo.nickName
            that.picpath = e.target.userInfo.avatarUrl
            that.$store.commit('getauth')
            that.$get('/weapp/login', {code: that.$store.state.code, encryptedData: e.target.encryptedData, iv: e.target.iv, isAlarm: 1}).then(res => {
              console.log(res)
              if (res.code === 200) {
                that.$store.commit('getm_user', res)
                if (res.isAlarm) {
                  that.isShow = true
                  if (res.alarm_count > 0) {
                    that.isCount = true
                    that.alarm_count = res.alarm_count
                  }
                }
                that.isLogin = true
              }
            })
          }
        })
      }
    },
    onShow: function () {
      this.isShow = false
      let than = this
      this.$get('/rs/member/' + this.$store.state.user.userid, {isAlarm: 1}).then(res => {
        if (res.code === 200) {
          if (res.rows[0].isAlarm) {
            than.isShow = true
            if (res.rows[0].alarm_count > 0) {
              than.isCount = true
              than.alarm_count = res.rows[0].alarm_count
            }
          }
          than.nickname = res.rows[0].nickname
          than.picpath = res.rows[0].head_pic
          than.isLogin = true
        } else {
          than.isLogin = false
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  @import "../../static/less/common.less";
  .nav {
    background-color: #ffffff;
    .navtop {
      height: 420px/2;
      position: relative;
      img{
        width:100%;
        height:100%;
      }
      .navhead {
        position: absolute;
        top:50px;
        left:80px/2;
        width: 607px/2;
        height: 229px/2;
        margin: 0 auto;
        text-align: center;
        font-size: 0;
        img {
          width: 130px/2;
          height: 130px/2;
          margin: 50px/2 0 25px/2 0;
          border-radius: 50%;
        }
        p {
          font-size: 30px/2;
          color: #333333;
        }
      }
    }
  }
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    list-style: none;
  }
  button{
    border: none
  }
  a:active {
    color: #333;
  }
  .page{
    button{
      padding-right: 0;
      padding-left: 0;
    }
    .fo-1,.fo-2,.fo-3{
      height:125px/2;
      border-bottom: 1px/2 solid #e2e2e2;
      box-sizing: border-box;
      margin: 0 30px/2;
      padding-left: 25px/2;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .fo-1 .text-1{
      height: 40px/2;
      font-size: 30px/2;
      color: #333333;
      background:url("../../../static/img/my1.png") no-repeat left center;
      background-size: 30px/2 30px/2;
      padding-left: 56px/2;
      padding-right: 0;
      line-height: 30px/2;
    }
    .fo-2 .text-2{
      position: relative;
      height: 40px/2;
      font-size: 30px/2;
      color: #333333;
      background:url("../../../static/img/alarm.png") no-repeat left center;
      background-size: 30px/2 30px/2;
      padding-left: 56px/2;
      line-height: 30px/2;
    }
    .fo-2 .text-2 span{
      position: absolute;
      top: -5px/2;
      color: #ffffff;
      padding: 0 10px/2;
      font-size: 24px/2;
      border-radius: 50%;
      background-color: #df5c3e;
    }
    .fo-3 .text-3{
      height: 40px/2;
      font-size: 30px/2;
      color: #333333;
      background:url("../../../static/img/my3.png") no-repeat left center;
      background-size: 30px/2 30px/2;
      padding-left: 56px/2;
      line-height: 30px/2;

    }
    .fo-1 .icon-1,.fo-2 .icon-2,.fo-3 .icon-3{
      width:17px/2;
      height:30px/2;
      background:url("../../../static/img/my4.png") no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
