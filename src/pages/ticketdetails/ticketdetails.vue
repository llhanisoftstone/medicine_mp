<template>
    <div>
      <div class="data-list">
        <div class="data-ii">
          <div class="upper-part">
            <div class="shade"></div>
            <image src="/static/img/moren.jpg" class="background-img"></image>
            <div class="ticket-info">
              <div class="ticket-name">{{ticket_name}}</div>
              <div class="ticket-count">{{ticket_amount}}张</div>
            </div>
          </div>
          <div class="lower-part">
            <span>领取者</span>
            <span>领取时间</span>
            <span class="bor-rig">核销时间</span>
          </div>
        </div>
        <div class="send-list">
          <ul>
            <li v-for="(item,i) in sendlist" :key="item.id">
              <div>{{item.nickname}}</div>
              <div>{{item.time1}}</div>
              <div>{{item.time2}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type="javascript">
  export default {
    data () {
      return {
        ticket_name:'',
        ticket_amount:0,
        sendlist:[]
      }
    },

    methods: {
      async getticketInfo(pid) {
        let that = this;
        let res = await that.$get('/rs/ticket_send_rule/'+pid);
        if (res.code == 200){
          if (res.rows.length > 0){
            that.ticket_name = res.rows[0].title;
            that.ticket_amount = res.rows[0].total_amount;
            if (res.sendlist.length > 0){
              that.sendlist = res.sendlist;
            }
          }
        }
      }
    },
    onLoad: function (option) {
      this.getticketInfo(option.pid)//获取数据
    }
  }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .data-list{
      margin: 0 26px/2;
      .data-ii{
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
            top: 94px/2;
            .ticket-name{
              font-size: 40px/2;
              color: #ffffff;
            }
            .ticket-count{
              margin-top: 25px/2;
              font-size: 26px/2;
              color: #ffffff;
            }
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
  .send-list ul{
    li{
      width: 100%;
      height: 80px/2;
      border-bottom: 1px solid #e2e2e2;
      display: flex;
      div{
        width: 33%;
        text-align: center;
        color: #666666;
        font-size: 28px/2;
        line-height: 80px/2;
      }
    }
  }
</style>
