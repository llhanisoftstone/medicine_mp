<template>
  <div>
    <div class="user_box">
      <h1>
        <image src="/static/img/suc.png" v-if="win==2"></image>
        <image src="/static/img/failt.png" v-if="win==0"></image>
      </h1>
      <div class="user">
        <div class="user_item" :class="{'success':win==2}">
          <div><i></i><image :src="userinfo.avatarUrl"></image></div>
          <h4>{{userinfo.nickName}}</h4>
          <p>{{myscore}}</p>
        </div>
      </div>
      <div class="cap_box">
        <capture :win="win" :iscard="iscard" :card="card"></capture>
      </div>
    </div>
    <div class="btn_box">
      <a href="" v-if="(win==2)&&isreward==0&&level<10" @click="toalone">挑战下一关</a>
      <a href="" v-if="win==0" @click="repeat">重新开始</a>
      <button open-type="share" v-if="win==2">分享战绩</button>
    </div>
  </div>
</template>

<script type="javascript">
  import capture from '../../components/capture.vue'
  export default {
    name: 'aloneresult',
    data(){
      return {
        win:2,    //2赢  1平局  0输
        iscard:false,
        card:{},
        isreward:0         //是否是首页进入的奖励关卡   0 不是
      }
    },
    methods: {
      cleardata(){
        this.win = 0
        this.iscard=false
        this.card={}
        this.isreward=0
      },
      toalone(){
        this.$socket.emit('data_chain',{
          cmd:'fight',
          u_id: this.$store.state.user.userid,
          game_cfg_id: 2,
          game_type:1,
          level:this.$store.state.level,
        })
//        wx.redirectTo({
//          url:'/pages/alone/main'
//        })
      },
      repeat(){
        let that =this
        if(this.isreward == 0){
          this.$socket.emit('data_chain',{
            cmd:'fight',
            u_id: that.$store.state.user.userid,
            game_cfg_id: 2,
            game_type:1,
            level:that.$store.state.level,
          })
        }else{
          this.$socket.emit('data_chain',{
            cmd:'fight',
            u_id: that.$store.state.user.userid,
            game_cfg_id: this.isreward,
            game_type:1,
            level:1,
          })
        }
      }
    },
    components: {
      capture
    },
    computed:{
      userinfo(){
        return this.$store.state.userinfo
      },
      level(){
        return this.$store.state.level
      }
    },
    mounted(){
      if(this.$store.state.prize.id){
        this.iscard = true
        this.card=this.$store.state.prize
        this.card.ticket_pic = this.$store.state.url + this.card.ticket_pic
      }
    },
    onShareAppMessage(res){
        let that =this
        let til = ''
      if(that.isreward == 0){
            til = '@你 答题赢礼品，千种礼券任你选'
      }else{
          til = '@你 20枚银两get，下一关等你哦~'
      }
      if (res.from === 'menu') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '分享战绩',
        path: '/pages/index/main',
        success: (r)=>{
          console.log(r)
        },
        fail: (err)=>{
          console.log(err)
        }
      }
    },
    onLoad(option){
      this.cleardata()
      this.win=option.result
      if(option.id){
        this.isreward=option.id
        wx.setNavigationBarTitle({
          title:`挑战结果`
        })
      }else{
        this.isreward=0
        wx.setNavigationBarTitle({
          title:`闯关结果`
        })
      }
      let that=this
      that.$socket.on('data_chain',d=>{
        if(d.cmd == 'answer'){
          if(d.step==1&&d.level==that.$store.state.level){
            console.log(d)
            that.$store.commit('get_answer',d.details[0])
            that.$store.commit('get_step',d.step)
            that.$store.commit('get_room',d.room_id)
            that.$store.commit('get_level',d.level)
            that.$store.commit('get_max_nub',d.max_step)
            that.$socket.removeAllListeners('data_chain')
            if(that.id!=0){
              wx.redirectTo({
                url:`/pages/alone/main?id=${that.isreward}`
              })
            }else{
              wx.redirectTo({
                url:'/pages/alone/main'
              })
            }
          }
        }
      })
    }

  }
</script>

<style lang="less" scoped>
  @import '../../static/less/common.less';
  .user_box{
    width: 592px/2;
    height: 702px/2;
    background: #ffb3a2;
    border-radius: 30px/2;
    position: fixed;
    top:166px/2;
    left:0;
    right:0;
    margin:auto;
  h1{
    position: absolute;
    top:-71px/2;
    left:0;
    right:0;
    width: 493px/2;
    height: 110px/2;
    margin:auto;
  image{
    width: 100%;
    height: 100%;
  }
  }
  .user{
    padding: 113px/2 61px/2 29px/2;
    width: 100%;
    height: auto;
    display: flex;
    box-sizing: border-box;
    justify-content: center;
  .user_item{
    flex-wrap: wrap;
    width: 159px/2;
    align-content: center;
    align-items: center;
    display:flex;
  div{
    width: 159px/2;
    height: 159px/2;
    border-radius: 50%;
    position: relative;
    box-sizing: border-box;
  image{
    width: 150px/2;
    height: 150px/2;
    border-radius: 50%;
    border:9px/4 solid #ffffff;
  }
  }
  h4{
    margin-top:15px/2;
    font-size: 28px/2;
    color: #333;
    width: 159px/2;
    white-space: nowrap;
    height: 28px/2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p{
    width: 159px/2;
    white-space: nowrap;
    margin-top:12px/2;
    font-size: 28px/2;
    color: #333;
    height: 28px/2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  }
  .success{
  div{
  image{
    border:9px/4 solid @bg_color;
  }
  i{
    background: url(../../../static/img/sucu.png) center no-repeat;
    background-size: 100px/2 78px/2;
    display: block;
    width: 100px/2;
    height: 78px/2;
    position: absolute;
    top:-41px/2;
    left:-25px/2;
  }
  }
  }
  .fail{
  div{
  image{
    border:9px/4 solid @bg_color;
  }
  i{
    background: url(../../../static/img/sucv.png) center no-repeat;
    background-size: 96px/2 87px/2;
    display: block;
    width: 96px/2;
    height: 87px/2;
    position: absolute;
    top:-39px/2;
    right:-31px/2;
  }
  }
  }
  .vs_icon{
    width: 78px/2;
  image{
    width: 78px/2;
    height: 60px/2;
    margin-top:49px/2;
  }
  }
  }
  }
  .cap_box{
    width: 500px/2;
    margin:0 auto;
  }
  .btn_box{
    position: fixed;
    top:906px/2;
    width: 100%;
    left:0;
    height: 70px/2;
    padding: 0 66px/2;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-around;
    display: flex;
  a{
    width: 300px/2;
    height: 70px/2;
    border-radius: 50px;
    background: @bg_color;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size:32px/2;
  }
  button{
    width: 300px/2;
    height: 70px/2;
    border-radius: 50px;
    background: @bg_color;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size:32px/2;
    margin:0;
  }
  }
</style>
