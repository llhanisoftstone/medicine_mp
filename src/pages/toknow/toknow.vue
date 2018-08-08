<template>
    <div class="container">
      <form id="complaintsfrom">
        <ul class="complaintslist">
          <li data-type="1" >
            <span>咨询部门</span>
            <span id="refund_type" class="select-item ">请选择</span>
          </li>
          <li data-type="2" >
            <span>咨询分类</span>
            <span id="reason" class="select-item ">请选择</span>
          </li>
        </ul>
        <textarea id="complaintstext" placeholder="请简单描述您想要了解的内容（200字以内）" maxlength="200"></textarea>
        <div class="up" id="imgUpload" >
          <span class="upimg"><p>上传照片</p></span>
        </div>
      </form>
      <button type="button" class="sumbutton" id="submit_button">提交</button>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'toknow',
        props: [],
        data(){
            return {

            }
        },
        methods: {

        },
      onLoad: function (option) {

      }

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .complaintslist{
      li{
        height: 72px/2;
        padding: 14px/2 14px/2 14px/2 0;
        border-bottom: 1px solid @color_e2;
        position: relative;
        display: flex;
        align-items: center;
        span:first-child{
          width:170px/2;
          font-size: 28px/2;
          padding:0 16px/2 0 42px/2;
          height: 100%;
          display: flex;
          align-items: center;
          text-align: right;
          border-right: 1px solid @color_e2;
        }
        span:last-child{
          width:100%;
          font-size: 26px/2;
          line-height: 75px/2;
          height: 72px/2;
          padding-left: 23px/2 ;
          color: @color_99;
          border: none;
        }
      }
    }
    #complaintstext{
      margin: 24px/2 0 0 0;
      border: none;
      font-size: 26px/2;
      color: @color_666;
      padding:0 51px/2;
      line-height: 32px/2;
      box-sizing: border-box;
      width:750px/2;
      height: 240px/2;
    }
    textarea::-webkit-input-placeholder{ color:@color_99;}
    textarea::-moz-placeholder{ color:@color_99;}
    .sumbutton{
      width: 100%;
      height: 84px/2;
      font-size: 32px/2;
      background-color: @bg_color;
      color: @color_fff;
      position: fixed;
      bottom: 0;
      line-height: 84px/2;
      text-align: center;
      border:none;
      padding:0;
      border-radius:0;
      &:disabled{
        opacity: 1;
      }
    }
    .up{
      margin-top: 24px/2;
      padding-left:51px/2 ;
      span{
        display: inline-block;
        width: 141px/2;
        height: 141px/2;
        border: 1px dashed @color_99;
        border-radius: 20px/2;
        margin-right: 14px/2;
        margin-bottom: 14px/2;
        float: left;
        position: relative;
        p{
          display: inline-block;
          width: 100%;
          text-align: center;
          font-size: 20px/2;
          line-height: 20px/2;
          color: @color_666;
          margin: 0;
          position: absolute;
          top:84px/2;
        }
      }
      img{
        font-size: 0;
        display: inline-block;
        width: 141px/2;
        height: 141px/2;
        border: 1px dashed @color_99;
        border-radius: 20px/2;
        margin-right: 14px/2;
        margin-bottom: 14px/2;
        float: left;
      }
      .upimg{
        background: #f6f6f6 url(../../../static/img/uploadimg.png) no-repeat  center 37px/2;
        background-size:46px/2 37px/2;
      }
    }
</style>
