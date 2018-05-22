<template>
    <div>
      <div class="user_box">
        <h1>
          <image src="/static/img/suc.png" v-if="myscore>vsscore"></image>
          <image src="/static/img/pjt.png" v-if="myscore==vsscore"></image>
          <image src="/static/img/failt.png" v-if="myscore<vsscore"></image>
        </h1>
        <div class="user">
          <div class="user_item" :class="{'success':myscore>vsscore}">
            <div><i></i><image :src="userinfo.avatarUrl"></image></div>
            <h4>{{userinfo.nickName}}</h4>
            <p>{{myscore}}</p>
          </div>
          <div class="vs_icon"><image src="/static/img/vsresult.png"></image></div>
          <div class="user_item " :class="{'fail':myscore<vsscore}">
            <div><i></i><image :src="vsuser.picpath"></image></div>
            <h4>{{vsuser.nickname}}</h4>
            <p>{{vsscore}}</p>
          </div>
        </div>
        <div class="cap_box">
          <capture :win="win" :iscard="iscard" :card="card"></capture>
        </div>
      </div>
      <div class="btn_box">
        <a :href="'/pages/loadpk/main?from='+from">再来一局</a>
        <button open-type="share">分享战绩</button>
      </div>
    </div>
</template>

<script type="javascript">
  import capture from '../../components/capture.vue'
    export default {
        name: 'result',
        data(){
            return {
                win:0,
                iscard:false,
                card:{},
                from: 2
            }
        },
        methods: {},
        components: {
            capture
        },
        computed:{
          userinfo(){
              return this.$store.state.userinfo
          },
          vsuser(){
              return this.$store.state.vsuser
          },
          myscore(){
              return this.$store.state.myscore
          },
          vsscore(){
              return this.$store.state.vsscore
          }
        },
      mounted(){
           if(this.$store.state.myscore>this.$store.state.vsscore) {
               this.win = 2
           }else if(this.$store.state.myscore == this.$store.state.vsscore){
               this.win = 1
           }else if(this.$store.state.myscore < this.$store.state.vsscore){
             this.win = 0
           }
      },
      onShareAppMessage(res){
        if (res.from === 'menu') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        return {
          title: '分享战绩',
          path: '/pages/result/main',
          success: (r)=>{
            console.log(r)
          },
          fail: (err)=>{
            console.log(err)
          }
        }
      },
      onLoad(option){
          this.from = option.from
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
      justify-content: space-between;
      .user_item{
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
      height: 28px/2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    p{
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
    margin-top:906px/2;
    height: 70px/2;
    padding: 0 66px/2;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
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
