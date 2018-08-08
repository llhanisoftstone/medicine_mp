<template>
    <div class="c_map">
      <image src="/static/img/bg.png" class="bg"></image>
      <ul class="c_box">
        <li :class="{'pass':v<level,'on':v==level}" v-for="(v,i) in levelarr" @click="showpick(v)">
          <div class="nub" v-if="v!=5&&v!=10">{{v}}</div>
          <div class="nub" v-if="v==5||v==10"></div>
          <div class="user" v-if="v==level">
            <image :src='imgurl'></image>
          </div>
          <div class="gift gift_t" v-if="v==5">
            <i class="a_up"></i>
            <p>她未来10元代金券</p>
          </div>
          <div class="gift gift_r" v-if="v==10">
            <p>瑄府燕窝128元代金券</p>
            <i class="a_right"></i>
          </div>
        </li>
      </ul>
      <div class="bg_shade" v-if="isshow" @click="hidepick">
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
    </div>
</template>

<script type="javascript">
    export default {
        name: 'challengemap',
        data(){
            return {
              isshow:false,    //弹窗状态
              levelarr:[1,2,3,4,5,6,7,8,9,10],   //全部关卡
//              level:3,       //自己的关卡
              select:0,    //选择的关卡
              game_type:-1     //单人 1   多人 2
            }
        },
        methods: {
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
        let that=this
        if (res.from === 'menu') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        return {
          title: '@你 助力好友一起闯关吧~',
          path: `/pages/team/main?id=${that.$store.state.user.userid}&&ismy=1`,
          imageUrl: `${that.$store.state.url}/admin/img/team.jpg`,
          success: (r)=>{
            that.team()
          },
          fail: (err)=>{
            console.log(err)
          }
        }
      },
        components: {},
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
       }
      &:nth-of-type(2){
         left:330px/2;
         top: 122px/2;
       }
      &:nth-of-type(3){
         left:573px/2;
         top: 145px/2;
       }
      &:nth-of-type(4){
         left:89.06%;
         top: 287px/2;
       }
    &:nth-of-type(5){
       left:432px/2;
       top: 459px/2;
      background: transparent;
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
       }
      &:nth-of-type(7){
         left:114px/2;
         top: 674px/2;
       }
      &:nth-of-type(8){
         left:356px/2;
         top: 743px/2;
       }
      &:nth-of-type(9){
         left:614px/2;
         top: 781px/2;
       }
      &:nth-of-type(10){
         left:308px/2;
         top: 952px/2;
         background: transparent;
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
        background: #df5c3e;
        background: linear-gradient(135deg,#f4c8be 0%, #df5c3e 50% ,#b54b32 100%);
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
        background: #df5c3e;
        background: linear-gradient(135deg,#f4c8be 0%, #df5c3e 50% ,#b54b32 100%);
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
</style>
