<template>
    <div class="content">
      <div class="title">{{title}}</div>
      <div class="item_for">
        <div class="author">作者：{{author}}</div>
        <div class="create">发布时间：{{create_time}}</div>
      </div>
      <div class="details">
        <div  v-html="details"></div>
      </div>
    </div>
</template>

<script type="javascript">
    export default {
        data(){
            return {
              title: '',
              author: '',
              create_time: '',
              details: ''
            }
        },
        methods: {
          async getdrugs_details() {
            let that = this;
            let res = await this.$get('/rs/information/'+this.pid);
            if (res.code == 200){
              that.title = res.rows[0].title;
              that.author = res.rows[0].author;
              that.create_time = res.rows[0].create_time.substring(0, 10);
              let details = res.rows[0].details;
              if (details){
                var aimurl = 'src="'+that.$store.state.url+"/upload/";
                details = details.replace(/src=\"\/upload\//g, aimurl);
                details = details.replace(/\<img(.+?)src\=\"(.+?)\".+?\>/g,"<img style='max-width:100%;height:auto' src='$2'>")
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
    .title{
      margin: 30px/2 0;
      font-size: 40px/2;
      color: #333333;
      font-family: STZhongsong;
    }
    .item_for{
      margin: 30px/2 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .author, .create{
      font-size: 24px/2;
      color: #666666;
      font-family: STZhongsong;
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
  .btn{
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
</style>
