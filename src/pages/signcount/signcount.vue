<template>
    <div class="container">
      <div class="mui-media">
          <div class="logo-top">
            <img :src='imgurl' alt="">
          </div>
          <div class="mui-media-body">
            <p class="sign-success" v-if="nowflag">今日已签到</p>
            <p class="sign-success" v-if="isoverflag">恭喜你签到成功，银两<span class="co_fe698a">+{{getpointer}}!</span></p>
            <p class="p-margin">今日奖励<span class="co_fe698a">{{oldpoints}}</span>银两，当前总银两<span id="so-points" class="co_fe698a">{{nowpointer}}</span>
            </p>
          </div>
          <a href="/pages/itemshop/main" class="btn_sign">兑换</a>
      </div>
      <div class="time-top">
        <div class="mui-pull-left" id="time">{{nowdate}}</div>
        <div class="mui-pull-right" id="time-list" v-on:click="showsign">
          <a  class="">签到规则</a>
        </div>
      </div>
      <div class="calendar_th">

      </div>
      <div id="calendar">
        <!-- 年份 月份 -->
        <div class="month">
          <ul>
            <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
            <li class="arrow arrow_left" @click="pickPre(currentYear,currentMonth)">❮</li>
            <li class="year-month" @click="pickYear(currentYear,currentMonth)">
              <span class="choose-month">{{ currentMonth }}月</span>
            </li>
            <li class="arrow arrow_right" @click="pickNext(currentYear,currentMonth)">❯</li>
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
            <span v-if="dayobject.month != currentMonth" class="other-month">{{ dayobject.date}}</span>
            <!--如果是本月  还需要判断是不是这一天-->
            <span v-else>
                <span v-if="dayobject.isSign===true" class="active">{{ dayobject.date}}</span>
                <span v-else>{{dayobject.date}}</span>
            </span>

          </li>
        </ul>
      </div>

      <div class="back_line"></div>
      <div class="recommend">
        精品推荐，快快挑战吧!
      </div>
      <ul class="gift_list">
        <li v-for="(v,i) in win_treasure" >
          <main @click.stop="tonewpage('giftsdetail','tid='+v.tickt_id+'&vid='+v.id)">
            <div class="itemheadk">
              <div>
                <image :src="v.picpath"></image>
                <div class="itemmodel">查看详情&gt;</div>
              </div>
            </div>
            <h3>{{v.name}}</h3>
          </main>
          <a @click="reward(v.id)">挑战</a>
        </li>
      </ul>
      <div id="zhezhao_fu" catchtouchmove='true' class="tryoutModelBox" v-if="isshowsign">
        <div class="zhezhao_zi">
          <div class="zhezhao_div">
            <div class="zhezhao_div3 co_333333">签到规则说明</div>
            <div class="zhezhao_div4" id="zhezhao">
              <div>
                <div class="number">1</div>
                <div class="text">每天登录政策大咖并签到，即可获得相应银两；</div>
              </div>
              <div>
                <div class="number">2</div>
                <div class="text">签到第1天得5银两，连续第2天得10银两，连续签到第三天得15银两，连续签到第四天得20银两，连续签到第五天得25银两；连续签到第六天起每天30银两；</div>
              </div>
              <div>
                <div class="number">3</div>
                <div class="text">银两可用于兑换政策大咖道具。</div>
              </div>
            </div>
            <div class="zhezhao_div6 tryFoot" v-on:click="notshowsign">我知道了</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'signcount',
        props: [],
        data(){
            return {
              nowflag:false,
              isoverflag:false,
              win_treasure: [],
              currentDay: 1,
              currentMonth: 1,
              currentYear: 1970,
              currentWeek: 1,
              days: [],
              arrDate: [],
              nowdate:"",
              nowpointer:0,
              oldpoints:0,
              getpointer:5,
              isshowsign:false,
              r_id:0
            }
        },
      methods: {
        initData(cur) {
          var leftcount=0; //存放剩余数量
          var date;
          if (cur) {
            date = new Date(cur);
          } else {
            var now=new Date();
            var d = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1));
            d.setDate(35);
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
            dayobject = {day: d,month:d.getMonth()+1,date:d.getDate()}
            this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
          }
          //其他周
          for (var i = 1; i <= 35 - this.currentWeek; i++) {
            var d = new Date(str);
            d.setDate(d.getDate() + i);
            var dayobject={};
            dayobject = {day: d,isSign: this.isVerDate(d.getDate()),month:d.getMonth()+1,date:d.getDate()}
            this.days.push(dayobject);
          }
        },
        isVerDate (v) {
          return this.arrDate.includes(v)
        },
        pickPre: function(year, month) {
          var d = new Date(this.formatDate(year , month , 1));
          d.setDate(0);
          var now=new Date();
          if((year==now.getFullYear())&&(1<month)) {
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            this.getsign(d.getFullYear(), d.getMonth() + 1);
          }
        },
        pickNext: function(year, month) {
          var d = new Date(this.formatDate(year , month , 1));
          d.setDate(35);
          var now=new Date();
          if((year==now.getFullYear())&&(month<(now.getMonth() + 1))){
            this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
            this.getsign(d.getFullYear(),d.getMonth() + 1);
          }
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
        getnowtime(){
          var date = new Date();
          var m=date.getMonth() + 1;
          var d=date.getDate();
          if(m<10){
              m="0"+m;
          }
          if(d<10){
              d="0"+d;
          }
          this.nowdate=date.getFullYear()+"年"+m+"月"+date.getDate()+"日";
        },
        async getpage(){
          let that = this;
          let res = await that.$get('/rs/first_page',{page:1,size:3,order:'order_code desc, create_time desc'})
          if(res.code == 200){
            that.p_number = res.present_count
            for(let i = 0;i<res.win_treasure.length;i++){
              res.win_treasure[i].picpath = that.$store.state.url+ res.win_treasure[i].piclogo;
              res.win_treasure[i].tickt_id = res.win_treasure[i].level_json[0].reward[0].id
            }
            if(res.win_treasure.length>=3){
              that.win_treasure = res.win_treasure.slice(0,3)
            }else{
              that.win_treasure = res.win_treasure
            }
          }
        },
        async getsign(year,month){
          let aa = await this.$post('/rs/sign_submit',{history_day: year + "-" + month + "-" + "01",auto_id:"1"});
          if(aa.code==200){
              this.nowflag=false;
              this.isoverflag=true;
              this.nowpointer=aa.total_points;
              this.getpointer=aa.points;
            this.oldpoints=aa.points;

            var daystotal=this.days;
            var nowtime=new Date();
            if(aa.days.length>0){
              for (var j = 0; j < aa.days.length; j++) {
                for(var i=0;i<daystotal.length;i++){
                  var timedate=new Date(daystotal[i].day);
                  if(this.formatDate(timedate.getFullYear(),timedate.getMonth() + 1,timedate.getDate())==aa.days[j]){
                    daystotal[i].isSign=true;
                  }else  if(this.formatDate(timedate.getFullYear(),timedate.getMonth() + 1,timedate.getDate())==this.formatDate(nowtime.getFullYear(),nowtime.getMonth() + 1,nowtime.getDate())){
                    daystotal[i].isSign=true;
                  }
                }
              }
            }else{
              for(var i=0;i<daystotal.length;i++){
                var timedate=new Date(daystotal[i].day);
                if(this.formatDate(timedate.getFullYear(),timedate.getMonth() + 1,timedate.getDate())==this.formatDate(nowtime.getFullYear(),nowtime.getMonth() + 1,nowtime.getDate())){
                  daystotal[i].isSign=true;
                }
              }
            }
          }else{
            this.nowflag=true;
            this.isoverflag=false;
            this.nowpointer=aa.total_points;
            this.oldpoints=aa.points;
            var daystotal=this.days;
           for (var j = 0; j < aa.days.length; j++) {
            for(var i=0;i<daystotal.length;i++){
              var timedate=new Date(daystotal[i].day);
                 if(this.formatDate(timedate.getFullYear(),timedate.getMonth() + 1,timedate.getDate())==aa.days[j]){
                   daystotal[i].isSign=true;
                 }
            }
          }
          }
        },
        showsign(){
          this.isshowsign=true;
        },
        notshowsign(){
          this.isshowsign=false;
        },
        reward(r_id){
          this.r_id=r_id
          this.$socket.emit('data_chain',{
            cmd:'fight',
            u_id: this.$store.state.user.userid,
            game_cfg_id: r_id,
            game_type:1,
            level:1
          })
        },
        tonewpage(urlname,data){
          wx.navigateTo({
            url:`/pages/${urlname}/main?${data}`
          })
        },
        watchsocket(){
          let that=this
          that.$socket.removeAllListeners('data_chain')
          that.$socket.on('data_chain',d=>{
            if(d.cmd == 'answer'&&d.step == 1){
              that.$socket.removeAllListeners('data_chain')
              that.$store.commit('get_answer',d.details[0])
              that.$store.commit('get_step',d.step)
              that.$store.commit('get_level',1)
              that.$store.commit('get_room',d.room_id)
              that.$store.commit('get_max_nub',d.max_step)
              wx.navigateTo({
                url:`/pages/alone/main?id=${that.r_id}`
              })
            }
          })
        }
      },
      mounted(){
        this.initData(null);
        this.getpage();
        this.getnowtime();
        this.getsign();
      },
      components: {},
      computed:{
          imgurl(){
           return this.$store.state.userinfo.avatarUrl
          }

      },
      onLoad(){
        this.isshowsign=false;
        this.watchsocket()
      },
      onShow(){
        this.watchsocket()
      },
      onHide(){
        this.$socket.removeAllListeners('data_chain')
      }

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .btn_sign{
      position:absolute;
      right:10px;
      width: 120px/2;
      height: 50px/2;
      border-radius: 50px/2;
      display: flex;
      align-content: center;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 26px/2;
      background: @bg_color;
      margin-left: 50px/2;
      box-shadow: #923c3c 2px/2 5px/2 15px/2;
    }
    .container .mui-media {
      padding:13px;
      height:64px;
      border-top:1px solid #e2e2e2;
      border-bottom:1px solid #e2e2e2;
      display:flex;
      box-sizing:border-box;
      justify-content: flex-start;
      align-items: center;
      font-size:14px;
      color:#333;
      position:relative;
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
      .p-margin>span{
        color:#df5c3e;
        font-size:15px;
      }
    }
  .time-top{
    margin-top:10px;
    padding-left:13px;
    font-size:12px ;
    color:#333;
    display:flex;
    justify-content: space-between;
    align-items:center;
    #time-list{
      color:#df5c3e;
     padding:10px 22px;
    }
  }
  .back_line{
    width:100%;
    height:8px;
    background:#f3f3f3;
  }
    .recommend {
      padding: 12px 0 12px 13px;
      font-size:15px;
      box-sizing:border-box;
      border-bottom: 1px solid #e2e2e2;
      margin-bottom: 20px/2;
    }
    .gift_list{
      width: 100%;
      box-sizing: border-box;
      padding: 0 26px/2;
      display: flex;
      flex-flow: wrap;
      justify-content: space-between;
      li{
        width: 219px/2;
        height: 327px/2;
        box-shadow: #acacac 4px/2 5px/2 15px/2;
        margin-bottom:20px/2;
        border-radius: 10px/2;
        background: #fff;
        div.itemheadk{
          width: 219px/2;
          height: 220px/2;
          box-sizing: border-box;
          padding: 20px/2;
          div{
            position: relative;
            width: 100%;
            height: 100%;
            .itemmodel{
              position: absolute;
              bottom:0;
              left:0;
              width:100%;
              font-size: 16/2px;
              padding:6/2px;
              padding-top: 20/2px;
              line-height: 16/2px;
              height: 22/2+20/2px;
              text-align: right;
              color: #fff;
              box-sizing: border-box;
              background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.4));
            }
            image{
              width: 100%;
              height: 100%;
            }
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
          box-sizing: border-box;
          line-height: normal;
          color: #fff;
          justify-content: center;
          align-items: center;
          align-content: center;
          padding-bottom: 2px/2;
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
      padding: 0;
      display: flex;
      margin:0 39px 0;
      justify-content: space-between;
      align-items: center;
    }

    .year-month {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      text-align: center;
      font-size:18px;
      color: #333333;
      font-style: italic;
    }
    .choose-year {
      padding-left: 20px;
      padding-right: 20px;
    }

    .choose-month {
      text-align: center;
      font-size: 18px;
    }
    .month ul li {
      color: #333;
      font-size: 14px;
      letter-spacing: 3px;
    }
    .arrow{
      width:50px;
      color:#df5c3e;
      padding:10px;
    }
    .arrow_left{
      padding:20px;
      text-align:left;
    }
    .arrow_right{
      text-align:right;
    }
    .weekdays {
      margin: 0;
      padding:0 0 10px 0;
      display: flex;
      flex-wrap: wrap;
      color: #333;
      font-size:12px;
      justify-content: space-around;
    }

    .weekdays li {
      display: inline-block;
      text-align: center;
      font-weight:bold;
      font-size:12px;
      padding:11px;
      height: 14px;
      box-sizing:border-box;
      line-height:14px;
      color: #333333;
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
      width:30px;
      height:30px;
      text-align: center;
      font-size:14px;
      line-height:30px;
      color: #666;
      margin:7.5px 7px;
    }
    .days li .active {
      width:30px;
      height:30px;
      display: inline-block;
      border-radius:50%;
      text-align:center;
      background: #df5c3e;
      color: #fff;
    }

    .days li .other-month {
      padding: 5px;
      color: transparent;
    }
  /*签到*/
  .tryoutModelBox{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 11111;
    .zhezhao_zi {
      background:#fff;
      width:292px;
      height:auto;
      position: absolute;
      top:150px;
      left:50%;
      transform:translateX(-50%);
      -webkit-transform:translateX(-50%);
      border-radius:10px;
      margin:0 auto;
      padding:0 13px 13px 13px;
      .zhezhao_div3 {
        width: 100%;
        font-size: 14px;
        line-height: 100%;
        margin-top: 18px;
        margin-bottom: 13px;
        text-align: left;
      }
      .zhezhao_div4 div{
        overflow:hidden;
        .number{
          width:12px;
          height:12px;
          float:left;
          color:#fff;
          margin-top:4px;
          font-size:11px;
          text-align:center;
          line-height:12px;
          border-radius:50%;
          background:#df5c3e;
          margin-right:8px;
        }
        .text{
          float:left;
          max-width:244px;
          font-size:12px;
          color:#333;
          line-height:20px;
        }
      }
    }
    .tryFoot{
      width:115px;
      height:37px;
      border-radius:25px;
      background:#df5c3e;
      color:#fff;
      font-size:15px;
      margin:20px auto 0;
      text-align:center;
      line-height:37px;
    }
  }
</style>
