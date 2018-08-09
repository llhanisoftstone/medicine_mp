<template>
    <div class="bg">
      <image src="/static/img/pipei.jpg" class="bg_img"></image>
      <div class="bg_box">
        {{test}}
        <div :class="{'my':true,'my_img':vs}">
          <image :src="userinfo.avatarUrl"></image>
        </div>
        <p :class="{'myname':true,'my_img':vs}">{{userinfo.nickName}}</p>
        <!--  load  or  vs -->
        <div class="load" :class="{'vs':vs}">
          <p v-if="!vs">{{loadcon}}</p>
          <!--<image src="/static/img/02.gif" v-if="!vs"></image>-->
          <image src="/static/img/vs.png" v-if="vs"></image>
        </div>
        <div :class="{'vsuser':true,'vs_img':vs}">
          <image :src="vsuser.picpath"></image>
        </div>
        <p :class="{'username':true,'vs_img':vs}">{{vsuser.nickname}}</p>
      </div>
      <div class="btn_box" v-if="from==1">
        <button open-type="share">挑战其他好友</button>
        <button class="swiper" @click="swiper">全网挑战</button>
      </div>
      <button open-type="getUserInfo" v-if="!isauth" :_id="isauth" class="btn_auth" @getuserinfo="bindGetUserInfo">
        <image src="/static/img/role.png"></image>
        <span>暂未授权,请点击授权</span>
      </button>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'loadpk',
        data(){
            return {
                test:'',
                loadcon:'正在为您匹配对手......',
                loadfn:null,
                vs:false,
                other_uid:'',
                from: 2,                //  1 好友  2全网    好友添加按钮
                again:0,                 //是否重复挑战   好友对战使用
                router:0,                //0返回   1跳转
                isend:false,               //是否已发送匹配请求
                rout:null              // 延时跳转页面
            }
        },
        methods: {
          loadconfn(){
              if(this.loadcon.length == 14){
                  this.loadcon=this.loadcon.slice(0,8)
              }else{
                this.loadcon=`${this.loadcon}.`
              }
          },
          swiper(){     //切换模式
              this.$socket.emit('data_chain', {cmd:'left',u_id:this.$store.state.user.userid,game_cfg_id:1,game_type:this.from})
              this.from=2
              this.other_uid=''
              this.$socket.emit('data_chain', {cmd:'fight',u_id:this.$store.state.user.userid,game_cfg_id:1,game_type:this.from})
              wx.setNavigationBarTitle({
                title: '全网挑战'
              })
          },
          cleardata(){    //清除数据
            this.vs=false
            this.router=0
            if(this.again == 0){
              this.$store.commit('get_vsuser',{ picpath: '/static/img/user.png',nickname: '',id: ''})
            }else{
              let other=this.$store.state.vsuser
              other.picpath='/static/img/user.png'
              other.nickname=''
              this.$store.commit('get_vsuser',other)
            }
            this.$store.commit('get_answer',{})
            this.$store.commit('get_step',0)
            this.$store.commit('get_room','')
            clearTimeout(this.rout)
            this.rout=null
          },
          sendnews(){
            if(this.from == 1){
              wx.setNavigationBarTitle({
                title: '好友对战'
              })
            }else{
              wx.setNavigationBarTitle({
                title: '全网挑战'
              })
            }
            console.log(`是否发送${this.isend}`)
            let that = this
            if(this.$store.state.issocket){
              if(that.isend){
                return
              }
              that.isend=true
              console.log('发送成功')
              let senddata={
                cmd:'fight',
                u_id:that.$store.state.user.userid,
                game_cfg_id:1,
                game_type:that.from
              }
              if(that.again == 1){   //好友再来一局 传对方id和一个默认值
               senddata.to_u_id=that.$store.state.vsuser.id
                senddata.play_again = 1
              }else{      //好友挑战  好友接受
                if(that.from == 1){
                  if(that.other_uid){
                    senddata.to_u_id=that.other_uid
                  }
                }
              }
              that.$socket.emit('data_chain', senddata)
            }else{
                this.$socket.emit('data_chain', {
                  cmd: 'login',
                  u_id: this.$store.state.user.userid,
                  nickname: this.$store.state.userinfo.nickName,
                  picpath: this.$store.state.userinfo.avatarUrl
                })
            }

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
                wx.switchTab({
                  url: '/pages/index/main'
                })
                that.$socket.on('global_chain', d => {
                  console.log(d)
                  if (d.cmd === 'error') {
                    if (d.errcode === 601) {
                      if (that.$store.state.modalshow) {
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
        components: {},
        computed:{
            userinfo(){
                return this.$store.state.userinfo
            },
            vsuser(){
                return this.$store.state.vsuser
            },
            isauth(){
              return this.$store.state.isauth
            }
        },
        mounted(){
          clearInterval(this.loadfn)
          this.loadfn = null
          this.loadfn=setInterval(()=>{
              this.loadconfn()
          },800)
          this.sendnews()
        },
      onLoad: function(option){
        wx.hideShareMenu()
        if(option){
          if(option.again){
            this.again=1
          }else{
//            this.$socket.emit('data_chain', {cmd:'left',u_id:this.$store.state.user.userid,game_cfg_id:1,game_type:this.from})
            this.again=0
          }
        }
        this.cleardata()
        clearTimeout(this.rout)
        this.isend=false
        console.log(option)
        if(option.id){
          this.other_uid = option.id
        }else{
          this.other_uid=''
        }
        this.from = option.from
        let that =this
        if(this.$store.state.issocket){
          this.sendnews()
        }
        that.$socket.removeAllListeners('data_chain')
        that.$socket.on('data_chain', d=>{
          console.log(d)
          if(d.cmd == 'login'){
              that.$store.commit('getsocket')
              that.sendnews()
          }else if(d.cmd == 'answer'){
            if(d.step == 1){
              that.vs=true
              if(d.other_user){
                that.$store.commit('get_vsuser',d.other_user)
              }
              if(d.content_type == 1){
                that.$store.commit('get_answer',d.details[0])
                that.$store.commit('get_step',d.step)
              }
              that.$store.commit('get_room',d.room_id)
              that.rout = setTimeout(function(){
                that.$socket.removeAllListeners('data_chain')
                that.router=1
                wx.redirectTo({
                  url:`/pages/pkanswer/main?from=${that.from}`
                })
                that.isend=false
              },1500)
            }
          }
        })
      },
      onUnload(){
          if(this.router == 0){
            clearTimeout(this.rout)
            this.$store.commit('get_vsuser',{picpath: '/static/img/user.png', nickname: '', id: ''})
            this.$store.commit('get_answer',{})
            this.$store.commit('get_step',0)
            this.$store.commit('get_room','')
            this.$socket.emit('data_chain', {cmd:'left',u_id:this.$store.state.user.userid,game_cfg_id:1,game_type:this.from})
            this.isend=false
          }
      },
      onShareAppMessage(res){
        let that =this
        if (res.from === 'menu') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        return {
          title: '@你 向你发起挑战，点击应战~',
          path: `/pages/loadpk/main?from=1&&id=${this.$store.state.user.userid}`,
          imageUrl: `${that.$store.state.url}/admin/img/friend.jpg`,
          success: (r)=>{
            console.log(r)
          },
          fail: (err)=>{
            console.log(err)
          }
        }
      }
    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    @keyframes scale {
      0% {transform:scale(2);opacity: 0}
      70% {transform:scale(.6);opacity: .8}
      100%{transform: scale(1);opacity: 1}
    }
    @keyframes my_img {
      0%{
        transform: translateX(0px);
      }
      67%{
        transform: translateX(0px)
      }
      100%{
        transform: translateX(-200px);
      }
    }
    @keyframes vs_img {
      0%{
        transform: translateX(0px);
      }
      67%{
        transform: translateX(0px)
      }
      100%{
        transform: translateX(200px);
      }
    }
  .bg{
    width: 100%;
    position: relative;
    overflow: hidden;
    height: 100%;
    .bg_img{
      width: 100%;
      height: 1246px/2;
      display: block;
    }
    .bg_box{
      width: 100%;
      height: 100%;
      position: absolute;
      top:0;
      left:0;
      z-index:1;
      .my{
        position: absolute;
        left:26px/2;
        top:158px/2;
        width: 255px/2;
        height: 255px/2;
        border-radius: 50%;
        background: #fff;
        box-sizing: border-box;
        padding: 10px/2;
        image{
          width: 237px/2;
          height: 237px/2;
          border-radius: 50%;
        }
      }
    .vsuser{
      position: absolute;
      top:540px/2;
      right:30px/2;
      width: 255px/2;
      height: 255px/2;
      border-radius: 50%;
      background: #fff;
      box-sizing: border-box;
      padding: 10px/2;
      image{
        width: 237px/2;
        height: 237px/2;
        border-radius: 50%;
      }
    }
    }
  }
  .load{
    width: 217px/2;
    height: 217px/2;
    /*animation: rotate .8s linear infinite;*/
    position: absolute;
    top:368px/2;
    left:275px/2;
    image{
      width: 100%;
      height: 100%;
    }
    p{
      width: 100%;
      font-size: 35px/2;
      color: #333;
      text-align: center;
      white-space: nowrap;
      margin-top:110px/2;
      margin-left:-40px/2;
      font-weight: bold;
    }
  }
    .vs{
      animation: scale .7s ease 1;
      width: 347px/2;
      height: 275px/2;
      top:356px/2;
      left: 203px/2;
      z-index:3;
      image{
        width: 100%;
        height: 100%;
      }
    }
    .myname{
      position: absolute;
      top:435px/2;
      width: 255px/2;
      left:26px/2;
      font-size: 36px/2;
      color: #333;
      height: 40px/2;
      white-space: nowrap;
      text-align: center;
      line-height: 40px/2;
      overflow: hidden;
      text-overflow: ellipsis;

    }
  .username{
    position: absolute;
    top:815px/2;
    width: 255px/2;
    right:30px/2;
    font-size: 36px/2;
    text-align: center;
    color: #333;
    height: 40px/2;
    white-space: nowrap;
    line-height: 40px/2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
    .btn_box{
      position: absolute;
      top:931px/2;
      width: 100%;
      z-index:5;
      left:0;
      height: 70px/2;
      padding: 0 56px/2;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      display: flex;
    button{
      width: 300px/2;
      height: 70px/2;
      border-radius: 50px;
      background: @bg_color;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size:32px/2;
      margin:0;
    }
    }
    .btn_auth{
      width: 750px/2;
      height: 100%;
      position: fixed;
      top:0;
      left:0;
      display: flex;
      align-items: center;
      z-index:99;
      justify-content: center;
      /*background: transparent;*/
      background: rgba(0,0,0,0.7);
      image{
        width: 377px/2;
        height: 360px/2;
        position: absolute;
        top:205px/2;
        left:0;
        right:0;
        margin:auto;
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
  .my_img{
    animation: my_img 1.5s ease forwards;
  }
  .vs_img{
    animation: vs_img 1.5s ease forwards;
  }
</style>
