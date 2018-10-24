<template>
  <div class="container">
      <div class="item">
        <div class="title">姓名</div>
        <input type="text" v-model='realname' maxlength="10" confirm-type="next" placeholder="请输入姓名"/>
      </div>
      <div class="item">
        <div class="title">手机号</div>
        <input type="number" v-model='phone' maxlength="11" confirm-type="next"  placeholder="手机号" />
      </div>
    <div class="item">
      <div class="title">企业</div>
      <input type="text" v-model='comp_name' @blur="compblur()" maxlength="20" confirm-type="next" placeholder="企业名称"/>
      <ul class="company">
        <li v-for="(v,i) in company" @click.stop="choice(v.name)">{{v.name}}</li>
      </ul>
    </div>
      <div class="item">
        <div class="title">证件类型</div>
        <span class="cardname cardtitle" v-if="!pickerText"  @click="showzonePicker" >请选择</span>
        <span class="cardname" v-if="pickerText" @click="showzonePicker" >{{pickerText}}</span>
      <mpvue-picker
        ref="mpvuePicker" @pickerCancel="pickerCancel"
        :pickerValueArray="pickerValueArray"
        :pickerValueDefault='pickerValueDefault'
        :mode="mode"
        :deepLength=deepLength
        @onConfirm="onConfirm"
      @onChange="onChange">
      </mpvue-picker>
    </div>
    <div class="item">
      <div class="title">证件号</div>
      <input type="text" v-model='cardNumtext' v-if="pickerText!='身份证'" maxlength="20" confirm-type="next"  placeholder="证件号" />
      <input type="idcard" v-model='cardNum' v-if="pickerText=='身份证'" maxlength="18" confirm-type="next"  placeholder="证件号" />
    </div>
      <div class="item" @click="addresslist" v-if="false">
          <div class="title">详细地址</div>
          <input type="text" style="max-width:90%"  disabled placeholder="详细地址" maxlength="30" confirm-type="next" v-model='address' />
          <img src="/static/img/arrow.png"/>
      </div>
      <div :class="{'btn':true}" @click="childrenmitData">
        确&nbsp;&nbsp;&nbsp;认
      </div>
    <mptoast :toasthide="toasthide"/>
  </div>
</template>

