<template>
  <div class="content">
    <div class="feedList">
      <ul class="ul_list">
        <li v-for="(item, index) in feedList" v-bind:key="index" @click.stop="tonewpage('report_details','pid='+item.id, item.progress)">
          <div class="top-cont">
            <div class="realname">{{item.realname}}</div>
            <div class="btns">
              <div class="edit-icon" v-if="item.status == 1" @click.stop="tonewpage('drugs','pid='+item.id)"></div>
              <div class="del-icon" @click.stop="deleteDrugs(item.id)"></div>
            </div>
          </div>
          <div class="middle-cont">
            <div>不良反应/事件名称</div><div>{{item.event_text}}</div>
          </div>
          <div class="bottom-cont">
            <div>填报时间</div><div>{{item.update_time}}</div>
          </div>
          <div class="progress">
            <div>填报进度</div><div>{{item.progressText}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="scrollIcon" @click="scrolltoTop" id="scrollToTop" class="footcgotop"></div>
    <div class="nogetList" v-if="nogetshow"><img src="/static/img/empty-2.png"/><div class="nogetText">暂无不良反应报告</div></div>
    <div class="bottom_sty">
      <div v-if="isLogin" class="addfeed" @click.stop="tonewpage('drugs')">新增不良反应</div>
      <button v-else="" class="addfeed" plain="true" hover-class="none" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">新增不良反应</button>
    </div>
    <mptoast/>
    <confirm ref="confirm"/>
  </div>
</template>

<script type="javascript">
  import mptoast from '../../components/mptoast'
  import confirm from '../../components/confirm'
  export default {
    data(){
        return {
          isLogin: false,
          feedList: [],
          nogetshow: false,
          scrollIcon:false,
          scrollTop: 0,
          page: 1,
          size: 5,
        }
    },
    components: {
      mptoast,
      confirm
    },
    onPullDownRefresh () {
      this.page=1;
      this.feedList=[];
      this.refresh();
      // 下拉刷新
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },
    onReachBottom () {
      this.page++;
      this.loadmore()
    },
    methods: {
      scrolltoTop(){
        if (wx.pageScrollTo) {
          wx.pageScrollTo({
            scrollTop: 0
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
          })
        }
      },
      async refresh(){
        this.getbad_record();
      },
      loadmore(){
        this.getbad_record();
      },
      bindGetUserInfo: function (e) {
        let that = this
        if (!e.target.userInfo) {
          return
        }
        wx.login({
          success: (code) => {  // code
            that.$store.commit('getcode', code.code)
            that.$store.commit('getuser', e.target.userInfo)
            that.nickname = e.target.userInfo.nickName
            that.picpath = e.target.userInfo.avatarUrl
            that.$store.commit('getauth')
            that.$get('/weapp/login', {code: that.$store.state.code, encryptedData: e.target.encryptedData, iv: e.target.iv, isAlarm: 1}).then(res => {
              if (res.code === 200) {
                that.$store.commit('getm_user', res)
                if (res.isAlarm) {
                  that.isShow = true
                  if (res.alarm_count > 0) {
                    that.isCount = true
                    that.alarm_count = res.alarm_count
                  }
                }
                that.isLogin = true;
                this.getbad_record();
              }
            })
          }
        })
      },
      async getbad_record(){
        let that = this;
        let res = await this.$get('/rs/bad_record', {page:this.page, size: this.size, u_id: this.$store.state.user.userid, status: '<>,9', order: 'update_time desc'});
        if (res.code == 200){
          that.nogetshow=false;
          if(that.page==1){
            that.feedList=[];
          }
          if (res.rows.length > 0){
            for(let i=0; i<res.rows.length; i++){
              res.rows[i].update_time = res.rows[i].update_time.substring(0, 10);
              if(res.rows[i].progress == 1){
                res.rows[i].progressText = '30%'
              }else if(res.rows[i].progress == 2){
                res.rows[i].progressText = '60%'
              }else if(res.rows[i].progress == 3){
                res.rows[i].progressText = '已完成'
              }
            }
            that.feedList = that.feedList.concat(res.rows);
          }
        }else if (res.code == 602 && that.page == 1){
          that.nogetshow=true;
          that.feedList=[];
        }
      },
      deleteDrugs(id){
        let thia=this;
        this.$refs.confirm.show({
          title: '提示',
          content: '确认删除吗？',
          confirmText: '确定',
          confirmColor: '#2dc9aa',
          mask: true,
          success: function(res) {
            if (res.confirm) {
              thia.$put('/rs/bad_record/'+id,{status: 9}).then((res) => {
                if(res.code == 200){
                  thia.$mptoast("删除成功");
                  thia.page=1;
                  thia.feedList=[];
                  thia.getbad_record();
                }else{

                }
              })
            } else if (res.cancel) {

            }
          }
        })
      },
      tonewpage(urlname, data, progress){
        if(!urlname){return;}
        if(progress && progress != 3){
          return;
        }
        if(data){
          wx.navigateTo({
            url:`/pages/${urlname}/main?${data}`
          })
        }else{
          wx.navigateTo({
            url:`/pages/${urlname}/main`
          })
        }
      }
    },
    onLoad: function (option) {

    },
    onShow: function() {
      this.page = 1;
      this.feedList=[];
      if(this.$store.state.user.userid){
        this.isLogin = true;
      }
      this.getbad_record();
    },
    onPageScroll:function(res){
      let top = res.scrollTop;
      if (top > 400) {
        this.scrollIcon = true;
      } else {
        this.scrollIcon = false;
      }
    },
  }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .content{

    }
    .feedList{
      padding: 35px/2 35px/2 130px/2 35px/2;
      ul li{
        /*background-image: linear-gradient(0deg, #648ff9 0%, #8bb1ff 100%), linear-gradient(#d7975e, #d7975e);*/
        /*background-blend-mode: normal, normal;*/
        box-shadow: 0 0 10px rgba(45, 201, 170, 0.8);
        color: #666666;
        border-radius: 30px/2;
        margin-bottom: 30px/2;
        padding: 30px/2;
        .top-cont{
          display: flex;
          -webkit-box-pack:justify;
          -webkit-justify-content:space-between;
          -ms-flex-pack:justify;
          justify-content:space-between;
          .realname{
            font-weight: 700;
            font-size: 48px/2;
            font-family: STZhongsong;
          }
          .btns{
            display: flex;
            .edit-icon{
              width: 40px/2;
              height: 40px/2;
              padding: 5px/2;
              margin-right: 30px/2;
              background:url('../../../static/img/edit.png') center no-repeat;
              background-size: 40px/2 40px/2;
            }
            .del-icon{
              width: 40px/2;
              height: 40px/2;
              padding: 5px/2;
              background:url('../../../static/img/del.png') center no-repeat;
              background-size: 40px/2 40px/2;
            }
          }
        }
        .middle-cont, .bottom-cont, .progress{
          display: flex;
          margin-top: 20px/2;
          -webkit-box-pack:justify;
          -webkit-justify-content:space-between;
          -ms-flex-pack:justify;
          justify-content:space-between;
          div{
            width: 50%;
            font-family: STZhongsong;
            font-size: 30px/2;
          }
        }
      }
    }
    .bottom_sty{
      position: fixed;
      width: 750px/2;
      height: 120px/2;
      bottom: 0;
      background-color: #ffffff;
      .addfeed{
        width: 680px/2;
        height:80px/2;
        margin-left: 35px/2;
        margin-top: 10px/2;
        line-height: 80px/2;
        font-size: 30px/2;
        color: #ffffff;
        text-align: center;
        background-color: #2dc9aa;
        border-radius: 10px/2;
      }
      button{
        border: none
      }
    }
    .nogetList{
      padding-top: 200px/2;
      width: 450px/2;
      margin-left: 150px/2;
      img{
        width: 450px/2;
        height: 320px/2;
      }
      .nogetText{
        font-family: STZhongsong;
        color: #1a1a1a;
        font-size: 36px/2;
        text-align: center;
      }
    }
    .footcgotop{
      position: fixed;
      z-index: 100;
      bottom: 150px/2;
      right: 30px/2;
      width: 80px/2;
      height: 80px/2;
      background:url('../../../static/img/scrollTop.png') center no-repeat;
      background-size: 80px/2 80px/2;
    }
</style>
