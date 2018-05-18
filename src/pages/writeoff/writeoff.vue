<template>
    <div>
      <mptoast/>
    </div>
</template>

<script type="javascript">
  import mptoast from '../../components/mptoast'
  export default {
    components: {
      mptoast
    },
    data(){
        return {}
    },
    methods: {
      getverifyingCode(){
        let that = this;
        wx.scanCode({
          success: (rs) => {
            let res = rs.result;
            if (res.t_code){
              if (res.t_code.length == 15){
                that.$mptoast('成功');
              }else{
                that.$mptoast('该二维码无效');
              }
            }else{
              that.$mptoast('该二维码无效');
            }
          },
          fail: (err) => {
            that.$mptoast('该二维码无效');
          }
        })
      }
    },

    onLoad: function () {
      this.getverifyingCode();
    }
  }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';

</style>
