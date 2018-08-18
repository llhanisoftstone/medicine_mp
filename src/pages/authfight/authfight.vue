<template>
    <div class="container">
      <div class="bg_shade" v-if="isshow" @click="hidepick">
        <div class="pick_box" @click.stop="prevent">
          <img class="bg_box" src="/static/img/authfight_bg.png">
          <div class="button_container">
            <p class="btn_box">
              <button class="btn" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo" @click="jumptype=1">我去应战</button>
            </p>
            <p class="btn_box">
              <button class="btn" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo" @click="jumptype=2">我自己玩去</button>
            </p>
          </div>
        </div>
      </div>
      <div class="bjk">
        <img :src="bgurl" class="bjimg" alt="">
      </div>
    </div>
</template>
<script type="javascript">
    export default {
        name: 'authfight',
        topage:"",
        data(){
            return {
              isshow:true,    //弹窗状态
              jumptype:0,
              bgurl:`${this.$store.state.url}/admin/img/sqbj.jpg`
            }
        },
        methods: {
          hidepick(){
            this.isshow=false
          },
          tozhan(){
              let thiz=this;
              wx.navigateTo({
                url: thiz.topage
              })
          },
          toindex(){
            wx.switchTab({
              url:"/pages/index/main"
            })
          },
          prevent(){},       //阻止冒泡
          bindGetUserInfo: function(e) {
            let that = this
            if(!e.target.userInfo){
              return
            }
            console.log(that.$store.state.isauth)
            if(that.$store.state.isauth){
              if(that.jumptype==1){
                that.tozhan()
              }
              if(that.jumptype==2){
                that.toindex()
              }
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
                        if ((url !== 'pages/authfight/main') && (url === 'pages/authmulti/main')) {
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
                if(that.jumptype==1){
                  that.tozhan()
                }
                if(that.jumptype==2){
                  that.toindex()
                }
              }
            })
          }
        },
      onLoad: function (option) {
        this.topage=`/pages/${option.pages}/main?from=${option.from}&&id=${option.id}`
      },
      onUnload(){
        this.isshow=true;
      }

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';

    .bjk{
      position: fixed;
      z-index: -1;
      top:0;
      left:0;
      right:0;
      bottom:0;
      width:100%;
      height:100%;
      overflow: hidden;
      .bjimg{
        display: block;
        width: 100%;
        margin:-87/2px 0;
        height:1663/2px;
      }
    }
    .bg_shade{
      width: 100%;
      height: 100%;
      position: fixed;
      top:0;
      left:0;
      background: rgba(0,0,0,.7);
      z-index:10;
    }
    .pick_box{
      text-align: center;
      .bg_box{
        width:634px/2;
        height:497px/2;
        margin-top: 326px/2;
      }
      .button_container{
        margin: 109px/2 auto 0;
        box-sizing: border-box;
        width:750px/2;
        display:flex;
        justify-content: space-between;
        padding:0 93px/2;
      }
      .btn_box{
        font-size: 30px/2;
        color: #fff;
        width: 270px/2;
        height: 66px/2;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 40px/2;
        background: linear-gradient(150deg,#f4c8be 0%, #df5c3e 50% ,#b54b32 100%);
        box-shadow: 1px 1.5px 1px 1px rgba(0,0,0,.2);
        button{
          width: 262px/2;
          height: 58px/2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px/2;
          color: #fff;
          background: #df5c3e;
          border-radius: 40px/2;
          box-shadow: none;
          border:none;
          &:after {
            border: none;
          }
        }
      }
      /*
      .btn{
        width:270px/2;
        height:66px/2;
        font-size: 30px/2;
        color:@color_fff;
        text-align: center;
        background-color: @bg_color;
        border-radius: 33px/2;
        line-height: 66px/2;
        //box-shadow: 0 9px/2 0px @bg_color, 0 9px/2 25px/2 rgba(0, 0, 0, .9);
        -webkit-transition: all .2s ease;
        -moz-transition: all .2s ease;
        transition: all .2s ease;
      }
      .btn:active{
        //box-shadow: 0 3px 0 @bg_color, 0 3px 6px rgba(0, 0, 0, 1);
        position: relative;
        top: 0.5px;
        left:0.3px;
      }*/
    }
</style>
