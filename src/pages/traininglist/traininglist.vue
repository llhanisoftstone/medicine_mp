<template>
    <div class="traininglist">
      <div class="trainingTop">
        <div class="topTitle" ><span v-text="enterprisename"></span>的员工，<span v-text="timeText"></span></div>
        <div class="topCard">
          <div class="cardText">培训是最大的福利,企业最重要的事就是培训,如果不能把你的员 工培训到你想达到的标准,你就难以达成目标。</div>
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
          <div class="listImg" @click="tonewpage('trainingdetails','pid='+item.id)">
            <image :src="imgUrl+item.pic_path" v-if="item.pic_path"></image>
            <image src="/static/img/pxjg_moren.png" v-else></image>
            <div class="imgTitle mui-ellipsis">{{item.name}}</div>
          </div>
          <div class="listFooter">
            <div class="footerLeft">
              <div class="footerTime">时间：{{item.start_time}}至{{item.end_time}}</div>
              <div class="footerAddress mui-ellipsis">地点：{{item.address}}</div>
            </div>
            <div
              @click="tonewpage('mapdetail','act_id='+item.id)"
              v-if="item.count < 1"
              class="footerRight">打卡</div>
            <div
              @click="tonewpage('takephoto','type=2&act_id='+item.id)"
              v-if="item.count >= 1 && (item.scenc.length < item.pic_count) && curTab==1"
              class="footerRight_new" >上传现场照</div>
            <div
              v-if="(item.scenc.length == item.pic_count) && curTab==1"
              class="footerRight" >已完成</div>
          </div>
          <div class="statusText" v-show="photo" v-if="item.count == 0">未培训</div>
          <div class="statusText" v-show="photo" v-else-if="item.scenc.length <= item.pic_count">已完成</div>
          <div class="statusText" v-show="photo" v-else="item.scenc.length > item.pic_count">已结束</div>
          <ul class="cardImg">
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
      <div v-if="scrollIcon" @click="scrolltoTop" id="scrollToTop" class="footcgotop"></div>
      <mptoast :toasthide="toasthide"/>
    </div>
</template>

<script type="javascript">
  import mptoast from '../../components/mptoast';
    export default {
      components: {
        mptoast,
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
          scrollIcon:false,
          scrollTop:0,
          timeText:"",
          enterprisename:"",
          phoneshow:true,
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
        async traininglist() {
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
            order:"count desc",
          };
          if(that.curTab == 1){
            data.status=2;
            data.end_time=">=,"+this.dataTime
          }
          if(that.curTab == 2){
            data.ins=['status','3','10','11','12','13']
            //data.end_time="<,"+this.dataTime

          }
          let res = await that.$get('/rs/activity_app',data);
          if (res.code == 200){
            for(let i=0;i<res.rows.length;i++){
              if(res.rows[i].scene_pics){
                this.phoneshow = true
                res.rows[i].scenc = res.rows[i].scene_pics.split(",");
              }else{
                res.rows[i].scenc = []
              }
            }
            this.empty = false;
            if(this.page == 1){
              this.activity_list = res.rows;
            }else {
              this.activity_list = this.activity_list.concat(res.rows);
            }
          }else if(res.code == 311){
            wx.redirectTo({
              url: `/pages/perfectinfor/main`
            })
          }else if(res.code == 602 && this.page == 1){
            this.empty = true;
          }
        },
        refresh(){
          this.page = 1;
          this.traininglist();
        },
        loadmore () {
          this.traininglist();
        },
        tonewpage(urlname,data){
          if(!urlname){return;}
          wx.navigateTo({
            url:`/pages/${urlname}/main?${data}`
          })
        },
        activityDetails(){
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
        }
      },
      onShow(){
        this.page=1;
        this.traininglist()//获取数据
      },
      onLoad: function() {
        this.timetext();
        this.enterpriseName();
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
      li{
        width: 100%;
        height: auto;
        background-color: #fff;
        position: relative;
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

        }
        .cardImg{
          width: 100%;
          height: auto;
          border-top: 1px solid #e2e2e2;
          border-bottom: 1px solid #e2e2e2;
          padding: 10px/2 26px/2;
          padding-top: 0;
          overflow: auto;
          border-bottom: 10px/2 solid #e2e2e2;
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
</style>
