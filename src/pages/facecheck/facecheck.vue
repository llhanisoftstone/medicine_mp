<template>
  <div class="container">
    <camera
      device-position="front"
      flash="auto"
      class="camera"
      @error="error"
      >
      <cover-image
        class="face_bg"
        src="/static/img/facecheck.png"
      ></cover-image>
      <cover-view class="btns-box">
        <cover-view class="tips-big">请保持正脸在取景框内</cover-view>
        <cover-view class="tips-small">请垂直握紧手机</cover-view>
        <cover-view
          class="confirm-btn"
          @click="takePhoto"
        >下一步</cover-view>
      </cover-view>
    </camera>
  </div>
</template>
<script type="javascript">
  export default {
    data () {
      return {
        src:'',        //人脸识别照片路径
        act_id:'',     //活动id
        name: '',        //姓名
        card_num: '',    //身份证
        comp_id: '',     //企业ID
      }
    },
    components: {

    },
    methods: {
      takePhoto() {
        let that=this;
        wx.showLoading({
          title: '人脸识别中',
          mask:true,
        })
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
          quality: 'high',
          success: (res) => {
            that.uploadfile(res.tempImagePath,(rs)=>{
              var obj = JSON.parse(rs);
              console.log(obj)
              if(obj[0].code==200){
                that.src=obj[0].url;
                that.recordPhoto(obj[0].url);
              }
            })
          },
          fail:(err)=>{
              console.log(err)
          },
        })
      },
      async recordPhoto(src){
        let that=this;
        let data={
          image:that.$store.state.url+src,
          name: that.name,               //姓名
          card_num: that.card_num,       //身份证
          comp_id: that.comp_id,         //企业ID
        };
        let res = await that.$post('/rs/face_detect', data);
        console.log(res)
//        if(res.code==200){
          wx.hideLoading()
//          let score=res.res.result.user_list[0].score;
//          if(score>=80){
            let singobj={
              member_pic:that.src,
//              face_result:res.res.error_code,
//              face_json:res.res,
            };

            that.$store.commit('setSignData',singobj);
            wx.showToast({
              title: '人脸识别成功',
              icon: 'success',
              duration: 2000
            });
            setTimeout(()=>{
              that.tonewpage('takephoto','act_id='+that.act_id+'&type=1');
            },1800)
//          }
//        }
//        else{
//          wx.hideLoading()
//          wx.showToast({
//            title: '人脸识别失败',
//            icon: 'none',
//            duration: 2000
//          });
//        }
      },
      async getUserInfo(){
        let that=this;
        let data={
          u_id:that.$store.state.user.userid,
        };
        let res = await that.$get('/rs/enter_staff', data);
        if(res.code==200){
          that.name=res.rows[0].name;
          that.card_num=res.rows[0].card_num;
          that.comp_id=res.rows[0].comp_id;
        }
      },
      error(e) { //用户不允许使用摄像头时触发
        console.log(e.detail)
        wx.showModal({
          title: '温馨提示',
          showCancel:false,
          confirmColor:'#df5c3e',
          content: '请开启使用摄像头权限',
          success (res) {
            if (res.confirm) {
              wx.openSetting({
                success (res) {
                  console.log(res)
                  //authSetting:scope.camera:false

                }
              })

            }
          }
        })

      },

      tonewpage(urlname,data){
        if(!urlname){return;}
        wx.navigateTo({
          url:`/pages/${urlname}/main?${data}`
        })
      },
      uploadfile (pic,callback) {
        let that=this;
        wx.uploadFile({
          url: `${that.$store.state.url}/op/upload`,
          filePath: pic,
          formData: {'upType': 'titlePic'},
          name: 'file',
          success: (res) => {
            callback(res.data)
          },
          fail: (err) => {
            console.log(err)
          }
        })
      },
    },
    computed:{

    },
    onShow(){
        //this.error(); //检查用户是否开启摄像头权限
    },
    onLoad:function (option){
      var that = this;
      that.getUserInfo();
      that.act_id=option.act_id;
      that.src='';
      that.name='';
      that.card_num='';
      that.comp_id='';
//      console.log(that.$store.state.signdata)
//      console.log(that.$store.state.user)
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
    /*height:calc(100vh - 330px/2);*/
    height:100vh;
    position:relative;
  }
  .btns-box{
    position: absolute;
    bottom:77px/2;
    width:750px/2;

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
    z-index:999;
  }
  .tips-big{
    font-size: 50px/2;
    color:#333333;
    text-align: center;
    margin:20px/2 0 32px/2 0;
    z-index:999;
  }
  .tips-small{
    font-size: 33px/2;
    color:#333333;
    text-align: center;
    margin-bottom: 46px/2;
    z-index:999;
  }
  .face_bg{
    position: absolute;
    bottom:0;
    left:0;
    z-index:100;
    width:100%;
    max-width: 100%;
    height:1046px/2;
  }
</style>
