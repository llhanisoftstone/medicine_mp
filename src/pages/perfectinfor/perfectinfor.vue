<template>
  <div class="perfectinfor">
    <div class="inforTitle">完善信息</div>
    <form id="informdata">
      <div class="container">
        <div class="item">
          <div class="title">公司名称</div>
          <picker
            class="picker"
            @change="PickerChange"
            range-key="name"
            :value="index"
            :range="objectArray">
            <input type="default" placeholder="请选择公司名称" v-model="companyName" disabled="disabled"  />
          </picker>
        </div>
        <div class="item">
          <div class="title">姓名</div>
          <input type="text" v-model='realname' maxlength="10" confirm-type="next" placeholder="请输入姓名" :focus="fnamec==''||fnamec=='realname'"/>
        </div>
        <div class="item">
          <div class="title">身份证号</div>
          <input type="text" v-model='cardNumtext' maxlength="18" confirm-type="next"  placeholder="证件号" :focus="fcard==''||fcard=='cardNumtext'"/>
        </div>
        <div :class="{btn:true}" @click="childrenmitData">保&nbsp;&nbsp;存</div>
      </div>
    </form>
    <mptoast :toasthide="toasthide"/>
  </div>
</template>

<script type="javascript">
  import mpvuePicker from '../../components/mpvuePicker';
  import mptoast from '../../components/mptoast';
  export default {
    name: 'perfectinfor',
    components: {
      mptoast,
      mpvuePicker
    },
    data(){
      return {
        mode:"selector",
        pickerText: '',
        toasthide:false,
        companyName:"",
        realname:"",
        cardNumtext:"",
        objectArray: [],
        compid:""
      }
    },
    methods: {
      PickerChange: function(e) {
        let indexValue=e.mp.detail.value;
        this.compid=this.objectArray[indexValue].id;
        this.companyName = this.objectArray[indexValue].name;
      },
      cardName(){
        let data={
          status:1
        }
        this.$get('/rs/company',data).then(res=>{
          if(res.code == 200){
            this.objectArray= res.rows;
          }
        })
      },
      childrenmitData(){
        if(!this.companyName){;
          this.$mptoast('请选择公司名称');
          return false;
        }
        if(!this.realname){;
          this.$mptoast('请输入姓名');
          return false;
        }
        var pattern1 =/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if(!this.cardNumtext){
          this.$mptoast('请输入身份证号');
          return false;
        }
        if(!pattern1.test(this.cardNumtext)){
          this.$mptoast('您的身份证号输入有误，请重新输入');
          return false;
        }
        let data={
          bind:1,
          name:this.realname,
          card_num:this.cardNumtext,
          comp_id:this.compid
        }
        this.$put('/rs/enter_staff/1',data).then(res=>{
          if(res.code == 200){
            this.$mptoast("保存成功");
          }else {
            this.$mptoast("当前企业下没有对应的用户！");
          }
        })
      }
    },
    onLoad: function() {
      this.cardName()//获取公司名称
    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/less/common.less';
  body,div,span,p,ul,li,a{margin:0;padding:0;border:0;box-sizing: border-box};
  .mui-ellipsis{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .inforTitle{
    color: #333;
    font-size: 30px/2;
    text-align: center;
    line-height: 100px/2;
  }
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
    width:150px;
    height: 35px;
    line-height: 35px;
    color: #fff;
    font-size: 14px;
    border-radius:35px;
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
