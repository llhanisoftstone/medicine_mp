<template>
  <div>
    <div class="search">
      <div class="search_icon"></div>
      <input confirm-type="search" maxlength="20" class="search-input" v-model="searchVal" placeholder="请输入标题或内容" @confirm="confirm($event)"/>
      <div class="clear" :class="{'clear_icon':clearhide}" v-on:click="clearInput"></div>
    </div>
    <div class="handbook-info">
      <div class="common-head headbook-head">
        <ul class="headbook-list">
          <li v-if="ishide" v-for="(item,i) in policy_list" :key="item.id">
            <a :href="'/pages/policydetails/main?pid='+item.id" class="item-details">
              <div class="msg-box">
                <div class="message-img">
                  <img :src="item.pic_abbr" alt="">
                </div>
                <div class="info-content">
                  <div class="message">
                  <span class="pub-name">
                      <span>{{item.title}}</span>
                  </span>
                  </div>
                  <p class="message-info mui-ellipsis-2">
                    {{item.remark}}
                  </p>
                  <div class="label-info clearfix">
                    <div class="info-left">{{item.organiz_name||" "}}</div>
                    <div class="info-right rt icon-reading">
                      <span>{{item.view_count}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="scrollIcon" @click="scrolltoTop" id="scrollToTop" class="footcgotop"></div>
    <div class="nogetList" v-if="iskong">暂无内容</div>
  </div>
</template>

<script type="javascript">
  export default {
    data () {
      return {
        policy_list:[],
        _code:'',
        orgid:'',
        _search:'',
        searchVal:'',
        scrollIcon:false,
        scrollTop:0,
        iskong:false,
        clearhide:false,
        ishide:false,
        page:1,
        size:6
      }
    },

    onPullDownRefresh () {
      wx.showNavigationBarLoading() //在标题栏中显示加载
      this.page=1;
      this.policy_list=[];
      this.refresh();
      // 下拉刷新
      wx.hideNavigationBarLoading() //完成停止加载
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
        let data = {
          page:this.page,
          size:this.size,
          order:'create_time desc',
          unique_code:this._code,
          status:2, //状态：0-草稿；1-待审核，2-上架，3-拒绝，4-下架；
        };
        if(this.orgid){
          data.organiz_id=this.orgid;
        }
        if (this._search){
            data.search = 1;
            data.searchData = this._search;
            if (this.page > 1){
              data.page = 1;
              data.size = this.page * this.size;
            }
        }
        let res = await that.$get('/rs/infomation',data);
        if (res.code == 200){
          that.iskong=false;
          that.ishide=true;
          if (res.rows.length > 0){
            for (let i=0; i<res.rows.length; i++){
              res.rows[i].view_count = that.commons.zcount(res.rows[i].view_count)
              if(!res.rows[i].pic_abbr || res.rows[i].pic_abbr==''){
                res.rows[i].pic_abbr= '/static/img/policy_default.jpg';
              }else{
                res.rows[i].pic_abbr = that.$store.state.url+res.rows[i].pic_abbr;
              }
            }
            that.policy_list = that.policy_list.concat(res.rows);
          }
        }else if (res.code == 602 && that.page == 1){
          that.iskong=true;
          that.ishide=false;
        }
      },
      confirm(e){
        this.page=1;
        this.policy_list=[];
        this._search = e.target.value;
        this.getpolicyList();
      },
      clearInput(){
        this.searchVal = '';
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
    watch:{
      searchVal(val,oldval){
        if (val.trim().length > 0){
          this.clearhide = true;
        }else{
          this.clearhide = false;
        }
      }
    },
    computed:{
        getorganizid (){
          return this.$store.state.organizcookie;
        },
    },
    onUnload: function () {
      this.searchVal = '';
      this.iskong = false;
    },
    onLoad: function (option) {
      this.page = 1;
      this._search = '';
      this._code = option.pid||"";
      if(option.org_id && option.org_id!='null') {
        this.orgid = option.org_id;
      }
      this.policy_list = [];
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
  .search{
    padding: 10px/2 12px/2;
    background-color: #f6f6f6;
  }
  .search{
    display: flex;
    .search_icon{
      width: 10%;
      background: #ffffff url('../../../static/img/zc_5.png') 14px/2 center no-repeat;
      background-size: 40px/2 40px/2;
      border-radius: 10px/2 0 0 10px/2;
    }
    input{
      width: 100%;
      color: #666666;
      font-size: 30px/2;
      height: 70px/2;
      background-color: #ffffff;
    }
    .clear_icon{
      background:url('../../../static/img/zc_6.png') center 20px/2 no-repeat;
      background-size: 30px/2 30px/2;
    }
    .clear{
      width: 10%;
      background-color: #ffffff;
      border-radius: 0 10px/2 10px/2 0;
    }
  }

  .common-head{
    line-height: 0.36rem;
    margin: 0.234667rem 0 0.257733rem 0;
    position: relative;
  }
  .headbook-list li .item-details{
    background-color: inherit;
    opacity: 1;
    position: inherit;
  }
  .headbook-head li{
    border-top: 1px solid #e2e2e2;
    padding: 0.32rem 0.288rem 0.288rem;
  }
  .headbook-head li:first-child{
    border-top: 0;
  }
  .headbook-head .msg-box{
    display: flex;
  }
  .message-img img{
    width: 1.984rem;
    height: 1.632rem;
  }
  .info-content{
    width: 5.41865rem;
    padding-left: 0.21335rem;
    overflow: hidden;
    position: relative;
  }
  .info-content .message{
    line-height: 0.32rem;
    margin-bottom: 0.192rem;
  }
  .message .pub-name{
    font-size: 0.32rem;
    line-height: 0.4rem;
    font-weight: bold;
    color: #666666;
  }
  .message .pub-name span{
    display: -webkit-box;
    overflow: hidden;
    white-space: normal!important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .info-content .message-info{
    font-size: 0.23465rem;
    line-height: 0.34165rem;
    color: #666666;
    margin-bottom: 0.24535rem;
    display: -webkit-box;
    overflow: hidden;
    white-space: normal!important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .info-content .label-info {
    padding: 0;
    position: absolute;
    bottom:-3/2px;
    width: 100%;
    left:0;
    padding-left: 0.21335rem;
    box-sizing: border-box;
  }
  .info-left{
    float: left;
    font-size: 26/2px;
    padding-left: 39/2px;
    overflow: hidden;
    white-space: nowrap;
    width:260/2px ;
    text-overflow: ellipsis;
    color: #666;
    line-height: 50/2px;
    height: 50/2px;
    background: url("../../../static/img/zcbmh.png")no-repeat 0 9/2px;
    background-size: 36/2px 33/2px;
  }
  .info-right {
    padding-left: 0.416rem;
    line-height: 0.32rem;
    float: right;
  }
  .icon-reading {
    background: url('../../../static/img/zc_4.png') no-repeat left center;
    background-size: 30px/2 18px/2;
  }
  .info-right span {
    font-size: 0.261rem;
    line-height: 0.5rem;
    color: #666666;
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
</style>
