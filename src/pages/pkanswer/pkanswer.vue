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
            <image :src="vsuser.picpath"></image>
          </div>
          <p>{{vsuser.nickname}}</p>
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
          <answer :title="answer.category_name" :answer="answer.name">
            <ul slot="list" class="answer_box">
              <!--<li class="my n_correct"><span class="ismy"></span>答案1<span class="nomy"></span></li>&lt;!&ndash;自己错误&ndash;&gt;-->
              <!--<li class="opponent n_correct"><span class="ismy"></span>答案2<span class="nomy"></span></li>&lt;!&ndash;对方错误&ndash;&gt;-->
              <!--<li class="correct"><span class="ismy"></span>答案3<span class="nomy"></span></li>&lt;!&ndash;正确答案&ndash;&gt;-->
              <li :class="{'my':ismy,'correct':res&&isshow,'n_correct':res&&isshow}" v-for="(v,i) in answer.answer_json" v-on:click="submit(i,v.right)"><span class="ismy"></span>{{v.answer}}<span class="nomy"></span></li>
            </ul>
          </answer>
        </div>
        <div class="fraction_box">
          <p>{{usernumber}}</p>
          <fraction :number="usernumber" color="#df5c3e"></fraction>
        </div>
      </div>
      <p class="provide">本题由{{answer.organiz_name}}提供</p>
      <div class="prop_box">
        <prop :istimes="false" :answer="answernub" :times="timenub"></prop>
      </div>
    </div>
</template>

<script type="javascript">
  import counddown from '../../components/countdown.vue'
  import fraction from '../../components/fraction.vue'
  import answer from '../../components/answer.vue'
  import prop from '../../components/prop.vue'
    export default {
        name: 'pkanswer',
        data(){
            return {
                times:30,
                answernub:0,
                timenub:0,
                ismy:false,
                res:false,
                isshow:false
            }
        },
        methods: {
          submit(index,right){
              let reply=0
              this.ismy=true
              this.isshow=true
              this.res=right
            if(right){
                  if(this.times>20){
                    reply=100
                  }else if(this.times>10){
                    reply=60
                  }else{
                    reply=40
                  }
              }
            this.$socket.emit('data_chain', {
              cmd:'answer',
              room_id:this.$store.state.room_id,
              u_id:this.$store.state.user.userid,
              reply:index,
              score:10,   // 得分
//              tool_id: '',   // 使用道具
            })
          }
        },
        components: {
          counddown,
          fraction,
          answer,
          prop
        },
        computed:{
          userinfo(){
            return this.$store.state.userinfo
          },
          vsuser(){
              return this.$store.state.vsuser
          },
          answer(){
              return this.$store.state.answer
          },
          mynumber(){
              return this.$store.state.myscore
          },
          usernumber(){
            return this.$store.state.vsscore
          },
          nub(){
              return this.$store.state.step
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
      padding-bottom: 110px/2;
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
    margin-top:100px/2;
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
  .prop_box{
    position: fixed;
    bottom:0;
    left:0;
    width: 100%;
    height: 110px/2;
    z-index: 3;
  }
</style>
