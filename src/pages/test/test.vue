<template>
    <div>
      <div>
        <span>cmd</span>
        <input type="text" v-model="cmd">
      </div>
      <div>
        <span>to_uid</span>
        <input type="text" v-model="to_uid">
      </div>
      <div>
        <span>msg</span>
        <input type="text" v-model="msg">
      </div>
      <div @click="submit">提交</div>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'test',
        data(){
            return {
                cmd:'',
                to_uid:'',
                msg:''
            }
        },
        methods: {
            submit(){
              this.$socket.emit('data_chain',{
                  cmd:this.cmd,
                  to_uid:this.to_uid,
                  data:this.msg,
                  u_id:this.$store.state.user.userid,
                  nickname:this.$store.state.userinfo.nickName
              })
            }
        },
        components: {},
        mounted(){
          this.$socket.on('data_chain',d=>{
            console.log(d)
          })
        }

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';

</style>
