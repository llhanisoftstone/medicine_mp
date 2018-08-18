<template>
    <div class="c_map">
      <image src="/static/img/bg.jpg" class="bg"></image>
      <div class="gzbtn" @click.stop="showgz()">游戏规则</div>
      <ul class="c_box">
        <li :class="{'pass':v<level,'on':v==level}" v-for="(v,i) in levelarr" @click="showpick(v)">
          <div class="nub" v-if="v!=5&&v!=10">{{v}}</div>
          <div class="nub" v-if="v==5||v==10"></div>
          <div class="user" v-if="v==level">
            <image :src='imgurl'></image>
          </div>
          <div class="prizebox1" v-if="v==5">
            <image src="/static/img/5guan.png"></image>
          </div>
          <div class="prizebox2" v-if="v==10">
            <image src="/static/img/10guan.png"></image>
          </div>
          <div class="gift gift_t" v-if="v==5" @click="showpick(v)">
            <i class="a_up"></i>
            <p>她未来10元代金券</p>
          </div>
          <div class="gift gift_r" v-if="v==10" @click="showpick(v)">
            <p>瑄府燕窝128元代金券</p>
            <i class="a_right"></i>
          </div>
          <div class="tips1 tips" v-if="tips!=-1&&tips!=5&&tips!=10&&v==tips">
            <image src="/static/img/guanqia.png" ></image>
            <p>到达该关<br>再来玩吧!</p>
          </div>
          <div class="tips2 tips" v-if="(tips==5||tips==10)&&v==tips">
            <image src="/static/img/cliwu.png" ></image>
            <p>还差{{tipsprize}}关才能<br>拿到哦!加油!加油</p>
          </div>
        </li>
      </ul>
      <div class="bg_shade" v-if="isshow" @click="hidepick" catchtouchmove='true'>
        <div class="pick_box" @click.stop="prevent">
          <h2>闯关人数</h2>
          <div class="pick_item_box">
            <div class="pick_item" @click="alone">
              <!--<a href="">-->
                <image src="/static/img/yaoqing_3.png"></image>
                <div>
                  <p>美貌与智慧并存的你</p>
                  <p>一个人去攻城拔寨吧</p>
                  <a><i>单人闯关</i></a>
                </div>
              <!--</a>-->
            </div>
            <div class="pick_item">
                <image src="/static/img/yaoqing_1.png"></image>
                <div>
                  <p>喊上小伙伴，</p>
                  <p>一起组团闯关更靠谱！</p>
                  <i class="btn_box">
                    <button open-type="share">组团闯关</button>
                  </i>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg_shade gzk" v-if="gzshow" @click="hidegz" catchtouchmove='true'>
        <div class="pick_box" @click.stop="">
          <h2>游戏规则</h2>
          <div class="pick_item_box">
            <p><i>1</i>闯关分为单人闯关和多人闯关，多人闯关可邀请好友一起参加；</p>
            <p><i>2</i>每答对一题可增加10经验值；</p>
            <p><i>3</i>每过一关过关可获得20银两；</p>
            <p><i>4</i>第5和第10关为礼物关，过关可获得神秘大礼，可在个人中心-战利品中查看。</p>
            <div class="closebtn" @click="hidegz">我知道了</div>
          </div>
        </div>
      </div>
      <mptoast/>
    </div>
</template>

