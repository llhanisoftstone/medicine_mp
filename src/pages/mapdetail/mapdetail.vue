<template>
  <div >
    <map id="map"
         :longitude="lng"
         :latitude="lat"
         :markers="markers"
         :show-location="true"
    ></map>
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
        lat: 34.27,
        lng: 108.93,

      }
    },
    components: {

    },
    methods: {


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
    height: 100vh;
  }

</style>
