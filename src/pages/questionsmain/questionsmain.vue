<template>
  <div>
    <div class="infok">
      <div class="list_item">
        <div>联系人</div>
        <div>{{main.username||'无'}}&nbsp;</div>
      </div>
      <div class="list_item">
        <div>联系电话</div>
        <div>{{main.phone||'无'}}&nbsp;</div>
      </div>
    </div>
    <div class="infok">
      <div class="list_item" v-if="!isjy">
        <div>政策类型</div>
        <div>{{main.c_name}}&nbsp;</div>
      </div>
      <div class="list_item">
        <div>详细描述</div>
        <div>{{main.details}}&nbsp;</div>
      </div>
      <div class="list_item bt">
        <div v-if="!isjy">咨询时间</div>
        <div v-if="isjy">创建时间</div>
        <div>{{main.create_time}}&nbsp;</div>
      </div>
      <!--<div class="list_item item_photo">-->
        <!--<div>照片</div>-->
        <!--<div class="imglist">-->
          <!--<div class="imgk">-->
            <!--<img src="/static/img/people.png" alt="">-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <!--<div class="infok">-->
      <!--<div class="list_item">-->
        <!--<div>平台回复</div>-->
        <!--<div>养老保险要交15年</div>-->
      <!--</div>-->
      <!--<div class="list_item bt">-->
        <!--<div>回复时间</div>-->
        <!--<div>2018-01-18 20:20:12</div>-->
      <!--</div>-->
      <!--<div class="statusk">-->
        <!--<div class="statustext">您反馈的问题正在协调中~</div>-->
        <!--<div class="statusimg"></div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script type="javascript">
  export default {
    data () {
      return {
        main:[],
        isjy:false,
        pid:""
      }
    },
    methods: {
      async getpolicyList() {
        let that = this;
        let data = {
          id:that.pid
        };
        let url='/rs/wish_to_known';
        if(that.isjy){
          url="/rs/suggest"
        }
        let res = await that.$get(url,data);
        if (res.code == 200){
          that.main=res.rows[0];
        }
      }
    },
    onLoad: function (option) {
      this.pid=option.pid;
      this.isjy=option.isjy||false;
      if(this.isjy){
        wx.setNavigationBarTitle({
          title: '建议详情'
        })
      }
      this.main = {};
      this.getpolicyList()//获取数据
    },
    onUnload: function () {
      this.main = {};
    }
  }
</script>

<style scoped lang="less">
  @import "../../static/less/common.less";

  .mui-ellipsis(){
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }
  div,p,ul,li,input{
    box-sizing:border-box;
  }

  .infok{
    &:last-child{
      border-bottom: none;
    }
    border-bottom:10/2px solid #f3f3f3;
    padding: 0 41/2px;
    .list_item{
      &:last-child{
        border-bottom: none;
      }
      &:after{
        content: "";
        display: table;
        clear:both;
      }
      &>div{
        float: left;
      }
      &.bt{
        border-bottom: 1px solid #e2e2e2;
      }
      border-bottom: 1px solid #e2e2e2;
      padding: 14/2px 0;
      &>div{
        font-size: 28/2px;
        line-height: 46/2px;
        padding-left:21/2px;
        width:540/2px ;
        border-left:1px solid #e2e2e2;
        word-break: break-all;
      }
      &>div:first-child{
        padding-left:0;
        width: 128/2px;
        border-left:none;
      }
    }
    .item_photo{
      padding:22/2px 0 0;
      &>div{
        border-left:none;
        padding-left:0;
      }
      .imglist{
        &:after{
          content: "";
          display: table;
          clear:both;
        }
        &>div{
          float: left;
        }
        .imgk{
          margin-right:20/2px;
          margin-bottom:20/2px;
          width: 115/2px;
          height:115/2px;
          img{
            width: 115/2px;
            height:115/2px;
          }
        }
      }
    }
    .statusk{
      text-align: center;
      .statustext {
        font-size: 24/2px;
        color: #666;
        padding: 42/2px 0 20/2px;
      }
      .statusimg{
        width: 100%;
        height:131/2px;
        background: url("../../../static/img/tsxq_x.png")no-repeat center center;
        background-size: 129/2px 129/2px;
      }
    }
  }

</style>
