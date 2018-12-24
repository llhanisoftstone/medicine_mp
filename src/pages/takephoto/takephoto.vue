<template>
  <div class="container">
    <div
      @click="takePhoto"
      class="img-box">
      <image
        mode="aspectFill"
        v-if="picPath"
        :src="imgUrl+picPath"></image>
      <image
        v-else=""
        src="/static/img/scene_photo.jpg"></image>
    </div>
    <cover-view
      class="confirm-btn"
      :class="{'btnDisabled':btnDisabled}"
      @click="submitSignData"
    >确认</cover-view>
  </div>
</template>

<script type="javascript">
  export default {
    data () {
      return {
        picPath:'',
        act_id:'',     //活动id
        pics:[],    //现场照
        type:1,     //type=1,第一次上传现场照， type=2  多次上传现场照片
        name: '',        //姓名
        card_num: '',    //身份证
        comp_id: '',     //企业ID
        btnDisabled:true  //按钮是否可以点击
      }
    },
    components: {

    },
    methods: {
      submitSignData(){
          let that=this;
          if(that.btnDisabled){
              return;
          }
        wx.showLoading({
          title: '提交中',
          mask:true,
        })
          if(that.type==1){
             that.confirm();
        }
        if(that.type==2){
            that.submitPicture();
        }
      },
      async submitPicture(){
        let that=this;
        let data={
          act_id :that.act_id,
          scene_pic:that.picPath
        };
        let res = await that.$post('/rs/activity_scence_pic', data);
        if(res.code==200){
          wx.hideLoading()
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout(()=>{
            wx.switchTab({
              url: '/pages/traininglist/main'
            })
          },1800)
        }else{
          wx.hideLoading()
          wx.showToast({
            title: '提交失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      async confirm(){
        let that=this;
        let data=that.$store.state.signdata
        data.act_id=that.act_id;
        data.pics=that.pics;
        //data.u_id=that.$store.state.user.userid
        console.log(data)
        let res = await that.$post('/rs/activity_record', data);
        if(res.code==200){
          wx.hideLoading()
          wx.showToast({
            title: '签到成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout(()=>{
            wx.switchTab({
              url: '/pages/traininglist/main'
            })
          },1800)
        }else{
          wx.hideLoading()
          wx.showToast({
            title: '提交失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      takePhoto(){
        let that=this;
        that.pics=[];
        that.$uploadImg({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['camera'],
        },function (rs) {
          let obj = JSON.parse(rs);
          that.picPath=obj[0].url;
          that.recordPhoto(obj[0].url,(res)=>{
              console.log(res)
              if(res.success){
                that.pics.push({'scene_pic':obj[0].url});
                that.btnDisabled=false;
              }else{
                that.btnDisabled=true;
                wx.showToast({
                  title: '现场照片必须要有您本人哦',
                  icon: 'none',
                  duration: 4000
                });
              }
          });
        })
      },
      //人脸识别
      async recordPhoto(src,callback){
        let that=this;
        let data={
          image:that.$store.state.url+src,
          name: that.name,               //姓名
          card_num: that.card_num,       //身份证
          comp_id: that.comp_id,         //企业ID
        };
        let res = await that.$post('/rs/face_detect', data);
        console.log(res)
        if(res.code==200){
          wx.hideLoading()
          let score=res.res.result.score;
          if(score>=80){
            callback({
              success:true
            })
          }else{
            callback({
              success:false
            })
          }
        }else{
          wx.hideLoading()
          callback({
            success:false
          })
//          wx.showToast({
//            title: '人脸识别失败',
//            icon: 'none',
//            duration: 2000
//          });
        }
      },
      tonewpage(urlname,data){
        if(!urlname){return;}
        wx.navigateTo({
          url:`/pages/${urlname}/main?${data}`
        })
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
    },
    computed:{
      imgUrl(){
          return this.$store.state.url;
      },
    },
    onLoad:function (option){
      var that = this;
      that.getUserInfo();
      that.act_id=option.act_id;
      that.type=option.type;
      that.picPath='';
      that.pics=[];
      that.name='';
      that.card_num='';
      that.comp_id='';
      console.log(that.$store.state.signdata)
    }
  }
</script>
<style scoped lang="less">
  @import "../../static/less/common.less";
  .container{
    position:relative;
  }
  .img-box{
    width:520px/2;
    //height:752px/2;
    border:4px/2 solid @bg_color;
    margin:86px/2 auto 0;
    text-align: center;
    padding:17px/2 0;
    image{
      width:487px/2;
      height:717px/2;
      border:2px/2 solid @bg_color;
      vertical-align: bottom;
    }
  }

  .confirm-btn{
    text-align: center;
    width:538px/2;
    height:70px/2;
    border-radius: 40px/2;
    font-size: 32px/2;
    color:#fff;
    background-color: #dd5d44;
    line-height: 70px/2;
    margin:207px/2 auto 132px/2;
    &.btnDisabled{
      background-color: @color_e2;
    }
  }

</style>
