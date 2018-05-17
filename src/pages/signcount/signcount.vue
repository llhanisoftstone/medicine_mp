<template>
    <div class="container">
      <div class="mui-media">
          <div class="logo-top">
            <img :src='imgurl' alt="">
          </div>
          <div class="mui-media-body">
            <p class="sign-success">恭喜你签到成功，<span class="co_fe698a">+5！</span></p>
            <p class="p-margin">当前积分<span id="so-points" class="co_fe698a">821</span>
            </p>
          </div>
      </div>
      <div class="time-top">
        <div class="mui-pull-left" id="time">2018年5月16日</div>
      </div>
      <div class="calendar_th">

      </div>
      <div id="calendar">
        <!-- 年份 月份 -->
        <div class="month">
          <ul>
            <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
            <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
            <li class="year-month" @click="pickYear(currentYear,currentMonth)">
              <span class="choose-month">{{ currentMonth }}月</span>
            </li>
            <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
          </ul>
        </div>
        <!-- 星期 -->
        <ul class="weekdays">
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
          <li>日</li>
        </ul>
        <!-- 日期 -->
        <ul class="days">
          <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
          <li  v-for="dayobject in days">
            <!--本月-->
            <!--如果不是本月  改变类名加灰色-->
            <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
            <!--如果是本月  还需要判断是不是这一天-->
            <span v-else>
          <!--今天  同年同月同日-->
                <span v-if=" dayobject.isSign===true" class="active">{{ dayobject.day.getDate() }}</span>
                <span v-else>{{ dayobject.day.getDate() }}</span>
            </span>

          </li>
        </ul>
      </div>

      <div class="back_line"></div>
      <div class="recommend">
        <p >礼物店</p>
      </div>
      <ul class="gift_list">
        <li>
          <div>
            <image src="/static/img/liwu.png"></image>
          </div>
          <h3>藤罗5元代金券</h3>
          <a href="">挑战</a>
        </li>
        <li>
          <div>
            <image src="/static/img/liwu.png"></image>
          </div>
          <h3>藤罗5元代金券</h3>
          <a href="">挑战</a>
        </li>
        <li>
          <div>
            <image src="/static/img/liwu.png"></image>
          </div>
          <h3>藤罗5元代金券</h3>
          <a href="">挑战</a>
        </li>
      </ul>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'signcount',
        props: [],
        data(){
            return {
              currentDay: 1,
              currentMonth: 1,
              currentYear: 1970,
              currentWeek: 1,
              days: [],
              arrDate: [10,15]
            }
        },
      created: function() {  //在vue初始化时调用
        this.initData(null);
      },
      methods: {
        initData: function(cur) {
          var leftcount=0; //存放剩余数量
          var date;
          if (cur) {
            date = new Date(cur);
          } else {
            var now=new Date();
            var d = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1));
            d.setDate(42);
            date = new Date(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
          }
          this.currentDay = date.getDate();
          this.currentYear = date.getFullYear();
          this.currentMonth = date.getMonth() + 1;

          this.currentWeek = date.getDay(); // 1...6,0
          if (this.currentWeek == 0) {
            this.currentWeek = 7;
          }
          var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
          this.days.length = 0;
          // 今天是周日，放在第一行第7个位置，前面6个
          //初始化本周
          for (var i = this.currentWeek - 1; i >= 0; i--) {
            var d = new Date(str);
            d.setDate(d.getDate() - i);
            var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
            dayobject.day=d;
            this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
          }
          //其他周
          for (var i = 1; i <= 42 - this.currentWeek; i++) {
            var d = new Date(str);
            d.setDate(d.getDate() + i);
            var dayobject={};
            dayobject = {day: d,isSign: this.isVerDate(d.getDate())}
            this.days.push(dayobject);
          }
        },
        isVerDate (v) {
          return this.arrDate.includes(v)
        },
        pickPre: function(year, month) {
          var d = new Date(this.formatDate(year , month , 1));
          d.setDate(0);
          this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        pickNext: function(year, month) {
          var d = new Date(this.formatDate(year , month , 1));
          d.setDate(42);
          this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        pickYear: function(year, month) {
          alert(year + "," + month);
        },

        // 返回 类似 2016-01-02 格式的字符串
        formatDate: function(year,month,day){
          var y = year;
          var m = month;
          if(m<10) m = "0" + m;
          var d = day;
          if(d<10) d = "0" + d;
          return y+"-"+m+"-"+d
        },


      },
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
    .container .mui-media {
      padding:13px;
      height:64px;
      border-top:1px solid #e2e2e2;
      border-bottom:1px solid #e2e2e2;
      display:flex;
      justify-content: flex-start;
      align-items: center;
      font-size:14px;
      color:#333;
      .logo-top{
        width:38px;
        height:38px;
        margin-right:14px;
        border-radius:50%;
        image{
          width:38px;
          height:38px;
          border-radius:50%;
        }
      }
      .sign-success>span{
        color:#df5c3e;
      }
      .p-margin{
        margin-top:12px;
      }
      .p-margin>span{
        color:#df5c3e;
        font-size:15px;
      }
    }
  .time-top{
    margin-top:20px;
    padding-left:13px;
    font-size:12px ;
    color:#333;
  }
  .back_line{
    width:100%;
    height:8px;
    background:#f3f3f3;
  }
    .recommend {
      padding: 12px 0 12px 13px;
      border-top: 1px solid #e2e2e2;
      font-size:15px;
      border-bottom: 1px solid #e2e2e2;
      height: 40px;
      line-height:40px;
    }
    .gift_list{

      width: 100%;
      box-sizing: border-box;
      padding:12px 26px/2;
      display: flex;
      flex-flow: wrap;
      justify-content: space-between;
      li{
        width: 220px/2;
        height: 280px/2;
        box-shadow: #acacac 4px/2 5px/2 15px/2;
        margin-bottom:20px/2;
        border-radius: 10px/2;
        background: #fff;
        div{
          width: 220px/2;
          height: 173px/2;
          box-sizing: border-box;
          padding: 20px/2;
          image{
            width: 100%;
            height: 100%;
          }
        }
        h3{
          width: 100%;
          padding: 0 17px/2;
          font-size:28px/2;
          color: #333;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
        a{
          margin:0 auto;
          margin-top:16px/2;
          display: flex;
          width: 100px/2;
          height: 43px/2;
          border-radius: 50px/2;
          font-size: 30px/2;
          color: #fff;
          align-items: center;
          justify-content: center;
          background: @bg_color;
        }
      }
    }
  /*日历*/
    #calendar{
      width:325px;
      margin: 0 25px;
    }
    .month {
      width: 100%;
    }
    .month ul {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-between;
    }

    .year-month {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }

    .year-month:hover {
      background: rgba(150, 2, 12, 0.1);
    }

    .choose-year {
      padding-left: 20px;
      padding-right: 20px;
    }

    .choose-month {
      text-align: center;
      font-size: 18px;
    }

    .arrow {
      padding: 15px;
    }

    .arrow:hover {
      background: rgba(100, 2, 12, 0.1);
    }

    .month ul li {
      color: #333;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 3px;
    }

    .weekdays {
      margin: 0;
      padding: 10px 0;
      display: flex;
      flex-wrap: wrap;
      color: #333;
      font-size:12px;
      justify-content: space-around;
    }

    .weekdays li {
      display: inline-block;
      width: 13.6%;
      text-align: center;
    }

    .days {
      padding: 0;
      background: #FFFFFF;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }

    .days li {
      list-style-type: none;
      display: inline-block;
      width: 14.2%;
      height: 70px;
      text-align: center;
      padding-bottom: 15px;
      padding-top: 15px;
      font-size: 1rem;
      color: #666;
    }

    .days li .active {
      padding: 6px 10px;
      border-radius: 50%;
      background: #00B8EC;
      color: #fff;
    }

    .days li .other-month {
      padding: 5px;
      color: gainsboro;
    }

    .days li:hover {
      background: #e1e1e1;
    }
</style>
