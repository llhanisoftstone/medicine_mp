<template>
  <div>
    <div class="title">政策百科</div>
    <div class="release-time">发布时间 : 2017-02-30</div>
    <div class="details"></div>
  </div>
</template>

<script type="javascript">
  export default {
    data(){
      return {}
    },

    methods: {},
    components: {}

  }
</script>

<style lang="less" scoped>
  @import '../../static/less/common.less';
  .title{
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
    margin: 0.341333rem 0.533333rem 0 0.533333rem;
    font-size: 0.277333rem;
    line-height: 0.426667rem;
    color: #666666;
  }
</style>
