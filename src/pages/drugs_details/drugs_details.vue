<template>
    <div class="content">
      <div class="details">
        <div  v-html="details"></div>
      </div>
      <div class="bottom_sty">
        <div class="btn" @click.stop="jumpTopage()">填写不良反应报告</div>
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
            let res = await this.$get('/rs/drugs/'+this.pid);
            if (res.code == 200){
              var details=res.rows[0].details;
              if (details){
                var aimurl = 'src="'+that.$store.state.url+"/upload/";
                details=details.replace(/src=\"\/upload\//g, aimurl);
                details=details.replace(/\<img(.+?)src\=\"(.+?)\".+?\>/g,"<img style='max-width:100%;height:auto' src='$2'>")
              }
              that.details =  details;
            }
          },
          jumpTopage(){
            let urlname = 'input_drugs';
            let data = 'd_id='+this.pid+'&operation=add'
            wx.navigateTo({
              url:`/pages/${urlname}/main?${data}`
            })
          },
        },
        onLoad: function (option) {
          this.pid = option.pid;
        },
        onShow(){
          this.details = '';
          this.getdrugs_details()//获取数据
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
      padding-bottom: 130px/2;
      >div{
        width:345px;
        word-wrap:break-word;
        *{
          word-break: break-all;
          word-wrap: break-word;
        }
      }
    }
    .bottom_sty {
      position: fixed;
      width: 750px/2;
      height: 120px/2;
      bottom: 0;
      background-color: #ffffff;
      .btn{
        width: 680px/2;
        height:80px/2;
        margin-top: 10px/2;
        line-height: 80px/2;
        font-size: 30px/2;
        color: #ffffff;
        text-align: center;
        background-color: #2dc9aa;
        border-radius: 10px/2;
      }
    }
</style>
