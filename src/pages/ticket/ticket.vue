<template>
    <div>
      <div class="data-list">
        <ul class="list-ul">
          <li class="list-li" v-for="(item,i) in ticket_list" :key="item.id">
            <div class="upper-part">
              <div class="shade"></div>
              <image src="/static/img/back_icon-1.jpg" class="background-img"></image>
              <div class="ticket-info">
                <p class="item_rmb"><span class="rmbsign">{{item.price}}</span><span class="djqsign">元代金券({{item.total_amount}}张)</span></p>
                <div class="item_margin"><img class="item_logo" :src="item.piclogo" alt=""></div>
                <p class="item_name">{{item.name}}</p>
                <div class="count-list">
                  <ul class="clear ">
                    <li>
                      <div class="count favoriteNum">{{item.total_count}}</div>
                      <div class="txt">已领取</div>
                    </li>
                    <li>
                      <div class="count likeTalentNum">{{item.surplus_count}}</div>
                      <div class="txt">未领取</div>
                    </li>
                    <li>
                      <div class="count tryoutNum">{{item.count}}</div>
                      <span class="txt">已核销</span>
                    </li>
                    <li style="border: none">
                      <div class="count noticeNum count_border0">{{item.uncount}}</div>
                      <span class="txt">未核销</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="lower-part">
              <a :href="'/pages/ticketdetails/main?pid='+item.ticket_id"><span>领取记录</span></a>
              <a @click="towriteOff()"><span>核销</span></a>
              <a :href="'/pages/ticketdetails/main?pid='+item.ticket_id"><span class="bor-rig">核销记录</span></a>
            </div>
          </li>
        </ul>
      </div>
      <div class="nogetList" v-if="iskong">暂无优惠券</div>
    </div>
</template>

<script type="javascript">
  export default {
    data () {
      return {
        piclogo:'',
        ticket_list:[],
        page:1,
        size:6,
        iskong:false,
      }
    },
    onPullDownRefresh () {
      wx.showNavigationBarLoading() //在标题栏中显示加载
      this.page=1;
      this.ticket_list=[];
      this.refresh();
      // 下拉刷新
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },
    onReachBottom () {
      this.page++;
      this.loadmore()
    },

    methods: {
      async getticketList() {
        let that = this;
        let data = {
          page:this.page,
          size:this.size,
          u_id:this.$store.state.user.userid
        };
        let res = await that.$get('/rs/v_ticket_send_rule_front',data);
        console.log(res.rows.length)
        if (res.code == 200){
          that.iskong=false;
          if (res.rows.length > 0){
            for (var i=0; i<res.rows.length; i++){
              if (res.rows[i].price){
                res.rows[i].price=that.pricetab(res.rows[i].price);
              }
              res.rows[i].picurl = that.$store.state.url+res.rows[i].picurl;
              res.rows[i].piclogo = that.$store.state.url+res.rows[i].piclogo;
              res.rows[i].surplus_count = res.rows[i].total_amount - res.rows[i].total_count;
            }
            that.ticket_list = that.ticket_list.concat(res.rows);
            console.log(that.ticket_list.length);
          }
        }else{
            if(that.page==1){
              that.ticket_list=[];
              that.iskong=true;
            }
        }
      },
      refresh(){
        this.page = 1;
        this.getticketList();
      },
      loadmore () {
        this.getticketList();
      },
      pricetab(price){
        price=(parseFloat(price)/100).toFixed(0);
        return price;
      },
      towriteOff(){
        wx.redirectTo({
          url:`/pages/writeoff/main`
        })
      }
    },
    onLoad: function() {
      console.log("121")
      this.page=1;
      this.ticket_list=[];
      this.iskong=false;
      this.getticketList()//获取数据
    }
  }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
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
    .data-list ul.list-ul{
      margin: 0 26px/2;
      .item_margin{
        background-color: #ffffff;
        border-radius: 50%;
        position: absolute;
        top: 40px/2;
        right: 40px/2;
        width: 131px/2;
        height: 131px/2;
      }
      li.list-li{
        position: relative;
        margin-top: 20px/2;
        height: 342px/2;
        .item_rmb{
          color: #ffffff;
          position: absolute;
          top: 66px/2;
          left: 40px/2;
        }
        .shade{
          position: absolute;
          width: 100%;
          height: 280px/2;
          top: 0;
          left: 0;
          border-radius: 10px/2;
        }
        .upper-part{
          width: 100%;
          height: 280px/2;
          .background-img{
            width: 698px/2;
            height:280px/2;
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
            top: 200px/2;
            width: 210px/2;
            text-align: center;
            right: 0;
            font-size: 23px/2;
            color: #543202;
          }
          .rmbsign{
            font-size: 45px/2;
          }
          .djqsign{
            font-size: 26px/2;
          }
          .count-list{
            position: absolute;
            top: 150px/2;
            width: 487px/2;
            box-sizing: border-box;
            height: 80px/2;
            padding: 6px/2 32px/2;
            ul li{
              width: 25%;
              float: left;
              text-align: center;
              font-size: 0.1rem;
              .count {
                height: 50px/2;
                line-height: 50px/2;
                border-right: 2px solid #ffffff;
                color: #ffffff;
                font-size: 28px/2;
                margin-bottom: 6px/2;
              }
              .txt{
                font-size: 19px/2;
                color: #ffffff;
              }
            }
          }
          .count-list ul li:last-child .count{
            border: 0;
          }
        }
        .lower-part{
          position: absolute;
          width: 100%;
          height: 79px/2;
          bottom: 0;
          background: url('../../../static/img/yhj_1.jpg') no-repeat left center;
          background-size: 700px/2 79px/2;
          span{
            float: left;
            width: 33%;
            line-height: 45px/2;
            color: #999999;
            font-size: 28px/2;
            text-align: center;
            margin: 20px/2 0 14px/2 0;
            border-right: 1px solid #999999;
          }
        }
        .lower-part span.bor-rig:last-child{
          border: 0;
        }
      }
    }
</style>
