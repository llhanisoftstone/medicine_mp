<template>
    <div>
      <div class="gift_box" v-if="win==2">
        <image src="/static/img/succ1.jpg"></image>
        <ul class="rank_list">
          <li>
            <i class="rank"></i>
            <span class="rank_nub">+100</span>
            <span class="rank_name">{{user.rank_name}}</span>
          </li>
          <li>
            <i class="yl"></i>
            <span>+20</span>
          </li>
        </ul>
        <ul class="gift_list">
          <li v-if="iscard">
            <div>
              <image :src="card.ticket_pic"></image>
            </div>
            <p>战利品:<span>{{card.ticket_price}}元代金券</span></p>
          </li>
        </ul>
      </div>
      <div class="gift_box draw_box" v-if="win==1">
        <image src="/static/img/609_02.jpg"></image>
        <image src="/static/img/pj.png" class="tips"></image>
        <p>海内存知己,天涯若比邻</p>
      </div>
      <div class="gift_box fail" v-if="win==0">
        <image src="/static/img/fail1.jpg"></image>
        <ul class="rank_list">
          <li>
            <i class="rank"></i>
            <span class="rank_nub">+100</span>
            <span class="rank_name">{{user.rank_name}}</span>
          </li>
        </ul>
        <image src="/static/img/fail.png" class="tips"></image>
        <p>留得青山在,不怕没柴烧</p>
      </div>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'capture',
        props: {
            win:{
                type: Number,    //0 输  1平局   2赢
                default: 0
            },
            iscard:{
                type: Boolean,
                default: false
            },
            card: {
                type: Object,
                default: {}
            }
        },
        data(){
            return {}
        },
        methods: {},
        components: {},
        computed:{
            user(){
                return this.$store.state.user
            }
        }

    }
</script>

<style lang="less" scoped>
    @import '../static/less/common.less';
    @keyframes success_t {
      0%{
        opacity: 0;
      }
      67%{
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
    }
    @keyframes li1 {
      0%{
        opacity: 0;
        transform: scale(0);
      }
      75%{
        opacity: 0;
        transform: scale(0.5);
      }
      90%{
        opacity: 1;
        transform: scale(1.05);
      }
      100%{
        opacity: 1;
        transform: scale(1);
      }
    }
    @keyframes li2 {
      0%{
        opacity: 0;
        transform: scale(0);
      }
      80%{
        opacity: 0;
        transform: scale(0.5);
      }
      92%{
        opacity: 1;
        transform: scale(1.05);
      }
      100%{
        opacity: 1;
        transform: scale(1);
      }
    }
  .gift_box{
    border-top:1px dashed #fff;
    height: auto;
    overflow: hidden;
    position: relative;
    image{
      width: 100%;
      height: 609px/2;
    }
  }
  .success_t{
    width: 310px/2;
    height: 60px/2;
    margin:0 auto;
    margin-top:21px/2;
    display: block;
    animation: success_t 1.5s ease;
  }
  .rank_list{
    width: 319px/2;
    height: auto;
    position: absolute;
    top:430px/2;
    left:0;
    right: 0;
    margin:auto;
    li{
      height: 82px/2;
      border-bottom: 1px solid #df5c3e;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      .rank{
        width: 39px/2;
        height: 39px/2;
        background: url(../../static/img/jy.png) center no-repeat;
        background-size: 39px/2 39px/2;
      }
      span{
        font-size: 28px/2;
        color: #333;
      }
      .yl{
        width: 39px/2;
        height: 39px/2;
        background: url(../../static/img/yl.png) center no-repeat;
        background-size: 39px/2 39px/2;
        margin-right: 28px/2;
      }
    }
    li:nth-of-type(1){
      justify-content: space-between;
      padding: 0 30px/2;
    }
  }
  .gift_list{
    width: 100%;
    margin-top:20px/2;
    justify-content: space-around;
    display: flex;
    li{
      animation: li2 2.5s ease;
      flex-wrap: wrap;
      width: 152px/2;
      justify-content: center;
    display:flex;
      div{
        width: 152px/2;
        height: 152px/2;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url(../../static/img/suci.png) center no-repeat;
        background-size: 100%;
        image{
          width: 74px/2;
          height: 84px/2;
        }
      }
    p{
      margin-top:20px/2;
      font-size:28px/2;
      color: #df5c3e;
      height: 28px/2;
      display: flex;
      white-space: nowrap;
      justify-content: center;
      align-items: center;
      span{
        color: #333;
      }
    }
    }
    li:nth-of-type(1){
      animation: li1 2s ease;
      image{
        width: 140px/2;
        height: 140px/2;
        border-radius: 10px/2;
      }
    }
  }
    .fail{
      /*align-items: center;*/
      /*justify-content: center;*/
      /*display:flex;*/
      .tips{
        width: 178px/2;
        height: 206px/2;
        margin:0 auto;
        display: block;
        position: relative;
        z-index:5;
        margin-top:-90px/2;
      }
      p{
        color: #567dff;
        font-size: 28px/2;
        width: 100%;
        text-align: center;
        margin-top:43px/2;
      }
    }
    .draw_box{
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      flex-wrap: wrap;
      .tips{
        width: 161px/2;
        height: 139px/2;
      }
      p{
        width: 100%;
        height: 26px/2;
        font-size: 26px/2;
        color: #666;
        margin-top:30px/2;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
</style>
