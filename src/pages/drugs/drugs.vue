<template>
  <div class="content">
    <div class="step">
      <i class="step-one"></i>
      <i class="step-arrow"></i>
      <i class="step-two"></i>
      <i class="step-arrow"></i>
      <i class="step-three"></i>
    </div>
    <div class="feedList">
      <ul class="ul_list" v-if="susplist.length > 0">
        <div class="ul_title"><div class="ul_lable">怀疑药品</div><div class="ul_add" @click.stop="tonewpage('search_drugs','type=2&b_id='+pid)">新增</div></div>
        <li class="li_one" v-for="(item, index) in susplist" v-bind:key="index">
          <div class="top-cont">
            <div class="realname">{{item.realname}}</div>
            <div class="btns">
              <div class="edit-icon" @click.stop="tonewpage('input_drugs','b_id='+item.b_id+'&d_id='+item.d_id+'&g_id='+item.id+'&operation=edit')"></div>
              <div class="del-icon" @click.stop="deleteDrugs(item.id)"></div>
            </div>
          </div>
          <div class="middle-cont">
            <div class="div30">商品名称</div><div class="div70">{{item.title}}</div>
          </div>
          <div class="bottom-cont">
            <div class="div30">通用名称</div><div class="div70">{{item.common_name}}</div>
          </div>
          <div class="bottom-cont">
            <div class="div30">生产厂家</div><div class="div70">{{item.company_name}}</div>
          </div>
          <div class="progress">
            <div class="div30">起止时间</div><div class="div70">{{item.start_time}}~{{item.end_time}}</div>
          </div>
        </li>
      </ul>
      <ul class="ul_list" v-if="combinalist.length > 0">
        <div class="ul_title"><div class="ul_lable">并用药品</div><div class="ul_add" v-if="susplist.length == 0" @click.stop="tonewpage('search_drugs','type=2&b_id='+pid)">新增</div></div>
        <li class="li_two" v-for="(item, index) in combinalist" v-bind:key="index">
          <div class="top-cont">
            <div class="realname">{{item.realname}}</div>
            <div class="btns">
              <div class="edit-icon" @click.stop="tonewpage('input_drugs','b_id='+item.b_id+'&d_id='+item.d_id+'&g_id='+item.id+'&operation=edit')"></div>
              <div class="del-icon" @click.stop="deleteDrugs(item.id)"></div>
            </div>
          </div>
          <div class="middle-cont">
            <div class="div30">商品名称</div><div class="div70">{{item.title}}</div>
          </div>
          <div class="bottom-cont">
            <div class="div30">通用名称</div><div class="div70">{{item.common_name}}</div>
          </div>
          <div class="bottom-cont">
            <div class="div30">生产厂家</div><div class="div70">{{item.company_name}}</div>
          </div>
          <div class="progress">
            <div class="div30">起止时间</div><div class="div70">{{item.start_time}}~{{item.end_time}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="nogetList" v-if="nogetshow"><img src="/static/img/empty-4.png"/><div class="nogetText">未选择药品</div></div>
    <div class="bottom_sty">
      <div class="addfeed" v-if="addshow" @click.stop="searchDrugs()">选择药品</div>
      <div class="addfeed" v-if="!addshow" @click.stop="nextStep('patient_information','b_id='+pid)">下一步</div>
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
          pid: '',
          susplist: [],
          combinalist: [],
          addshow: true,
          nogetshow: true
        }
    },
    components: {
      mptoast,
      confirm
    },
    methods: {
      async getdrugsList(){ //疑似药列表
        let that = this;
        let res = await this.$get('/rs/drugs_bads',{b_id: this.pid, status: 1});
        if(res.code == 200){
          that.nogetshow=false;
          that.addshow=false;
          let arr1 = [];
          let arr2 = [];
          for(let i=0; i<res.rows.length; i++){
            if(!res.rows[i].title){
              res.rows[i].title = '';
            }
            res.rows[i].start_time = res.rows[i].start_time.substring(0, 10);
            res.rows[i].end_time = res.rows[i].end_time.substring(0, 10);
            if(res.rows[i].type == 1){
              arr1.push(res.rows[i]);
            }else{
              arr2.push(res.rows[i]);
            }
          }
          that.susplist = arr1;
          that.combinalist = arr2;
        }else if(res.code == 602){
          that.nogetshow = true;
          that.addshow = true;
          that.susplist = [];
          that.combinalist = [];
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
              thia.$put('/rs/drugs_bads/'+id,{status: 9}).then((res) => {
                if(res.code == 200){
                  thia.$mptoast("删除成功");
                  thia.getdrugsList();
                }else{
                  thia.$mptoast("删除失败");
                }
              })
            } else if (res.cancel) {

            }
          }
        })
      },
      searchDrugs(){
        let data = 'type=2';
        if(this.pid){
          data += '&b_id='+this.pid
        }
        wx.navigateTo({
          url:`/pages/search_drugs/main?${data}`
        })
      },
      nextStep(){
        if(this.pid){
          let data = 'b_id='+this.pid
          wx.navigateTo({
            url:`/pages/patient_information/main?${data}`
          })
        }else{
          wx.navigateTo({
            url:`/pages/patient_information/main`
          })
        }
      },
      tonewpage(urlname, data){
        if(!urlname){return;}
        wx.navigateTo({
          url:`/pages/${urlname}/main?${data}`
        })
      }
    },
    onLoad: function (option) {
      this.pid = option.pid || '';
      if(option.pid){
        this.pid = option.pid;
      }else{
        this.pid = '';
      }
    },
    onShow: function() {
      this.susplist = []
      this.combinalist = []
      console.log('pid=========='+this.pid)
      if(this.pid){
        this.getdrugsList();  //药品列表
      }else{
        this.addshow = true
        this.nogetshow = true
      }
    }
  }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .step{
      display: flex;
      margin: 30px/2 100px/2;
      .step-one{
        width: 60px/2;
        height: 60px/2;
        background:url('../../../static/img/step/one-01.png') center no-repeat;
        background-size: cover;
      }
      .step-two{
        width: 60px/2;
        height: 60px/2;
        background:url('../../../static/img/step/two-02.png') center no-repeat;
        background-size: cover;
      }
      .step-three{
        width: 60px/2;
        height: 60px/2;
        background:url('../../../static/img/step/three-02.png') center no-repeat;
        background-size: cover;
      }
      .step-arrow{
        width: 160px/2;
        height: 60px/2;
        margin: 0 20px/2;
        background:url('../../../static/img/step/arrow-02.png') center no-repeat;
        background-size: 160px/2 60px/2;
      }
    }
    .feedList{
      margin: 80px/2 35px/2 0 35px/2;
      ul{
        font-family: STZhongsong;
        margin-bottom: 45px/2;
        .ul_title{
          display: flex;
          -webkit-box-pack:justify;
          -webkit-justify-content:space-between;
          -ms-flex-pack:justify;
          justify-content:space-between;
          margin-bottom: 30px/2;
          .ul_lable{
            font-size: 42px/2;
            color: #1a1a1a;
          }
          .ul_add{
            font-size: 36px/2;
            margin-top: 10px/2;
            color: #1a1a1a;
            padding-right: 50px/2;
            background:url('../../../static/img/add.png') center right no-repeat;
            background-size: 30px/2 30px/2;
          }
        }
        li{
          background-blend-mode: normal, normal;
          border-radius: 30px/2;
          padding: 30px/2;
          margin-bottom: 30px/2;
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
              font-family: STZhongsong;
              font-size: 30px/2;
            }
            .div30{
              width: 30%;
            }
            .div70{
              width: 70%;
            }
          }
        }
        .li_one{
          box-shadow: 0 0 10px rgba(234, 107, 14, 0.8);
          color: #666666;
        }
        .li_two{
          box-shadow: 0 0 10px rgba(99, 150, 255, 0.8);
          color: #666666;
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
