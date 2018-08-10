<template>
    <div class="container">
      <div class="bg_shade" v-if="isshow" @click="hidepick">
        <div class="pick_box" @click.stop="prevent">
          <img class="bg_box" src="../../../static/img/authfight_bg.png">
          <div class="btn_box">
              <div class="btn" @click="tozhan()">我去应战</div>
              <div class="btn" @click="toindex()">我自己玩去</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="javascript">
    export default {
        name: 'authfight',
        props: [],
        topage:"",
        data(){
            return {
              isshow:true,    //弹窗状态

            }
        },
        methods: {
          hidepick(){
            this.isshow=false
          },
          tozhan(){
              let thiz=this;
              wx.navigateTo({
                url: thiz.topage
              })
          },
          toindex(){
            wx.switchTab({
              url:"/pages/index/main"
            })
          },
          prevent(){},       //阻止冒泡
        },
      onLoad: function (option) {
        this.topage="/pages/"+option.pages+"/main?"+`from=${option.from}&&id=${option.id}`
      },
      onUnload(){
        this.isshow=true;
      }

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';

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
      text-align: center;
      .bg_box{
        width:634px/2;
        height:497px/2;
        margin-top: 326px/2;
      }
      .btn_box{
        margin: 109px/2 auto 0;
        box-sizing: border-box;
        width:750px/2;
        display:flex;
        justify-content: space-between;
        padding:0 93px/2;
      }
      .btn{
        width:270px/2;
        height:66px/2;
        font-size: 30px/2;
        color:@color_fff;
        text-align: center;
        background-color: @bg_color;
        border-radius: 33px/2;
        line-height: 66px/2;
        //box-shadow: 0 9px/2 0px @bg_color, 0 9px/2 25px/2 rgba(0, 0, 0, .9);
        -webkit-transition: all .2s ease;
        -moz-transition: all .2s ease;
        transition: all .2s ease;
      }
      .btn:active{
        //box-shadow: 0 3px 0 @bg_color, 0 3px 6px rgba(0, 0, 0, 1);
        position: relative;
        top: 0.5px;
        left:0.3px;
      }
    }
</style>
