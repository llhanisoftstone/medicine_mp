<template>
    <div class="container">
      <toast :message="message" :visible.sync="visible"></toast>
      <div v-if="rank ==20">
        <div class="item">
          <div class="title">商家名称</div>
          <input type="text" confirm-type="next" maxlength="15" v-model='shop_name'  placeholder="请输入商家名称"/>
        </div>
        <div class="item">
          <div class="title">商家logo</div>
          <input
                 @click="openImg"
                 v-model='shop_logo'
                 class="imgurl"
                 disabled="disabled"
                 type="text" placeholder="请上传"/>
          <icon class="uploadLogo"></icon>
        </div>
        <div class="item">
          <div class="title">联系电话</div>
          <input type="number" v-model='shop_phone' maxlength="11" confirm-type="next" placeholder="请输入联系电话" />
        </div>
        <div class="item">
          <div class="title">联系地址</div>
          <input type="text" placeholder="请输入联系地址" maxlength="30" confirm-type="done" v-model='shop_address' />
        </div>
        <div :class="{'btn':true}"  @click="submitData1">
          确认
        </div>
      </div>
      <div v-else>
        <div class="item">
          <div class="title">姓名</div>
          <input type="text" :value='name' disabled maxlength="10" readonly onfocus="this.blur()" confirm-type="next" placeholder="请输入姓名"/>
        </div>
        <div class="item">
          <div class="title">性别</div>
          <div class="mpvue-picer">
            <input :value="pickerText" disabled="disabled" type="text"  placeholder="请选择性别"/>
          </div>
        </div>
        <div class="item">
          <div class="title">手机号</div>
          <input type="number" v-model='phone' maxlength="11" confirm-type="next"  placeholder="手机号" />
        </div>
        <div class="item">
          <div class="title">身份证</div>
          <input type="idcard" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"  placeholder="请输入身份证" maxlength="18" confirm-type="done" v-model='cardNum' />
        </div>
        <div :class="{'btn':true}" @click="submitData">
          确&nbsp;&nbsp;&nbsp;认
        </div>
      </div>
    </div>
</template>

<script type="javascript">
  import mpvuePicker from 'mpvue-picker';
  import toast from 'mpvue-toast'
    export default {
        data(){
            return {
              rank:1,
              pickerValueArray: ['男', '女'],
              pickerValueDefault:[0],
              pickerValue: 0,
              pickerText:'',
              name:'',
              phone:'',
              cardNum:'',
              shop_name:'',
              shop_logo:'',
              shop_phone:'',
              shop_address:'',
              visible: false,
              message:'',
              isTrue:true
            }
        },
        methods: {
          showPicker() {
            this.$refs.mpvuePicker.show();
          },
          onConfirm(e){
            this.pickerValue=e[0];
            this.pickerText=this.pickerValueArray[e[0]]
          },
          submitData(){
            if(!this.isTrue){
              return;
            }
            this.isTrue=false;
            var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            if(this.phone==''||this.phone==null){
              this.message='请输入手机号';
            }else if(!myreg.test(this.phone)){
              this.message='手机号输入错误';
            }
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(this.cardNum==''||this.cardNum==null){
              this.message='请输入身份证';
            }else if(!reg.test(this.cardNum)){
              this.message='身份证输入错误';
            }
            if(this.message!=''){
              this.visible = !this.visible;
              this.isTrue=true;
              return;
            }
            var data={
              phone:this.phone,
              id_card:this.cardNum
            }
            this.$put('/rs/member/'+this.$store.state.user.userid,data).then(res=>{
              if(res.code == 200){
                this.visible = !this.visible;
                this.message='保存成功';
                setTimeout(function() {
                  wx.navigateBack({     //返回上一页面或多级页面
                    delta: 1
                  })
                },1000);
              }else{
                this.visible = !this.visible;
                this.message='保存失败';
                this.isTrue=true;
              }
            })
          },
          submitData1(){
            if(!this.isTrue){
              return;
            }
            this.isTrue=false;
            this.message='';
            if((this.shop_name).trim()==''){
              this.message='请输入商家名称';
            }else if(this.shop_name.length>15){
              this.message='商家名称输入错误';
            }
            if(this.shop_logo==''&&this.shop_logo==null){
              this.message='请上传商家logo';
            }
            var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            if(this.shop_phone==''||this.shop_phone==null){
              this.message='请输入联系电话';
            }else if(!myreg.test(this.shop_phone)){
              this.message='联系电话输入错误';
            }
            if(this.shop_address==''&&this.shop_address==null){
              this.message='请输入联系地址';
            }
            if(this.message!=''){
              this.visible = !this.visible;
              this.isTrue=true;
              return;
            }
            var data={
              nickname:this.shop_name,
              shop_logo:this.shop_logo,
              phone:this.shop_phone,
              address:this.shop_address
            }
            this.$put('/rs/member/'+this.$store.state.user.userid,data).then(res=>{
              if(res.code == 200){
                this.message='保存成功';
                this.visible = !this.visible;
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

          openImg(){
            var that=this;
            this.$uploadImg({
              count: 1,
              sizeType: ['original', 'compressed'],
              sourceType: ['album', 'camera'],
            },function (rs) {
              var obj = JSON.parse(rs);
              that.shop_logo=obj[0].url;
            })
          },
          getUserinfo(){
            var that=this;
            this.isTrue=true;
            this.visible=false;
            this.message="";
            this.$get('/rs/member/'+this.$store.state.user.userid,{}).then(res=>{
              if(res.code==200){
                var user=res.rows[0];
                that.pickerValue=(user.gender-1);
                that.pickerText=that.pickerValueArray[user.gender-1];
                that.pickerValueDefault=[user.gender-1];
                that.name=user.nickname;
                that.phone=user.phone;
                that.cardNum=user.id_card;
                that.shop_name=user.nickname;
                that.shop_logo=user.shop_logo;
                that.shop_phone=user.phone;
                that.shop_address=user.address;
              }

            })
          }

        },
        components: {
          toast,
          mpvuePicker
        },
        mounted(){
          this.getUserinfo();
          this.rank=1;
        },
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
    .uploadLogo{
      position: absolute;
      right: 5px;
      top: 10px;
      height: 20px;
      width: 20px;
      background: url("../../../static/img/shangchuan.png") center no-repeat;
      background-size: 20px;
    }
    .imgurl{
      width: 220px;
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
    .mpvue-picker__action {
      flex:1;
      color:#df5c3e;
    }

</style>
