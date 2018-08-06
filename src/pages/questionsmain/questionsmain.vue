<template>
  <div>
    <div class="infok">
      <div class="list_item">
        <div>咨询部门</div>
        <div>陕西人社厅</div>
      </div>
      <div class="list_item">
        <div>咨询分类</div>
        <div>养老保险</div>
      </div>
    </div>
    <div class="infok">
      <div class="list_item">
        <div>问题描述</div>
        <div>麻烦问一下，养老保险交多少年？</div>
      </div>
      <div class="list_item">
        <div>咨询时间</div>
        <div>2018-01-18 20:20:12</div>
      </div>
      <div class="list_item item_photo">
        <div>照片</div>
        <div class="imglist">
          <div class="imgk">
            <img src="/static/img/people.png" alt="">
          </div>
          <div class="imgk">
            <img src="/static/img/people.png" alt="">
          </div>
          <div class="imgk">
            <img src="/static/img/people.png" alt="">
          </div>
          <div class="imgk">
            <img src="/static/img/people.png" alt="">
          </div>
          <div class="imgk">
            <img src="/static/img/people.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="infok">
      <div class="list_item">
        <div>平台回复</div>
        <div>养老保险要交15年</div>
      </div>
      <div class="list_item bt">
        <div>回复时间</div>
        <div>2018-01-18 20:20:12</div>
      </div>
      <div class="statusk">
        <div class="statustext">您反馈的问题正在协调中~</div>
        <div class="statusimg"></div>
      </div>
    </div>
  </div>
</template>

<script type="javascript">

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
