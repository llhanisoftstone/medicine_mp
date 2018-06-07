<template>
  <div class="content">
    <div class="title">{{title}}</div>
    <div class="release-time">发布时间 : {{create_time}}</div>
    <div class="details" v-html="details"></div>
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
          that.create_time = this.conversionTime(res.rows[0].create_time);
          var dt = res.rows[0].details;
          if (dt){
            var aimurl = that.$store.url+"/upload";
            dt.replace(/\/upload/g, aimurl);
          }
          that.details = dt;
        }
      },
      conversionTime(time){
        if(time==null){
          return;
        }
        var data = new Date(time);
        var month=parseInt(data.getMonth()+1);
        var months="";
        if(month<10){
          months="0"+month;
        }else{
          months=month;
        }
        var day=data.getDate();
        var days="";
        if(day<10){
          days="0"+day;
        }else{
          days=day;
        }
        return data.getFullYear()+"-"+months+"-"+days;
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
    text-indent: 2em;
    word-wrap:break-word;
    margin: 30px/2 30px/2 0 30px/2;
    width: 100%;
    height: auto;
  }
</style>
