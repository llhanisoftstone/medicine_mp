<template>
    <div class="bg">
      <div class="user_box">
        <div class="user_box_item">
          <div>
            <image :src="userinfo.avatarUrl"></image>
          </div>
          <p>{{userinfo.nickName}}</p>
        </div>
        <div class="user_box_item">
          <div>
            <image></image>
          </div>
          <p></p>
        </div>
      </div>
      <div class="time_box">
        <counddown :time="times"></counddown>
      </div>
      <h3>第 {{nub}} 题</h3>
      <div class="answer_box">
        <div class="fraction_box">
          <p>{{mynumber}}</p>
          <fraction :number="mynumber" color="#ffc02a"></fraction>
        </div>
        <div>
          <answer title="养老保险" answer="由百位明星共同演唱的奥运歌曲《北京欢迎你》的曲作者是谁？">
            <ul slot="list" class="answer_box">
              <li class="my n_correct"><span class="ismy"></span>答案1<span class="nomy"></span></li><!--自己错误-->
              <li class="opponent n_correct"><span class="ismy"></span>答案2<span class="nomy"></span></li><!--对方错误-->
              <li class="correct"><span class="ismy"></span>答案3<span class="nomy"></span></li><!--正确答案-->
            </ul>
          </answer>
        </div>
        <div class="fraction_box">
          <p>{{usernumber}}</p>
          <fraction :number="usernumber" color="#df5c3e"></fraction>
        </div>
      </div>
      <p class="provide">本题由{{provide}}提供</p>
    </div>
</template>

<script type="javascript">
  import counddown from '../../components/countdown.vue'
  import fraction from '../../components/fraction.vue'
  import answer from '../../components/answer.vue'
    export default {
        name: 'pkanswer',
        data(){
            return {
                nub:1,
                mynumber:100,
                usernumber:200,
                times:10,
                provide:'人社厅'

            }
        },
        methods: {},
        components: {
          counddown,
          fraction,
          answer
        },
        computed:{
          userinfo(){
            return this.$store.state.userinfo
          }
        }

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .bg{
      background: #fff3f3;
      width: 100%;
      height: 100%;
      position: relative;
    }
  .user_box{
    width: 100%;
    padding-top:70px/2;
    justify-content: space-between;
    display: flex;
    /*height: ;*/
    .user_box_item{

    div{
      width: 160px/2;
      height: 108px/2;
      padding: 5px/2;
      box-sizing: border-box;
    }
      image{
        width: 98px/2;
        height: 98px/2;
        border-radius: 50%;
      }
      p{
        width: 160px/2;
        font-size: 28px/2;
        color: #333;
        height: 28px/2;
        display: flex;
        align-items: center;
        margin-top:17px/2;
      }
    }
    .user_box_item:nth-last-child(1) {
    div{
      background: @bg_color;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
      display: flex;
      justify-content: flex-start;
    }
    p{
      justify-content: flex-start;
      padding-left: 54px/2;
      box-sizing: border-box;
    }
    }
    .user_box_item:nth-of-type(1) {
    div{
      background: #ffc02a;
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
      display: flex;
      justify-content: flex-end;
    }
    p{
      justify-content: flex-end;
      padding-right: 54px/2;
      box-sizing: border-box;
    }
    }
  }
    .time_box{
      position: absolute;
      top:125px/2;
      left:0;
      right:0;
      margin:auto;
      width: 120px/2;
      height: 120px/2;
    }
  h3{
    margin-top:130px/2;
    width: 100%;
    height: 40px/2;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  .answer_box{
    display: flex;
    margin-top:24px/2;
    align-items: flex-end;
    justify-content: space-between;
    .fraction_box{
      /* 56-44 */
      width: 101px/2;
      height: auto;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      p{
        width: 101px/2;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px/2;
        color: #df5c3e;
        marign-bottom:18px/2;
      }
    }
  }
    .answer_box{
      width: 524px/2;
      height: auto;
      li{
        width: 524px/2;
        padding: 0 24px/2;
        box-sizing: border-box;
        height: 80px/2;
        margin-bottom:53px/2;
        border-radius: 50px;
        background: #d6d6d6;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 30px/2;
        color: #fff;
        span{
          width: 16px/2;
          height: 16px/2;
          border-radius: 50%;
          background: transparent;
        }
      }
      li:nth-last-child(1){
        margin-bottom: 0;
      }
      .my .ismy{
        background: #fff;
      }
      .opponent .nomy{
        background: #fff;
      }
      .correct{
        background: #86d132;
      }
      .n_correct{
        background: #df5c3e;
      }
    }

    .provide{
      margin-bottom: 86px/2;
      font-size:24px/2;
      margin-top:46px/2;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: center;
    }
</style>
