<template>
    <div class="user_box" @click="tonewpage('userdata','')">
      <image src="/static/img/touxiang.png" class="user_bg"></image>
      <div class="user_info">
        <div class="img_box" >
          <image :src='imgurl' v-if="isauth"></image>
          <button open-type="getUserInfo" v-if="!isauth&&authreturn" :_id="isauth" class="btn_auth" @getuserinfo="bindGetUserInfo">
            <image src="/static/img/role.png"></image>
          </button>
        </div>
        <div class="username" v-if="isauth&&authreturn">
          {{username}}&nbsp;<span class="levelname">{{user.rank_name}}</span>
          <!--<div class="userlevel">{{user.rank_name}}<span class="levelsign">{{user.experience}}</span></div>-->
          <div class="userlevel"><span v-if="points>=0">银两 : {{points}}&nbsp;&nbsp;</span>经验 : {{user.experience}}</div>
        </div>
        <slot name="userRight"></slot>
      </div>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'userinfo',
        props: ['imgurl','username','points'],
        data(){
            return {
            }
        },
        methods: {
          tonewpage(urlname,data){
            wx.navigateTo({
              url:`/pages/${urlname}/main?${data}`
            })
          },
          bindGetUserInfo: function(e) {
            let that = this
            if(!e.target.userInfo){
                return
            }
            that.$store.commit('getuser', e.target.userInfo)
            that.$store.commit('getauth')
            that.$get('/weapp/login',{code:that.$store.state.code,encryptedData:e.target.encryptedData,iv:e.target.iv}).then(res=>{
              console.log(res)
              if (res.code === 200) {
                for (let i = 0; i < res.tools.length; i++) {
                  if (!res.tools[i].amount) {
                    res.tools[i].amount = 0
                  }
                }
                that.$store.commit('getm_user', res)
                that.$socket.on('data_chain', d => {
                  if (d.cmd === 'login') {
                    that.$store.commit('getsocket')
                  }
                  console.log(d)
                })
                that.$socket.emit('data_chain', {
                  cmd: 'login',
                  u_id: res.userid,
                  nickname: that.$store.state.userinfo.nickName,
                  picpath: that.$store.state.userinfo.avatarUrl
                })
                that.$socket.on('global_chain', d => {
                  console.log(d)
                  if (d.cmd === 'error') {
                    if (d.errcode === 601) {
                      if (that.$store.state.modalshow) {
                        let pagesArr = getCurrentPages()
                        let currentPage = pagesArr[pagesArr.length - 1]
                        let url = currentPage.route
                        if ((url !== 'pages/authfight/main') && (url !== 'pages/authmulti/main')) {
                          that.$store.commit('getmodal', false)
                          wx.hideLoading()
//                      wx.showLoading({
//                        mask:true
//                      })
                          wx.showModal({
                            title: '提示',
                            content: '无法获取好友信息,请重试',
                            showCancel: false,
                            confirmText: '确定',
                            confirmColor: '#df5c3e',
                            mask: true,
                            complete: res => {
                              console.log(`重新登录${that.$store.state.user.userid}`)
                              that.$socket.emit('data_chain', {
                                cmd: 'login',
                                u_id: that.$store.state.user.userid,
                                nickname: that.$store.state.userinfo.nickName,
                                picpath: that.$store.state.userinfo.avatarUrl
                              })
                              that.$store.commit('getmodal', true)
                              wx.switchTab({
                                url: '/pages/index/main'
                              })
                            }
                          })
                        } else {
                          that.$socket.emit('data_chain', {
                            cmd: 'login',
                            u_id: that.$store.state.user.userid,
                            nickname: that.$store.state.userinfo.nickName,
                            picpath: that.$store.state.userinfo.avatarUrl
                          })
                        }
                      }
                    } else if (d.errcode === 404) {
                      if (that.$store.state.modalshow) {
                        that.$store.commit('getmodal', false)
                        wx.hideLoading()
                        wx.showModal({
                          title: '提示',
                          content: '房间不存在',
                          showCancel: false,
                          confirmText: '返回首页',
                          confirmColor: '#df5c3e',
                          mask: true,
                          complete: res => {
                            wx.switchTab({
                              url: '/pages/index/main'
                            })
                            that.$store.commit('getmodal', true)
                          }
                        })
                      }
                    } else if (d.errcode === 301) {
                      if (that.$store.state.modalshow) {
                        that.$store.commit('getmodal', false)
                        wx.hideLoading()
                        wx.showModal({
                          title: '提示',
                          content: '连接已断开',
                          showCancel: false,
                          confirmText: '返回首页',
                          confirmColor: '#df5c3e',
                          mask: true,
                          complete: res => {
                            wx.switchTab({
                              url: '/pages/index/main'
                            })
                            that.$store.commit('getmodal', true)
                          }
                        })
                      }
                    }
                  }else if(d.cmd === 'upgrade') {
                    let user = that.$store.state.user
                    user.rank_code = d.rank_code
                    user.rank_name = d.rank_name
                    user.experience = d.experience
                    that.$store.commit('getm_user', user)
                  }
                })
              }
            })
          }
        },
        computed:{
          isauth(){
              if(this.$store.state.isauth){
                wx.showTabBar({animation:true})
              }else{
                  if(this.$store.state.authreturn){
                    wx.hideTabBar({animation:true})
                  }
              }
              return this.$store.state.isauth
          },
          authreturn(){
            return this.$store.state.authreturn
          },
          user(){
              return this.$store.state.user
          }
        },
      onLoad:function(){
      },
      onShow:function(){}

    }
