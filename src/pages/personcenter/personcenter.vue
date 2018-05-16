<template>
  <div class="container">
    <div class="header">
      <image src="/static/img/touxiang.png" alt=""></image>
    </div>
    <div class="middle">
      <ul>
        <li class="money"><div class="title">银两</div><p class="messagealert">储备仓</p><span class="listimg moneyimg"></span></li>
        <li class="store"><div class="title">兑换店</div><p class="messagealert">精美礼品等你拿</p><span class="listimg storeimg"></span></li>
        <li class="usermoot"><div class="title">道具</div><p class="messagealert">优惠道具等你来购</p><span class="listimg userimg"></span></li>
        <li class="groupcard"><div class="title">优惠券</div><p class="messagealert">优惠券发放</p><span class="listimg cardimg"></span></li>
        <li class="setting"><div class="title">设置</div><p class="messagealert">设置</p><span class="listimg settingimg"></span></li>
      </ul>
    </div>
  </div>
</template>

<script type="javascript">
</script>

<style scoped lang="css">
 .container{
   padding:10px 13px;
 }
 .header>image{
  width:100%;
   height:97px;
 }
 .middle>ul{
   overflow:hidden;
 }
  .middle>ul>li{
    float:left;
    margin-top:9px;
    margin-right:9px;
    width:170px;
    height:110px;
    border-radius:5px;
    color:#fff;
    position:relative;
  }
 .middle>ul>li div{
   margin-top:25px;
   font-size:17px;
   font-weight:bold;
   margin-left:15px;
 }
 .middle>ul>li p{
   margin-top:20px;
   font-size:14px;
   margin-left:15px;
 }
 .middle>ul>li:nth-child(2n){
   margin-right:0;
 }
  .money{
    background:#c9e14b;
  }
  .store{
    background:#ffc02a;
  }
  .usermoot{
    background:#ff862d;
  }
  .groupcard{
    background:#df5c3e;
  }
  .setting{
    background:#76caff;
  }
  .listimg{
    position:absolute;
    top:13px;
    right:15px;
    width:36px;
    height:41px;
  }
  .moneyimg{
    background:url(../../../static/img/my_11.png) no-repeat center center;
    background-size:cover;
  }
 .userimg{
   background:url(../../../static/img/my_17.png) no-repeat center center;
   background-size:cover;
 }
 .storeimg{
   background:url(../../../static/img/my_13.png) no-repeat center center;
   background-size:cover;
 }
 .cardimg{
   background:url(../../../static/img/my_18.png) no-repeat center center;
   background-size:cover;
 }
 .settingimg{
   background:url(../../../static/img/my_21.png) no-repeat center center;
   background-size:cover;
 }
</style>

