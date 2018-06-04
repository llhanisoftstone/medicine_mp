<template>
    <div>
      <!--页面内容-->
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
            alert(JSON.stringify(rs));
            let res = rs.result;
            if (res){
              if (res.length == 8){
                  this.writeoff(res);
              }else{
                that.$mptoast('该二维码无效');
              }
            }
          }
        })
      },
      async writeoff(pid){
        let that = this;
        let res = await that.$get('/rs/member_ticket',{ticket_code:pid, status:1});
        if (res.code == 200){
          that.$mptoast('核销成功!');
        }else{
          that.$mptoast('核销失败');
        }
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