</script>

<style lang="less" scoped>
    @import '../static/less/common.less';
    .user_box{
      width: 100%;
      box-sizing: border-box;
      height: 194px/2;
      padding: 0 26px/2;
      position:relative;
      .user_bg{
        width: 93.066%;
        height: 194px/2;
        position: absolute;
        top:0;
        left:26px/2;
        z-index:0;
      }
      .user_info{
        position: absolute;
        left:26px/2;
        width: 93.066%;
        height: 194px/2;
        z-index:2;
        align-items: center;
        justify-content: flex-start;
        box-sizing: border-box;
        padding-right: 31px/2;
        display: flex;
        .img_box{
          width: 135px/2;
          height: 135px/2;
          border-radius: 50%;
          background: #fff;
          border:5px/2 solid #fff;
          display: flex;
          box-sizing: border-box;
          margin-left:50px/2;
          image{
            width: 127px/2;
            height: 127px/2;
            border-radius: 50%;
            align-content: center;
            align-items: center;
            justify-content: center;
          }
          .btn_auth{
            width: 750px/2;
            height: 100%;
            position: fixed;
            top:0;
            left:0;
            z-index:50;
            display: flex;
            align-items: center;
            justify-content: center;
            /*background: transparent;*/
            background: rgba(0,0,0,0.7);
            image{
              width: 641px/2;
              height: 891px/2;
              margin:auto;
              position: absolute;
              top:20px/2;
              left:0;
              right:0;
              border-radius: 0 !important;
            }
            span{
              width: 100%;
              height: 30px/2;
              font-size: 30px/2;
              color: #fff;
              position: absolute;
              top:611px/2;
              left:0;
              right:0;
              text-align: center;
            }
          }
        }
        .username{
          margin-left: 38px/2;
          font-size: 32px/2;
          color: #333;
          width: 250px/2;
          display:inline-block;
          word-break:break-all;
          word-wrap:break-word;
          -webkit-text-size-adjust:none;
          height:auto;
          box-sizing: border-box;
        }
        .levelname{
          padding-left: 35/2px;
          display: inline-block;
          vertical-align: middle;
          transform: translateY(-4/2px);
          line-height: 32/2px;
          font-size: 16/2px;
          color: #df5c3e;
          width: 110/2px;
          height:30/2px;
          background: url("../../static/img/levelback.png")no-repeat left center;
          background-size: 99/2px 28/2px;
        }
        .userlevel{
          color:#df5c3e;
          font-size: 22/2px;
          line-height: 22/2px;
          height: 22/2px;
          padding-top: 15/2px;
          .levelsign{
            padding-left: 38/2px;
            background: url("../../static/img/levelsign.png")no-repeat 0 center;
            background-size: 36/2px 25/2px;
            font-size: 28/2px;
            color:#333;
          }
        }
        .slot_box{
          flex: 1;
        }
      }
    }
</style>
