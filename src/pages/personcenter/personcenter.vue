<template>
  <div class="container">
    <userinfo :username="$store.state.userinfo.nickName" :imgurl="$store.state.userinfo.avatarUrl">
      <div slot="userRight">
        <a href="" class="wallet">{{ponits}}</a>
      </div>
    </userinfo>
    <div class="middle">
      <ul>
        <li class="money"><a href="/pages/sliver/main"><div class="title">银两</div><p class="messagealert">储备仓</p><span class="listimg moneyimg"></span></a></li>
        <li class="store"><div class="title">兑换店</div><p class="messagealert">精美礼品等你拿</p><span class="listimg storeimg"></span></li>
        <li class="usermoot"><a href="/pages/itemshop/main"><div class="title">道具</div><p class="messagealert">优惠道具等你来购</p><span class="listimg userimg"></span></a></li>
        <li class="groupcard" v-if="seen"><a href="/pages/ticket/main"><div class="title">优惠券</div><p class="messagealert">优惠券发放</p><span class="listimg cardimg"></span></a></li>
        <li class="setting"><a href="/pages/setting/main"><div class="title">设置</div><p class="messagealert">设置</p><span class="listimg settingimg"></span></a></li>
      </ul>
    </div>
  </div>
</template>

<script type="javascript">
  import userinfo from '@/components/userinfo'
  export default {

    data () {
      return {
        isnewuser: true,
        seen:false,
        ponits:0
      }
    },
    components: {
        userinfo
    },
    methods: {
      async getuserperson(){
        let aa = await this.$get('/rs/member',{id:this.$store.state.user.userid});
        if(aa.code==200){
          this.$store.commit('get_sliver',aa.rows[0].points);
            this.points=aa.rows[0].points;
            if(aa.rows[0].rank<"20"){
                this.seen=false;
            }else{
                this.seen=true;
            }
        }
      }
    },
    mounted(){
      this.getuserperson()
    },
    created (){
      // 调用应用实例的方法获取全局数据

      }
    }
</script>

<style scoped lang="css">
  .container{
    margin-top:10px;
  }
 .middle>ul{
   overflow:hidden;
   padding:0 13px;
 }
  .middle>ul>li{
    float:left;
    margin-top:9px;
    margin-right:10px;
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
  .wallet{
    padding-left:31px;
    height:19px;
    background:url(../../../static/img/my_06.png) no-repeat left center;
    background-size:26px 19px;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    color: #df5c3e;
    font-size: 14px;
  }
  .middle>ul>li a:hover{
    background:inherit;
    color:inherit;
  }
</style>

