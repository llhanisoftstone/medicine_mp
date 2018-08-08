<template>
  <div>
    <div class="list">
      <a class="ui-link" :href="'/pages/questionsmain/main'">
        <div class="item">
          <div class="itemsign th"></div>
          <div class="item_list mui-ellipsis">咨询部门：陕西人社厅</div>
          <div class="item_list mui-ellipsis">问题类型：养老保险类</div>
          <div class="item_list mui-ellipsis">问题描述：麻烦问一下，养老保险需要交多少年。</div>
          <div class="item_list mui-ellipsis">咨询时间：2018-01-01 18:02:02</div>
        </div>
      </a>
      <a class="ui-link" :href="'/pages/questionsmain/main'">
        <div class="item">
          <div class="itemsign dh"></div>
          <div class="item_list mui-ellipsis">咨询部门：陕西人社厅</div>
          <div class="item_list mui-ellipsis">问题类型：养老保险类</div>
          <div class="item_list mui-ellipsis">问题描述：麻烦问一下，养老保险需要交多少年。</div>
          <div class="item_list mui-ellipsis">平台回复：养老保险，一般企事业单位要交15年。</div>
        </div>
      </a>
    </div>
    <a class="ui-link" :href="'/pages/toknow/main'">
      <div class="zc_btn"><div class="zcbtn_top">我要提问</div></div>
    </a>
  </div>
</template>

<script type="javascript">

</script>

<style scoped lang="less">
  @import "../../static/less/common.less";

  .mui-ellipsis{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }
  div,p,ul,li,input{
    box-sizing:border-box;
  }

  .zc_btn{
    position: fixed;
    z-index: 999;
    bottom:300/2px;
    right:30/2px;
    width: 85/2px;
    height:85/2px;
    box-sizing: border-box;
    border-radius: 50%;
    background: linear-gradient(135deg,#f4c8be 0%, #df5c3e 50% ,#b54b32 100%);
    box-shadow: 1px 1.5px 1px 1px rgba(0,0,0,.2);
    .zcbtn_top{
      position: absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      margin:auto;
      border-radius: 50%;
      background: #df5c3e;
      width: 75/2px;
      height:75/2px;
      padding: 13/2px;
      box-sizing: border-box;
      font-size: 23/2px;
      line-height: 25/2px;
      color: #fff;
      text-align: center;
    }
  }

  .list{
    padding: 24/2px 29/2px;
    .item{
      position: relative;
      background: #f6f6f6;
      padding: 15/2px 20/2px;
      border-radius: 10/2px;
      margin-bottom:20/2px;
      .item_list{
        font-size: 28/2px;
        color: #333;
        line-height: 48/2px;
      }
      .itemsign{
        position: absolute;
        top:18/2px;
        right:13/2px;
        width: 55/2px;
        height:55/2px;
        &.th{
          background: url("../../../static/img/list_07.png")no-repeat center center;
          background-size:45/2px 45/2px;
        }
        &.dh{
          background: url("../../../static/img/list_10.png")no-repeat center center;
          background-size:45/2px 45/2px;
        }
      }
    }
  }
</style>
