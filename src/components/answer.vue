<template>
    <div>
      <h2>#{{title}}</h2>
      <h4 :class="{'top':distance==1}">{{answer}}</h4>
      <slot name="list"></slot>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'answer',
        props: ['title','answer','distance'],
        data(){
            return {}
        },
        methods: {},
        components: {}

    }
</script>

<style lang="less" scoped>
    @import '../static/less/common.less';
    h2{
      font-size: 28px/2;
      height: 28px/2;
      line-height: 28px/2;
      color: @bg_color;
      text-align: center;
    }
    h4{
      margin-top:64px/2;
      font-size: 30px/2;
      width: 524px/2;
      line-height: 40px/2;
      margin-bottom: 110px/2;
    }
    .top{
      margin-top:33px/2;
      margin-bottom: 78px/2;
    }
</style>
