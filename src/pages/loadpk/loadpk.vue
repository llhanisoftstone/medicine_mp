<template>
    <div class="bg">
      <image src="/static/img/pipei.jpg" class="bg_img"></image>
      <div class="bg_box">
        <div class="my">
          <image :src="userinfo.avatarUrl"></image>
        </div>
        <p class="myname">{{userinfo.nickName}}</p>
        <!--  load  or  vs -->
        <div class="load" :class="{'vs':vs}">
          <image src="/static/img/02.gif" v-if="!vs"></image>
          <image src="/static/img/vs.png" v-if="vs"></image>
        </div>
        <div class="vsuser">
          <image :src="vsuser.picpath"></image>
        </div>
        <p class="username">{{vsuser.nickName}}</p>
      </div>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'loadpk',
        data(){
            return {
                vs:false
            }
        },
        methods: {},
        components: {},
        computed:{
            userinfo(){
                return this.$store.state.userinfo
            },
            vsuser(){
                return this.$store.state.vsuser
            }
        },
        mounted(){
          this.$socket.on('data_chain', d=>{
              console.log(d)
            if(d.cmd == 'answer'){
              this.vs=true
              if(d.users){
                for(let i=0;i<d.users.length;i++){
                  if(d.users[i].id != this.$store.state.user.userid){
                    this.$store.commit('get_vsuser',d.users[i])
                  }
                }
              }
              if(d.content_type == 1){
                  if(d.step>1){
                      let that =this
                      setTimeout(function(){
                        that.$store.commit('get_answer',d.details[0])
                        that.$store.commit('get_step',d.step)
                      },1000)
                  }else{
                    this.$store.commit('get_answer',d.details[0])
                    this.$store.commit('get_step',d.step)
                  }
              }
              this.$store.commit('get_room',d.room_id)

              setTimeout(function(){
                  if(d.step == 1){
                    wx.navigateTo({
                      url:"/pages/pkanswer/main"
                    })
                  }
              },1500)
            }
          })
          this.$socket.emit('data_chain', {
            cmd:'fight',
            u_id:this.$store.state.user.userid,
            game_cfg_id:1,
            game_type:2
          })
        }
    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    @keyframes scale {
      1% {transform:scale(1.5);opacity: 0}
      50% {transform:scale(.7);opacity: .8}
      100%{transform: scale(1);opacity: 1}
    }
  .bg{
    width: 100%;
    position: relative;
    overflow: hidden;
    height: 100%;
    .bg_img{
      width: 100%;
      height: 1246px/2;
      display: block;
    }
    .bg_box{
      width: 100%;
      height: 100%;
      position: absolute;
      top:0;
      left:0;
      z-index:1;
      .my{
        position: absolute;
        left:26px/2;
        top:158px/2;
        width: 255px/2;
        height: 255px/2;
        border-radius: 50%;
        background: #fff;
        box-sizing: border-box;
        padding: 10px/2;
        image{
          width: 237px/2;
          height: 237px/2;
          border-radius: 50%;
        }
      }
    .vsuser{
      position: absolute;
      top:500px/2;
      right:30px/2;
      width: 255px/2;
      height: 255px/2;
      border-radius: 50%;
      background: #fff;
      box-sizing: border-box;
      padding: 10px/2;
      image{
        width: 237px/2;
        height: 237px/2;
        border-radius: 50%;
      }
    }
    }
  }
  .load{
    width: 217px/2;
    height: 217px/2;
    /*animation: rotate .8s linear infinite;*/
    position: absolute;
    top:348px/2;
    left:275px/2;
    image{
      width: 100%;
      height: 100%;
    }
  }
    .vs{
      animation: scale 1s ease 1;
      width: 347px/2;
      height: 275px/2;
      top:336px/2;
      left: 203px/2;
      z-index:3;
      image{
        width: 100%;
        height: 100%;
      }
    }
    .myname{
      position: absolute;
      top:435px/2;
      width: 255px/2;
      left:26px/2;
      font-size: 36px/2;
      color: #333;
      height: 36px/2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  .username{
    position: absolute;
    top:775px/2;
    width: 255px/2;
    right:30px/2;
    font-size: 36px/2;
    color: #333;
    height: 36px/2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
