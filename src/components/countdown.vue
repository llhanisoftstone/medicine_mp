<template>
    <div>
      <canvas canvas-id="myCanvas" class="canvas" id="myCanvas"></canvas>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'countdown',
        props: ['time'],
        data(){
            return {
                width:33
            }
        },
        methods: {
            cutTime(){
                let remaind = this.time/30
                this.canvas(remaind)
            },
            canvas(remaind){
                let that=this
              let ctx = wx.createCanvasContext('myCanvas')
              ctx.clearRect(0, 0, 120, 120)
              ctx.arc(that.width, that.width, that.width-9, 0, 2 * Math.PI)
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
              ctx.arc(that.width, that.width, that.width-6, 0, 2 * Math.PI)
              ctx.setLineWidth(3)
              ctx.setStrokeStyle('#e2e2e2')
              ctx.stroke()
              ctx.beginPath()
              ctx.arc(that.width, that.width, that.width-6, -0.5*Math.PI, (remaind*2-0.5) * Math.PI)
              ctx.setLineWidth(3)
              ctx.setStrokeStyle('#df5c3e')
              ctx.stroke()
              ctx.draw()
            }
        },
        components: {},
        created(){
          let that=this
          wx.createSelectorQuery().select('#myCanvas').boundingClientRect(function (rect) {
            that.width = rect.width/2   // 节点的宽度
            that.cutTime()
          }).exec()
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
