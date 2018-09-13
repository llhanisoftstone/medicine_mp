<template>
  <div class="container">
    <div class="messagecenter" v-if="seen">
      <div class="item">
        <div class="title">商家名称</div>
        <input type="text" v-model='name' maxlength="20"  placeholder="请输入商家名称"/>
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
    <mptoast/>
    <div class="approval" v-if="isseen">
      <div class="show_img">
        <image src="/static/img/shenhezhong_03.jpg"></image>
      </div>
      <div class="approve_info">
        努力审核中，请耐心等待
      </div>
    </div>
    <div class="reject" v-if="overseen">
      <div class="show_imgover">
        <image src="/static/img/shenheshibai_03.jpg"></image>
      </div>
      <div class="approve_info">
        <p>
          您提交的信息因如下原因不能通过
        </p>
        <p>请修改后重新提交</p>
        <p class="line"></p>
        <p>原因</p>
        <p class="reject_reason">{{remark}}</p>
      </div>
      <div class="edit_now" @click="editnow">立即修改</div>
    </div>
    <div class="rejectover" v-if="overseenbtn">
      <div class="show_imgover">
        <image src="/static/img/shenheshibai_03.jpg"></image>
      </div>
      <div class="approve_info">
        <p>
          您的合作商功能被禁用了，请联系管理员。
        </p>
        <p>
          联系电话：029-81101859
        </p>
      </div>
    </div>
  </div>
</template>

<script type="javascript">
  import toast from 'mpvue-toast'
  import mptoast from '../../components/mptoast'
  export default {
    name: 'partner',
    props: [],
    components: {
      mptoast
    },
    data(){
      return {
        name:'',
        phone:'',
        people:'',
        visible: false,
        message:'',
        isTrue:true,
        id:"",
        seen:false,
        isseen:false,
        overseen:false,
        remark:'',
        overseenbtn:false,
      }
    },
    methods: {
      submitData(){
          if(!this.isTrue){
              return;
          }
        if((this.name).trim()==''){
          this.$mptoast('请输入商家名称');
          return;
        }
        if((this.people).trim()==''){
          this.$mptoast('请输入联系人');
          return;
        }
        var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if(this.phone==''){
          this.$mptoast('请输入联系号码');
          return;
        }else if(!myreg.test(this.phone)){
          this.$mptoast('联系号码输入有误，请重新输入');
          return;
        }
        var data={
          u_id:this.$store.state.user.userid,
          name:this.name,
          phone:this.phone,
          contacts:this.people,
          status:0
        }
        this.isTrue=false;
        if(this.id){
          this.$put('/rs/cooperator/'+this.id,data).then(res=>{
            if(res.code == 200){
              this.$mptoast('修改成功');
              setTimeout(function() {
                wx.navigateBack({     //返回上一页面或多级页面
                  delta: 1
                })
              },1000);
            }else{
              this.$mptoast('修改失败');
              this.isTrue=true;
            }
          })
        }else{
          this.$post('/rs/cooperator',data).then(res=>{
            if(res.code == 200){
              this.$mptoast('提交成功');
              setTimeout(function() {
                wx.navigateBack({     //返回上一页面或多级页面
                  delta: 1
                })
              },1000);
            }else{
              this.$mptoast('提交失败');
              this.isTrue=true;
            }
          })
        }
      },
      editnow(){
        this.seen=true;
        this.isseen=false;
        this.overseen=false;
      },
      getUserinfo(){
        var that=this;
        this.message="";
        this.$get('/rs/cooperator',{u_id:this.$store.state.user.userid}).then(res=>{
          if(res.code==200){
            var user=res.rows[0];
            if(user.status==0){
              that.seen=false;
              that.isseen=true;
              that.overseen=false;
              that.overseenbtn=false
            }else if(user.status==1){
              that.seen=true;
              that.isseen=false;
              that.overseen=false;
              that.overseenbtn=false
            }else if(user.status==2){
              that.seen=false;
              that.isseen=false;
              that.overseen=true;
              that.remark=user.remark;
              that.overseenbtn=false
            }else if(user.status==3){
              that.seen=false;
              that.isseen=false;
              that.overseen=false;
              that.overseenbtn=true
            }
            that.name=user.name;
            that.phone=user.phone;
            that.people=user.contacts;
            that.id=user.id;
          }else{
            that.seen=true;
            that.isseen=false;
            that.overseen=false;
            that.overseenbtn=false
          }
        })
      }

    },
    mounted(){
      this.getUserinfo();
      this.isTrue=true;
    },
    onLoad(){
      this.message='';
      this.name="";
      this.phone="";
      this.people="";
      this.seen=false;
      this.isseen=false;
      this.overseen=false;
      this.overseenbtn=false;
      this.isTrue=true;
    }
  }
</script>
<style lang="less">
  .textClass{
    top:75%!important;
  }
</style>
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
  .show_img{
    margin-top:120px;
    width:100%;
    text-align:center;
    height:134.5px;
    image{
      width:116px;
      height:134.5px;
    }
  }
  .approve_info{
    text-align:center;
    width:100%;
    margin-top:23px;
    font-size:14px;
    color:#999;
    p{
      margin-bottom:7.5px;
      word-break:break-all;
    }
    .line{
      border:1px solid #e2e2e2;
      width:100%;
    }
  }
  .edit_now{
    width:320px;
    height:35px;
    font-size:15px;
    background:#df5c3e;
    text-align:center;
    border-radius:5px;
    color:#fff;
    line-height:35px;
    margin:49px auto 0;
  }
  .show_imgover{
    margin-top:120px;
    width:100%;
    text-align:center;
    height:134.5px;
    image{
      width:116px;
      height:134.5px;
    }
  }
</style>
