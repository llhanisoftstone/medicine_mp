<template>
  <div class="container">
    <userinfo :username="$store.state.userinfo.nickName" :imgurl="$store.state.userinfo.avatarUrl">
      <div slot="userRight">
        <a href="" class="wallet">{{points}}</a>
      </div>
    </userinfo>
    <ul class="tablist">
      <li v-on:click="leftclick" stype="1" v-bind:class="{ on: isActive }">收益</li>
      <li stype="2" v-on:click="rightclick" v-bind:class="{ on: isclcik}">支出</li>
      <li class="left_line" v-bind:class="{ right: isSelect }"></li>
    </ul>
    <div class="sliverlist">
      <ul>
        <li v-for="(v,i) in userlist" class="priceday"><div class="time">{{v.create_time}}</div><div class="center">{{v.illustration}}</div><div class="price">{{v.categorylist}}{{v.points}}</div></li>
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
        isActive:true,
        isclcik:false,
        isSelect:false,
        userlist: [],
      }
    },
    methods: {
      leftclick(){
        this.isActive=true;
        this.isclcik=false;
        this.isSelect=false;
        this.getgoods(1);
      },
      rightclick(){
        this.isActive=false;
        this.isclcik=true;
        this.isSelect=true;
        this.getgoods(3);
      },
      async getgoods(category){
        let that = this;
        let data={
            u_id:this.$store.state.user.userid,
        };
        if(category){
            data.category=category;
        }else{
            data.category=1
        }
        let res = await that.$get('/rs/points_account',data);
        if(res.code == 200){
            for(var i=0;i<res.rows.length;i++){
                if(res.rows[i].category==3){
                    res.rows[i].categorylist="-";
                }else{
                  res.rows[i].categorylist="+";
                }
            }
          that.userlist = res.rows;
        }
      },
    },
    computed:{
      points(){
        return this.$store.state.sliver
      }
    },
    components: {
      userinfo
    },
    onLoad: function () {
      this.isActive=true;
      this.isclcik=false;
      this.isSelect=false;
      this.getgoods(1);
    },
    created (){
      // 调用应用实例的方法获取全局数据
//      this.getuser()

    }
  }
</script>

<style scoped lang="less">
  .container{
    margin-top:10px;
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
  .tablist{
    display:flex;
    justify-content: space-between;
    align-items: center;
    position:relative;
    li{
      width:50%;
      height:40px;
      line-height:38px;
      border-bottom:2px solid #f6f6f6;
      text-align:center;
      font-size:15px;
      color:#666;
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
  .sliverlist li{
    padding:0 13px;
    border-bottom:1px solid #e2e2e2;
    .time{
      margin-right:18px;
      width:auto;
      display:inline-block;
    }
    .center{
      display:inline-block;
    }
  }
  .totlepricemonth{
    background:#f6f6f6;
    height:40px;
    line-height:40px;
    font-size:15px;
    color:#333;
    .center{
      color:#999;
      display: inline-block;
    }
    .timeimg{
      float:right;
      margin-top:10px;
      width:20px;
      height:20px;
      background:url(../../../static/img/rili.png) no-repeat center center;
      background-size:cover;
    }
  }
  .priceday{
    height:49px;
    line-height:49px;
    border-left:1px solid #e2e2e2;
    border-right:1px solid #e2e2e2;
    font-size:13px;
    color:#666;
    .price{
      float:right;
      color:#df5c3e;
    }
  }

</style>

