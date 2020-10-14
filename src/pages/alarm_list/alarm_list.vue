<template>
  <div class="content">
    <div class="feedList">
      <ul class="ul_list" v-if="alarmlist.length > 0">
        <li class="li_one" v-for="(item, index) in alarmlist" @click.stop="tonewpage('report_details','pid='+item.b_id+'&alarm=1')" v-bind:key="index">
          <div class="middle-cont">
            <div class="div30">患者姓名</div><div class="div70">{{item.realname}}</div>
          </div>
          <div class="bottom-cont">
            <div class="div30">服用药品</div><div class="div70">{{item.common_name}}</div>
          </div>
          <div class="bottom-cont">
            <div class="div30">事件名称</div><div class="div70">{{item.event_text}}</div>
          </div>
          <div class="progress">
            <div class="div30">填报时间</div><div class="div70">{{item.filling_time}}</div>
          </div>
        </li>
      </ul>
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
          alarmlist: [],
        }
    },
    components: {
      mptoast,
      confirm
    },
    methods: {
      async getalarmList(){ //疑似药列表
        let that = this;
        let res = await this.$get('/rs/v_alarm_bad_record_parent',{parent_id: this.$store.state.user.userid, alarm: 2, type: 0});
        if(res.code == 200){
          that.alarmlist = res.rows;
        }else if(res.code == 602){
          that.alarmlist = [];
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

    },
    onShow: function() {
      this.alarmlist = []
      this.getalarmList();
    }
  }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
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
          border-radius: 10px/2;
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
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-break: break-all;
            }
          }
        }
        .li_one{
          box-shadow: 0 0 10px rgba(45, 201, 170, 0.8);
          color: #666666;
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
