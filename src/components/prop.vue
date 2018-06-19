<template>
    <div>
      <div class="bg_prop">
        <div @click="useTools(answer,1)">
          <image src="/static/img/daojushangdian_11.png"></image>
          <p>{{answer}}</p>
        </div>
        <div v-if="istimes" @click="useTools(times,2)">
          <image src="/static/img/daojushangdian_13.png"></image>
          <p>{{times}}</p>
        </div>
      </div>
      <mptoast/>
    </div>
</template>

<script type="javascript">
  import mptoast from '../components/mptoast'


  export default {
        name: 'prop',
//        props: ['answer','times','istimes'],
      props:{
            answer:{
              type:Number,
              default:0
            },
            times:{
                type:Number,
                default:0
            },
            istimes:{
                type:Boolean,
                default:true
            }
      },
        data(){
            return {}
        },
        methods: {
          useTools(number,id){
              if(number>0){
                this.$emit('userTools',id)
              }else{
                  this.$mptoast('暂无该道具,请前往个人中心购买');
              }
          }
        },
        components: {
          mptoast
        }

    }
</script>

<style lang="less" scoped>
    @import '../static/less/common.less';
    .bg_prop{
      background: #2c2c2c;
      width: 100%;
      display: flex;
      padding: 0 26px/2;
      align-items: center;
      box-sizing: border-box;
      height: 110px/2;
      div{
        width: 88px/2;
        height: 88px/2;
        border-radius: 10px/2;
        margin-right: 18px/2;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background: #fff;
        image{
          width: 74px/2;
          height: 74px/2;
        }
        p{
          position: absolute;
          bottom:5px/2;
          right:5px/2;
          background: #df5c3e;
          color: #fff;
          font-size: 20px/2;
          padding: 2px 2px;
          border-radius: 50%;
          height: 24px/2;
          min-width: 24px/2;
          justify-content: center;
          display: flex;
          align-items: center;
        }
      }
    }
</style>
