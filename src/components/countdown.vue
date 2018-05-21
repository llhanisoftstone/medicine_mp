<template>
    <div>
      <canvas canvas-id="myCanvas" class="canvas"></canvas>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'countdown',
        props: ['time'],
        data(){
            return {
            }
        },
        methods: {
            cutTime(){
                let remaind = this.time/30
                this.canvas(remaind)
            },
            canvas(remaind){
              let ctx = wx.createCanvasContext('myCanvas')
              ctx.clearRect(0, 0, 120, 120)
              ctx.arc(33, 33, 24, 0, 2 * Math.PI)
              ctx.setFillStyle('#fff3f3')
              ctx.fill()
              ctx.beginPath()
              ctx.setStrokeStyle('#AAAAAA')
              ctx.stroke()
              ctx.setFontSize(12)
              ctx.setFontSize(20)
              ctx.setFillStyle('#333333')
              ctx.setTextAlign('center')
              ctx.setTextBaseline('middle')
              ctx.fillText(this.time, 33, 33)
              //计时
              ctx.beginPath()
              ctx.arc(33, 33, 27, 0, 2 * Math.PI)
              ctx.setLineWidth(3)
              ctx.setStrokeStyle('#e2e2e2')
              ctx.stroke()
              ctx.beginPath()
              ctx.arc(33, 33, 27, -0.5*Math.PI, (remaind*2-0.5) * Math.PI)
              ctx.setLineWidth(3)
              ctx.setStrokeStyle('#df5c3e')
              ctx.stroke()
              ctx.draw()
            }
        },
        components: {},
        created(){
          this.cutTime()
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
    .canvas{
      width: 120px/2;
      height: 120px/2;
    }
</style>
