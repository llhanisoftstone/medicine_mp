<template>
  <div class="content">
    <div class="feedList">
      <ul class="ul_list">
        <li v-for="(item, index) in patientList" v-bind:key="index">
          <div class="top-cont">
            <div class="realname">{{item.realname}}</div>
            <div class="btns">
              <div class="edit-icon" @click.stop="tonewpage('patient_details','pid='+item.id)"></div>
              <div class="del-icon" @click.stop="delPatient(item.id)"></div>
            </div>
          </div>
          <div class="middle-cont">
            <div>原患疾病</div><div>{{item.diseases}}</div>
          </div>
          <div class="bottom-cont">
            <div>既往药品不良反应</div><div>{{item.describe}}</div>
          </div>
          <div class="progress">
            <div>相关重要信息</div><div>{{item.information_text}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="scrollIcon" v-on:click="scrolltoTop" id="scrollToTop" class="footcgotop"></div>
    <div class="nogetList" v-if="nogetshow"><img src="/static/img/empty-3.png"/><div class="nogetText">暂无患者信息</div></div>
    <div class="addfeed" @click.stop="tonewpage('patient_details')">新增患者信息</div>
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
          patientList: [],
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
      this.patientList=[];
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
      delPatient(id){
        let that=this;
        this.$refs.confirm.show({
          title: '提示',
          content: '确认删除吗？',
          confirmText: '确定',
          confirmColor: '#2dc9aa',
          mask: true,
          success: function(res) {
            if (res.confirm) {
              that.$put('/rs/patient/'+id, {status: 9}).then((rs) => {
                if(rs.code == 200){
                  that.$mptoast("删除成功");
                  that.page=1;
                  that.patientList=[];
                  that.getpatientList()
                }
              })
            } else if (res.cancel) {

            }
          }
        })
      },
      tonewpage(urlname, data){
        if(!urlname){return;}
        wx.navigateTo({
          url:`/pages/${urlname}/main?${data}`
        })
      },
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
        this.getpatientList();
      },
      loadmore(){
        this.getpatientList();
      },
      async getpatientList(){
        let that = this;
        let res = await this.$get('/rs/patient', {page:this.page, size:this.size, u_id: this.$store.state.user.userid, status: 1});
        if (res.code == 200){
          that.nogetshow=false;
          if(that.page==1){
            that.patientList=[];
          }
          if (res.rows.length > 0){
            for(let i=0; i<res.rows.length; i++){
              if(res.rows[i].whether == 1){
                res.rows[i].describe = res.rows[i].describe
              }else if(res.rows[i].whether == 2){
                res.rows[i].describe = '无'
              }else{
                res.rows[i].describe = '不详'
              }
              let information_text = '', other = '';
              if(res.rows[i].information_text){
                information_text = res.rows[i].information_text
              }
              if(res.rows[i].other){
                other = res.rows[i].other
              }
              res.rows[i].information_text = information_text+other
            }
            that.patientList = that.patientList.concat(res.rows);
          }
        }else if (res.code == 602 && that.page == 1){
          that.nogetshow=true;
          that.patientList=[];
        }
      }
    },
    onLoad: function (option) {

    },
    onShow: function() {
      this.page = 1;
      this.nogetshow = false;
      this.patientList=[];
      this.getpatientList();
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
    .feedList{
      margin: 50px/2 35px/2 0 35px/2;
      ul li{
        box-shadow: 0 0 10px rgba(45, 201, 170, 0.8);
        color: #666666;
        background-blend-mode: normal, normal;
        border-radius: 10px/2;
        margin-bottom: 30px/2;
        padding: 30px/2;
        .top-cont{
          display: flex;
          -webkit-box-pack:justify;
          -webkit-justify-content:space-between;
          -ms-flex-pack:justify;
          justify-content:space-between;
          .realname{
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
    .addfeed{
      position: fixed;
      bottom: 40px/2;
      left: 35px/2;
      width: 680px/2;
      height:80px/2;
      line-height: 80px/2;
      font-size: 30px/2;
      color: #ffffff;
      text-align: center;
      background-color: #2dc9aa;
      border-radius: 10px/2;
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
      bottom: 100px/2;
      right: 30px/2;
      width: 80px/2;
      height: 80px/2;
      background:url('../../../static/img/scrollTop.png') center no-repeat;
      background-size: 80px/2 80px/2;
    }
</style>
