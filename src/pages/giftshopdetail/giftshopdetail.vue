<template>
  <div class="main">
    <div class="imgk"><img :src="piclogo" alt=""></div>
    <p class="title">{{name}}</p>
    <p class="s_name">{{store_name}}</p>
    <p class="phone" v-if="phone != ''" @click="dialing(phone)"><image src="/static/img/tel_icon.png" class="tel_icon"></image>{{phone}}</p>
    <p class="address">{{province}}{{city}}{{area}}{{address}}</p>
    <div class="codek">
      <div class="imgkqrcode">
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
        piclogo:'',
        name:'',
        store_name:'',
        phone:'',
        address:'',
        province:'',
        city:'',
        area:'',
        code:'',
        qrcode:'',
        maskHidden:true,
        imagePath:'',
        placeholder:'',//默认二维码生成文本
        bili:1,
      }
    },
    methods: {
      async getpolicyInfo(pid){
        let that = this;
        let res = await this.$get('/rs/member_ticket/'+pid);
        if (res.code == 200){
          if(res.rows[0].piclogo){
            if(res.rows[0].piclogo.substring(0,4)!="http"){
              res.rows[0].piclogo = that.$store.state.url+res.rows[0].piclogo;
            }
            that.piclogo = res.rows[0].piclogo
          }else{
            that.piclogo = "/static/img/ticketshop_default.jpg";
          }
          that.name = res.rows[0].name
          that.store_name = res.rows[0].store_name
          that.phone = res.rows[0].phone
          that.address = res.rows[0].address
          that.province = res.rows[0].province
          that.city = res.rows[0].city
          that.area = res.rows[0].area
          that.code = res.rows[0].ticket_code
          wx.createSelectorQuery().select('.main').boundingClientRect(function (rect) {
            if(rect){
              that.bili=rect.width/(750/2)
              that.createQrCode(res.rows[0].ticket_code, "mycanvas", 170*that.bili, 170*that.bili)
            }
          }).exec();
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
      },
      dialing(e){
        wx.makePhoneCall({
          phoneNumber: e, //此号码并非真实电话号码，仅用于测试
          success:function(){
            console.log("拨打电话成功！")
          },
          fail:function(){
            console.log("拨打电话失败！")
          }
        })
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
    width: 220px/2;
    height:220px/2;
    margin:0 auto;
    img{
      width: 220px/2;
      height:220px/2;
      border-radius: 50%;
    }
  }
  .title{
    padding-top: 35px/2;
    font-size: 40px/2;
    color:#333;
  }
  .s_name{
    padding-top: 15px/2;
    font-size: 30px/2;
    color:#333;
  }
  .phone{
    font-size: 30px/2;
    color:#333;
    padding-top: 29px/2;
    position: relative;
    margin-left: 45px/2;
    .tel_icon{
      width: 40px/2;
      height: 40px/2;
      background-size: 40px/2 40px/2;
      position: absolute;
      top: 30px/2;
      left: 190px/2;
    }
  }
  .address{
    font-size: 30px/2;
    padding: 26px/2 20px/2 0;
  }
  .codek{
    width: 350px/2;
    height:350px/2;
    margin: 56px/2 auto 0;
    padding-top:22px/2;
    box-sizing: border-box;
    .imgkqrcode{
      margin:0 auto;
    }
  }
  .codeinfo{
    font-size: 34px/2;
    color:#333;
    padding-top: 80px/2;
  }
  .canvas_sty{
    width: 340px/2;
    height: 340px/2;
    background-size: 340px/2 340px/2;
  }
</style>
