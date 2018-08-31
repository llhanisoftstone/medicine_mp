<template>
  <div class="main">
    <div id="index_gallerySlider" class="index_gallerySlider">
      <swiper :indicator-dots="indicatorDots"
              :autoplay="true" :circular="true" :interval="3000"
              :duration="duration" indicator-color="rgba(226,226,226,1)" indicator-active-color="#ffffff">
        <block v-for="(item,i) in movies">
          <swiper-item>
              <image :src="item" class="slide-image" width="355" height="150"/>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="toplist">
      <div class="topitem" @click.stop="tonewpage('shopdetail','pid='+itemt.id)" v-for="(itemt,i_t) in top_list">
        <div class="imgk"><img :src="itemt.picpath" alt=""></div>
        <div class="item_name mui-ellipsis">{{itemt.name}}</div>
      </div>
    </div>
    <ul class="mainlist">
      <li class="item" @click.stop="tonewpage('shopdetail','pid='+items.id)" v-for="(items,i_s) in shop_list"><img :src="items.picpath" alt=""></li>
    </ul>
    <div v-if="scrollIcon" @click="scrolltoTop" id="scrollToTop" class="footcgotop"></div>
    <div class="nogetList" v-if="iskong">暂无记录</div>
  </div>
</template>

<script type="javascript">
  import mptoast from '../../components/mptoast'
  export default {
    data () {
      return {
        main:{},
        top_list:[],
        shop_list:[],
        iskong:false,
        page:1,
        size:6,
        movies:[],
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        scrollIcon:false,
        scrollTop:0,
      }
    },
    onPullDownRefresh () {
      wx.showNavigationBarLoading(); //在标题栏中显示加载
      this.page=1;
      this.shop_list=[];
      this.refresh();
      // 下拉刷新
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },
    onReachBottom () {
      this.page++;
      this.loadmore()
      // 上拉加载
    },
    methods: {
      tonewpage(urlname,data){
        wx.navigateTo({
          url:`/pages/${urlname}/main?${data}`
        })
      },
      async getshop(pid) {
        let that = this;
        let data = {
          id:this.pid,
          status:1
        };
        let res = await that.$get('/rs/store_details',data);
        if (res.code == 200){
          if (res.rows.length > 0){
            wx.setNavigationBarTitle({
              title: res.rows[0].name
            })
            let pics=res.rows[0].bannerpath.split(",");
            for(var j=0;j<pics.length;j++){
              if(pics[j].substring(0,4)!="http"){
                pics[j] = 'https://policy.lifeonway.com'+pics[j];
              }
            }
            that.movies=pics;
            that.main = res.rows[0];
            for (let i=0; i<res.classify.length; i++){
              if(res.classify[i].picpath){
                if(res.classify[i].picpath.substring(0,4)!="http"){
                  res.classify[i].picpath = 'https://policy.lifeonway.com'+res.classify[i].picpath;
                }
              }
            }
            that.top_list = res.classify.slice(0,4);
          }
        }
      },
      async getpolicyList() {
        let that = this;
        let data = {
          page:this.page,
          size:this.size,
          store_id:this.pid,
          category:2,
          order:'create_time desc'
        };
        let res = await that.$get('/rs/store_classify',data);
        if (res.code == 200){
          that.iskong=false;
          if (res.rows.length > 0){
            for (let i=0; i<res.rows.length; i++){
              if(res.rows[i].picpath){
                if(res.rows[i].picpath.substring(0,4)!="http"){
                  res.rows[i].picpath = 'https://policy.lifeonway.com'+res.rows[i].picpath;
                }
              }
            }
            that.shop_list = that.shop_list.concat(res.rows);
          }
        }else if(res.code==602 && that.page == 1){
          this.iskong=true;
        }
      },
      refresh(){
        this.page = 1;
        this.getpolicyList();
      },
      loadmore () {
        this.getpolicyList();
      },
      scrolltoTop(){
        if (wx.pageScrollTo) {
          wx.pageScrollTo({
            scrollTop: 0
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
          })
        }
      }
    },
    onLoad: function (option) {
      this.pid=option.pid;
      this.getshop(this.pid);
      this.page = 1;
      this.shop_list = [];
      this.getpolicyList()//获取数据
    },
    onPageScroll:function(res){
      let top = res.scrollTop;
      if (top > 400) {
        this.scrollIcon = true;
      } else {
        this.scrollIcon = false;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../static/less/common.less";
  div,p,ul,li,input{
    box-sizing:border-box;
  }
  .footcgotop{
    position: fixed;
    z-index: 100;
    bottom: 100px/2;
    right: 30px/2;
    width: 80px/2;
    height: 80px/2;
    background:url('../../../static/img/scrollTop.png') center no-repeat;
    background-size: 80px/2 80px/2;
  }
  .index_gallerySlider{
    width:100%;
    height:398/2px;
    swiper,swiper-item,image{
      width:100%;
      height:398/2px;
    }
  }
  .mui-ellipsis{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }
  .nogetList{
    padding-top: 290px;
    box-sizing:border-box;
    background: url(../../../static/img/konhyemain.jpg) center 100px no-repeat;
    background-size:145px 148px;
    width: 100%;
    height: 297px;
    color: #999999;
    font-size: 14px;
    text-align: center;
    margin-bottom: 50px;
  }
  .toplist{
    &:after{
      content: "";
      display: table;
      clear: both;
    }
    width: 750/2px;
    padding-left:69/2px;
    margin:0 auto;
    .topitem{
      &:not(:first-child){
        margin-left: 57/2px;
      }
      float: left;
      padding-top:49/2px;
      .imgk{
        border-radius: 50%;
        overflow: hidden;
        width: 110/2px;
        height: 110/2px;
        img{
          width: 110/2px;
          height: 110/2px;
        }
      }
      .item_name{
        text-align: center;
        font-size: 24/2px;
        color: #333;
        padding:26/2px 0 40/2px;
        width: 110/2px;
      }
    }
  }
  .mainlist{
    padding: 0 30/2px;
    .item{
      border-radius: 20/2px;
      overflow: hidden;
      width: 690/2px;
      height: 336/2px;
      margin-bottom:32/2px;
      img{
        width: 690/2px;
        height: 336/2px;
      }
    }
  }
</style>
