<template>
  <div class="content">
    <div class="title">{{title}}</div>
    <div class="release-time">发布时间 : {{create_time}}</div>
    <div class="details"><div  v-html="details"></div></div>
  </div>
</template>

<script type="javascript">
  export default {
    data(){
      return {
        title:'',
        create_time:'',
        details:'',
      }
    },

    methods: {
      async getpolicyInfo(pid) {
        let that = this;
        let res = await this.$get('/rs/infomation/'+pid);
        if (res.code == 200){
          that.title = res.rows[0].title;
          that.create_time = this.conversionTime(res.rows[0].create_time,'/');
          var details=res.rows[0].details;
          if (details){
            var aimurl = that.$store.state.url+"/upload/ueeditor/";
            details=details.replace(/\/upload\/ueeditor/g, aimurl);
            details=details.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
          }
          that.details =  details;
        }
      },
      conversionTime(time,sign){
        if(time==null){
          return;
        }
        time=time.replace(/-/g, '/');
        var data = new Date(time);
        var month=parseInt(data.getMonth()+1);
        var months="";
        months=month;
        var day=data.getDate();
        return data.getFullYear()+sign+months+sign+day;
      }
    },

    onLoad: function (option) {
      this.getpolicyInfo(option.pid)//获取数据
    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/less/common.less';
  .content{
    margin: 0 50px/2;
    text-align: justify;
  }

  .title{
    word-wrap:break-word;
    margin: 0.512rem 0 0.234667rem;
    text-align: center;
    font-size: 0.341333rem;
    color: #333333;
  }
  .release-time{
    font-size: 0.256rem;
    color: #999999;
    text-align: center;
  }
  .details{
    font-size: 0.277333rem;
    line-height: 0.426667rem;
    color: #666666;
    word-wrap:break-word;
    width: 100%;
    height: auto;
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