<script type="javascript">
  import mptoast from '../../components/mptoast';
    export default {
        name: 'challengemap',
        data(){
            return {
              isshow:false,    //弹窗状态
              gzshow:false,
              levelarr:[1,2,3,4,5,6,7,8,9,10],   //全部关卡
//              level:3,       //自己的关卡
              select:0,    //选择的关卡
              game_type:-1,     //单人 1   多人 2
              tips:-1,           //显示提示信息
              tipsprize:0        //提示关卡
            }
        },
        methods: {
          showgz(){
            this.gzshow=true;
          },
          hidegz(){
            this.gzshow=false;
          },
          watchsocket(){
            let that=this
            that.$socket.removeAllListeners('data_chain')
            that.$socket.on('data_chain',d=>{
              if(d.cmd == 'answer'&&that.game_type==1){
                if(d.step==1&&d.level==that.select){
                  console.log(d)
                  that.$store.commit('get_answer',d.details[0])
                  that.$store.commit('get_step',d.step)
                  that.$store.commit('get_room',d.room_id)
                  that.$store.commit('get_level',d.level)
                  that.$store.commit('get_max_nub',d.max_step)
                  that.isshow=false
                  wx.navigateTo({
                    url:'/pages/alone/main'
                  })
                }
              }else if(d.cmd == 'fight'){
                if(d.style == 1){
                  that.$store.commit('get_room',d.room_id)
                  that.$store.commit('get_level',that.select)
                  that.isshow=false
                  wx.navigateTo({
                    url:`/pages/team/main?id=${that.$store.state.user.userid}`
                  })
                }
              }
            })
          },
          showpick(v){
            if(this.level<v){
                if(this.tips!=-1){
                    return
                }
              let gaplevel=v-this.level;
              this.tips=v
              if(v==5 || v==10){
                this.tipsprize = gaplevel
              }
              setTimeout(()=>{
                this.tips=-1
                this.tipsprize=0
              },2000)
              return
            }
            this.isshow=true
            this.select=v
          },
          hidepick(){
            this.isshow=false
            this.select=this.level
          },
          prevent(){},       //阻止冒泡
          alone(){
              let that=this
              this.game_type=1
              this.$socket.emit('data_chain',{
                  cmd:'fight',
                  u_id: that.$store.state.user.userid,
                  game_cfg_id: 2,
                  game_type:1,
                  level:that.select
              })
          },
          team(){
              let that =this
            this.game_type=2
            if(that.select == 0){
                  that.select = that.level
            }
            that.$socket.emit('data_chain',{
                cmd:'fight',
                u_id: that.$store.state.user.userid,
                game_cfg_id: 2,
                game_type:2,
                level:that.select,
                game_style:1
              })
          }
        },
      onShareAppMessage(res){
        let that=this;
        let title='@你 助力好友一起闯关吧~';
        let img=`${that.$store.state.url}/admin/img/team.jpg`;
        let url=`/pages/authmulti/main?`+`pages=team&&ismy=1&&id=${that.$store.state.user.userid}`
        if (res.from === 'menu') {
          // 来自页面内转发按钮
          title='边玩边学，游戏学习两不误！';
          img=`${that.$store.state.url}/admin/img/1.jpg`;
          url='/pages/index/main';
          console.log(res.target)
        }
        return {
          title:title,
          path: url,
          imageUrl: img,
          success: (r)=>{
            that.team()
          },
          fail: (err)=>{
            console.log(err)
          }
        }
      },
        components: {
          mptoast
        },
        computed:{
            imgurl(){
                return this.$store.state.userinfo.avatarUrl
            },
            level(){
                  return this.$store.state.user.game_level
            }
        },
      onLoad(){
        wx.hideShareMenu()
           this.watchsocket()
      },
      onShow(){
        this.watchsocket()
      },
      onUnload(){
          this.isshow=false
      }
    }
</script>

<style>
  page{
    height:100%;
  }
