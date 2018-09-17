<template>
  <div class="pad">
    <h2><div class="guang"></div><image src="/static/img/paihangbang_1.png"></image>排行榜</h2>
    <div class="pk_box">
      <div class="tab">
        <span :class="{'active':isFriends==1}" @click="switchtab(1)">好友排行</span>
        <span class="border"></span>
        <span :class="{'active':isFriends==2}" @click="switchtab(2)">全国排行</span>
        <span class="border"></span>
        <span :class="{'active':isFriends==3}" @click="switchtab(3)">企业排行</span>
      </div>
      <ul class="list" v-if="rankings.length>0">
        <li v-for="(v,i) in rankings">
          <span class="order" :class="{'front':i<3}">{{i+1}}</span>
          <image :src="v.avatar_url" v-if="isFriends!=3"></image>
          <span class="nickname" v-if="isFriends==3">{{v.name}}</span>
          <span class="nickname" v-if="isFriends!=3">{{v.nickname}}</span>
          <span class="integral"><image src="/static/img/paihangbang.png"></image>{{v.experience||0}}</span>
        </li>
      </ul>
      <div class="phb_notdata" v-if="rankings.length==0&&isFriends==1">
        矮油，还没有好友来玩~<br>赶快去邀请吧！
      </div>
      <div class="phb_notdata" v-if="rankings.length==0&&isFriends==2">
        哇塞，还没有人玩呢！<br>赶快去上榜~
      </div>
      <div class="phb_notdata" v-if="rankings.length==0&&isFriends==3">
        哇哦！还没有企业上榜~<br>赶快去上榜吧~
      </div>
    </div>
    <button open-type="share" class="pk_btn" v-if="isFriends==1">
      <div class="tzbox">挑战好友</div>
      <div class="pk_btn_box"></div>
    </button>
    <a :href="'/pages/loadpk/main?from=2&&id='+user.userid" class="pk_btn" v-if="isFriends!=1"><div class="tzbox">全网挑战</div><div class="pk_btn_box"></div></a>
  </div>
</template>

<script type="javascript">
  export default {
    name: 'friendpk',
    data(){
      return {
        isFriends:1,     //1 好友排行    2 全国排行   3企业排行
        rankings:[]
      }
    },
    methods: {
      switchtab(flag){
        this.isFriends = flag
      },
      getdata(){
        let that=this
        if(this.isFriends==1){
          this.$get('/rs/member_relation',{u_id:this.$store.state.user.userid,order:'experience desc,update_time'}).then(res=>{
            if(res.code == 200){
              for(var i=0;i<res.rows.length;i++){
                if(res.rows[i].avatar_url==""||res.rows[i].avatar_url==null){
                  res.rows[i].avatar_url='/static/img/people.png'
                }
              }
              that.rankings=res.rows
            }else if(res.code == 602){
              that.rankings=[]

            }
          })
        }else if(this.isFriends==2){
          this.$get('/rs/member',{order:'experience desc,create_time',page:1,size:50,rank:"<,30"}).then(res=>{
            if(res.code == 200){
              for(var i=0;i<res.rows.length;i++){
                if(res.rows[i].avatar_url==""||res.rows[i].avatar_url==null){
                  res.rows[i].avatar_url='/static/img/people.png'
                }
              }
              that.rankings=res.rows
            }else if(res.code == 602){
              that.rankings=[]
            }
          })
        }else if(this.isFriends==3){
          this.$get('/rs/company_experience',{order:'experience desc,id',page:1,size:50}).then(res=>{
            if(res.code == 200){
              for(var i=0;i<res.rows.length;i++){
                if(res.rows[i].avatar_url==""||res.rows[i].avatar_url==null){
                  res.rows[i].avatar_url='/static/img/people.png'
                }
              }
              that.rankings=res.rows
            }else if(res.code == 602){
              that.rankings=[]
            }
          });
        }
      }
    },
    watch:{
      isFriends(val,oldval){
        this.getdata()
      }
    },
    mounted(){
      this.getdata()
      wx.hideShareMenu()
    },
    components: {},
    computed:{
      user(){
        return this.$store.state.user
      }
    },
    onShareAppMessage(res){
      let that = this;
      let title='@你 有人向你发起挑战，点击应战~';
      let img=`${that.$store.state.url}/admin/img/7.jpg`;
      let url=`/pages/authfight/main?`+`pages=loadpk&&from=1&&id=${this.$store.state.user.userid}`
      if (res.from === 'menu') {
        // 来自页面内转发按钮
        title='边玩边学，游戏学习两不误！';
        img=`${that.$store.state.url}/admin/img/1.jpg`;
        url="/pages/index/main"
        console.log(res.target)
      }
      return {
        title: title,
        path: url,
        imageUrl: img,
        success: (r)=>{
          console.log(r);
          wx.navigateTo({
            url:"/pages/loadpk/main?from=1"
          })
        },
        fail: (err)=>{
          console.log(err)
        }
      }
    }

  }
</script>

