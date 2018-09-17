<template>
    <div>
      <div class="data-list">
        <div class="data-ii">
          <div class="upper-part">
            <div class="shade"></div>
            <image class="background-img" src="/static/img/back_icon-1.jpg" alt=""></image>
            <div class="item_margin"><img class="item_logo" :src="piclogo" alt=""></div>
            <p class="item_name">{{store_name}}</p>
            <div class="ticket-info">
              <div class="ticket-name">{{name}}</div>
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
              <div>{{item.get_time}}</div>
              <div>{{item.use_time}}</div>
            </li>
          </ul>
          <div class="nogetList" v-if="nogetshow">暂无记录</div>
        </div>
      </div>
    </div>
</template>

<script type="javascript">
  export default {
    data () {
      return {
        piclogo:'',
        name:'',
        store_name:'',
        ticket_amount:0,
        sendlist:[],
        nogetshow:false,
      }
    },

    methods: {
      async getticketInfo(pid) {
        let that = this;
        let res = await that.$get('/rs/v_ticket_send_rule_front',{ticket_id:pid});
        if (res.code == 200){
          if (res.rows.length > 0){
            that.name = res.rows[0].name;
            that.store_name = res.rows[0].store_name;
            that.ticket_amount = res.rows[0].total_amount;
            if(res.rows[0].piclogo){
              if(res.rows[0].piclogo.substring(0,4)!="http"){
                res.rows[0].piclogo = that.$store.state.url+res.rows[0].piclogo;
              }
              that.piclogo = res.rows[0].piclogo
            }else{
              that.piclogo = "/static/img/ticketshop_default.jpg";
            }
            let rs = await  that.$get('/rs/member_ticket',{ticket_id:pid,order:'get_time desc'});
            if (rs.rows.length > 0){
              that.nogetshow=false;
              for (let i=0;i<rs.rows.length; i++){
                rs.rows[i].get_time = this.conversionTime(rs.rows[i].get_time);
                rs.rows[i].use_time = this.conversionTime(rs.rows[i].use_time);
              }
              that.sendlist = rs.rows;
            }else{
              that.sendlist = [];
            }
            if(rs.code==602){
              that.nogetshow=true;
            }
          }
        }
      },
      conversionTime(time){
        if(time==null){
          return;
        }
        time=time.replace(/-/g, '/');
        var data = new Date(time);
        var month=parseInt(data.getMonth()+1);
        var months="";
        if(month<10){
          months="0"+month;
        }else{
          months=month;
        }
        var day=data.getDate();
        var days="";
        if(day<10){
          days="0"+day;
        }else{
          days=day;
        }
        return data.getFullYear()+"/"+months+"/"+days;
      }
    },
    onLoad: function (option) {
      this.nogetshow=false;
      this.getticketInfo(option.pid,option.type)//获取数据
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
          border-radius: 10px/2;
        }
        .upper-part{
          width: 100%;
          height: 280px/2;
          image{
            width: 100%;
            height: 280px/2;
            border-radius: 10px/2;
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
            top: 190px/2;
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
          .ticket-info{
            position: absolute;
            top: 67px/2;
            left: 47px/2;
            .ticket-name{
              font-size: 40px/2;
              color: #ffffff;
            }
            .ticket-count{
              margin-top: 32px/2;
              font-size: 30px/2;
              color: #ffffff;
            }
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
        display: -webkit-box;
        overflow: hidden;
        white-space: normal!important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
    .nogetList{
      padding-top: 630/2px;
      background: url("../../../static/img/konhyemain.jpg") center 250/2px no-repeat;
      background-size:144.5px 148px;
      width: 100%;
      color:#999;
      font-size:14px;
      text-align: center;
      margin-bottom:30px;
      box-sizing:border-box;
      height:594/2px;

    }
</style>
