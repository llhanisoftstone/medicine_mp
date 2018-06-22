<template>
  <div class="main">
    <ul class="mainlist">
      <li class="mainlist_item"  v-for="(item,i) in policy_list" :key="item.id">
        <a v-if="item.type==1">
          <image class="item_img1" src="/static/img/beijing-1.png" v-if="item.status==1 || item.status==2" alt=""></image>
          <image class="item_img1" src="/static/img/back_icon-1.png" alt="" v-if="item.status==0"></image>
          <div class="item_info1">
            <p class="item_rmb"><span class="rmbsign">￥{{item.price}}</span><span class="djqsign">代金券</span></p>
            <p class="item_type">线上红包</p>
            <p class="item_time">有效期至 : {{item.end_time}}</p>
            <div class="item_margin"><img class="item_logo" :src="item.piclogo" alt=""></div>
            <p class="item_name">{{item.name}}</p>
            <img class="item_sign" src="/static/img/shiyong_03.png" v-if="item.status==1" alt="">
            <img class="item_sign" src="/static/img/guoqi_06.png" v-if="item.status==2" alt="">
          </div>
        </a>
        <a v-if="item.type==2" :href="'/pages/giftshopdetail/main?pid='+item.id">
          <image class="item_img2" src="/static/img/beijing-2.png" v-if="item.status==1 || item.status==2" alt=""></image>
          <image class="item_img2" src="/static/img/back_icon-2.png" alt="" v-if="item.status==0"></image>
          <div class="item_info2">
            <p class="item_rmb"><span class="rmbsign">￥{{item.price}}</span><span class="djqsign">代金券</span></p>
            <p class="item_type">实体店红包</p>
            <p class="item_time">有效期至 : {{item.end_time}}</p>
            <div class="item_margin"><img class="item_logo" :src="item.piclogo" alt=""></div>
            <p class="item_name">{{item.name}}</p>
            <div class="item_contact">
              <span class="item_phone">{{item.phone}}</span>
              <span class="item_address">{{item.address}}</span>
            </div>
            <img class="item_sign" src="/static/img/shiyong_03.png" v-if="item.status==1" alt="">
            <img class="item_sign" src="/static/img/guoqi_06.png" v-if="item.status==2" alt="">
          </div>
        </a>
      </li>
    </ul>
    <div class="nogetList" v-if="iskong">暂无记录</div>
  </div>
</template>

<script type="javascript">
  export default {
    data () {
      return {
        policy_list:[],
        iskong:false,
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
          u_id:that.$store.state.user.userid,
          order:'status asc'
        };
        let res = await that.$get('/rs/member_ticket',data);
        if (res.code == 200){
          that.iskong=false;
          if (res.rows.length > 0){
            for (let i=0; i<res.rows.length; i++){
              res.rows[i].get_time = that.conversionTime(res.rows[i].get_time,"/");
              res.rows[i].end_time = that.conversionTimelist(res.rows[i].get_time,res.rows[i].effect_hour,"/");
              if (res.rows[i].price){
                res.rows[i].price=that.pricetab(res.rows[i].price);
              }
              if(res.rows[i].picurl){
                  if(res.rows[i].picurl.substring(0,4)!="http"){
                    res.rows[i].piclogo = 'https://policy.lifeonway.com'+res.rows[i].piclogo;
                  }
              }
              if(res.rows[i].status == 0){
                res.rows[i].statustext="未领取"
              }else if(res.rows[i].status == 1){
                res.rows[i].statustext="已领取"
              }else if(res.rows[i].status==2){
                res.rows[i].statustext="已过期"
              }
            }
            that.policy_list = that.policy_list.concat(res.rows);
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
      conversionTimelist(newtime,time,sign){
        if(time==null){
          return;
        }
        var date = new Date(newtime);
        var newDate = new Date(date.getFullYear(),date.getMonth(),date.getDate()+time);
        var year2 = newDate.getFullYear();
        var month2 = newDate.getMonth()+1;
        var day2 = newDate.getDate();
        return year2+sign+month2+sign+day2;

      },
      conversionTime(time,sign){
        if(time==null){
          return;
        }
        time=time.replace(/-/g, '/');
        var data = new Date(time);
        var month=parseInt(data.getMonth()+1);
        var months="";
        months=month;
        var day=data.getDate();
        return data.getFullYear()+sign+months+sign+day;
      },
      pricetab(price){
        price=(parseFloat(price)/100).toFixed(0);
        return price;
      }
    },
    onLoad: function (option) {
      this.page = 1;
      this.policy_list = [];
      this.getpolicyList()//获取数据
    }
  }
</script>

<style scoped lang="less">
  @import "../../static/less/common.less";
  .mainlist{
    padding: 21px/2 26px/2 21px/2 26px/2;
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
  .mainlist_item{
    margin-bottom: 21px/2;
    border-radius: 10px/2;
    overflow: hidden;
    position: relative;
    .item_contact{
      display: flex;
      .item_phone{
        position: absolute;
        bottom: 12px/2;
        display: block;
        line-height: 0.4rem;
        font-size: 22px/2;
        color: #999999;
        margin-left: 21px/2;
        padding-left: 40px/2;
        background: url('../../../static/img/tel_icon.png') no-repeat left center;
        background-size: 28px/2 30px/2;
      }
      .item_address{
        position: absolute;
        right: 21px/2;
        bottom: 12px/2;
        display: block;
        line-height: 0.4rem;
        font-size: 22px/2;
        color: #999999;
        margin-left: 21px/2;
        padding-left: 40px/2;
        background: url('../../../static/img/address_icon.png') no-repeat left center;
        background-size: 25px/2 29px/2;
      }
    }
    .item_img2{
      width: 100%;
      height:298px/2;
      box-shadow: 5px/2 10px/2 10px/2 rgba(101, 101, 101, 0.3);
      margin-top: 1px/2;
    }
    .item_img1{
      width: 100%;
      height:256px/2;
    }
    .item_info1{
      width: 698px/2;
      height:256px/2;
      position: absolute;
      color: #ffffff;
      top:0;
      left:0;
    }
    .item_info2{
      width: 704px/2;
      height:297px/2;
      position: absolute;
      color: #ffffff;
      top:0;
      left:0;
    }
    .item_margin{
      background-color: #ffffff;
      border-radius: 50%;
      position: absolute;
      top: 40px/2;
      right: 40px/2;
      width: 131px/2;
      height: 131px/2;
    }
    .item_logo{
      width: 127px/2;
      height: 127px/2;
      border-radius: 50%;
      margin-top: 2px/2;
      margin-left: 2px/2;
    }
    .item_name{
      position: absolute;
      top: 184px/2;
      width: 210px/2;
      text-align: center;
      right: 0;
      font-size: 23px/2;
      color: #543202;
    }
    .item_rmb{
      position: absolute;
      top: 66px/2;
      left: 56px/2;
    }
    .rmbsign{
      font-size: 45px/2;
    }
    .djqsign{
      font-size: 26px/2;
    }
    .item_type{
      position: absolute;
      color: #543202;
      font-size: 26px/2;
      top: 127px/2;
      left: 56px/2;
    }
    .item_time{
      position: absolute;
      font-size: 24px/2;
      top: 173px/2;
      left: 56px/2;
    }
    .item_sign{
      position: absolute;
      top:-1px/2;
      right:-1px/2;
      width:106px/2;
      height:106px/2;
      z-index: 20;
    }
  }
</style>
