<template>
    <div>
      <div class="fraction">
        <div class="fraction_item" :style="'height:'+nub+'%;background:'+color+';'"></div>
      </div>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'fraction',
        props: ['number','color'],
        data(){
            return {}
        },
        methods: {
        },
        components: {},
        computed:{
            nub(){
                return this.number*100/500
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../static/less/common.less';
    .fraction{
      width: 13px/2;
      height: 320px/2;
      background: #d6d6d6;
      overflow: hidden;
      position: relative;
      border-radius: 10px/2;
      .fraction_item{
        transition: all .3s ease;
        width: 13px/2;
        position: absolute;
        bottom:0;
        left:0;
      }
    }
</style>
