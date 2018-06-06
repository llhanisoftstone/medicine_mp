<template>
  <div class="main">
    <ul class="mainlist">
      <li :class="{'mainlist_item':true,'inside':item.type==1,'external':item.type==0}" v-for="(item,i) in policy_list">
        <a :href="'/pages/giftshopdetail/main?pid='+item.id" v-if="item.type==1" >
          <img class="item_img" :src="item.picurl" alt="">
          <div class="item_info">
            <p class="item_title">{{item.name}}</p>
            <p class="item_tro">到店消费</p>
            <p class="item_time">有效期至：{{item.end_time}}</p>
            <img class="item_sign" src="/static/img/giftshop_ysy.png" v-if="item.status==1" alt="">
            <img class="item_sign" src="/static/img/giftshop_ygq.png" v-if="item.status==2" alt="">
          </div>
        </a>
        <a :href="item.jump_link" v-if="item.type==0">
          <img class="item_img" :src="item.picurl" alt="">
          <div class="item_info">
            <p class="item_rmb"><span class="rmbsign">￥ </span>{{item.price}}</p>
            <p class="item_time">使用期限 : {{item.get_time}}~{{item.end_time}}<span class="item_sign">{{item.statustext}}</span></p>
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
      }
    },
    methods: {
      async getpolicyList() {
        let that = this;
        let data = {
          u_id:that.$store.state.user.userid,
          order:'status asc'
        };
        let res = await that.$get('/rs/member_ticket',data);
        if (res.code == 200){
          this.iskong=false;
          if (res.rows.length > 0){
            for (let i=0; i<res.rows.length; i++){
              res.rows[i].type = 1;
              if(res.rows[i].type == 0){
                res.rows[i].get_time = that.conversionTime(res.rows[i].get_time,".");
                res.rows[i].end_time = that.conversionTimelist(res.rows[i].effect_hour,".");
                res.rows[i].price=that.pricetab(res.rows[i].price);
              }else{
                res.rows[i].end_time = that.conversionTimelist(res.rows[i].effect_hour,"-");
              }
              if(res.rows[i].picurl){
                  if(res.rows[i].picurl.substring(0,4)!="http"){
                    res.rows[i].picurl = 'https://policy.lifeonway.com'+res.rows[i].picurl;
                  }
              }else{
                if(res.rows[i].type == 1){
                  res.rows[i].picurl= "/static/img/giftshop_moren2.jpg"
                }else{
                  res.rows[i].picurl= "/static/img/giftshop_moren.jpg"
                }
              }
              if(res.rows[i].status == 0){
                res.rows[i].statustext="未领取"
              }else if(res.rows[i].status == 1){
                res.rows[i].statustext="已领取"
              }else if(res.rows[i].status==2){
                res.rows[i].statustext="已过期"
              }
              that.policy_list.push(res.rows[i]);
            }
          }
        }else if(res.code==602){
          this.iskong=true;
        }
      },
      conversionTimelist(time,sign){
        if(time==null){
          return;
        }
        var date = new Date();
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
        return data.getFullYear()+sign+months+sign+days;
      },
      pricetab(price){
        price=(parseFloat(price)/100).toFixed(0);
        return price;
      }
    },

    onLoad: function (option) {
      this.policy_list=[];
      this.getpolicyList()//获取数据
      this.iskong=false;
    }
  }
</script>

<style scoped lang="less">
  @import "../../static/less/common.less";
  .mainlist{
    padding: 20px/2 0;
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
    margin:0 26px/2 20px/2;
    border-radius: 10px/2;
    width: 698px/2;
    height:280px/2;
    overflow: hidden;
    position: relative;
  }
  .inside{
    .item_img{
      width: 698px/2;
      height:280px/2;
    }
    .item_info{
      width: 698px/2;
      height:280px/2;
      position: absolute;
      top:0;
      left:0;
      background: rgba(0,0,0,0.5);
      color:#fff;
      text-align: center;
      .item_title{
        padding: 78px/2 50px/2 39px/2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 40px/2;
        line-height: 40px/2;
      }
      .item_tro{
        font-size: 26px/2;
        line-height: 26px/2;
        padding-bottom: 16px/2;
      }
      .item_time{
        font-size: 26px/2;
        line-height: 26px/2;
      }
      .item_sign{
        position: absolute;
        top:0;
        right:0;
        width:170px/2;
        height:162px/2;
        z-index: 20;
      }
    }
  }
  .external{
    box-shadow: 4px/2 6px/2 20px/2 3px/2 #eee;
    .item_img{
      width: 698px/2;
      height:235px/2;
    }
    .item_info{
      position: absolute;
      top:0;
      left:0;
      z-index: 10;
      width: 698px/2;
      height:280px/2;
      background: url("../../../static/img/giftshop_juchi.png")no-repeat 0 bottom;
      background-size: 698px/2 80px/2;
      .item_rmb{
        position: absolute;
        top:97px/2;
        right:223px/2;
        font-size: 80px/2;
        line-height: 80px/2;
        height:80px/2;
        color:#fff;
        .rmbsign{
          font-size: 40px/2;
        }
      }
      .item_time{
        position: absolute;
        bottom:0;
        left:0;
        width: 100%;
        box-sizing: border-box;
        font-size: 26px/2;
        line-height: 80px/2;
        color:#333;
        padding: 0 20px/2 0 22px/2;
      }
      .item_sign{
        float: right;
      }
    }
  }
</style>
