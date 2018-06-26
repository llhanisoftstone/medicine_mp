<template>
    <div>
      <h2 :class="{'topan':isanimation}">#{{title}}</h2>
      <h4 :class="{'top':distance==1,'topan':isanimation}">{{answer}}</h4>
      <slot name="list"></slot>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'answer',
        props: ['title','answer','distance'],
        data(){
            return {
              isanimation:false
            }
        },
        methods: {},
        components: {},
        watch:{
          answer(val,oldval){
            this.isanimation=true
            setTimeout(()=>{
              this.isanimation=false
            },2000)
          }
        },
        mounted(){
          this.isanimation=true
          setTimeout(()=>{
            this.isanimation=false
          },2000)
        }

    }
</script>

<style lang="less" scoped>
    @import '../static/less/common.less';
    @keyframes showtop {
      0%{
        transform: translateY(0px) scale(1);
        opacity: 1;
      }
      25%{
        transform: translateY(-20px) scale(0);
        opacity: 0;
      }
      50%{
        transform: translateY(-20px) scale(0);
        opacity: 0;
      }
      100%{
        transform: translateY(0px) scale(1);
        opacity: 1;
      }
    }
    h2{
      font-size: 28px/2;
      height: 28px/2;
      line-height: 28px/2;
      color: @bg_color;
      text-align: center;
    }
    h4{
      margin-top:44px/2;
      font-size: 30px/2;
      width: 524px/2;
      line-height: 40px/2;
      margin-bottom: 70px/2;
      text-align: justify;
    }
    .top{
      margin-top:23px/2;
      margin-bottom: 40px/2;
    }
    .topan{
      transform-origin: 50% 50% 0;
      animation: showtop 2s ease;
    }

</style>
