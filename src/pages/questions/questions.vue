<template>
  <div>
    <div class="list">
      <a v-if="!isjy" class="ui-link" :href="'/pages/questionsmain/main?pid='+item.id" v-for="item in policy_list">
        <div class="item">
          <div class="item_list mui-ellipsis"><span>联系人</span>：{{item.username}}</div>
          <div class="item_list mui-ellipsis"><span>联系电话</span>：{{item.phone}}</div>
          <div class="item_list mui-ellipsis"><span>政策类型</span>：{{item.c_name}}</div>
          <div class="item_list mui-ellipsis"><span>详细描述</span>：{{item.details}}</div>
          <div class="item_list mui-ellipsis"><span>咨询时间</span>：{{item.create_time}}</div>
        </div>
      </a>
      <a v-if="isjy" class="ui-link" :href="'/pages/questionsmain/main?pid='+item.id+'&&isjy=true'" v-for="item in policy_list">
        <div class="item">
          <div class="item_list mui-ellipsis"><span>联系人</span>：{{item.username||'无'}}</div>
          <div class="item_list mui-ellipsis"><span>联系电话</span>：{{item.phone||'无'}}</div>
          <div class="item_list mui-ellipsis"><span>详细描述</span>：{{item.details}}</div>
          <div class="item_list mui-ellipsis"><span>创建时间</span>：{{item.create_time}}</div>
          <div v-if="item.status==2" class="icon-img" ></div>

        </div>
      </a>
    </div>
    <a class="ui-link" :href="'/pages/toknow/main?isjy='+isjy">
      <div class="zc_btn"><div class="zcbtn_top">{{btnmain}}</div></div>
    </a>
    <div class="nogetList" v-if="iskong">暂无记录</div>
  </div>
</template>

<script type="javascript">
  export default {
    data () {
      return {
        btnmain:"我要咨询",
        isjy:false,
        policy_list:[],
        scrollIcon:false,
        scrollTop:0,
        iskong:false,
        page:1,
        size:6,
      }
    },
    onPullDownRefresh () {
      wx.showNavigationBarLoading();//在标题栏中显示加载
      this.page=1;
      this.policy_list=[];
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
      async getpolicyList() {
        let that = this;
        let url="";
        let data = {
          page:this.page,
          size:this.size,
          u_id:that.$store.state.user.userid,
          order:'create_time desc'
        };
        if(this.isjy){
          url='/rs/suggest';
        }else{
          url='/rs/wish_to_known';
        }
        let res = await that.$get(url,data);
        if (res.code == 200){
          that.iskong=false;
          if (res.rows.length > 0){
            that.policy_list = that.policy_list.concat(res.rows);
          }
        }else if (res.code == 602 && that.page == 1){
          that.iskong=true;
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
      this.isjy = option.isjy||false;
      if(this.isjy){
          this.btnmain="我要建议";
          wx.setNavigationBarTitle({
            title: '我要建议'
          })
      }else{
        this.btnmain="我要咨询";
      }
    },
    onShow:function(){
      this.page = 1;
      this.policy_list = [];
      this.getpolicyList()//获取数据
    },
    onUnload: function () {
      this.page = 1;
      this.policy_list = [];
      this.iskong = false;
      this.scrollIcon=false;
      this.scrollTop=0;
      this.iskong=false;
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

  .mui-ellipsis{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }
  div,p,ul,li,input{
    box-sizing:border-box;
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
  .zc_btn{
    position: fixed;
    z-index: 999;
    bottom:300/2px;
    right:30/2px;
    width: 85/2px;
    height:85/2px;
    box-sizing: border-box;
    border-radius: 50%;
    background: linear-gradient(135deg,#f4c8be 0%, #df5c3e 50% ,#b54b32 100%);
    box-shadow: 1px 1.5px 1px 1px rgba(0,0,0,.2);
    .zcbtn_top{
      position: absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      margin:auto;
      border-radius: 50%;
      background: #df5c3e;
      width: 75/2px;
      height:75/2px;
      padding: 13/2px;
      box-sizing: border-box;
      font-size: 23/2px;
      line-height: 25/2px;
      color: #fff;
      text-align: center;
    }
  }
  .list{
    padding: 24/2px 29/2px;
    .item{
      position: relative;
      background: #f6f6f6;
      padding: 15/2px 20/2px;
      border-radius: 10/2px;
      margin-bottom:20/2px;
      .icon-img{
        display:inline-block;
        width:40px;
        height:40px;
        position:absolute;
        top:14px;
        right:18px;
        background: url("../../../static/img/yicaina.png") center center no-repeat;
        background-size: 40px 40px;
      }
      .item_list{
        font-size: 28/2px;
        color: #333;
        line-height: 48/2px;
        span{
          width: 110/2px;
          display: inline-block;
        }
      }
      .itemsign{
        position: absolute;
        top:18/2px;
        right:13/2px;
        width: 55/2px;
        height:55/2px;
        &.th{
          background: url("../../../static/img/list_07.png")no-repeat center center;
          background-size:45/2px 45/2px;
        }
        &.dh{
          background: url("../../../static/img/list_10.png")no-repeat center center;
          background-size:45/2px 45/2px;
        }
      }
    }
  }
</style>
