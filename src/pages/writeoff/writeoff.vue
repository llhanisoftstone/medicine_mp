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
            console.log(JSON.stringify(rs));
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
        console.log(pid)
        let that = this;
        let res = await that.$get('/rs/member_ticket',{ticket_code:pid, status:0});
        if (res.code == 200){
          let time = new Date();
          let use_time = that.getformatDate(time,'yyyy-MM-dd hh:mm:ss');
          console.log(use_time);
          let result = await that.$put('/rs/member_ticket/'+res.rows[0].id,{status:1,use_time:use_time});
          if (result.code == 200){
            that.$mptoast('核销成功!');
          }else{
            that.$mptoast('核销失败,请重试!');
          }
          setTimeout(function () {
            wx.redirectTo({
              url:`/pages/ticket/main`
            })
          },1000)
        }else{
          that.$mptoast('该二维码无效');
        }
      },
      getformatDate(date,fmt){
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
        }
        for (let k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str))
          }
        }
        return fmt
      },
      padLeftZero(str){
        return ('00' + str).substr(str.length)
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
