<template>
  <div class="main">
    <div class="imgk"><img :src="logo_url" alt=""></div>
    <p class="title">{{title}}</p>
    <p class="phone">{{phone}}</p>
    <p class="address">{{address}}</p>
    <div class="codek">
      <div class="imgk">
        <canvas class="canvas_sty" canvas-id="mycanvas"/>
      </div>
    </div>
    <p class="codeinfo">验证码 : {{code}}</p>
  </div>
</template>

<script type="javascript">
  var QR = require("../../utils/qrcode.js");
  export default {
    data(){
      return {
        logo_url:'',
        title:'',
        phone:'',
        address:'',
        code:'',
        qrcode:'',
        maskHidden:true,
        imagePath:'',
        placeholder:''//默认二维码生成文本
      }
    },
    methods: {
      async getpolicyInfo(pid){
        let that = this;
        let res = await this.$get('/rs/member_ticket/'+pid);
        if (res.code == 200){
          if(res.rows[0].logo_url){
            if(res.rows[0].logo_url.substring(0,4)!="http"){
              res.rows[0].logo_url = 'https://policy.lifeonway.com'+res.rows[0].logo_url;
            }
            that.logo_url = res.rows[0].logo_url
          }else{
            that.logo_url = "/static/img/logo_moren.jpg";
          }
          that.title = res.rows[0].title
          that.phone = res.rows[0].phone
          that.address = res.rows[0].address
          that.code = res.rows[0].ticket_code
          that.createQrCode(res.rows[0].ticket_code, "mycanvas", 130, 130)
        }
      },
      createQrCode:function(url,canvasId,cavW,cavH){
        //调用插件中的draw方法，绘制二维码图片
        QR.api.draw(url,canvasId,cavW,cavH);

        setTimeout(() => { this.canvasToTempImage();},1000)

      },
      //获取临时缓存照片路径，存入data中
      canvasToTempImage:function(){
        var that = this
        wx.canvasToTempFilePath({
          canvasId: 'mycanvas',
          success: function (res) {
            var tempFilePath = res.tempFilePath
            console.log(tempFilePath)
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }
    },

    onLoad: function (option) {
      this.getpolicyInfo(option.pid)//获取数据
    },

  }
</script>

<style lang="less" scoped>
  @import '../../static/less/common.less';
  .main{
    text-align: center;
    padding: 80px/2 20px/2;
  }
  .imgk{
    width: 320px/2;
    height:197px/2;
    margin:0 auto;
    img{
      width: 320px/2;
      height:197px/2;
    }
  }
  .title{
    padding-top: 35px/2;
    font-size: 40px/2;
    color:#333;
  }
  .phone{
    font-size: 30px/2;
    color:#333;
    padding-top: 29px/2;
  }
  .address{
    font-size: 30px/2;
    padding: 26px/2 20px/2 0;
  }
  .codek{
    width: 305px/2;
    height:305px/2;
    border:1px solid #e2e2e2;
    margin: 56px/2 auto 0;
    padding-top:22px/2;
    box-sizing: border-box;
    .imgk{
      margin:0 auto;
      width: 261px/2;
      height:261px/2;
      img{
        width: 261px/2;
        height:261px/2;
      }
    }
  }
  .codeinfo{
    font-size: 34px/2;
    color:#333;
    padding-top: 80px/2;
  }
  .canvas_sty{
    width: 261px/2;
    height: 261px/2;
    background-size: 261px/2 261px/2;
  }
</style>
