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
  import QQMapWX from '../../../static/js/qqmap-wx-jssdk.min.js'
  export default {
    data () {
      return {
        markers: [{
          latitude: 34.264860,
          longitude: 108.954240,
          callout:{
            content:'培训地点',
            display:'ALWAYS',
            textAlign:'center',
            padding:'5',
            bgColor:'#d8d8d8',
            color:'#333333',
            fontSize:'14',
            borderRadius:'10',
          },
        }],
        act_id:'',     //活动id
        lat: 34.264860,     //打卡者定位
        lng: 108.954240,     //打卡者定位
        province:'', //省
        city:'',     //市
        zone:'',     //区
        address:'',  //详细地址
        remark:'',   //备注
        confirmClick:false, //确认按钮是否被点击了
        qqmapsdk:null,
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
        }
        else{
          let singobj={
            longitude:that.lng,
            latitude:that.lat,
            province:that.province,
            city:that.city,
            zone:that.zone,
            address:that.address,
          };
          if(that.remark){
            singobj.remark=that.remark;
          }
          that.$store.commit('setSignData',singobj);
          wx.showToast({
            title: '打卡成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout(()=>{
            that.confirmClick=false;
            that.tonewpage('facecheck','act_id='+that.act_id);
          },1800)
        }
      },
      async getActivity(){//获取活动定位信息
          let that=this;
          let data={
              id:that.act_id
          };
          let res = await that.$get('/rs/activity', data);
          if(res.code==200){
            that.markers[0].latitude = res.rows[0].latitude;
            that.markers[0].longitude= res.rows[0].longitude;
            that.markers[0].callout.content= res.rows[0].address;
          }
          console.log(that.markers)
      },
      getLocation(){
        let that=this;
        wx.getLocation({
          type: 'wgs84',
          success: function(res) {
            that.lat = res.latitude;
            that.lng = res.longitude;
            //解析地址
            that.reverseLocation(res.latitude,res.longitude,(location)=>{
              let address=location.result.address_component
              console.log(location)
              that.province=address.province
              that.city=address.city
              that.zone=address.district
              that.address=address.street_number || address.street
            })
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
      //解析地址
      reverseLocation(lat,lng,callback){
        let that=this;
        that.qqmapsdk.reverseGeocoder({
          location: {
            latitude: lat,
            longitude: lng
          },
          success: function(res) {
            callback(res);
          },
          fail: function(res) {

            callback(res);
          },
          complete: function(res) {

            callback(res);
          }
        });
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
    onShow(){
      this.getLocation();
    },
    onLoad:function (option){
      var that = this;
      that.act_id=option.act_id;
      // 实例化腾讯地图API核心类
      that.qqmapsdk = new QQMapWX({
        key: 'CVBBZ-XGG6O-VDZWN-SSR3T-U5SDH-LNBGQ'
      });
        that.lat=''
        that.lng= ''
        that.province=''
        that.city=''
        that.zone=''
        that.address=''
        that.remark=''
      that.getActivity();
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
