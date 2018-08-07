<template>
    <div>
      <div class="box">
        <image src="/static/img/bgchengjidan.jpg" class="img_bg"></image>
        <div class="user_box">
          <image :src="userinfo.avatarUrl" class="user_img"></image>
          <h2 class="username">{{userinfo.nickName}}</h2>
          <h4 class="grade">游学四方</h4>
          <div class="subject">
            <p>8/12</p>
            <p>12</p>
            <p>100%</p>
          </div>
          <div class="btn_box">
            <button>分享给好友</button>
            <a @click="canvas">保存到相册</a>
          </div>
        </div>
      </div>
      <canvas canvas-id="report"></canvas>
    </div>
</template>

<script type="javascript">
    export default {
        data(){
            return {
                width:0
            }
        },
        methods: {
            saveImg(){},
            canvas(){
              let that = this
              const ctx = wx.createCanvasContext('report')
              ctx.drawImage('../../static/img/bgchengjidan.jpg', 0, 0, that.width, 1247*that.width/750)
              ctx.arc((282*that.width/750)+(186*that.width/1500), (92*that.width/750)+(186*that.width/1500), 186*that.width/1500, 0, 2*Math.PI)
              ctx.save()
              ctx.clip()
              ctx.drawImage(that.$store.state.userinfo.avatarUrl, 282*that.width/750, 92*that.width/750, 186*that.width/750, 186*that.width/750)
              ctx.restore()
              ctx.setFontSize(35*that.width/750)
              ctx.setFillStyle('#333333')
              ctx.setTextAlign('center')
              ctx.setTextBaseline('top')
              ctx.fillText(that.$store.state.userinfo.nickName, 375*that.width/750, 399*this.width/750)
              ctx.setFontSize(28*that.width/750)
              ctx.setFillStyle('#666666')
              ctx.setTextAlign('center')
              ctx.setTextBaseline('top')
              ctx.fillText('游学四方', 375*that.width/750, 450*this.width/750)
              ctx.setFontSize(37*that.width/750)
              ctx.setFillStyle('#ffffff')
              ctx.setTextAlign('center')
              ctx.setTextBaseline('top')
              ctx.fillText('8/12', 180*that.width/750, 571*this.width/750)
              ctx.fillText('12', 375*that.width/750, 571*this.width/750)
              ctx.fillText('80%', 570*that.width/750, 571*this.width/750)
              ctx.draw()

            }
        },
        components: {},
        computed:{
          userinfo(){
              return this.$store.state.userinfo
          }
        },
      onLoad:function(){
        let that = this
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
    }
</style>
