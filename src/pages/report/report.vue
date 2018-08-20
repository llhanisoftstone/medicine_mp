<template>
    <div>
      <div class="box">
        <image src="/static/img/bgchengjidan.jpg" class="img_bg"></image>
        <div class="user_box">
          <image :src="userinfo.avatarUrl" class="user_img"></image>
          <h2 class="username">{{userinfo.nickName}}</h2>
          <h4 class="grade">{{user.rank_name}}</h4>
          <div class="subject">
            <p>{{rightTitle}}/{{max_nub}}</p>
            <p>{{useTime}}</p>
            <p>{{percentage}}</p>
          </div>
          <div class="btn_box">
            <button open-type="share">分享给好友</button>
            <a @click="canvas">保存到相册</a>
          </div>
        </div>
      </div>
      <canvas canvas-id="report" v-if="isshow"></canvas>
    </div>
</template>

<script type="javascript">
    export default {
        data(){
            return {
                width:0,
                isshow:false,
                percentage:"0%"
            }
        },
        methods: {
            canvas(){
              let that = this
              that.isshow=true
              const ctx = wx.createCanvasContext('report')
              ctx.drawImage('../../static/img/bgchengjidan.jpg', 0, 0, that.width, 1247*that.width/750)
              ctx.setFontSize(35*that.width/750)
              ctx.setFillStyle('#333333')
              ctx.setTextAlign('center')
              ctx.setTextBaseline('top')
              ctx.fillText(that.$store.state.userinfo.nickName, 375*that.width/750, 399*this.width/750)
              ctx.setFontSize(28*that.width/750)
              ctx.setFillStyle('#666666')
              ctx.setTextAlign('center')
              ctx.setTextBaseline('top')
              ctx.fillText(that.user.rank_name, 375*that.width/750, 450*this.width/750)
              ctx.setFontSize(37*that.width/750)
              ctx.setFillStyle('#ffffff')
              ctx.setTextAlign('center')
              ctx.setTextBaseline('top')
              ctx.fillText(`${that.rightTitle}/${that.max_nub}`, 180*that.width/750, 571*this.width/750)
              ctx.fillText(that.useTime, 375*that.width/750, 571*this.width/750)
              ctx.fillText(that.percentage, 570*that.width/750, 571*this.width/750)


              wx.downloadFile({
                url: that.$store.state.userinfo.avatarUrl, //仅为示例，并非真实的资源
                success: function(res) {
                  // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                  if (res.statusCode === 200) {
                    ctx.arc((282*that.width/750)+(186*that.width/1500), (92*that.width/750)+(186*that.width/1500), 186*that.width/1500, 0, 2*Math.PI)
                    ctx.save()
                    ctx.clip()
                    ctx.drawImage(res.tempFilePath, 282*that.width/750, 92*that.width/750, 186*that.width/750, 186*that.width/750)
                    ctx.restore()
                    ctx.draw(false,function(){
                      wx.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        canvasId: 'report',
                        success: function(res) {
                          console.log(res.tempFilePath)
                          wx.saveImageToPhotosAlbum({
                            filePath:res.tempFilePath,
                            success(result){
                              console.log(result)
                              that.isshow=false
                            }
                          })
                        }
                      })
                    })
                  }
                }
              })
            }
        },
        components: {},
        computed:{
          userinfo(){
              return this.$store.state.userinfo
          },
          user(){
              return this.$store.state.user
          },
          max_nub(){
              return this.$store.state.allTitle
          },
          rightTitle(){
              return this.$store.state.rightTitle
          },
          useTime(){
              return Math.ceil(this.$store.state.useTime/60)
          }
        },
      onLoad:function(){
        let that = this;
        this.percentage=Math.floor(95+Math.random()*5)+"%";
        wx.getSystemInfo({
          success: function(res) {
//            console.log(res.model)
//            console.log(res.pixelRatio)
            that.width = res.windowWidth
//            console.log(res.windowHeight)
//            console.log(res.language)
//            console.log(res.version)
//            console.log(res.platform)
          }
        })
      },
      onShareAppMessage(res){
        let that = this;
        let title='@你 记录在此，谁来挑战！！！';
//        let url=`/pages/authfight/main?`+`pages=loadpk&&from=1&&id=${this.$store.state.user.userid}`;
        let url="/pages/index/main";
        if (res.from === 'menu') {
          // 来自页面内转发按钮
          title='边玩边学，游戏学习两不误！';
//        img=`${that.$store.state.url}/admin/img/1.jpg`;
          url="/pages/index/main";
        }
        return {
          title: title,
          path: url,
          success: (r)=>{
            console.log(r);
//            wx.navigateTo({
//              url:"/pages/loadpk/main?from=1"
//            })
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
    .box{
      width: 100%;
      height: auto;
      position: relative;
      .img_bg{
        width: 100%;
        height: 1247px/2;
      }
      .user_box{
        width: 100%;
        height: 1247px/2;
        position: absolute;
        top:0;
        left:0;
        z-index:3;
        .user_img{
          margin:0 auto;
          margin-top: 92px/2;
          width: 186px/2;
          height: 186px/2;
          display: block;
          border-radius: 50%;
        }
        .username{
          margin-top:121px/2;
          color: #333;
          font-size: 35px/2;
          line-height: 35px/2;
          height: 35px/2;
          text-align: center;
        }
        .grade{
          margin-top: 16px/2;
          color: #666;
          font-size: 28px/2;
          line-height: 28px/2;
          height: 28px/2;
          text-align: center;
        }
        .subject{
          width: 100%;
          height: 37px/2;
          box-sizing: border-box;
          padding: 0 120px/2;
          margin-top: 96px/2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          p{
            font-size: 37px/2;
            color: #fff;
            line-height: 37px/2;
            width: 121px/2;
            text-align: center;
          }
        }
        .btn_box{
          margin-top:466px/2;
          width: 100%;
          box-sizing: border-box;
          padding: 0 65px/2;
          height: 70px/2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          button{
            width: 300px/2;
            height: 70px/2;
            border-radius: 50px/2;
            background: #df5c3e;
            color: #fff;
            display: flex;
            font-size: 32px/2;
            align-items: center;
            justify-content: center;
            &:after{
              border:none;
            }
          }
          a{
            width: 300px/2;
            height: 70px/2;
            border-radius: 50px/2;
            background: #df5c3e;
            color: #fff;
            display: flex;
            font-size: 32px/2;
            align-items: center;
            justify-content: center;
          }
        }
      }

    }
    canvas{
      width: 750px/2;
      height: 1247px/2;
      z-index: -1;
      position: fixed;
      top:0;
      left:0;
    }
</style>
