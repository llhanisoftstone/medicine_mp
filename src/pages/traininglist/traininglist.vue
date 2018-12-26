<template>
  <div>
    <div class="traininglist" v-show="pageurlone">
      <div class="trainingTop">
        <div class="topTitle" ><span v-text="enterprisename"></span>的员工，<span v-text="timeText"></span></div>
        <div class="topCard">
          <div class="cardText">培训是最大的福利，企业最重要的事就是培训，如果不能把你的员工培训到你想达到的标准，你就难以达成目标。</div>
          <div class="cardName">—— 牛根生</div>
        </div>
        <div class="topNav">
          <ul class="navBox">
            <li :class="{ activeli: curTab==1 }" @click="tabClick(1)">待培训</li>
            <li :class="{ activeli: curTab==2 }" @click="tabClick(2)">已培训</li>
          </ul>
        </div>
      </div>
      <ul class="trainingList">
        <li
          :key="index"
          v-for="(item,index) in activity_list">
          <div class="listImg" @click="tonewpage_list(item.act_type,'pid='+item.id,index)">
            <image :src="imgUrl+item.pic_path" v-if="item.pic_path"></image>
            <image src="/static/img/pxjg_moren.png" v-else></image>
            <div class="imgTitle mui-ellipsis">{{item.name}}</div>
          </div>
          <div class="listFooter">
            <div class="footerLeft">
              <div class="footerTime">时间：{{item.start_time}}&nbsp至&nbsp{{item.end_time}}</div>
              <div class="footerAddress mui-ellipsis">地点：{{item.p_name}}{{item.c_name}}{{item.z_name}}{{item.address}}</div>
            </div>
            <div
              @click="tonewpage('mapdetail','act_id='+item.id,index)"
              v-if="item.count < 1 && item.act_type == 1"
              class="footerRight">打卡</div>
            <div
              @click="tonewpage('takephoto','type=2&act_id='+item.id,index)"
              v-if="item.count >= 1 && (item.scenc.length < item.pic_count) && curTab==1 && item.act_type == 1"
              class="footerRight_new" >上传现场照</div>
            <div
              v-if="(item.scenc.length == item.pic_count) && curTab==1 && item.act_type == 1"
              class="footerRight" >已完成</div>
            <div
              @click="tonewpage('videodetsil','pid='+item.id,index)"
              v-if="item.act_type == 2"
              class="footerRight_new_blay">点击播放</div>
          </div>
          <div class="statusText" v-show="photo" v-if="item.count == 0">未培训</div>
          <div class="statusText" v-show="photo" v-else-if="item.scenc.length <= item.pic_count">已完成</div>
          <div class="statusText" v-show="photo" v-else="item.scenc.length > item.pic_count">已结束</div>
          <ul class="cardImg" v-show="item.act_type == 1">
            <li>
              <div class="photo">
                <image :src="imgUrl+item.member_pic" v-if="item.member_pic"></image>
                <image src="/static/img/zhaopian.png" v-else></image>
              </div>
              <div class="jiantou"><image src="/static/img/jiantou.png"></image></div>
            </li>
            <li
              :key="idx"
              v-for="(items,idx) in item.pic_count">
              <div class="photo" v-if="item.scenc[idx]"><image :src="imgUrl+item.scenc[idx]"></image></div>
              <div
                class="photo"
                v-if="!item.scenc[idx]"><image src="/static/img/zhaopian.png"></image></div>
              <div
                v-if="(idx+1) !== item.pic_count"
                class="jiantou" ><image src="/static/img/jiantou.png"></image></div>
            </li>
          </ul>
        </li>
      </ul>
      <div class="emptyValue" v-show="empty"><image src="/static/img/kongyemian_03.png"></image><span>暂无内容</span></div>
      <!--<div v-if="scrollIcon" @click="scrolltoTop" id="scrollToTop" class="footcgotop"></div>-->
      <mptoast :toasthide="toasthide"/>
    </div>

    <div class="perfectinfor" v-show="pageurltow">
      <!--<div class="inforTitle">完善信息</div>-->
      <form id="informdata">
        <div class="container">
          <div class="item">
            <div class="title">公司名称</div>
            <picker
              class="picker"
              @change="PickerChange"
              range-key="name"
              :value="index"
              :range="objectArray">
              <input type="default" placeholder="请选择公司名称" v-model="companyName" disabled="disabled"  />
            </picker>
          </div>
          <div class="item">
            <div class="title">姓名</div>
            <input type="text" v-model='realname' maxlength="10" confirm-type="next" placeholder="请输入姓名" :focus="fnamec==''||fnamec=='realname'"/>
          </div>
          <div class="item">
            <div class="title">身份证号</div>
            <input type="idcard" v-model='cardNumtext' maxlength="18" confirm-type="next"  placeholder="证件号" :focus="fcard==''||fcard=='cardNumtext'"/>
          </div>
          <div :class="{btn:true}" @click="childrenmitData">保&nbsp;&nbsp;存</div>
        </div>
      </form>
      <mptoast :toasthide="toasthide"/>
    </div>
  </div>