<style lang="less" scoped>
  @import '../../static/less/common.less';
  @keyframes guang {
    0%{
      box-shadow:0 0 40/2px 15/2px #F1E870;
    }
    100%{
      box-shadow:0 0 50/2px 35/2px #F1E870;
    }
  }
  .pad{
    padding-bottom: 1px/2;
    /*<!--min-height: 1230/2px;-->*/
  }
  h2{
    display: flex;
    height: 130px/2;
    width: 100%;
    font-size: 50px/2;
    color: @bg_color;
    align-items: center;
    justify-content: center;
    position: relative;
    .guang{
      position: absolute;
      bottom:50%;
      transform: translate(-41px,0);
      left:50%;
      width: 2px;
      height:2px;
      z-index: -1;
      animation: guang .5s ease infinite alternate;
    }
    image{
      width: 59px/2;
      height: 54px/2;
      margin-right: 14px/2;
    }
  }
  .pk_box{
    width: 640px/2;
    margin:0 auto;
    height: auto;
    background: #ffb3a3;
    padding-bottom: 35px/2;
    border-radius: 20px/2;
    .tab{
      width: 100%;
      height: 84px/2;
      border-bottom: 4px/2 solid @bg_color;
      border-top-left-radius: 20px/2;
      border-top-right-radius: 20px/2;
      box-shadow: #f8c3c3 0 2px/2 4px/2;
      display: flex;
      align-items: center;
      justify-content: center;
      align-content: space-between;
      span{
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size:28px/2;
      }
      span:nth-child(1), span:nth-child(3),span:nth-child(5){
        flex:1;
      }
      .active{
        color: @bg_color;
      }
      span:nth-child(2), span:nth-child(4){
        width: 4px/2;
        height: 60px/2;
        background: @bg_color;
      }
    }
  }
  .list{
    width: 100%;
    height: 795px/2 !important;
    overflow: auto;
    li{
      width: 100%;
      height:86px/2;
      border-bottom:1px solid #fff;
      display: flex;
      box-sizing: border-box;
      padding: 0 34px/2;
      align-items: center;
      .order{
        width: 37px/2;
        height: 37px/2;
        border-radius: 50%;
        color: #fff;
        font-size:28px/2;
        margin-right: 16px/2;
        /*display: flex;*/
        /*align-items: center;*/
        /*align-content: center;*/
        /*justify-content: center;*/
        display: block;
        line-height: 37px/2;
        text-align: center;
      }
      .front{
        background: #ff7400;
      }
      image{
        width: 55px/2;
        height: 55px/2;
        border-radius: 50%;
        margin-right: 15px/2;
      }
      .nickname{
        font-size: 28px/2;
        color: #fff;
        width: 300px/2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .integral{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex:1;
        color: #fff;
        font-size: 28px/2;
        image{
          width: 24px/2;
          height: 21px/2;
          border-radius: 0%;
          margin-right: 12px/2;
        }
      }
      &:nth-last-child(1){
        border:none;
      }
    }
  }
  @keyframes pk_btn {
    0%{
      /*<!--margin-top:50px/2;-->*/
      transform:translateY(0)
    }
    40%{
      /*<!--margin-top:50px/2;-->*/
      transform:translateY(0)
    }
    42%{
      /*<!--margin-top:40px/2;-->*/
      transform:translateY(-10/2px)
    }
    48%{
      /*<!--margin-top:40px/2;-->*/
      transform:translateY(-10/2px)
    }
    50%{
      /*<!--margin-top:50px/2;-->*/
      transform:translateY(0)
    }
    52%{
      /*<!--margin-top:40px/2;-->*/
      transform:translateY(-10/2px)
    }
    58%{
      /*<!--margin-top:40px/2;-->*/
      transform:translateY(-10/2px)
    }
    60%{
      /*<!--margin-top:50px/2;-->*/
      transform:translateY(0)
    }
    100%{
      /*<!--margin-top:50px/2;-->*/
      transform:translateY(0)
    }
  }
  .pk_btn_box{
    background: #fff;
    border:4px/2 solid @bg_color;
    width: 538px/2;
    height: 70px/2;
    margin:0 auto;
    position: absolute;
    left:4px/2;
    top:-8px/2;
    z-index:-1;
    border-radius: 50px/2;
    box-sizing: border-box;
  }
  .tzbox{
    width: 100%;
    height:100%;
    background: @bg_color;
    position: absolute;
    z-index: 1;
    border-radius: 50px/2;
    display: flex;
    align-items: center;
    justify-content: center;
    top:0;
    left:0;
  }
  .pk_btn{
    position: relative;
    overflow: inherit;
    background: @bg_color;
    width: 538px/2;
    height: 70px/2;
    margin:0 auto;
    margin-top:50px/2;
    border:none;
    /*<!--margin-bottom:50px/2;-->*/
    color: #fff;
    font-size: 32px/2;
    border-radius: 50px/2;
    display: flex;
    align-items: center;
    justify-content: center;
    /*<!--box-shadow:#ffffff 4rpx -3rpx 0, #df5c3e 6rpx -7rpx 0;-->*/
    animation: pk_btn 3s linear infinite alternate;
    &:after{
      border:none;
    }
  }
  .phb_notdata{
    width: 100%;
    padding-top:432/2px;
    background: url("../../../static/img/phbj.jpg")no-repeat center 201/2px;
    background-size: 258/2px 215/2px;
    font-size: 22/2px;
    color: #c1272d;
    text-align: center;
    height: 790/2px;
    box-sizing: border-box;
  }
</style>
