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
            <p>小竹签50元代金券</p>
          </div>
          <div class="gift gift_r" v-if="v==10">
            <p>小竹签80元代金券</p>
            <i class="a_right"></i>
          </div>
        </li>
      </ul>
      <div class="bg_shade" v-if="isshow" @click="hidepick">
        <div class="pick_box" @click.stop="prevent">
          <div class="pick_t"><image src="/static/img/yaoqing_2.png"></image></div>
          <div class="pick_item_box">
            <div class="pick_item" @click="alone"><a href=""><image src="/static/img/yaoqing_3.png"></image><p>闯关侠</p></a></div>
            <div  class="pick_item"><button open-type="share"><image src="/static/img/yaoqing_1.png"></image><p>邀请好友助阵</p></button></div>
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
          title: '邀请好友助阵',
          path: `/pages/team/main?id=${that.$store.state.user.userid}`,
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

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .c_map{
      width: 100%;
      height: auto;
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
      background: #ffbeaf;
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
        background: #ffbeaf;
        box-sizing: border-box;
        align-items: center;
        border-radius: 50%;
        display: flex;
        justify-content: center;
      }
      .gift{
        position: absolute;
        top:14px/2;
        left:-38px/2;
        width: 205px/2;
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
        width: 217px/2;
        display: flex;
        top:-8px/2;
        left:-176px/2;
        align-items: center;
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
         left:668px/2;
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
    height: 416px/2;
    border-radius: 30px/2;
    background: #ffb3a2;
    position: absolute;
    top:316px/2;
    left:0;
    right:0;
    margin:auto;
  }
  .pick_t{
    position: absolute;
    top:-61px/2;
    left:0;
    right:0;
    margin: auto;
    width: 493px/2;
    z-index:2;
    height: 110px/2;
    image{
      width: 100%;
      height: 100%;
    }
  }
    .pick_item_box{
      width: 100%;
      height: 100%;
      padding: 88px/2 51px/2 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
    }
  .pick_item{
    width: 210px/2;
    padding: 0;
    margin:0;
    background: transparent;
    border:none;
    position: inherit;
    height: 100%;
  button{
    background: transparent;
    padding:0;
    margin:0;
    display: inline;
  }
    image{
      width: 210px/2;
      height: 209px/2;
      box-shadow: #acacac 0 6px/2 7px/2;
      border-radius: 25px/2;
      display: block;
      margin-bottom:21px/2;
    }
    p{
      font-size: 30px/2;
      color: #fff;
      line-height: 30px/2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