</template>

<script type="javascript">
  import mpvuePicker from '../../components/mpvuePicker';
  import mptoast from '../../components/mptoast';
    export default {
      components: {
        mptoast,
        mpvuePicker
      },
      data () {
        return {
          curTab: 1,
          activity_list:[],
          activety_phone:[],
          page:1,
          size:3,
          empty:false,
          photo:false,
          dataTime:"",
          listi:null,
          scrollIcon:false,
          scrollTop:0,
          timeText:"",
          enterprisename:"",
          phoneshow:true,
          mode:"selector",
          pickerText: '',
          toasthide:false,
          companyName:"",
          realname:"",
          cardNumtext:"",
          objectArray: [],
          compid:"",
          pageurlone:false,
          pageurltow:false
        }
      },
      onPageScroll:function(res){
        let top = res.scrollTop;
        if (top > 300) {
          this.scrollIcon = true;
        } else {
          this.scrollIcon = false;
        }
      },
      onPullDownRefresh () {
        wx.showNavigationBarLoading() //在标题栏中显示加载
        this.page=1;
        this.activity_list=[];
        this.refresh();
        // 下拉刷新
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
      onReachBottom () {
        this.page++;
        this.loadmore()
        // 上拉加载
      },
      computed:{
        imgUrl(){
          return this.$store.state.url;
        }
      },
      methods: {
        scrolltoTop(){
          if (wx.pageScrollTo) {
            wx.pageScrollTo({
              scrollTop: 0,
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
          }
        },
        tabClick(tab){
          this.activity_list=[];
          this.empty = false;
          this.curTab=tab;
          if(this.curTab == 1){
            this.photo = false;
          }else if(this.curTab == 2){
            this.photo = true;
          }
          this.traininglist();
        },
        async traininglist(i) {
          var date = new Date();
          var Y = date.getFullYear();
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
          var h = date.getHours();
          var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
          var s = date.getSeconds();
          this.dataTime = Y+"-"+M+"-"+D+" "+h+":"+m+":"+s;
          let that = this;
          let data = {
            page:this.page,
            size:this.size,
//            order:"count desc",
          };
          if(that.curTab == 1){
            data.status=2;
            data.order="end_time"
            data.end_time=">=,"+this.dataTime
          }
          if(that.curTab == 2){
            data.order="end_time desc"
            data.ins=['status','3','10','11','12','13']
            //data.end_time="<,"+this.dataTime
          }
          if(i){
              data={
                  id:this.activity_list[i].id
              }
          }
          let res = await that.$get('/rs/activity_app',data);
          if (res.code == 200){
            this.pageurlone=true;
            for(let i=0;i<res.rows.length;i++){
              res.rows[i].start_time = res.rows[i].start_time.slice(0,16);
              res.rows[i].end_time = res.rows[i].end_time.slice(0,16);
              if(res.rows[i].scene_pics){
                this.phoneshow = false;
                res.rows[i].scenc = res.rows[i].scene_pics.split(",");

              }else{
                res.rows[i].scenc = []
              }
            }
            this.empty = false;
            if(i){
              this.activity_list[i]=res.rows[0]
            }else if(this.page == 1){
              this.activity_list = res.rows;
            }else {
              this.activity_list = this.activity_list.concat(res.rows);
            }
          }else if(res.code == 311){
//            wx.redirectTo({
//              url: `/pages/perfectinfor/main`
//            })
              this.pageurltow = true;
          }else if(res.code == 602 && this.page == 1 && !i){
            this.empty = true;
            this.pageurlone=true;
          }else {
            this.pageurlone=true;
          }
        },
        refresh(){
          this.page = 1;
          this.traininglist();
        },
        loadmore () {
          this.traininglist();
        },
        tonewpage(urlname,data,i){
          if(!urlname){return;}
          if(i){
            this.listi=i
          }
          wx.navigateTo({
            url:`/pages/${urlname}/main?${data}`
          })
        },
        tonewpage_list(urlname,data,i){
          if(!urlname){return;}
          if(urlname == 1){
            urlname="trainingdetails"
          }else if(urlname == 2){
            urlname="videodetsil"
          }
          if(i){
            this.listi=i
          }
          wx.navigateTo({
            url:`/pages/${urlname}/main?${data}`
          })
        },
        activityDetails(i){
          if(i){
            this.listi=i
          }
          wx.navigateTo({
            url:`/pages/trainingdetails/main`
          })
        },
        timetext(){
          var now = new Date();
          var hour = now.getHours();
          if(hour < 6){this.timeText = "凌晨好！"}
          else if (hour < 9){this.timeText = "早上好！"}
          else if (hour < 12){this.timeText = "上午好！"}
          else if (hour < 14){this.timeText = "中午好！"}
          else if (hour < 17){this.timeText = "下午好！"}
          else if (hour < 19){this.timeText = "傍晚好！"}
          else if (hour < 22){this.timeText = "晚上好！"}
          else {this.timeText = "夜晚好！"}
        },
        enterpriseName(){
          let comp_id = this.$store.state.user.compid || this.$store.state.compid;
          let data={
            id:comp_id
          }
          this.$get('/rs/company',data).then(res=>{
            if(res.code == 200){
              this.enterprisename=res.rows[0].name;
            }
          })
        },
        PickerChange: function(e) {
          let indexValue=e.mp.detail.value;
          this.compid=this.objectArray[indexValue].id;
          this.companyName = this.objectArray[indexValue].name;
        },
        cardName(){
          let data={
            status:1
          }
          this.$get('/rs/company',data).then(res=>{
            if(res.code == 200){
              this.objectArray= res.rows;
            }
          })
        },
        childrenmitData(){
          let that=this;
          if(!this.companyName){
            this.$mptoast('请选择公司名称');
            return false;
          }
          if(!this.realname){
            this.$mptoast('请输入姓名');
            return false;
          }
          var pattern1 =/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
          if(!this.cardNumtext){
            this.$mptoast('请输入身份证号');
            return false;
          }
          if(!pattern1.test(this.cardNumtext)){
            this.$mptoast('您的身份证号输入有误，请重新输入');
            return false;
          }
          let data={
            bind:1,
            name:this.realname,
            card_num:this.cardNumtext,
            comp_id:this.compid
          }
          this.$put('/rs/enter_staff/1',data).then(res=>{
            if(res.code == 200){
              this.pageurltow=false;
              this.pageurlone=true;
              this.timetext();  // 时间状态
              this.traininglist(); // 培训列表
              this.enterpriseName();  // 获取列表企业名称
              this.cardName()//获取所有企业名称
              this.$mptoast("保存成功,欢迎进入"+this.enterprisename);
              that.$store.commit('getcompid',that.compid);
//              wx.switchTab({
//                url: '/pages/traininglist/main'
//              })
            }else {
              this.$mptoast("当前企业下没有对应的用户！");
            }
          })
        },
      },
      onShow(){
        if(this.listi!=null){
          this.traininglist(this.listi)//获取数据
          this.listi=null
        }
      },
      onLoad: function() {
        this.timetext();
        this.enterpriseName();  // 获取列表企业名称
        this.cardName()//获取所有企业名称
        this.traininglist()//获取数据
      }
    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    body,div,span,p,ul,li,a{margin:0;padding:0;border:0;box-sizing: border-box};
    .mui-ellipsis{
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    .traininglist{
      padding-bottom: 12px/2;
    }
    .trainingTop{
      width: 100%;
      height:auto;
      padding: 27px/2 27px/2 30px/2 27px/2;
      background-color: #fff;
      .topTitle{
        font-size: 33px/2;
        color: #333;
        margin-bottom: 28px/2;
        padding: 0 4px/2;
    }
      .topCard{
        width: 100%;
        height: auto;
        border-radius: 10px/2;
        background-color: #f6f6f6;
        padding: 20px/2;
        .cardText{
          color: #999;
          font-size: 23px/2;
        }
        .cardName{
          color: #999;
          font-size: 23px/2;
          text-align: right;
        }
      }
      .topNav{
        width: 100%;
        height: auto;
        margin-top: 30px/2;
        display: flex;
        justify-content: center;
        .navBox{
          width: 254px/2;
          height: 50px/2;
          line-height: 50px/2;
          display: flex;
          li{
            width: 127px/2;
            height: 50px/2;
            color: #666;
            border: 1px solid #e2e2e2;

            line-height: 50px/2;
            text-align: center;
            font-size: 24px/2;
          }
          li:first-child{
            border-radius: 50px/2 0 0 50px/2;
            border-right: 0;
          }
          li:last-child{
            border-radius: 0 50px/2 50px/2 0;
            border-left: 0;
          }
          .activeli{
            border:0;
            background-color: #df5c3e;
            color: #fff;
          }
        }
      }
    }
    .trainingList{
      width: 100%;
      height: auto;
      >li{
        width: 100%;
        height: auto;
        background-color: #fff;
        position: relative;
        border-bottom: 10px/2 solid #e2e2e2;
        .listImg{
          width: 100%;
          height: 374px/2;
          position: relative;
          image{
            width: 100%;
            height: 100%;
            display: block;
          }
          .imgTitle{
            width: 100%;
            height: 70px/2;
            background-color: rgba(0,0,0,0.5);
            line-height: 70px/2;
            color: #fff;
            font-size: 30px/2;
            padding: 0 26px/2;
            position: absolute;
            bottom: 0;
          }
        }
        .listFooter{
          width: 100%;
          height: 130px/2;
          padding: 26px/2 0;
          padding-left: 20px/2;
          padding-right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .footerLeft{
            width: 625px/2;
            height: 100%;
            .footerTime{
              width: 100%;
              font-size: 26px/2;
              color: #666;
            }
            .footerAddress{
              width: 100%;
              font-size: 26px/2;
              color: #666;
              margin-top: 12px/2;
            }
          }
          .footerRight{
            width: 85px/2;
            height: 85px/2;
            border-radius: 50%;
            background-color: #df5c3e;
            color: #fff;
            text-align: center;
            line-height: 85px/2;
            font-size: 28px/2;
            margin-right: 20px/2;
          }
          .footerRight_new{
            width: 85px/2;
            height: 85px/2;
            border-radius: 50%;
            background-color: #df5c3e;
            color: #fff;
            text-align: center;
            font-size: 22px/2;
            margin-right: 20px/2;
            word-wrap:break-word;
            word-break:normal;
            padding-top:16px/2;
          }
          .footerRight_new_blay{
            width:85px/2;
            height:85px/2;
            border-radius:50%;
            background-color:#df5c3e;
            color:#fff;
            text-align:center;
            font-size:26px/2;
            margin-right:20px/2;
            word-wrap:break-word;
            word-break:normal;
            line-height:30px/2;
            padding:0 10px/2;
            padding-top:10px/2;

          }
        }
        .cardImg{
          width: 100%;
          height: auto;
          border-top: 1px solid #e2e2e2;
          border-bottom: 1px solid #e2e2e2;
          padding: 10px/2 26px/2;
          padding-top: 0;
          overflow: auto;
          li{
            width: 20%;
            height: auto;
            float: left;
            display: flex;
            align-items: center;
            margin-top: 15px/2;
            .photo{
              width: 94px/2;
              height: 94px/2;
              border-radius: 50%;
              image{
                width: 100%;
                height: 100%;
                display: block;
                border-radius: 50%;
              }
            }
            .jiantou{
              width: 14px/2;
              height: 14px/2;
              margin: 0 14px/2;
              image{
                width: 100%;
                height: 100%;
                display: block;
              }
            }
          }
        }
        .statusText{
          width: 100px/2;
          height: 50px/2;
          line-height: 50px/2;
          position: absolute;
          top:10px/2;
          right: 10px/2;
          background-color: #df5c3e;
          border-radius: 10px/2;
          color: #fff;
          text-align: center;
          font-size: 28px/2;
        }
      }
    }
    .footcgotop{
      position: fixed;
      z-index: 100;
      bottom: 55px/2;
      right: 20px/2;
      width: 82px/2;
      height: 82px/2;
      background:url('../../../static/img/scrollTop.png') center no-repeat;
      background-size: 82px/2 82px/2;
    }
    .emptyValue{
      width: 400px/2;
      height: 400px/2;
      margin: 0 auto;
      text-align: center;
      padding-top: 50px/2;
      image{
        width: 289px/2;
        height: 296px/2;
        display: block;
        margin:0 auto;
      }
      span{
        display: block;
        text-align: center;
        font-size: 26px/2;
        color: #999;
        margin-top: 50px/2;
      }
    }
    .inforTitle{
      color: #333;
      font-size: 30px/2;
      text-align: center;
      line-height: 100px/2;
    }
    .container{
      margin: 10px 20px;
      min-height: 500px;
    }
    .container .item{
      height: 40px;
      line-height:40px;
      border-bottom: 1px solid #ccc;
      padding-left: 80px;
      position: relative;
    }
    .company{
      position: relative;
      z-index:50;
      margin-top:1px/2;
      overflow: hidden;
      li{
        background: #fff;
        font-size: 30px/2;
        height: 80px/2;
        padding: 0 10px/2;
        border-left:1px solid #e2e2e2;
        border-right:1px solid #e2e2e2;
        line-height: 80px/2;
        width: 100%;
        box-sizing: border-box;
        &:nth-last-child(1){
          border-bottom-left-radius: 15px/2;
          border-bottom-right-radius: 15px/2;
          border-bottom:1px solid #e2e2e2;
        }
      }
    }
    .item .title{
      position: absolute;
      font-size: 15px;
      left: 10px;
      color: #333;
    }
    .textClass{
      top:60%;
    }
    .item input{
      height: 40px;
      font-size: 15px;
      line-height: 15px;
    }
    .item .sex{
      height: 40px;
      font-size: 15px;
      line-height: 40px;
      color: #666;
    }
    .item image{
      width:6px;
      height:12px;
      position:absolute;
      right:0;
      top:15px;
    }
    .uploadLogo{
      position: absolute;
      right: 5px;
      top: 10px;
      height: 20px;
      width: 20px;
      background: url("../../../static/img/shangchuan.png") center no-repeat;
      background-size: 20px;
    }
    .imgurl{
      width: 220px;
    }
    .btn{
      margin: 0 auto;
      margin-top: 100px;
      width:150px;
      height: 35px;
      line-height: 35px;
      color: #fff;
      font-size: 14px;
      border-radius:35px;
      background: #df5c3e;
      text-align: center;
    }
    .mpvue-picker__action {
      flex:1;
      color:#df5c3e;
    }
    .cityCont{
      display:inline-block;
      width:30%;
    }
    .item view{
      font-size:15px;
    }
</style>