<script type="javascript">
  import mpvuePicker from '../../components/mpvuePicker';
  import mptoast from '../../components/mptoast';
  export default {
    label: 'userdata',
    props: [],
    components: {
      mptoast,
      mpvuePicker
    },
    data(){
      return {
        rank:1,
        pickerValueArray:[],
        pickerValueDefault:[0],
        pickerText:'',
        oldpickerText:'',
        cardtype:"",
        nocomany:true,
        name:'',
        gender:'',
        realname:'',
        comp_name:'',
        phone:'',
        cardNum:'',
        cardNumtext:'',
        shop_label:'',
        shop_logo:'',
        shop_phone:'',
        shop_address:'',
        address:'',
        visible: false,
        message:'',
        isTrue:true,
        member_id:'',
        isBtnClicked:false,
        company:[],
        toasthide:false,
        isclick:false,
        timeout:null
      }
    },
    methods: {
      limit(val){
        if (!val) {
          return
        }
        return  val.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\,\?\<\>\。\，\-\——\=\;\！\!\+\？\、\；\$]/g,'');
      },
      showzonePicker: function (e) {
          this.pickerValueArray=["身份证",'工号',"工资号"];
        if(this.pickerText=="身份证"){
          this.pickerValueDefault = [0];
        }else if(this.pickerText=="工号"){
          this.pickerValueDefault = [1];
        }else  if(this.pickerText=="工资号"){
          this.pickerValueDefault = [2];
        }else{
          this.pickerValueDefault = [0];
        }
        this.$refs.mpvuePicker.show();
      },
      compblur(){
        this.company=[]
      },
      choice(name){
          this.isclick=true;
          this.comp_name=name;
          this.nocomany=false;
          this.company=[]
      },
      onConfirm(e){
        this.pickerText = `${this.pickerValueArray[e[0]]}`;
        if(this.pickerText!=this.oldpickerText){
           this.cardNum="";
           this.cardNumtext="";
        }
        this.oldpickerText=this.pickerText;
        this.cardtype=e[0];
      },
      childrenmitData(){
        if(this.realname==null||(this.realname).trim()==''){
          this.$mptoast('请输入姓名');
          return;
        }
        if(this.realname.trim().length<2){
          this.$mptoast('姓名至少需要输入两位字符');
          return;
        }
        var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if(this.phone==''||this.phone==null){
          this.$mptoast('请输入手机号');
          return;
        }else if(!myreg.test(this.phone)){
          this.$mptoast('您的手机号输入有误，请重新输入');
          return;
        }
        var data={
          phone:this.phone,
          realname:this.realname,
          company:this.comp_name
        };

        var pattern1 =/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
       if(this.cardtype==0){
         if(this.cardNum==""||this.cardNum==null){
           this.$mptoast('请输入证件号码');
           return;
         }else if(!pattern1.test(this.cardNum)){
            this.$mptoast('您的身份证号输入有误，请重新输入');
            return;
          }
        }else if(this.cardtype==1||this.cardtype==2){
         if(this.cardNumtext==""||this.cardNumtext==null) {
           this.$mptoast('请输入证件号码');
           return;
         }
       }
        data.cert_type=parseFloat(this.cardtype)+1;
        if(this.cardtype==0){
          data.cert_value=this.cardNum;
        }else if(this.cardtype==1||this.cardtype==2){
          data.cert_value=this.cardNumtext;
        }
        if(this.comp_name&&this.nocomany){
          return  this.$mptoast('该企业为入住平台，请重新填写');
        }
        this.$post('/rs/complete_user_info',data).then(res=>{
          if(res.code == 200){
            if(res.iscreate==1){
              this.$mptoast('您的资料已完善，请在个人中心-银两查看您的奖励');
            }else{
              this.$mptoast('保存成功');
            }
            if(this.isBtnClicked){
              this.isBtnClicked=false;
              this.timeout=setTimeout(function() {
                wx.navigateBack({     //返回上一页面或多级页面
                  delta: 1
                })
              },2000);
            }
          }else{
            this.$mptoast('保存失败');
          }
        })
      },
      addresslist(){
          var data={
            realname:this.realname,
            phone:this.phone,
            comp_name:this.comp_name
          }
        wx.setStorage({
          key:"keyuser",
          data:data
        })
        wx.navigateTo({
          url:"/pages/address/main?realname="+this.realname+"&phone="+this.phone+"&comp_name="+this.comp_name
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
        this.$get('/rs/v_member/'+this.$store.state.user.userid,{}).then(res=>{
          if(res.code==200){
            var user=res.rows[0];
            if(user.gender==1){
              this.gender='男';
            }else if(user.gender==2){
              this.gender='女';
            }else if(user.gender==3){
              this.gender='未知';
            }
            that.member_id=user.id;
            that.name=user.nickname;
            that.realname=user.realname;
            that.phone=user.phone;
            that.isclick=true;
            that.cert_type=user.cert_type;
            if(user.cert_type==1){
                that.pickerText='身份证';
                that.oldpickerText="身份证";
              that.cardNum=user.cert_value;
              that.cardNumtext="";
            }else if(user.cert_type==2){
              that.pickerText='工号';
              that.oldpickerText="工号";
              that.cardNumtext=user.cert_value;
              that.cardNum="";
            }else if(user.cert_type==3){
              that.pickerText='工资号';
              that.oldpickerText="工资号";
              that.cardNumtext=user.cert_value;
              that.cardNum="";
            }else{
              that.pickerText="";
              that.cardtype="";
              that.oldpickerText="";
              that.cardNumtext="";
              that.cardNum="";
            }
            that.comp_name=user.comp_name;
            that.company=[];

            var address=user.province_name+user.city_name+user.zone_name+user.address;
            if(address&&address.length>15){
                address=address.substring(0,15)+"...";
            }else if(address==null||address==""){
                address='';
            }
            that.address=address;
            that.shop_label=user.nicklabel;
            that.shop_logo=user.shop_logo;
            that.shop_phone=user.phone;
            that.shop_address=user.address;
            that.nocomany=false;
            wx.getStorage({
              key: 'keyuser',
              success: function(res) {
                if(res.data.realname){
                  that.realname=res.data.realname;
                }
                if(res.data.phone){
                  that.phone=res.data.phone;
                }
                if(res.data.comp_name){
                  that.comp_name=res.data.comp_name;
                }
              }
            })
            wx.removeStorage({
              key: 'keyuser',
              success: function(res) {
              }
            })
          }

        })
      }

    },
    mounted(){
      this.getUserinfo();
      this.rank=1;
    },
    onShow(){
      this.toasthide = true;
      setTimeout(()=>{  this.toasthide = false;},2000)
      this.getUserinfo();
      this.isBtnClicked=true;
    },
    onUnload(){
      if(this.timeout){
        clearTimeout(this.timeout)
        this.timeout=null;
      }
      this.company=[];
      wx.removeStorage({
        key: 'keyuser',
        success: function(res) {
          console.log(res.data)
        }
      });
    },
    watch:{
      async comp_name(val, oldval){
        if(val==''){
          this.company = []
          return
        }
        if(this.isclick){
          this.company = []
          this.isclick=false
          return
        }
        let com = await this.$get('/rs/company',{name:val,search:1,page:1,size:4})
        if(com.code==200){
          this.company = com.rows
        }else{
          this.company = [];
          this.nocomany=true;
        }
      },
      cardNumtext(val,oldval){
        this.cardNumtext = this.limit(val)
        if(this.limit(val)){
          this.cardNumtext=this.limit(val);
        }else{
          this.cardNumtext="";
        }
      }
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
    .cardname{
      display:inline-block;
      height: 40px;
      font-size: 15px;
      line-height:40px;
      width:100%;
      vertical-align: top;
    }
    .cardtitle{
      color:#999;
    }
  }
  .company{
    position: relative;
    z-index:50;
    margin-top:1px/2;
    overflow: hidden;
    li{
      background: #fff;
      font-size: 30px/2;
      height: 80px/2;
      padding: 0 10px/2;
      border-left:1px solid #e2e2e2;
      border-right:1px solid #e2e2e2;
      line-height: 80px/2;
      width: 100%;
      box-sizing: border-box;
      &:nth-last-child(1){
        border-bottom-left-radius: 15px/2;
        border-bottom-right-radius: 15px/2;
        border-bottom:1px solid #e2e2e2;
      }
    }
  }
  .item .title{
    position: absolute;
    font-size: 15px;
    left: 10px;
    color: #333;
  }
  .textClass{
    top:60%;
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
  .item image{
    width:6px;
    height:12px;
    position:absolute;
    right:0;
    top:15px;
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
  .cityCont{
    display:inline-block;
    width:30%;
  }
  .item view{
    font-size:15px;
  }
</style>
