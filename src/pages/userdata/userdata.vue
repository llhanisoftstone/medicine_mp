<template>
    <div class="container">
      <div v-if="rank ==20">
        <div class="item">
          <div class="title">商家名称</div>
          <input type="text" confirm-type="next" maxlength="15" v-model='shop_label'  placeholder="请输入商家名称"/>
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
        <div :class="{'btn':true}"  @click="childrenmitData1">
          确认
        </div>
      </div>
      <div v-else>
        <div class="item">
          <div class="title">微信昵称</div>
          <input type="text" :value='name' disabled maxlength="10" readonly onfocus="this.blur()" confirm-type="next" placeholder="请输入微信昵称"/>
        </div>
        <div class="item">
          <div class="title">性别</div>
          <input disabled="disabled" :value='gender' type="text"  placeholder="请选择性别"/>
        </div>
        <div class="item">
          <div class="title">姓名</div>
          <input type="text" v-model='realname' maxlength="10" confirm-type="next" placeholder="请输入姓名"/>
        </div>
        <div class="item">
          <div class="title">手机号</div>
          <input type="number" v-model='phone' maxlength="11" confirm-type="next"  placeholder="手机号" />
        </div>
        <!--<div class="item">-->
          <!--<div class="title">选择地区</div>-->
          <!--<div class="mpvue-picer">-->
          <!--<input type="" placeholder="选择省" :value="pickerText" disabled="disabled" class="cityCont" @click="showPicker1" />-->
            <!--<input type="" placeholder="选择市" :value="pickerText" disabled="disabled" class="cityCont" @click="showPicker2" />-->
            <!--<input type="" placeholder="选择区/县" :value="pickerText" disabled="disabled" class="cityCont" @click="showPicker3" />-->
          <!--<mpvue-picker-->
            <!--ref="mpvuePicker"-->
            <!--:pickerValueArray="pickerValueArray"-->
            <!--:pickerValueDefault='pickerValueDefault'-->
            <!--@onConfirm="onConfirm" >-->
          <!--</mpvue-picker>-->
          <!--</div>-->
        <!--</div>-->
        <div class="item">
          <a href="/pages/address/main">
            <div class="title">详细地址</div>
            <input type="text"   placeholder="详细地址" maxlength="30" confirm-type="next" v-model='address' />
            <img src="/static/img/arrow.png"/>
          </a>
        </div>
        <div :class="{'btn':true}" @click="childrenmitData">
          确&nbsp;&nbsp;&nbsp;认
        </div>
      </div>
      <mptoast/>
    </div>
</template>

<script type="javascript">
  import mpvuePicker from 'mpvue-picker';
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
              pickerValueArray: [],
              pickerValueDefault: [0,0,0],
              pickerValue: 0,
              pickerText:'',
              name:'',
              gender:'',
              realname:'',
              phone:'',
              cardNum:'',
              shop_label:'',
              shop_logo:'',
              shop_phone:'',
              shop_address:'',
              address:'',
              visible: false,
              message:'',
              isTrue:true,
            }
        },
        methods: {
          showPicker1() {
            this.$refs.mpvuePicker.show();
          },
          showPicker2() {
            this.$refs.mpvuePicker.show();
          },
          showPicker3() {
            this.$refs.mpvuePicker.show();
          },
          pickerConfirm(e) {
            console.log(e);
          },
          onConfirm(e){
            this.pickerText = `${this.pickerValueArray[e[0]].label}${this.pickerValueArray[e[0]].children[e[1]].label}${this.pickerValueArray[e[0]].children[e[1]].children[e[2]].label}`;
          },
          childrenmitData(){
            if(this.realname==null||(this.realname).trim()==''){
              this.$mptoast('姓名不能为空，请输入');
              return;
            }
            var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            if(this.phone==''||this.phone==null){
              this.$mptoast('手机号不能为空，请输入');
              return;
            }else if(!myreg.test(this.phone)){
              this.$mptoast('您的手机号输入有误，请重新输入');
              return;
            }
            if(this.pickerText==''||this.pickerText==undefined||this.pickerText==null){
              this.$mptoast('地区不能为空，请选择');
              return;
            }
            if(this.address==null||(this.address).trim()==''){
              this.$mptoast('详细地址不能为空，请输入');
              return;
            }
            var data={
              phone:this.phone,
              address:this.address,
              realname:this.realname,
              shop_address:this.pickerText,
            }
            this.$put('/rs/member/'+this.$store.state.user.userid,data).then(res=>{
              if(res.code == 200){
                this.$mptoast('保存成功');
                setTimeout(function() {
                  wx.navigateBack({     //返回上一页面或多级页面
                    delta: 1
                  })
                },1000);
              }else{
                this.$mptoast('保存失败');
              }
            })
          },
          childrenmitData1(){
            if((this.shop_label).trim()==''){
              this.$mptoast('请输入商家名称');
              return;
            }else if(this.shop_label.length>15){
              this.$mptoast('商家名称输入错误');
              return;
            }
            if(this.shop_logo==''&&this.shop_logo==null){
              this.$mptoast('请上传商家logo');
              return;
            }
            var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            if(this.shop_phone==''||this.shop_phone==null){
              this.$mptoast('请输入联系电话');
              return;
            }else if(!myreg.test(this.shop_phone)){
              this.$mptoast('联系电话输入错误');
              return;
            }
            if(this.shop_address==''&&this.shop_address==null){
              this.$mptoast('请输入联系地址');
              return;
            }
            var data={
              nicklabel:this.shop_label,
              shop_logo:this.shop_logo,
              phone:this.shop_phone,
              address:this.shop_address
            }
            this.$put('/rs/member/'+this.$store.state.user.userid,data).then(res=>{
              if(res.code == 200){
                this.$mptoast('保存成功');
                setTimeout(function() {
                  wx.navigateBack({     //返回上一页面或多级页面
                    delta: 1
                  })
                },1000);
              }else{
                this.$mptoast('保存失败');
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
            this.$get('/rs/member/'+this.$store.state.user.userid,{}).then(res=>{
              if(res.code==200){
                var user=res.rows[0];
                if(user.gender==1){
                   this.gender='男';
                }else if(user.gender==2){
                  this.gender='女';
                }else if(user.gender==3){
                  this.gender='未知';
                }
                that.name=user.nickname;
                that.realname=user.realname;
                that.phone=user.phone;
                that.address=user.address;
                that.pickerText=user.shop_address;
                that.shop_label=user.nicklabel;
                that.shop_logo=user.shop_logo;
                that.shop_phone=user.phone;
                that.shop_address=user.address;
              }

            })
          }

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

</style>
