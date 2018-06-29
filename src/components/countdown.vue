<template>
    <div>
      <canvas canvas-id="myCanvas" :class="{'canvas':true,'scale':isanimation}" id="myCanvas"></canvas>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'countdown',
        props: ['time'],
        data(){
            return {
                width:30,
                isanimation:false
//              time:40
            }
        },
        methods: {
            cutTime(){
                let remaind = this.time/30
                if(this.time<3){
                    this.canvas(remaind,9,6)
//                      this.isanimation=true
                      setTimeout(()=>{
//                        this.isanimation=false
                        this.canvas(remaind,6,3)
                      },100)
                      setTimeout(()=>{
//                        this.isanimation=false
                        this.canvas(remaind,9,6)
                      },200)
                }else{
                  this.canvas(remaind,9,6)
                }
            },
            canvas(remaind,ba,sa){
                let that=this
              let ctx = wx.createCanvasContext('myCanvas')
              ctx.clearRect(0, 0, 120, 120)
              ctx.arc(that.width, that.width, that.width-ba, 0, 2 * Math.PI)
              ctx.setFillStyle('#ffffff')
              ctx.fill()
              ctx.beginPath()
              ctx.setStrokeStyle('#AAAAAA')
              ctx.stroke()
              ctx.setFontSize(12)
              ctx.setFontSize(20)
              ctx.setFillStyle('#333333')
              ctx.setTextAlign('center')
              ctx.setTextBaseline('middle')
              ctx.fillText(that.time, that.width, that.width)
              //计时
              ctx.beginPath()
              ctx.arc(that.width, that.width, that.width-sa, 0, 2 * Math.PI)
              ctx.setLineWidth(3)
              ctx.setStrokeStyle('#e2e2e2')
              ctx.stroke()
              ctx.beginPath()
              ctx.arc(that.width, that.width, that.width-sa, -0.5*Math.PI, (remaind*2-0.5) * Math.PI)
              ctx.setLineWidth(3)
              ctx.setStrokeStyle('#df5c3e')
              ctx.stroke()
              if(remaind>1){
                ctx.beginPath()
                ctx.arc(that.width, that.width, that.width-sa, -0.5*Math.PI, ((remaind-1)*2-0.5) * Math.PI)
                ctx.setLineWidth(3)
                ctx.setStrokeStyle('#86d132')
                ctx.stroke()
              }
              ctx.draw()
            },
          getwidth(){
            let that=this
            wx.createSelectorQuery().select('#myCanvas').boundingClientRect(function (rect) {
                console.log('-----------------------')
                if(rect){
                  that.width = rect.width/2   // 节点的宽度
                  that.cutTime()
                }else{
                    that.getwidth()
                }

            }).exec()
          }
        },
        components: {},
        created(){
          this.getwidth()
        },
        watch:{
            time(val,oldval){
              this.cutTime()
            }
        }

    }
</script>

<style lang="less" scoped>
    @import '../static/less/common.less';
    @keyframes scalean {
      0%{
        opacity: 0;
        transform: scale(0.8) translateY(0px);
      }
      50%{
        opacity: 1;
        transform: scale(1.2) translateY(0px);
      }
      100%{
        opacity: 1;
        transform: scale(1) translateY(0px);
      }
    }
    .canvas{
      width: 120px/2;
      height: 120px/2;
    }
    .scale{
      transform-origin: center center 0;
      /*animation: scalean .3s ease;*/
    }
</style>
