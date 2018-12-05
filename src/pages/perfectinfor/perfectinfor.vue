<template>
  <div class="perfectinfor">
    <div class="inforTitle">完善信息</div>
    <div class="container">
      <div class="item">
        <div class="title">公司名称</div>
        <input type="default" placeholder="请选择公司名称" :value="pickerText" disabled="disabled" @click="showSinglePicker" />
        <mpvue-picker
          ref="mpvuePicker" @pickerCancel="pickerCancel"
          :pickerValueArray="pickerValueArray"
          :pickerValueDefault='pickerValueDefault'
          :mode="selector"
          :deepLength='deepLength'
          @onConfirm="onConfirm"
        >
        </mpvue-picker>
      </div>
      <div class="item">
        <div class="title">姓名</div>
        <input type="text" @click="switchp" v-model='realname' maxlength="10" confirm-type="next" placeholder="请输入姓名" :focus="fnamec==''||fnamec=='realname'"/>
      </div>
      <div class="item">
        <div class="title">证件号</div>
        <input type="text" @click="switchi" v-model='cardNumtext' v-if="pickerText!='身份证'" maxlength="20" confirm-type="next"  placeholder="证件号" :focus="fcard==''||fcard=='cardNumtext'"/>
        <input type="idcard" @click="switchi" v-model='cardNum' v-if="pickerText=='身份证'" maxlength="18" confirm-type="next"  placeholder="证件号" :focus="fcard==''||fcard=='cardNum'"/>
      </div>
      <div :class="{btn:true}" @click="childrenmitData">保&nbsp;&nbsp;存</div>
    </div>
  </div>
</template>

<script type="javascript">
  import mpvuePicker from '../../components/mpvuePicker';
  import mptoast from '../../components/mptoast';
  export default {
    name: 'perfectinfor',
    components: {
      mpvuePicker
    },
    data(){
      return {
        mode:"selector",
        deepLength: 0, // 几级联动
        pickerValueArray: [], // picker 数组值
        pickerText: '',
        pickerSingleArray: ["身份证",'工号',"工资号"],
      }
    },
    methods: {
      showSinglePicker: function () {
        this.pickerValueArray=this.pickerSingleArray;
        this.$refs.mpvuePicker.show();
      },
      onConfirm(e){
        this.pickerText = `${this.pickerValueArray[e[0]]}`;
      },
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
