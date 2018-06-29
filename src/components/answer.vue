<template>
    <div>
      <h2 :class="{'topan':isanimation&&(step==1),'topan1':isanimation&&(step!=1)}">#{{title}}</h2>
      <h4 :class="{'top':distance==1,'topan':isanimation&&(step==1),'topan1':isanimation&&(step!=1)}">{{a_answer}}</h4>
      <slot name="list"></slot>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'answer',
        props: ['title','answer','distance'],
        data(){
            return {
              isanimation:false,
              a_answer:'',
              setfn:null
            }
        },
        methods: {},
        components: {},
        watch:{
          answer(val,oldval){
            let that =this
            that.isanimation=true
            clearTimeout(that.setfn)
            that.setfn=null
            that.setfn=setTimeout(()=>{
              that.isanimation=false
            },2000)
            if(this.step == 1){
              that.a_answer = val
            }else{
              setTimeout(()=>{
                that.a_answer = val
              },750)
            }
          }
        },
        mounted(){
          this.isanimation=true
          this.a_answer=this.answer
          setTimeout(()=>{
            this.isanimation=false
          },2000)
        },
      computed:{
            step(){
                return this.$store.state.step
            }
      }

    }
</script>

<style lang="less" scoped>
    @import '../static/less/common.less';
    @keyframes showtop {
      0%{
        transform: scale(0);
        opacity: 0;
      }
      50%{
        transform: scale(0.7);
        opacity: 0;
      }
      75%{
        transform: scale(1);
        opacity: 1;
      }
      80%{
        transform: scale(1.08);
        opacity: 1;
      }
      100%{
        transform: scale(1);
        opacity: 1;
      }
    }
    @keyframes showtop1 {
      0%{
        transform: scale(1);
        opacity: 1;
      }
      25%{
        transform: scale(1);
        opacity: 1;
      }
      37.5%{
        transform: scale(0.5);
        opacity: 0;
      }
      50%{
        transform: scale(0);
        opacity: 0;
      }
      75%{
        transform: scale(0.7);
        opacity: 0;
      }
      87.5%{
        transform: scale(1);
        opacity: 1;
      }
      90%{
        transform: scale(1.08);
        opacity: 1;
      }
      100%{
        transform: scale(1);
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
      animation: showtop 1s ease-out;
    }
    .topan1{
      transform-origin: 50% 50% 0;
      animation: showtop1 1.5s ease-out;
    }

</style>
