<template>
    <div class="user_box">
      <image src="/static/img/touxiang.png" class="user_bg"></image>
      <div class="user_info">
        <div class="img_box" >
          <image :src='imgurl' v-if="isauth"></image>
          <button open-type="getUserInfo" v-if="!isauth" :_id="isauth" class="btn_auth" @getuserinfo="bindGetUserInfo"></button>
        </div>
        <p v-if="isauth">{{username}}</p>
        <slot name="userRight" class="slot_box"></slot>
      </div>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'userinfo',
        props: ['imgurl','username'],
        data(){
            return {

            }
        },
        methods: {
          bindGetUserInfo: function(e) {
            let that = this
            console.log(e)
            console.log(e.target.userInfo)
            that.$store.commit('getuser', e.target.userInfo)
            that.$store.commit('getauth')
            that.$get('/weapp/login',{code:that.$store.state.code,encryptedData:e.target.encryptedData,iv:e.target.iv}).then(res=>{
              console.log(res)
            })
          }
        },
        computed:{
          isauth(){
              return this.$store.state.isauth
          }
        },

    }
</script>

<style lang="less" scoped>
    @import '../static/less/common.less';
    .user_box{
      width: 100%;
      height: 194px/2;
      padding: 0 26px/2;
      position:relative;
      .user_bg{
        width: 698px/2;
        height: 194px/2;
        position: absolute;
        top:0;
        left:26px/2;
        z-index:0;
      }
      .user_info{
        position: absolute;
        left:26px/2;
        width: 698px/2;
        height: 194px/2;
        z-index:2;
        align-items: center;
        justify-content: flex-start;
        box-sizing: border-box;
        padding-right: 31px/2;
        display: flex;
        .img_box{
          width: 135px/2;
          height: 135px/2;
          border-radius: 50%;
          background: #fff;
          border:3px solid #fff;
          overflow: hidden;
          display: flex;
          box-sizing: border-box;
          margin-left:50px/2;
          image{
            width: 127px/2;
            height: 127px/2;
            border-radius: 50%;
            align-content: center;
            align-items: center;
            justify-content: center;
          }
          .btn_auth{
            width: 750px/2;
            height: 100%;
            position: fixed;
            top:0;
            left:0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
          }
        }
        p{
          margin-left: 38px/2;
          font-size: 32px/2;
          color: #333;
          width: 300px/2;
        }
        .slot_box{
          flex: 1;
        }
      }
    }
</style>
