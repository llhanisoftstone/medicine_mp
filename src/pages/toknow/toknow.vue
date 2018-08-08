<template>
    <div class="container">
      <form id="complaintsfrom">
        <ul class="complaintslist">
          <li data-type="1" >
            <span>咨询分类</span>
            <span class="select-item ">请选择咨询分类</span>
          </li>
          <li data-type="2" >
            <span>姓名</span>
            <input class="select-item" type="text" placeholder="请输入姓名" maxlength="10">
          </li>
          <li data-type="3" >
            <span>手机号</span>
            <input class="select-item " placeholder="请输入手机号" type="text">
          </li>
        </ul>
        <textarea id="complaintstext" placeholder="请简单描述您想要了解的内容（200字以内）" maxlength="200"></textarea>
        <!--<div class="up" id="imgUpload" >-->
          <!--<span class="upimg"><p>上传照片</p></span>-->
        <!--</div>-->
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
        .select-item{
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
      padding:0 42px/2;
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

</style>
