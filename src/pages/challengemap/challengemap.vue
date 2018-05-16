<template>
    <div class="c_map">
      <image src="/static/img/bg.png" class="bg"></image>
      <ul class="c_box">
        <li class="pass"><div class="nub">1</div></li>
        <li class="on">
          <div class="nub">2</div>
          <div class="user">
            <image :src='imgurl'></image>
          </div>
        </li>
        <li><div class="nub">3</div></li>
        <li><div class="nub">4</div></li>
        <li>
          <div class="nub"></div>
          <div class="gift gift_t">
            <i class="a_up"></i>
            <p>小竹签50元代金券</p>
          </div>
        </li>
        <li><div class="nub">6</div></li>
        <li><div class="nub">7</div></li>
        <li><div class="nub">8</div></li>
        <li><div class="nub">9</div></li>
        <li>
          <div class="nub"></div>
          <div class="gift gift_r">
            <p>小竹签80元代金券</p>
            <i class="a_right"></i>
          </div>
        </li>
      </ul>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'challengemap',
        data(){
            return {}
        },
        methods: {},
        components: {},
        computed:{
            imgurl(){
                return this.$store.state.userinfo.avatarUrl
            }
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
      width: 70px/2;
      height: 70px/2;
      background: #ffbeaf;
      color: #fff;
      font-size:45px/2;
      padding: 5px/2;
      box-sizing: border-box;
      border-radius: 50%;
      margin-top: -35px/2;
      margin-left: -35px/2;
      .nub{
        width: 60px/2;
        height: 60px/2;
        border:4px/2 solid #fff;
        background: #ffbeaf;
        text-align: center;
        line-height:56px/2;
        box-sizing: border-box;
        border-radius: 50%;
      }
      .gift{
        position: absolute;
        top:14px/2;
        left:-38px/2;
        width: 200px/2;
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
        display: flex;
        top:-8px/2;
        left:-164px/2;
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
        border:3px/2 solid #fff;
        box-sizing: border-box;
        overflow: hidden;
        image{
          width: 82px/2;
          height: 82px/2;
          border-radius: 50%;
        }
      }
    }
  }
</style>
