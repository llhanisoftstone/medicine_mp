<template>
    <div>
      <div class="survey-box"
      >
        <!--game_cfg_id写死为9，type:题目类型，0单选，1问卷题目-->
        <image src="/static/img/top_bg.png"></image>
      </div>
      <ul class="selectitem">
        <a :href="'/pages/loadpk/main?from=2&&pid='+pid" ><li class="loadpk"><div class="loadimg"></div><div class="rightness"><p class="pktitle"></p><br><span>冲顶排位赛，一触即发！</span></div></li></a>
        <button open-type="share"><li class="friendpk"><div class="friendimg"></div><div class="rightness"><p class="pktitle"></p><br><span>真正的友谊经得起挑战，看看谁跟我志同道合！</span></div></li></button>
        <a :href="'/pages/challengemap/main?category=1&&pid='+pid"><li class="alone"><div class="aloneimg"></div><div class="rightness"><p class="pktitle"></p><br><span>美貌与智慧并存的你，一个人去攻城拔寨吧！</span></div></li></a>
        <a :href="'/pages/challengemap/main?category=2&&pid='+pid"><li class="challengemap"><div class="challengeimg"></div><div class="rightness"><p class="pktitle"></p><br><span>喊上小伙伴，一起组团更靠谱！</span></div></li></a>
      </ul>
      <a :href="'/pages/friendpk/main?pid='+pid">
      <div class="friendpkitem"></div>
      </a>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'pkselect',
        props: [],
        data(){
            return {
              pid:'',
            }
        },
        methods: {},
      computed:{
        user(){
          return this.$store.state.user
        }
      },
      onShareAppMessage(res){
        let that = this;
        let title='@你 有人向你发起挑战，点击应战~';
        let img=`${that.$store.state.url}/admin/img/7.jpg`;
        let url=`/pages/authfight/main?`+`pages=loadpk&&from=1&&id=${this.$store.state.user.userid}&&pid=${this.pid}`
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
              url:"/pages/loadpk/main?from=1&&pid="+this.pid
            })
          },
          fail: (err)=>{
            console.log(err)
          }
        }
      },
        onLoad: function (option) {
          this.pid=option.pid;
        }

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .survey-box{
      box-sizing: border-box;
      width:100%;
      border-top:1px solid #fff;
      image{
        width:100%;
        height:200px/2;
        max-width:100%;
      }
    }
  .selectitem{
    padding:0 25px 25px 25px;
    box-sizing:border-box;
    button{
      padding:0;
      line-height:normal;
      overflow:inherit;
    }
    li{
      width:100%;
      box-sizing:border-box;
      padding:38px/2 0 38px/2 36px/2;
      margin-top:36px/2;
      border-radius:5px;
      display:flex;
      justify-content: flex-start;
      align-items: center;
      .rightness{
        padding-top:2px;
      }
      .rightness span{
        font-size:22px/2;
        color:#fff;
      }
    }
    .loadpk{
      background:#15cb7a;
      .loadimg{
        background:url(../../../static/img/quanwang.png) no-repeat center center;
        background-size:80px/2 82px/2;
        width:80px/2;
        height:82px/2;
        margin-right:36px/2;
      }
      .pktitle{
        background:url(../../../static/img/quanwang01.png) no-repeat center center;
        background-size:190px/2 40px/2;
        width:190px/2;
        height:40px/2;
      }
    }
    .friendpk{
      background:#43a0f6;
      .friendimg{
        background:url(../../../static/img/haoyoupk.png) no-repeat center center;
        background-size:80px/2 82px/2;
        width:80px/2;
        height:82px/2;
        margin-right:36px/2;
      }
      .pktitle{
        background:url(../../../static/img/haoyou01.png) no-repeat center center;
        background-size:190px/2 40px/2;
        width:190px/2;
        height:40px/2;
      }
    }
    .alone{
      background:#8180f8;
      .aloneimg{
        background:url(../../../static/img/danrenchuangguan.png) no-repeat center center;
        background-size:84px/2 75px/2;
        width:80px/2;
        height:82px/2;
        margin-right:36px/2;
      }
      .pktitle{
        background:url(../../../static/img/danren.png) no-repeat center center;
        background-size:190px/2 40px/2;
        width:190px/2;
        height:40px/2;
      }
    }
    .challengemap{
      background:#f35c53;
      .challengeimg{
        background:url(../../../static/img/duoren.png) no-repeat center center;
        background-size:78px/2 82px/2;
        width:80px/2;
        height:82px/2;
        margin-right:36px/2;
      }
      .pktitle{
        background:url(../../../static/img/duoren01.png) no-repeat center center;
        background-size:175px/2 35px/2;
        width:190px/2;
        height:40px/2;
      }
    }
  }
  .friendpkitem{
    margin:25px/2 auto 30px/2;
    background:url(../../../static/img/paiming.png) no-repeat center center;
    background-size:133px/2 133px/2;
    width:133px/2;
    height:133px/2;
    box-shadow:2.5px 2.5px 2.5px rgba(7,55,96,0.75);
    border-radius:50%;
  }
</style>
