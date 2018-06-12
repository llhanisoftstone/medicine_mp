<template>
  <div class="container">
    <toast :message="message" :visible.sync="visible"></toast>
    <div>
      <div class="item">
        <div class="title">商家名称</div>
        <input type="text" v-model='name' maxlength="10"  placeholder="请输入商家名称"/>
      </div>
      <div class="item">
        <div class="title">联系人</div>
        <input type="text" v-model='people' maxlength="8" placeholder="请输入联系人" />
      </div>
      <div class="item">
        <div class="title">联系号码</div>
        <input type="number" placeholder="请输入联系号码" maxlength="11" v-model='phone' />
      </div>
      <div :class="{'btn':true}" @click="submitData">
        确&nbsp;&nbsp;&nbsp;认
      </div>
    </div>

  </div>
</template>

<script type="javascript">
  import toast from 'mpvue-toast'
  export default {
    data(){
      return {
        name:'',
        phone:'',
        people:'',
        visible: false,
        message:'',
        isTrue:true
      }
    },
    methods: {
      submitData(){
        if(!this.isTrue){
          return;
        }
        this.isTrue=false;
        this.message='';
        if((this.name).trim()==''){
          this.message='请输入商家名称';
        }
        if((this.people).trim()==''){
          this.message='请输入联系人';
        }
        var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if(this.phone==''){
          this.message='请输入联系号码';
        }else if(!myreg.test(this.phone)){
          this.message='联系号码输入错误';
        }
        if(this.message!=''){
          this.visible = !this.visible;
          this.isTrue=true;
          return;
        }
        var data={
          u_id:this.$store.state.user.userid,
          name:this.name,
          phone:this.phone,
          contacts:this.people,
          status:0
        }
        this.$post('/rs/cooperator',data).then(res=>{
          if(res.code == 200){
            this.message='保存成功';
            this.visible = !this.visible;
            this.name="";
            this.phone="";
            this.people="";
            setTimeout(function() {
              wx.navigateBack({     //返回上一页面或多级页面
                delta: 1
              })
            },1000);
          }else{
            this.message='保存失败';
            this.visible = !this.visible;
            this.isTrue=true;
          }
        })
      },

    },
    components: {
      toast
    },
    mounted(){
      this.isTrue=true;
    },
    onLoad(){
      this.message='';
      this.name="";
      this.phone="";
      this.people="";
    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/less/common.less';
  .container{
    margin: 10px 20px;
    min-height: 500px;
  }
  .container .item{
    height: 40px;
    line-height:40px;
    border-bottom: 1px solid #ccc;
    padding-left: 80px;
    position: relative;
  }
  .item .title{
    position: absolute;
    font-size: 15px;
    left: 10px;
    color: #333;
  }
  .item input{
    height: 40px;
    font-size: 15px;
    line-height: 15px;
  }
  .item .sex{
    height: 40px;
    font-size: 15px;
    line-height: 40px;
    color: #666;
  }
  .btn{
    margin: 0 auto;
    margin-top: 100px;
    width:335px;
    height: 35px;
    line-height: 35px;
    color: #fff;
    font-size: 14px;
    border-radius:5px;
    background: #df5c3e;
    text-align: center;
  }
  .dis{
    background: #ccc;
  }
</style>
