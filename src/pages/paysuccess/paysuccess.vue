<template>
    <div class="container">
      <div class="submitResult_success" v-if="seen">
        <div class="submitResult_icon">
          <div class="icon_success"></div>
          <div class="title success">
            恭喜您支付成功
          </div>
        </div>
        <div class="submitResult_btn">
          <div class="result_text">
            感谢您的支持,您的满意是我们最大的追求
          </div>
          <a href="/pages/itemshop/main?ispay=true"><div class="result_btn">查看我的背包</div></a>
        </div>
      </div>
      <div class="submitResult_error hide" v-if="isshow">
        <div class="submitResult_icon">
          <div class="icon_error"></div>
          <div class="title error">
            哎呀!支付失败啦
          </div>
        </div>
        <div class="submitResult_btn">
          <div class="result_text">
            对不起,您的操作失败!再去看看吧
          </div>
          <a href="/pages/itemshop/main?ispay=true"><div class="result_btn">查看我的背包</div></a>
        </div>
      </div>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'paysuccess',
        props: [],
        data(){
            return {
                seen:true,
                isshow:false,
            }
        },
        methods: {
          getpolicyInfo(isok){
              if(isok=="true"){
                 this.seen=true;
                this.isshow=false;
              }else{
                this.seen=false;
                this.isshow=true;
              }
          }
        },
        components: {},
       onLoad: function (option) {
        this.getpolicyInfo(option.isok)//获取数据
      }

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .submitResult_icon{
      margin-top:94px;
      .icon_success{
        width:113px;
        height:113px;
        margin-left:131px;
        background:url(../../../static/img/success.png) no-repeat center center;
        background-size:cover;
      }
      .icon_error{
        width:113.5px;
        height:113.5px;
        margin-left:131px;
        background:url(../../../static/img/shibai.png) no-repeat center center;
        background-size:cover;
      }
      .title{
        margin-top:19px;
        font-size:20px;
        color:#df5c3e;
        text-align:center;
      }
   }
    .submitResult_btn{
      margin-top:13px;
      width:275px;
      height:1px;
      margin-left:50px;
      background:#e2e2e2;
      .result_text{
        padding-top:13px;
        font-size:12px;
        color:#999;
        text-align:center;
      }
    }
  .result_btn{
    width:129px;
    height:30px;
    margin-top:20px;
    margin-left:73px;
    background:#df5c3e;
    border-radius:100px;
    font-size:14px;
    color:#fff;
    line-height:30px;
    text-align:center;
  }
</style>
