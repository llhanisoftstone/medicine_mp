<template>
  <div class="container">
    <!--<image-->
      <!--class="face_bg"-->
      <!--src="/static/img/facecheck.png"-->
    <!--&gt;</image>-->
    <camera
      device-position="front"
      flash="auto"
      class="camera"
      @error="error"
      ></camera>
    <cover-view class="tips-big">请保持正脸在取景框内</cover-view>
    <cover-view class="tips-small">请垂直握紧手机</cover-view>
    <cover-view
      class="confirm-btn"
      @click="takePhoto"
    >下一步</cover-view>
  </div>
</template>

<script type="javascript">
  export default {
    data () {
      return {
        src:'',
      }
    },
    components: {

    },
    methods: {
      takePhoto() {
        let that=this;
        that.recordPhoto(); //待放开
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
          quality: 'high',
          success: (res) => {
            that.src=res.tempImagePath;
            that.recordPhoto();
          }
        })
      },
      recordPhoto(){
        let that=this;
        wx.showToast({
          title: '人脸识别成功',
          icon: 'success',
          duration: 2000
        });
        setTimeout(()=>{
          that.tonewpage('takephoto');
        },1800)
      },
      error(e) { //用户不允许使用摄像头时触发

        console.log(e.detail)
      },

      tonewpage(urlname,data){
        if(!urlname){return;}
        wx.navigateTo({
          url:`/pages/${urlname}/main?${data}`
        })
      },
    },
    computed:{

    },
    onLoad:function (option){
      var that = this;

    }
  }
</script>
<style>
  page{
    background-color: #EAE9E9;
  }
</style>
<style scoped lang="less">
  @import "../../static/less/common.less";
  .container{
    position:relative;
  }
  .camera{
    width:100vw;
    height:calc(100vh - 330px/2);
  }
  .confirm-btn{
    width:120px/2;
    height:120px/2;
    margin:0 auto;
    border-radius: 50%;
    background-color: @bg_color;
    color:#fff;
    font-size: 30px/2;
    text-align: center;
    line-height: 120px/2;
  }
  .tips-big{
    font-size: 50px/2;
    color:#333333;
    text-align: center;
    margin:20px/2 0 32px/2 0;
  }
  .tips-small{
    font-size: 33px/2;
    color:#333333;
    text-align: center;
    margin-bottom: 46px/2;
  }
  .face_bg{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    max-width: 100%;
  }
</style>
