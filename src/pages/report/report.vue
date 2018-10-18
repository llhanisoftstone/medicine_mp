<template>
    <div>
      <div class="box">
        <image src="/static/img/bgchengjidan.jpg" class="img_bg"></image>
        <div class="user_box">
          <image :src="records.avatar_url" class="user_img"></image>
          <h2 class="username">{{records.nickname}}</h2>
          <h4 class="grade">{{records.rank_name}}</h4>
          <div class="subject">
            <p>{{records.right_step}}/{{records.max_step}}</p>
            <p>{{records.times}}</p>
            <p>{{records.percentage}}</p>
          </div>
          <div class="btn_box" v-if="isusershow">
            <button open-type="share">分享给好友</button>
            <a @click="canvase">保存到相册</a>
          </div>
          <div class="btn_box" v-if="!isusershow">
            <!--<a @click="backindex">返回首页</a>-->
            <a @click="backindex">我来挑战</a>
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
                room_id:'',
                u_id:'',
                records:{},
                isusershow:true
            }
        },
        methods: {
            canvase(){
              let thiz = this
              thiz.isshow=true
              const ctx = wx.createCanvasContext('report')
              ctx.drawImage('../../static/img/bgchengjidanbc.jpg', 0, 0, thiz.width, 1247*thiz.width/750)
              ctx.setFontSize(35*thiz.width/750)
              ctx.setFillStyle('#333333')
              ctx.setTextAlign('center')
              ctx.setTextBaseline('top')
              ctx.fillText(thiz.records.nickname, 375*thiz.width/750, 399*thiz.width/750)
              ctx.setFontSize(28*thiz.width/750)
              ctx.setFillStyle('#666666')
              ctx.setTextAlign('center')
              ctx.setTextBaseline('top')
              ctx.fillText(thiz.records.rank_name, 375*thiz.width/750, 450*thiz.width/750)
              ctx.setFontSize(37*thiz.width/750)
              ctx.setFillStyle('#ffffff')
              ctx.setTextAlign('center')
              ctx.setTextBaseline('top')
              ctx.fillText(`${thiz.records.right_step}/${thiz.records.max_step}`, 180*thiz.width/750, 585*thiz.width/750)//571=>585
              ctx.fillText(thiz.records.times, 375*thiz.width/750, 585*thiz.width/750)
              ctx.fillText(thiz.records.percentage, 570*thiz.width/750, 585*thiz.width/750)
              wx.downloadFile({
                url: thiz.records.avatar_url,
                success: function(res) {
                  // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                  if (res.statusCode === 200) {
                    ctx.arc((282*thiz.width/750)+(186*thiz.width/1500), (92*thiz.width/750)+(186*thiz.width/1500), 186*thiz.width/1500, 0, 2*Math.PI)
                    ctx.save()
                    ctx.clip()
                    ctx.drawImage(res.tempFilePath, 282*thiz.width/750, 92*thiz.width/750, 186*thiz.width/750, 186*thiz.width/750)
                    ctx.restore()
                    ctx.draw(false,function(){
                      wx.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        canvasId: 'report',
                        success: function(res) {
//                          console.log(res.tempFilePath)
                          wx.saveImageToPhotosAlbum({
                            filePath:res.tempFilePath,
                            success(result){
//                              console.log(result)
                              wx.showToast({
                                title: '保存成功',
                                icon: 'succes',
                                duration: 1000,
                                mask:true
                              })
                              thiz.isshow=false
                            },
                            fail: function (res) {
                              console.log(res)
                              if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                                console.log("打开设置窗口");
                                wx.openSetting({
                                  success(settingdata) {
                                    console.log(settingdata)
                                    if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                                      console.log("获取权限成功，再次点击图片保存到相册")
                                    } else {
                                      console.log("获取权限失败")
                                    }
                                  }
                                })
                              }
                            }
                          })
                        }
                      })
                    })
                  }
                }
              })
            },
            async getrecord(){
              let thiz = this
              let record = await thiz.$get('/rs/game_record',{room_id:thiz.room_id,u_id:thiz.u_id})
//                if(thiz.$store.state.user.userid == thiz.u_id){
                if(thiz.$store.state.user.userid == thiz.u_id){
                  thiz.isusershow=true
                }else{
                  thiz.isusershow=false
                }
                if(record.code == 200){
                  if(record.records.times<60){
                    record.records.times =  `${record.records.times%60}`
                  }else{
                    if(record.records.times%60<10){
                      record.records.times = `${Math.floor(record.records.times/60)}:0${record.records.times%60}`
                    }else{
                      record.records.times = `${Math.floor(record.records.times/60)}:${record.records.times%60}`
                    }
                  }
                  thiz.records=record.records
                }
            },
            backindex(){
              wx.switchTab({
                url: '/pages/index/main'
              })
            }
        },
      onLoad:function(option){
        let thiz = this;
        thiz.category_id=option.category_id
        thiz.room_id=option.room_id
        thiz.u_id=option.u_id
        thiz.getrecord()
        wx.getSystemInfo({
          success: function(res) {
            thiz.width = res.windowWidth
          }
        })
      },
      onShareAppMessage(res){
        let thiz = this;
        let title='@你 记录在此，谁来挑战！！！';
//        let url=`/pages/authfight/main?`+`pages=loadpk&&from=1&&id=${this.$store.state.user.userid}`;
        let url=`/pages/report/main?room_id=${thiz.room_id}&u_id=${thiz.u_id}&category_id=${thiz.category_id}`;
        if (res.from === 'menu') {
          // 来自页面内转发按钮
          title='边玩边学，游戏学习两不误！';
//        img=`${that.$store.state.url}/admin/img/1.jpg`;
          url=`/pages/report/main?room_id=${thiz.room_id}&u_id=${thiz.u_id}&category_id=${thiz.category_id}`;
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
          padding: 0 16%;
          margin-top: 113px/2;//96
          display: flex;
          align-items: center;
          justify-content: space-between;
          p{
            font-size: 37px/2;
            color: #fff;
            line-height: 37px/2;
            width: 23.7%;
            text-align: center;
          }
        }
        .btn_box{
          margin-top:490px/2;
          width: 100%;
          box-sizing: border-box;
          padding: 0 8%;
          height: 70px/2;
          display: flex;
          align-items: center;
          justify-content: space-around;
          button{
            width: 48%;
            height: 70px/2;
            border-radius: 50px/2;
            background: #df5c3e;
            color: #fff;
            display: flex;
            font-size: 32px/2;
            align-items: center;
            justify-content: center;
            margin:0;
            padding: 0;
            &:after{
              border:none;
            }
          }
          a{
            width: 48%;
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
      left:-1000px;
    }
</style>
