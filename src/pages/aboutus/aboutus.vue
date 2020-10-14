<template>
  <div class="content">
    <div class="details">
      <div  v-html="details"></div>
    </div>
  </div>
</template>

<script type="javascript">
  export default {
    data(){
      return {
        details: ''
      }
    },
    methods: {
      async getdrugs_details() {
        let that = this;
        let res = await this.$get('/rs/about_us/1');
        if (res.code == 200){
          var details=res.rows[0].details;
          if (details){
            var aimurl = 'src="'+that.$store.state.url+"/upload/";
            details=details.replace(/src=\"\/upload\//g, aimurl);
            details=details.replace(/\<img(.+?)src\=\"(.+?)\".+?\>/g,"<img style='max-width:100%;height:auto' src='$2'>")
          }
          that.details =  details;
        }
      }
    },
    onLoad: function (option) {
      this.getdrugs_details()
    },
    onShow(){
      this.details = '';
    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/less/common.less';
  .content{
    margin: 20px/2 30px/2;
    text-align: justify;
  }
  .details{
    word-wrap:break-word;
    width: 100%;
    height: auto;
    font-size: 26px/2;
    line-height: 50px/2;
    color: #666666;
    box-sizing:border-box;
    >div{
      width:345px;
      word-wrap:break-word;
      *{
        word-break: break-all;
        word-wrap: break-word;
      }
    }
  }
</style>
