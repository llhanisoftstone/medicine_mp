<template>
    <div class="container">
      <div class="aboutus_pic">
        <div></div>
      </div>
      <div class="aboutus_text">
        <div class="ab_title">公共政策宣传共享平台</div>
        <div class="ab_content">V1.0.0</div>
      </div>
      <div class="foot">
        <p>Copyright&copy;2018</p>
        <p>西安市人社局失业保险处指导</p>
        <p><span v-on:click="companyclick">西安藤罗网络科技有限公司</span>设计开发</p>
        <p>TEL：029-81101859</p>
      </div>
      <div class="model" v-if="seen" @click="show1()">
        <div class="aboutcompany" @click.stop="show()" ><div class="close"><div v-on:click="companyclickover" class="closebtn"></div></div><image v-on:longpress="previewImage" src="/static/img/company_img.png"></image></div>
      </div>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'aboutus',
        props: [],
        data(){
            return {
              seen:false,
              timestart:'',
              scene:'https://policy.lifeonway.com/upload/community/2018-06-06_60ba9c6ed23bd84167425d48507d3589.png',
            }
        },
        methods: {
          companyclick(){
            this.seen = true;
          },
          companyclickover(){
            this.seen = false;
          },
          show1(){
            this.seen = false;
            event.cancelBubble = true;
          },
          show(e){
            this.seen = true;
          },
          previewImage: function (e) {
            wx.previewImage({
              urls: this.scene.split(',')
              // 需要预览的图片http链接  使用split把字符串转数组。不然会报错
            })
          },
          components: {},
        },
      onLoad: function (option) {
        this.seen = false;
      }

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .aboutus_pic{
      margin-top:63px;
      width:100%;
      text-align:center;
      >div{
        margin-left:138px;
        width:99px;
        height:99px;
        background:url(../../../static/img/zhengce.png) no-repeat center center;
        background-size:cover;
      }
    }
    .aboutus_text{
      padding:0 15px;
      text-align: center;
      .ab_title{
        padding:15px 0 0 0;
        font-size:18px;
        color: #df5c3e;
        text-align: center;
      }
      .ab_content{
        margin:5px 0 0 132.5px;
        line-height:24px;
        font-size: 13px;
        color: #333;
        width:80px;
        height:24px;
        border-radius:12px;
        border:1px solid #df5c3e;
      }
    }
    .foot{
      position:absolute;
      bottom:36px;
      text-align:center;
      width:100%;
      font-size:13px;
      color: #333;
      p{
        margin:0;
        font-size: 13px;
        color:#333;
        span{
          color:#df5c3e;
        }
      }
    }
    .model{
      position:absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      text-align:center;
      background:rgba(0,0,0,0.6);
      z-index:20;
      .aboutcompany{
        position:absolute;
        top:137px;
        left:50%;
        transform:translateX(-50%);
        -webkit-transform:translateX(-50%);
        width:222px;
        height:289px;
        .close{
          position:absolute;
          right:20px;
          top:-18px;
          height:20px;
          z-index:30;
          border-left:1px solid #fff;
          .closebtn{
            position:absolute;
            top:-20px;
            right:-10px;
            width:22px;
            z-index:40;
            border-radius:50%;
            height:22px;
            background:url(../../../static/img/close.png) no-repeat center center;
            background-size:22px 22px;
          }
        }
        image{
          width:100%;
          height:100%;
        }
      }
    }
</style>
