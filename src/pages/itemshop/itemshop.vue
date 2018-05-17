<template>
    <div class="container">
      <ul class="tablist">
        <li v-on:click="leftclick" stype="1" v-bind:class="{ on: isActive }">道具商店</li>
        <li stype="2" v-on:click="rightclick" v-bind:class="{ on: isclcik}">我的背包</li>
        <li class="left_line" v-bind:class="{ right: isSelect }"></li>
      </ul>
      <div class="itemlist" v-if="seen">
        <ul>
          <li><img src="/static/img/daojushangdian_11.png" alt=""><div class="bottomlist"><span class="sliverimg"></span><span>2000</span></div></li>
          <li><a href="/pages/paysuccess/main"><img src="/static/img/daojushangdian_13.png" alt=""><div class="bottomlist"><span class="sliverimg"></span><span>2000</span></div></a></li>
        </ul>
      </div>
      <div class="myitemlist" v-if="isshow">
        <ul>
          <li><img src="/static/img/daojushangdian_11.png" alt=""><div class="bottomlist">x2</div></li>
          <li><img src="/static/img/daojushangdian_13.png" alt=""><div class="bottomlist">x2</div></li>
        </ul>
      </div>
      <div class="model" v-if="ishidden">
        <div class="centermodel">
            <div class="topimg"><img src="/static/img/daojushangdian_11.png" alt=""></div>
            <ul>
              <li><span class="icon icon_number"></span><input type="text" placeholder="购买个数" maxlength="7" onkeyup="value=value.replace(/[^\d]/g,'')"/><span class="number_right">银两</span></li>
              <li><span class="icon icon_pointer"></span><span class="content_title">可用银两<span class="isusepointer"></span></span><span class="pay_type active" _pay_type="1"></span></li>
              <li><span class="icon icon_money"></span><span class="content_title">微信支付</span><span class="pay_type" _pay_type="2"></span></li>
            </ul>
          <div class="ispay">确认支付</div>
        </div>
      </div>
    </div>

</template>

<script type="javascript">
    export default {
        name: 'itemshop',
        props: [],
        data(){
            return {
              ishidden:false,
              seen:true,
              isshow:false,
              isActive:true,
              isclcik:false,
              isSelect:false,
            }
        },
        methods: {
          leftclick(){
              this.seen=true;
              this.isshow=false;
              this.isActive=true;
              this.isclcik=false;
              this.isSelect=false;
          },
          rightclick(){
            this.seen=false;
            this.isshow=true;
            this.isActive=false;
            this.isclcik=true;
            this.isSelect=true;
          }
        },
        components: {}

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .tablist{
      display:flex;
      justify-content: space-between;
      align-items: center;
      position:relative;
      li{
        width:50%;
        height:40px;
        line-height:40px;
        text-align:center;
        font-size:15px;
        color:#333;
      }
      li.on{
        color:#df5c3e;
      }
      .left_line{
        position:absolute;
        left:0;
        bottom:0;
        right:auto;
        transition: all .3s ease;
        border-bottom: none;
        width:50%;
        height:2px;
        background:#df5c3e;
      }
      .left_line.right{
        position:absolute;
        right:0;
        bottom:0;
        left:auto;
        transition: all .3s ease;
        border-bottom: none;
        width:50%;
        height:2px;
        background:#df5c3e;
      }
    }
  .itemlist{
    margin:13px;
    ul{
      li{
        float:left;
        width:106px;
        height:120px;
        border-radius:5px;
        background:#ffe7e8;
        margin-right:17px;
        text-align:center;
        position:relative;
        image{
          width:65px;
          height:65px;
          margin-top:20px;
        }
      }
      .bottomlist{
        margin-top:20px;
        width:100px;
        height:30px;
        border:2.5px solid #fff;
        border-radius:100px;
        background:#df5c3e;
        font-size:14px;
        color:#fff;
        text-align:center;
        z-index:50;
        display:flex;
        justify-content: center;
        align-items: center;
        span{
          display:inline-block;
        }
        .sliverimg{
          display:inline-block;
          width:20px;
          height:15px;
          background:url(../../../static/img/daojushangdian_18.png) no-repeat center center;
          background-size:cover;
          margin-right:4px;
        }
      }
    }
  }
  .myitemlist{
    margin:13px;
    ul{
      li{
        float:left;
        width:106px;
        height:106px;
        border-radius:5px;
        background:#ffe7e8;
        margin-right:17px;
        text-align:center;
        position:relative;
        image{
          width:65px;
          height:65px;
          margin-top:20px;
        }
      }
      .bottomlist{
        position:absolute;
        top:70px;
        left:70px;
        font-size:15px;
        color: #df5c3e;
      }
    }
  }
  .model{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    text-align:center;
    background:rgba(0,0,0,0.6);
    z-index:20;
    .centermodel{
      margin-top:147.5px;
      background:#fff;
      width:230px;
      margin-left:73px;
      height:219px;
      text-align:center;
      border-radius:25px;
      position:relative;
      padding:0 20px;
      .topimg{
        position:absolute;
        top:-21.5px;
        left:50%;
        transform:translateX(-50%);
        -webkit-transform:translateX(-50%);
        width:78px;
        height:78px;
        border-radius:50%;
        background:#fff;
        text-align:center;
        image{
          width:70px;
          height:70px;
          margin-top:4px;
          border-radius:50%;
        }
      }
      ul{padding-top:43px;}
      ul li{
        border-bottom:1px solid #e2e2e2;
        height:37px;
        padding:12.5px 2.5px 9.5px 2.5px;
        box-sizing:border-box;
        overflow:hidden;
        .icon{
          width:15px;
          height:15px;
          float:left;
          padding-right:5px;
        }
        .icon_number{
          background:url(../../../static/img/buy_2.png) no-repeat left center;
          background-size:15px 15px;
        }
        .icon_pointer{
          background:url(../../../static/img/buy_1.png) no-repeat left center;
          background-size:15px 15px;
        }
        .icon_money{
          background:url(../../../static/img/buy_4.png) no-repeat left center;
          background-size:15px 15px;
        }
        input{
          width:45%;
          font-size:10px;
          color:#666;
          float:left;
          min-height:15px;
          max-height:15px;
          height:15px;
          border-left:1px solid #e2e2e2;
          text-align:left;
          padding-left:6px;
        }
        .content_title{
          padding-left:6px;
          font-size:10px;
          color:#666;
          float:left;
          height:15px;
          line-height:15px;
          border-left:1px solid #e2e2e2;
        }
        .number_right{
          float:right;
          font-size:10px;
          color:#df5c3e;
          max-width:40%;
        }
        .pay_type{
          float:right;
          width:15px;
          height:15px;
          background:url(../../../static/img/buy_3.png) no-repeat left center;
          background-size:15px 15px;
        }
        .pay_type.active{
          background:url(../../../static/img/buy_5.png) no-repeat left center;
          background-size:15px 15px;
        }
      }
      ul li:last-child{
        border-bottom:none;
      }
    }

  }
  .ispay{
    margin:20px auto 0;
    width:96px;
    height:22.5px;
    border-radius:15px;
    background:#df5c3e;
    line-height:22.5px;
    text-align:center;
    font-size:14px;
    color:#fff;
  }

</style>
