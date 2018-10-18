<template>
    <div>
      <div class="mui-control-content mui-active friend_content">
        <ul class="box mui-table-view" id="datalist">
          <li class=" mui-table-view-cell" >
            <div class="mui-table-cell box_item">
              <div class="box_left">
                <div class="box-left_div bg_touxiang80">
                  <image src="" alt=""></image>
                </div>
                <div class="item-info">
                  <div class="name_info">
                    <p class="namefriend mui-ellipsis">新联</p>
                  </div>
                  <p class="chatDetail mui-ellipsis">啦啦啦啦啦啦啦啦啦啦啦啦</p>
                </div>
              </div>
              <div class="box_right">
                <span class="info" style="text-align: right;color:rgb(200,200,200)">2018-05-06</span>
                <span class="info" style="text-align: right;color:rgb(95,193,139);margin-top:5px;">订单号：0256879</span>
              </div>
            </div>
          </li>
          <li class=" mui-table-view-cell" >
            <div class="mui-table-cell box_item">
              <div class="box_left">
                <div class="box-left_div bg_touxiang80">
                  <image src="" alt=""></image>
                </div>
                <div class="item-info">
                  <div class="name_info">
                    <p class="namefriend mui-ellipsis">yoyo</p>
                  </div>
                  <p class="chatDetail mui-ellipsis">啦啦啦啦啦啦啦啦啦啦啦啦</p>
                </div>
              </div>
              <div class="box_right">
                <span class="info" style="text-align: right;color:rgb(200,200,200)">2018-05-06</span>
                <span class="info" style="text-align: right;color:rgb(95,193,139)">订单号：0256879</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="scrollIcon" @click="scrolltoTop" id="scrollToTop" class="footcgotop"></div>
      <div class="nogetList" v-if="nogetshow">暂无记录</div>
    </div>
</template>

<script type="javascript">
  export default{
    name: 'questionlist',
    props: [],
    data(){
      return{
        scrollTop:0,
        scrollIcon:false,
        nogetshow:false,
        isposition:true,
      }
    },
    onPullDownRefresh () {
      this.page=1;
      this.history_list=[];
      this.refresh();
      // 下拉刷新
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },
    onReachBottom () {
      this.page++;
      this.loadmore()
    },
    methods:{
      async getList() {

      },
      async refresh(){
        this.getList();
      },
      loadmore(){
        this.getList();
      },
      scrolltoTop(){
        let zhiz=this;
        if(zhiz.time){
          clearTimeout(zhiz.time);
        }
        zhiz.time=setTimeout(function(){
          zhiz.scrollIcon = false;
        },1000)
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
      },
    },
    computed:{
    },
    components:{
      confirm
    },
    onLoad: function (option) {


    },
    onUnload: function () {
      this.nogetshow = false
      this.page=1
    },
    onPageScroll:function(res){
      let top = res.scrollTop;
      if (top > 400) {
        this.scrollIcon = true;
      } else {
        this.scrollIcon = false;
      }
    },
  }
</script>
<style>
  page{ background: rgb(234,234,234); }
</style>
<style lang="less" scoped>
    @import '../../static/less/common.less';
    .friend_content{
      margin-top:10px/2;
      background:#fff;
      padding-left:25px/2;
      li{
        border-top:1px solid #e3e3e3;
        padding:12px/2 0;
      }
      li:first-child{
        border:none;
      }
    }
    .box_item{
      display: flex;
      justify-content: space-between;
    }
    .box_item image{
      display: block;
      float: left;
      width:115px/2;
      height:115px/2;
    }
    .item-info{
      text-align: left;
      margin-left: 20px/2;
    }
    .name_info{
      margin-top: 13px/2;
      height:46.875px/2;
    }
    .namefriend{
      font-size: 34px/2;
      width:328px/2;
      max-width: 354px/2;
      height:46.875px/2;
      line-height:39px/2;
      color: rgb(120,120,120);
      padding: 2px 0;
    }
    .chatDetail {
      max-width:328.125px/2;
      font-size: 28px/2;
      height: 30px/2;
      line-height: 29px/2;
      color: rgb(200,200,200);
      margin-top: 13px/2;
    }
    .phone{
      max-width: 10rem;
      font-size:468px/2;
      line-height:30px/2;
      color: rgb(200,200,200);
      margin-top:15px/2;
    }
    .box_right{
      margin-right:30px/2;
      height:108px/2;
    }
    .box_left{
      display: flex;
    }
    .mui-ellipsis{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
    }
    .info{
      max-width:290px/2;
      display: inline-block;
      font-size: 21px/2;
      color:rgb(95,193,139);
      margin-top:5px/2;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
</style>
