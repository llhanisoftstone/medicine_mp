<template>
    <div class="container">
      <div class="nogetList"><img src="/static/img/ok.png"/><div class="nogetText">报告已经提交，感谢您的反馈！</div></div>
      <div class="addfeed" @click.stop="jumpTopage()">返回填报页面</div>
      <mptoast/>
    </div>
</template>

<script type="javascript">
    import mptoast from '../../components/mptoast'
    export default {
      data(){
          return {
            code: 200,
          }
      },
      components: {
        mptoast
      },
      methods: {
        jumpTopage(){
          wx.switchTab({
            url:`/pages/feedback/main`
          })
        }
      },
      onLoad: function (option) {
        this.code = option.code
      },
      onShow(){

      }
    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
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
      width: 600px/2;
      margin-left: 75px/2;
      img{
        margin-left: 194px/2;
        width: 212px/2;
        height: 207px/2;
      }
      .nogetText{
        font-family: STZhongsong;
        color: #1a1a1a;
        font-size: 36px/2;
        text-align: center;
        margin-top: 75px/2;
      }
    }
</style>
