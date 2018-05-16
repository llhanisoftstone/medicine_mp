<template>
    <div class="container">
      <div class="aboutus_pic">
        <div></div>
      </div>
      <div class="aboutus_text">
        <div class="ab_title">陕西人社政策答题</div>
        <div class="ab_content">Ver&nbsp;&nbsp;1.0.0</div>
      </div>
      <div class="foot">
        <p>Copyright&copy;2018</p>
        <p>本平台由陕西省人力资源和社会保障厅授权</p>
        <p>由 <span>西安藤罗网络科技有限公司</span>独家运营</p>
        <p>TEL：029-81101859</p>
      </div>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'aboutus',
        props: [],
        data(){
            return {}
        },
        methods: {},
        components: {}

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .aboutus_pic{
      margin-top:63px;
      width:100%;
      text-align:center;
      >div{
        margin-left:138px;
        width:99px;
        height:98px;
        background:url(../../../static/img/aboutus_03.png) no-repeat center center;
        background-size:cover;
      }
    }
    .aboutus_text{
      padding:0 15px;
      text-align: center;
      .ab_title{
        padding:15px 0 0 0;
        font-size:18px;
        color: #df5c3e;
        text-align: center;
      }
      .ab_content{
        margin:5px 0 0 132.5px;
        line-height:24px;
        font-size: 13px;
        color: #333;
        width:80px;
        height:24px;
        border-radius:12px;
        border:1px solid #df5c3e;
      }
    }
    .foot{
      position:absolute;
      bottom:36px;
      text-align:center;
      width:100%;
      font-size:13px;
      color: #333;
      p{
        margin:0;
        font-size: 13px;
        color:#333;
        span{
          color:#df5c3e;
        }
      }
    }
</style>
