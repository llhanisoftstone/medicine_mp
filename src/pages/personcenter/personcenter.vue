<template>
  <div class="container">
    <userinfo :username="$store.state.userinfo.nickName" :imgurl="$store.state.userinfo.avatarUrl">
      <div slot="userRight">
        <a href="/pages/sliver/main" class="wallet"><span class="pointk">{{points}}</span></a>
      </div>
    </userinfo>
    <div class="middle">
      <ul>
        <li class="money"><a href="/pages/sliver/main"><div class="title">银两</div><p class="messagealert">闯关/签到得银两<br/>各类道具任你换</p><span class="listimg moneyimg"></span></a></li>
        <li class="store"><a href="/pages/giftshoplist/main"><div class="title">战利品</div><p class="messagealert">身经百战得奖品<br/>快意人生伴我行！</p><span class="listimg storeimg"></span></a></li>
        <li class="usermoot"><a href="/pages/itemshop/main"><div class="title">道具</div><p class="messagealert">工欲善其事必先利其器<br/>你懂得！</p><span class="listimg userimg"></span></a></li>
        <li class="groupcard" v-if="seen"><a href="/pages/ticket/main"><div class="title">优惠券</div><p class="messagealert">优惠券发放入口</p><span class="listimg cardimg"></span></a></li>
        <li class="setting"><a href="/pages/setting/main"><div class="title">设置</div><p class="messagealert">进入有惊喜，等你来完善<br/>游戏银两两不误</p><span class="listimg settingimg"></span></a></li>
        <li class="jyk"><a href="/pages/questions/main?isjy=true"><div class="title">我要建议</div><p class="messagealert">建议采纳后<br/>100银两免费拿</p><span class="listimg jyimg"></span></a></li>
        <li class="zxk"><a href="/pages/questionlist/main"><div class="title">我的咨询</div><p class="messagealert">找不到你想要的政策<br/>来这里咨询吧！
        </p><span class="listimg zximg"></span></a></li>
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
        points:0
      }
    },
    computed:{
    },
    components: {
      userinfo
    },
    methods: {
      async getuserperson(){
        let aa = await this.$get('/rs/member',{id:this.$store.state.user.userid});
        if(aa.code==200){
          this.$store.commit('get_sliver',aa.rows[0].points);
          this.$store.commit('get_openid',aa.rows[0].open_id);
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
      this.getuserperson();
    },
    onShow(){
      this.$store.commit('getorganizid','');
      this.getuserperson();
    }
  }
</script>

<style scoped lang="less">
  .container{
    margin-top:10px;
  }
  .middle>ul{
    overflow:hidden;
    padding:0 3.33333%;
    padding-bottom: 20/2px;
  }
  .middle>ul>li{
    float:left;
    margin-top:9px;
    margin-right:2.66666%;
    width:48.533333%;
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
    margin-top:32/2px;
    font-size:26/2px;
    margin-left:15px;
    line-height: 35/2px;
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
  .jyk{
    background:#8996e7;
  }
  .zxk{
    background:#54beb6;
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
  .jyimg{
    background:url(../../../static/img/jyimg.png) no-repeat center center;
    background-size:contain;
  }
  .zximg{
    background:url(../../../static/img/zx.png) no-repeat center center;
    background-size:contain;
  }
  .wallet{
    .pointk{
      background:url(../../../static/img/my_06.png) no-repeat left center;
      background-size:26px 19px;
      padding-left:31px;
      padding-right: 10/2px;
      margin-left:5px;
      height:19px;
      color: #df5c3e;
      font-size: 14px;
    }
    width: 200/2px;
    float: right;
    display: flex;
    align-content: center;
    justify-content: flex-end;
    align-items: center;
    margin-top:40px/2;
  }
  .middle>ul>li a:hover{
    background:inherit;
    color:inherit;
  }
</style>

