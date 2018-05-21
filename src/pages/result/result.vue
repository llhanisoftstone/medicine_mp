<template>
    <div>
      <div class="user_box">
        <h1><image src="/static/img/suc.png"></image></h1>
        <div class="user">
          <div class="user_item success">
            <div><i></i><image :src="userinfo.avatarUrl"></image></div>
            <h4>{{userinfo.nickName}}</h4>
            <p>{{myscore}}</p>
          </div>
          <div class="vs_icon"><image src="/static/img/vsresult.png"></image></div>
          <div class="user_item fail">
            <div><i></i><image :src="vsuser.picpath"></image></div>
            <h4>{{vsuser.nickname}}</h4>
            <p>{{vsscore}}</p>
          </div>
        </div>
      </div>
      <capture></capture>
    </div>
</template>

<script type="javascript">
  import capture from '../../components/capture.vue'
    export default {
        name: 'result',
        data(){
            return {}
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
</style>
