<template>
  <div class="container">
    <map id="map"
         :longitude="lng"
         :latitude="lat"
         :markers="markers"
         :show-location="true"
    ></map>
    <input
      type="text"
      class="remark"
      maxlength="50"
      v-model.trim="remark"
      placeholder-style="color:#999999"
      cursor-spacing="0"
      placeholder="若定位距离偏差较大，请备注您的具体位置">
    <cover-view
      class="confirm-btn"
      @click.stop="confirm"
    >确认</cover-view>
  </div>
</template>

<script type="javascript">
  export default {
    data () {
      return {
        markers: [{
          id: 'map',
          latitude: 34.27,
          longitude: 108.93,
        }],
        lat: '',
        lng: '',
        remark:'',//备注
        confirmClick:false, //确认按钮是否被点击了
      }
    },
    components: {

    },
    methods: {
      confirm(){
        let that=this;
        if(that.confirmClick){
            return;
        }
        that.confirmClick=true;
        wx.showModal({
          title: '打卡确认',
          confirmColor:'#df5c3e',
          content: '您确定要在当前位置打卡吗？',
          success (res) {
            if (res.confirm) {
              that.recordLocation();

            } else if (res.cancel) {
              that.confirmClick=false;
            }
          }
        })
      },
      async recordLocation(){
        let that=this;
        if(that.lat=='' || that.lng==''){
          wx.showToast({
            title: '未获取到您的定位信息，请重新定位',
            icon: '',
            duration: 2000
          });
          that.confirmClick=false;
          that.getLocation();
          return;
        }
        /*let res = await that.$post('',data);
        if (res.code == 200){

        }else{
         that.confirmClick=false;

        }*/
        wx.showToast({
          title: '打卡成功',
          icon: 'success',
          duration: 2000
        });
        setTimeout(()=>{
          that.confirmClick=false;
          that.tonewpage('facecheck');
        },1800)
      },
      getLocation(){
        let that=this;
        wx.getLocation({
          type: 'wgs84',
          success: function(res) {
            that.lat = res.latitude;
            that.markers.latitude = res.latitude;
            that.lng = res.longitude;
            that.markers.longitude= res.longitude;
          },
          fail: function (fail) {
            wx.showToast({
              title: '为了帮你精确定位，请开启微信位置授权',
              icon: 'none',
              duration: 2000
            })
            setTimeout(()=>{
              wx.openSetting({
                success (res) {
                  console.log(res.authSetting)
                }
              })
            },2000)

          },
          complete:function(com){
            console.log(com)
          },
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

    },
    onLoad:function (option){
      var that = this;
      that.getLocation();
    }
  }
</script>

<style scoped lang="less">
  @import "../../static/less/common.less";
  #map{
    width:100vw;
    height: calc(100vh - 69px/2);
  }
  .container{
    position:relative;
  }
  .confirm-btn{
    position:absolute;
    bottom:147px/2;
    left:calc(50vw - 60px/2);
    width:120px/2;
    height:120px/2;
    border-radius: 50%;
    background-color: @bg_color;
    color:#fff;
    font-size: 30px/2;
    text-align: center;
    line-height: 120px/2;
  }
  .remark{
    height:69px/2;
    color:#333;
    font-size: 26px/2;
    line-height: 69px/2;
    padding-left:20px/2;
  }

</style>
