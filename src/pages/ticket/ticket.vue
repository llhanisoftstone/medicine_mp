<template>
    <div>
      <div class="data-list">
        <ul class="list-ul">
          <li class="list-li" v-for="(item,i) in ticket_list" :key="item.id">
            <div class="upper-part">
              <div class="shade"></div>
              <img :src="item.picurl" class="background-img"></img>
              <div class="ticket-info">
                <div class="ticket-name">{{item.name}}</div>
                <div class="ticket-count">{{item.total_amount}}张</div>
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
              <a :href="'/pages/ticketdetails/main?pid='+item.id"><span>领取记录</span></a>
              <a :href="'/pages/writeoff/main'"><span>核销</span></a>
              <a :href="'/pages/ticketdetails/main?pid='+item.id"><span class="bor-rig">核销记录</span></a>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script type="javascript">
  export default {
    data () {
      return {
        ticket_list:[],
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
    },

    methods: {
      async getticketList() {
        let that = this;
        let data = {
          page:this.page,
          size:this.size,
          u_id:this.$store.state.user.userid
        };
        let res = await that.$get('/rs/v_ticket_send_rule',data);
        if (res.code == 200){
          if (res.rows.length > 0){
            for (var i=0; i<res.rows.length; i++){
              res.rows[i].picurl = 'https://policy.lifeonway.com'+res.rows[i].picurl;
              res.rows[i].surplus_count = res.rows[i].total_amount - res.rows[i].total_count;
            }
            that.ticket_list = res.rows;
          }
        }
      },
      refresh(){
        this.page = 1;
        this.getticketList();
      },
      loadmore () {
        this.getticketList();
      }
    },
    onLoad: function () {
      this.getticketList()//获取数据
    },
    onShow: function onShow() {
      this.getticketList()//获取数据
    }
  }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .data-list ul.list-ul{
      margin: 0 26px/2;
      li.list-li{
        position: relative;
        margin-top: 20px/2;
        height: 342px/2;
        .shade{
          position: absolute;
          width: 100%;
          height: 280px/2;
          top: 0;
          left: 0;
          background: #000000;
          border-radius: 10px/2;
          opacity: 0.5;
        }
        .upper-part{
          width: 100%;
          height: 280px/2;
          image{
            width: 100%;
            height: 280px/2;
            border-radius: 10px/2;
          }
          .ticket-info{
            position: absolute;
            width: 698px/2;
            text-align: center;
            top: 56px/2;
            .ticket-name{
              font-size: 40px/2;
              color: #ffffff;
            }
            .ticket-count{
              margin-top: 20px/2;
              font-size: 26px/2;
              color: #ffffff;
            }
          }
          .count-list{
            margin-top: 10px/2;
            box-sizing: border-box;
            height: 80px/2;
            padding: 6px/2 84px/2;
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
          width: 700px/2;
          height: 79px/2;
          bottom: 0;
          background: url('../../../static/img/yhj_1.png') no-repeat left center;
          background-size: 699px/2 79px/2;
          span{
            float: left;
            width: 33%;
            line-height: 45px/2;
            color: #df5c3e;
            font-size: 28px/2;
            text-align: center;
            margin: 20px/2 0 14px/2 0;
            border-right: 1px solid #df5c3e;
          }
        }
        .lower-part span.bor-rig:last-child{
          border: 0;
        }
      }
    }
</style>
