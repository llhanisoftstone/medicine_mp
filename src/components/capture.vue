<template>
    <div>
      <div class="gift_box" v-if="win==2">
        <image src="/static/img/sucg.png" class="success_t"></image>
        <ul class="gift_list">
          <li v-if="iscard">
            <div>
              <image :src="card.ticket_pic"></image>
            </div>
            <p>{{card.ticket_price}}元代金券</p>
          </li>
          <li>
            <div>
              <image src="/static/img/sucm.png"></image>
            </div>
            <p>银两+20</p>
          </li>
        </ul>
      </div>
      <div class="gift_box draw_box" v-if="win==1">
        <image src="/static/img/pj.png"></image>
        <p>平局，什么奖品都没有</p>
      </div>
      <div class="gift_box fail" v-if="win==0">
        <image src="/static/img/fail.png"></image>
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
        components: {}

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
    height: 325px/2;
  }
  .success_t{
    width: 310px/2;
    height: 60px/2;
    margin:0 auto;
    margin-top:21px/2;
    display: block;
    animation: success_t 1.5s ease;
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
      color: #fff;
      height: 28px/2;
      display: flex;
      white-space: nowrap;
      justify-content: center;
      align-items: center;
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
      align-items: center;
      justify-content: center;
      display:flex;
    image{
      width: 178px/2;
      height: 206px/2;
    }}
    .draw_box{
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      flex-wrap: wrap;
      image{
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
