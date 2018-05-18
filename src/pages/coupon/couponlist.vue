<template>
    <div>
      <div class="data-list">
        <ul class="list-ul">
          <li class="list-li">
            <div class="upper-part">
              <img :src="/static/img/moren.jpg" alt="" class="background-img">
              <div class="ticket-info">
                <div class="ticket-name">五折优惠券</div>
                <div class="ticket-count">20张</div>
                <div class="count-list">
                  <ul class="clear ">
                    <li>
                      <div class="count favoriteNum">11</div>
                      <div class="txt">已领取</div>
                    </li>
                    <li>
                      <a href="MyNotice.html" data-transition="slide">
                        <div class="count likeTalentNum">8</div>
                        <div class="txt">未领取</div>
                      </a>
                    </li>
                    <li>
                      <a href="MyEvaluation.html" data-transition="slide">
                        <div class="count tryoutNum">18</div>
                        <span class="txt">已核销</span>
                      </a>
                    </li>
                    <li style="border: none">
                      <a href="integral.html" data-transition="slide">
                        <div class="count noticeNum count_border0">831</div>
                        <span class="txt">未核销</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script type="javascript">
    export default {
        data(){
            return {}
        },
        methods: {},
        components: {}

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .data-list ul.list-ul{
      margin: 0 20px/2;
      li.list-li{
        margin-top: 20px/2;
        height: 342px/2;
        .upper-part{
          height: 280px/2;
          img{
            width: 698px/2;
            height: 280px/2;
            background-color: #000000;
            border-radius: 10px/2;
            opacity: 0.5;
          }
        }
      }
    }
    .ticket-info{
      position: absolute;
      top: 56px/2;
      .ticket-name{
        font-size: 40px/2;
        color: #ffffff;
      }
      .ticket-count{
        margin-top: 20px/2;
        font-size: 26px;
        color: #ffffff;
      }
    }
    .count-list{
      margin-top: 15px/2;
      box-sizing: border-box;
      height: 140px/2;
      padding: 6px/2 84px/2;
      ul li{
        width: 25%;
        float: left;
        text-align: center;
        font-size: 0.1rem;
        .count {
          height: 64px/2;
          line-height: 64px/2;
          border-right: 2px solid #ffffff;
          color: #ffffff;
          font-size: 28px/2;
          margin-bottom: 6px/2;
        }
        .txt{
          font-size: 19px/2;
          color: #ffffff;
        }
      }
    }
</style>