</style>
<style lang="less" scoped>
    @import '../../static/less/common.less';
    @keyframes showan {
      0%{
        opacity: 0;
        transform: scale(0);
      }
      75%{
        opacity: 1;
        transform: scale(1.05);
      }
      100%{
        opacity: 1;
        transform: scale(1);
      }
    }
    @keyframes gift {
      1% {
        transform: translate(0, 0) rotate(6.5deg)
      }

      2% {
        transform: translate(0, 0) rotate(3.5deg)
      }

      3% {
        transform: translate(0, 0) rotate(-3.5deg)
      }

      4% {
        transform: translate(0, 0) rotate(5.5deg)
      }

      5% {
        transform: translate(0, 0) rotate(-4.5deg)
      }

      6% {
        transform: translate(0, 0) rotate(-4.5deg)
      }

      7% {
        transform: translate(0, 0) rotate(-6.5deg)
      }

      8% {
        transform: translate(0, 0) rotate(2.5deg)
      }

      9% {
        transform: translate(0, 0) rotate(-5.5deg)
      }

      10% {
        transform: translate(0, 0) rotate(.5deg)
      }

      11% {
        transform: translate(0, 0) rotate(-3.5deg)
      }

      12% {
        transform: translate(0, 0) rotate(-6.5deg)
      }

      13% {
        transform: translate(0, 0) rotate(6.5deg)
      }

      14% {
        transform: translate(0, 0) rotate(1.5deg)
      }

      15% {
        transform: translate(0, 0) rotate(-5.5deg)
      }

      16% {
        transform: translate(0, 0) rotate(7.5deg)
      }

      17% {
        transform: translate(0, 0) rotate(-3.5deg)
      }

      18% {
        transform: translate(0, 0) rotate(7.5deg)
      }

      19% {
        transform: translate(0, 0) rotate(-5.5deg)
      }

      20% {
        transform: translate(0, 0) rotate(3.5deg)
      }
      0%,21%,50%,100% {
        transform: translate(0, 0) rotate(0)
      }
    }
    .prizebox1{
      width: 96px/2;
      height: 105px/2;
      position: absolute;
      top:-93px/2;
      left:14px/2;
      animation: gift 3s infinite;
      image{
        width: 96px/2;
        height: 105px/2;
      }
    }
    .prizebox2{
      width: 133px/2;
      height: 145px/2;
      position: absolute;
      top:-54px/2;
      left:36px/2;
      animation: gift 3.4s infinite;
      image{
        width: 133px/2;
        height: 145px/2;
      }
    }
    .tips1{
      width: 147px/2;
      height: 115px/2;
      position: relative;
      transform: rotate(20deg);
      image{
        width: 147px/2;
        height: 115px/2;
      }
      p{
        font-size: 20px/2;
        position: absolute;
        top:34px/2;
        left:32px/2;
        line-height: 23px/2;
        width: 120px/2;
      }
    }
    .tips2{
      width: 255px/2;
      height: 202px/2;
      image{
        width: 255px/2;
        height: 202px/2;
      }
      p{
        text-align: center;
        font-size: 28px/2;
        position: absolute;
        top:60px/2;
        left:24px/2;
        line-height: 31px/2;
      }
    }
    .c_map{
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
    .bg{
      width: 100%;
      height: 1246px/2;
      display: block;
    }
  .c_box{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 1246px/2;
    li{
      position: absolute;
      width: 72px/2;
      height: 72px/2;
      background: #c2c2c2;
      color: #fff;
      font-size:45px/2;
      padding: 6px/2;
      box-sizing: border-box;
      border-radius: 50%;
      z-index: 5;
      margin-top: -35px/2;
      margin-left: -35px/2;
      .nub{
        width: 100%;
        height: 100%;
        border:4px/2 solid #fff;
        background: #c2c2c2;
        box-sizing: border-box;
        align-items: center;
        border-radius: 50%;
        display: flex;
        justify-content: center;
      }
      .gift{
        position: absolute;
        top:-60px/2;
        left:-26px/2;
        width: 185px/2;
        padding-top: 80px/2;
        height: auto;
        .a_up{
          display: block;
          margin:0 auto;
          width: 23px/2;
          height: 11px/2;
          box-sizing: border-box;
          border-bottom:11px/2 solid @bg_color;
          border-left:23px/4 solid transparent;
          border-right:23px/4 solid transparent;
        }
        .a_right{
          display: block;
          margin:0 auto;
          width: 11px/2;
          height: 23px/2;
          box-sizing: border-box;
          border-bottom:23px/4 solid transparent;
          border-top:23px/4 solid transparent;
          border-left:11px/2 solid @bg_color;
        }
        p{
          padding: 15px/2 13px/2;
          background: @bg_color;
          line-height: 35px/2;
          font-size:30px/2;
          color: #fff;
          border-radius: 10px/2;
        }
      }
      .gift_r{
        width: 215px/2;
        display: flex;
        top:-8px/2;
        left:-246.6%;
        align-items: center;
        padding-top: 0;
       }
      &:nth-of-type(1){
         left:70px/2;
         top: 180px/2;
        .tips{
          position: absolute;
          top:-120px/2;
          left:-20px/2;
        }
       }
      &:nth-of-type(2){
         left:330px/2;
         top: 122px/2;
        .tips{
          position: absolute;
          top:-80px/2;
          left:0px/2;
        }
       }
      &:nth-of-type(3){
         left:573px/2;
         top: 145px/2;
        .tips{
          position: absolute;
          top:-100px/2;
          left:0px/2;
        }
      }
      &:nth-of-type(4){
         left:89.06%;
         top: 287px/2;
        .tips{
          position: absolute;
          top:-100px/2;
          left:-30px/2;
        }
       }
    &:nth-of-type(5){
       left:432px/2;
       top: 459px/2;
      background: transparent;
      .tips{
        position: absolute;
        top:-290px/2;
        left:-70px/2;
        transform: rotate(15deg);
      }
      .nub{
        background: transparent;
        border-color:transparent;
      }
      .user{
        margin-top:-77px/2;
        margin-left:17px/2;
      }
     }
      &:nth-of-type(6){
         left:205px/2;
         top: 498px/2;
        .tips{
          position: absolute;
          top:-110px/2;
          left:-40px/2;
        }
       }
      &:nth-of-type(7){
         left:114px/2;
         top: 674px/2;
        .tips{
          position: absolute;
          top:-110px/2;
          left:-40px/2;
        }
       }
      &:nth-of-type(8){
         left:356px/2;
         top: 743px/2;
        .tips{
          position: absolute;
          top:-110px/2;
          left:-40px/2;
        }
       }
      &:nth-of-type(9){
         left:614px/2;
         top: 781px/2;
        .tips{
          position: absolute;
          top:-110px/2;
          left:-40px/2;
        }
       }
      &:nth-of-type(10){
         left:308px/2;
         top: 952px/2;
         background: transparent;
        .tips{
          position: absolute;
          top:-210px/2;
          left:80px/2;
          transform: rotate(35deg);
        }
        .nub{
          background: transparent;
          border-color:transparent;
        }
    .user{
      margin-top:-4px/2;
      margin-left:56px/2;
    }
       }
    }
    .pass{
      background: @bg_color;
      .nub{
        background: @bg_color;
      }
    }
    .on{
      .nub{
          display: none;
      }
      .user{
        width: 88px/2;
        height: 88px/2;
        border-radius: 50%;
        margin-top:-7px/2;
        margin-left: -7px/2;
        image{
          width: 82px/2;
          height: 82px/2;
          border-radius: 50%;
          border:4px/2 solid #fff;
        }
      }
    }
  }
    .bg_shade{
      width: 100%;
      height: 100%;
      position: fixed;
      top:0;
      left:0;
      background: rgba(0,0,0,.7);
      z-index:10;
      &.gzk{
        .pick_item_box{
          padding: 31/2px 34/2px
        }
        p{
          position: relative;
          padding: 0 0 10/2px 52/2px;
          line-height: 35/2px;
          color: #333;
          font-size: 26/2px;
          i{
            position: absolute;
            top:3/2px;
            left:0;
            width: 31/2px;
            height:31/2px;
            border-radius: 50%;
            color: #fff;
            text-align: center;
            line-height: 31/2px;
            background: #df5c3e;
          }
        }
        .closebtn{
          position: absolute;
          left:0;
          right:0;
          bottom:37/2px;
          width: 227/2px;
          height: 67/2px;
          border-radius: 67/4px;
          margin:0 auto;
          font-size: 30/2px;
          line-height: 67/2px;
          text-align: center;
          background: #df5c3e;
          color: #fff;
        }
      }
    }
  .pick_box{
    width: 560px/2;
    height: 508px/2;
    border-radius: 30px/2;
    background: #ffffff;
    position: absolute;
    top:224px/2;
    left:0;
    right:0;
    margin:auto;
    animation: showan .3s ease;
    padding-top: 36px/2;
    padding-bottom: 6px/2;
    box-sizing: border-box;
    h2{
      font-size: 41px/2;
      color: #fff;
      width: 100%;
      height: 69px/2;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #df5c3e;
    }
  }

    .pick_item_box{
      width: 100%;
      height: 100%;
      padding: 0 54px/2;
      box-sizing: border-box;
    }
  .pick_item{
    width: 100%;
    background: transparent;
    border:none;
    position: inherit;
    height: 198px/2;
    padding: 35px/2 43px/2;
    box-sizing: border-box;
    border-bottom:1px/2 solid #e2e2e2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    image{
      width: 127px/2;
      height: 127px/2;
      box-shadow: #acacac 0 6px/2 7px/2;
      border-radius: 10px/2;
      display: block;
    }
    div{
      p{
        font-size: 20px/2;
        color: #666;
        line-height: 20px/2;
        padding-bottom: 4px/2;
        text-align: center;
      }
      a{
        margin-top:20px/2;
        font-size: 30px/2;
        color: #fff;
        width: 191px/2;
        height: 48px/2;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50px/2;
        background: linear-gradient(150deg,#f4c8be 0%, #df5c3e 50% ,#b54b32 100%);
        box-shadow: 1px 1.5px 1px 1px rgba(0,0,0,.2);
        i{
          width: 183px/2;
          height: 40px/2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px/2;
          color: #fff;
          background: #df5c3e;
          border-radius: 50px/2;

        }
      }
      .btn_box{
        margin-top:20px/2;
        font-size: 30px/2;
        color: #fff;
        width: 191px/2;
        height: 48px/2;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50px/2;
        background: linear-gradient(150deg,#f4c8be 0%, #df5c3e 50% ,#b54b32 100%);
        box-shadow: 1px 1.5px 1px 1px rgba(0,0,0,.2);
        button{
          width: 183px/2;
          height: 40px/2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px/2;
          color: #fff;
          background: #df5c3e;
          border-radius: 50px/2;
          box-shadow: none;
          border:none;
          &:after {

            border: none;

          }
        }
      }
    }
  }
  .pick_item:nth-last-child(1){
    border:none;
  }
  .gzbtn{
    position: absolute;
    right:0;
    top:0;
    padding: 29/2px;
    font-size: 26/2px;
    color: #fff;
    z-index: 10;
  }
</style>
