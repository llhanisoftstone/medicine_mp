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
      @click="confirm"
    >确认</cover-view>
  </div>
</template>

<script type="javascript">
  export default {
    data () {
      return {
        picPath:'',
      }
    },
    components: {

    },
    methods: {
      confirm(){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        });
      },
      takePhoto(){
        let that=this;
        that.$uploadImg({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['camera'],
        },function (rs) {
          let obj = JSON.parse(rs);
          that.picPath=obj[0].url;
        })
      },
      tonewpage(urlname,data){
        if(!urlname){return;}
        wx.navigateTo({
          url:`/pages/${urlname}/main?${data}`
        })
      },
    },
    computed:{
      imgUrl(){
          return this.$store.state.url;
      },
    },
    onLoad:function (option){
      var that = this;
      that.picPath='';
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
  }

</style>
