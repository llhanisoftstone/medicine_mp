<template>
  <div class="container">
    <div class="step">
      <i class="step-one"></i>
      <i class="step-arrow1"></i>
      <i class="step-two"></i>
      <i class="step-arrow2"></i>
      <i class="step-three"></i>
    </div>
    <div class="item" @click="clickcat">
      <div class="title">已有患者</div>
      <input type="text" disabled="disabled" placeholder="请选择患者" v-model.trim="patient">
      <i class="arrows_r"></i>
    </div>
    <div class="item">
      <div class="title" v-if="e_id">姓&emsp;名</div>
      <div class="i_title" v-else=""><span>*</span>姓&emsp;名</div>
      <input type="text" v-model='realname' :disabled="isDisabled" maxlength="20" confirm-type="next" placeholder="请输入患者姓名"/>
    </div>
    <div class="item">
      <div class="title">性&emsp;别</div>
      <picker :range="genderArray" :disabled="isDisabled" @change="bindPickerChange">
        <input type="text" disabled="disabled" placeholder="请选择性别" v-model.trim="gender_text">
        <i class="arrows_r"></i>
      </picker>
    </div>
    <div class="item">
      <div class="title">出生日期</div>
      <picker mode="date" :start="init_start_time" :end="init_end_time" :disabled="isDisabled" @change="bindBirthTimeChange">
        <input type="text" disabled="disabled" placeholder="请选择出生日期" v-model.trim="birth_time">
        <i class="arrows_r"></i>
      </picker>
    </div>
    <div class="item">
      <div class="title">民&emsp;族</div>
      <picker :range="nationArray" :disabled="isDisabled" @change="bindNationChange">
        <input type="text" disabled="disabled" placeholder="请选择民族" v-model.trim="nation">
        <i class="arrows_r"></i>
      </picker>
    </div>
    <div class="item">
      <div class="title">体&emsp;重</div>
      <input type="text" v-model='weight' :disabled="isDisabled" maxlength="3" confirm-type="next"  placeholder="请输入体重(kg)"/>
    </div>
    <div class="item">
      <div class="title">联系方式</div>
      <input type="text" v-model='phone' :disabled="isDisabled" maxlength="11" confirm-type="next"  placeholder="请输入联系方式"/>
    </div>
    <div class="item none">
      <div class="title">原患疾病</div>
      <input type="text" v-model='diseases' :disabled="isDisabled" maxlength="100" confirm-type="next"  placeholder="请输入原患疾病"/>
    </div>
    <div class="modal">
      <div class="line_h1"></div>
      <div class="modal_item">
        <div class="title">既往药品不良反应/事件</div>
        <div class="flex">
          <radio-group class="flex-group" @change="changeRadio">
            <label v-for="(item, index) in whetherList" v-bind:key="index"><radio value="{{item.value}}" :disabled="isDisabled" checked="{{item.checked}}"/>{{item.text}}</label>
          </radio-group>
        </div>
        <input v-if="describeShow" type="text" v-model='describe' :disabled="isDisabled" maxlength="100" confirm-type="next"  placeholder="例如：板蓝根+头晕"/>
      </div>
      <div class="modal_item">
        <div class="title">家族药品不良反应/事件</div>
        <div class="flex">
          <radio-group class="flex-group" @change="change1Radio">
            <label v-for="(item, index) in family_whetherList" v-bind:key="index"><radio value="{{item.value}}" :disabled="isDisabled" checked="{{item.checked}}"/>{{item.text}}</label>
          </radio-group>
        </div>
        <input v-if="familyShow" type="text" v-model='family_describe' :disabled="isDisabled" maxlength="100" confirm-type="next"  placeholder="例如：父母+板蓝根+头晕"/>
      </div>
      <div class="modal_item">
        <div class="title">相关重要信息</div>
        <div class="check-flex">
          <checkbox-group @change="changeCheckBox">
            <div class="check-group"  v-for="item in important_information">
              <checkbox class="item-group" :disabled="isDisabled" value="{{item.name}}" checked="{{item.checked}}"/>
              <span>{{item.name}}</span>
            </div>
          </checkbox-group>
        </div>
        <input v-if="otherShow" type="text" v-model='other' maxlength="100" :disabled="isDisabled" confirm-type="next"  placeholder="请输入其他信息"/>
      </div>
    </div>

    <div class="savedata" @click.stop="savedrugs()">下一步</div>
    <mpvue-picker
      ref="mpvuePicker" @pickerCancel="pickerCancel"
      :pickerValueArray="pickerValueArray"
      :pickerValueDefault='pickerValueDefault'
      :mode="mode"
      :deepLength=deepLength
      @onConfirm="onConfirm" >
    </mpvue-picker>
    <mptoast/>
    <confirm ref="confirm"/>
  </div>
</template>

<script type="javascript">
  import mpvuePicker from '../../components/mpvuePicker';
  import mptoast from '../../components/mptoast';
  import confirm from '../../components/confirm';
  export default {
    components: {
      mpvuePicker,
      mptoast,
      confirm
    },
    data(){
      return {
        b_id: '', //不良记录id
        e_id: '',  //选中患者id
        patient:'暂无患者',
        realname: '',
        genderArray:['男','女'],
        nationArray:['汉族','蒙古族','回族','藏族','维吾尔族','苗族','彝族','壮族','布依族','朝鲜族','满族','侗族','瑶族','白族','土家族','哈尼族','哈萨克族','傣族','黎族','傈僳族','佤族','畲族','高山族','拉祜族','水族','东乡族','纳西族','景颇族','柯尔克孜族','土族','达斡尔族','仫佬族','羌族','布朗族','撒拉族','毛南族','仡佬族','锡伯族','阿昌族','普米族','塔吉克族','怒族','乌孜别克族','俄罗斯族','鄂温克族','德昂族','保安族','裕固族','京族','塔塔尔族','独龙族','鄂伦春族','赫哲族','门巴族','珞巴族','基诺族'],
        important_information:[{name:'吸烟史',checken:false},{name:'饮酒史',checken:false},{name:'妊娠期',checken:false},{name:'肝病史',checken:false},{name:'肾病史',checken:false},{name:'过敏史',checken:false},{name:'其他',checken:false}],
        gender: 1,
        gender_text: '男',
        nation:'汉族',
        phone: '',
        diseases: '',
        init_start_time: '1900-01-01',
        init_end_time: '',
        birth_time: '',
        deepLength:0,
        patientList:[],
        pickerValueArray:[],
        pickerValueSelect:'',
        pickerValueDefault:[0],
        weight: '',
        photo: '',
        whether: 2,
        whetherList: [{value: 1, text: '有', checked: false},{value: 2, text: '无', checked: true},{value: 3, text: '不详', checked: false}],
        describe: '',
        family_whether: 2,
        family_whetherList: [{value: 1, text: '有', checked: false},{value: 2, text: '无', checked: true},{value: 3, text: '不详', checked: false}],
        family_describe: '',
        information_text: '',
        other:'',
        isDisabled:false,
        ishave: false,
        describeShow: true,
        familyShow: true,
        otherShow: false
      }
    },
    methods: {
      clickcat(){
        if(this.ishave){
          this.$refs.mpvuePicker.show();
        }
      },
      async showPatientPicker(){
        let than=this;
        let res = await than.$get('/rs/patient',{u_id: this.$store.state.user.userid, b_id: this.b_id,order:"create_time desc", status: 1})
        if(res.code==200){
          than.ishave = true
          than.patientList = res.rows;
          than.patient = '请选择'
          let arr = ['请选择'];
          for(let i=0; i<res.rows.length; i++){
            arr.push(res.rows[i].realname);
            if(res.rows[i].isChecked){
              than.isDisabled = true;
              than.pickerValueSelect = res.rows[i];
              than.e_id = res.rows[i].id;
            }
          }
          than.pickerValueArray = arr;
          if(than.pickerValueSelect){
            than.patient = than.pickerValueSelect.realname;
            than.realname = than.pickerValueSelect.realname;
            than.gender = than.pickerValueSelect.gender;
            if(than.pickerValueSelect.gender == 1){
              than.gender_text = '男'
            }else{
              than.gender_text = '女'
            }
            than.birth_time = than.pickerValueSelect.birth_time.substring(0, 10);
            than.nation = than.pickerValueSelect.nation;
            than.weight = than.pickerValueSelect.weight;
            than.phone = than.pickerValueSelect.phone;
            than.diseases = than.pickerValueSelect.diseases;
            than.whether = than.pickerValueSelect.whether;
            for(let i=0; i<this.whetherList.length; i++){
              if(this.whetherList[i].value == than.pickerValueSelect.whether){
                this.whetherList[i].checked = true;
              }else{
                this.whetherList[i].checked = false;
              }
            }
            if(than.pickerValueSelect.whether == 1){
              than.describe = than.pickerValueSelect.describe;
              than.describeShow = true;
            }else{
              than.describeShow = false;
            }
            than.family_whether = than.pickerValueSelect.family_whether;
            for(let i=0; i<this.family_whetherList.length; i++){
              if(this.family_whetherList[i].value == than.pickerValueSelect.family_whether){
                this.family_whetherList[i].checked = true;
              }else{
                this.family_whetherList[i].checked = false;
              }
            }
            if(than.pickerValueSelect.family_whether == 1){
              than.family_describe = than.pickerValueSelect.family_describe;
              than.familyShow = true;
            }else{
              than.familyShow = false;
            }
            if(than.pickerValueSelect.information_text != ''){
              for(let i=0; i<than.important_information.length; i++){
                if(than.pickerValueSelect.information_text.indexOf(than.important_information[i].name) > -1){
                  than.important_information[i].checked = true;
                }
              }
              if(than.pickerValueSelect.information_text.indexOf('其他') > -1){
                than.otherShow = true;
                than.other = than.pickerValueSelect.other
              }
            }
          }
        }else{
          than.ishave = false
        }
      },
      changeRadio(e){
        if(!this.isDisabled){
          this.whether = e.target.value;
          for(let i=0; i<this.whetherList.length; i++){
            if(this.whetherList[i].value == e.target.value){
              this.whetherList[i].checked = true;
            }else{
              this.whetherList[i].checked = false;
            }
          }
          if(e.target.value == 1){
            this.describeShow = true;
          }else{
            this.describeShow = false;
            this.describe = '';
          }
        }
      },
      change1Radio(e){
        if(!this.isDisabled){
          this.family_whether = e.target.value;
          for(let i=0; i<this.family_whetherList.length; i++){
            if(this.family_whetherList[i].value == e.target.value){
              this.family_whetherList[i].checked = true;
            }else{
              this.family_whetherList[i].checked = false;
            }
          }
          if(e.target.value == 1){
            this.familyShow = true;
          }else{
            this.familyShow = false;
            this.family_describe = '';
          }
        }
      },
      changeCheckBox(e){
        if(!this.isDisabled){
          this.information_text = e.target.value.toString();
          for(let i=0; i<this.important_information.length; i++){
            if(this.information_text.indexOf(this.important_information[i].name) > -1){
              this.important_information[i].checked = true;
            }else{
              this.important_information[i].checked = false;
            }
          }
          if(this.information_text.indexOf('其他') > -1){
            this.otherShow = true;
          }else{
            this.otherShow = false;
            this.other = '';
          }
        }
      },
      bindNationChange(e){
        this.nation=this.nationArray[e.target.value];
      },
      bindPickerChange(e){
        this.gender=e.target.value;
        this.gender_text=this.genderArray[e.target.value];
      },
      bindBirthTimeChange(e) {
        this.birth_time=e.target.value
      },
      formatData(time){
        let date = new Date(time);
        let m=date.getMonth() + 1;
        let d=date.getDate();
        if(m<10){
          m="0"+m;
        }
        if(d<10){
          d="0"+d;
        }
        return date.getFullYear()+"-"+m+"-"+date.getDate();
      },
      onConfirm(e){
        if(e[0] == 0){
          this.isDisabled = false;
          this.e_id = '';
          this.patient = '请选择'
          this.realname = ''
          this.gender = 1
          this.gender_text = '男'
          this.nation = '汉族'
          this.phone = ''
          this.diseases = ''
          this.birth_time = ''
          this.deepLength = 0
          this.pickerValueSelect = ''
          this.pickerValueDefault = [0]
          this.weight = ''
          this.photo = ''
          this.whether = 2
          this.whetherList = [{value: 1, text: '是', checked: false},{value: 2, text: '否', checked: true},{value: 3, text: '不详', checked: false}]
          this.describe = ''
          this.family_whether = 2
          this.family_whetherList = [{value: 1, text: '有', checked: false},{value: 2, text: '无', checked: true},{value: 3, text: '不详', checked: false}]
          this.important_information = [{name:'吸烟史',checken:false},{name:'饮酒史',checken:false},{name:'妊娠期',checken:false},{name:'肝病史',checken:false},{name:'肾病史',checken:false},{name:'过敏史',checken:false},{name:'其他',checken:false}]
          this.family_describe = ''
          this.information_text = ''
          this.other = ''
          this.isDisabled = false
          this.describeShow = true
          this.familyShow = true
          this.otherShow = false
        }else{
          this.isDisabled = true;
          let inx = e[0] - 1;
          this.e_id = this.patientList[inx].id;
          this.patient = this.pickerValueArray[e[0]];
          this.realname = this.patientList[inx].realname;
          this.gender = this.patientList[inx].gender;
          if(this.patientList[inx].gender == 1){
            this.gender_text = '男'
          }else{
            this.gender_text = '女'
          }
          this.birth_time = this.patientList[inx].birth_time.substring(0, 10);
          this.nation = this.patientList[inx].nation;
          this.weight = this.patientList[inx].weight;
          this.phone = this.patientList[inx].phone;
          this.diseases = this.patientList[inx].diseases;
          this.whether = this.patientList[inx].whether;
          for(let i=0; i<this.whetherList.length; i++){
            if(this.whetherList[i].value == this.patientList[inx].whether){
              this.whetherList[i].checked = true;
            }else{
              this.whetherList[i].checked = false;
            }
          }
          if(this.patientList[inx].whether == 1){
            this.describe = this.patientList[inx].describe;
            this.describeShow = true;
          }else{
            this.describeShow = false;
          }
          this.family_whether = this.patientList[inx].family_whether;
          for(let i=0; i<this.family_whetherList.length; i++){
            if(this.family_whetherList[i].value == this.patientList[inx].family_whether){
              this.family_whetherList[i].checked = true;
            }else{
              this.family_whetherList[i].checked = false;
            }
          }
          if(this.patientList[inx].family_whether == 1){
            this.family_describe = this.patientList[inx].family_describe;
            this.familyShow = true;
          }else{
            this.familyShow = false;
          }
          if(this.patientList[inx].information_text){
            for(let i=0; i<this.important_information.length; i++){
              if(this.patientList[inx].information_text.indexOf(this.important_information[i].name) > -1){
                this.important_information[i].checked = true;
              }
            }
            if(this.patientList[inx].information_text.indexOf('其他') > -1){
              this.otherShow = true;
              this.other = this.patientList[inx].other
            }
          }else{
            for(let i=0; i<this.important_information.length; i++){
              this.important_information[i].checked = false;
            }
            this.otherShow = false;
            this.other = ''
          }
        }
      },
      pickerCancel(){
        this.showPicker = false;
      },
      async savedrugs(){
        let that = this;
        if(that.isDisabled){  //选择患者
            let res = await this.$put('/rs/bad_record/'+that.b_id, {p_id: that.e_id});
            if(res.code == 200){
              let data = 'b_id='+that.b_id
              setTimeout(function() {
                wx.navigateTo({
                  url:`/pages/adverse_reaction/main?${data}`
                })
              },300);
            }
        }else{
          if(that.realname == ''){
            return that.$mptoast("请输入患者姓名");
          }
          let data = {
            u_id: that.$store.state.user.userid,
            b_id: that.b_id,
            realname: that.realname,
            gender: that.gender,
            birth_time: that.birth_time,
            nation: that.nation,
            weight: that.weight,
            phone: that.phone,
            diseases: that.diseases,
            whether: that.whether,
            family_whether: that.family_whether,
            information_text: that.information_text,
          }
          if(that.whether == 1){
            data.describe = that.describe
          }
          if(that.family_whether == 1){
            data.family_describe = that.family_describe
          }
          if(that.other){
            data.other = that.other
          }
          let res = await that.$post('/rs/patient', data);
          if(res.code == 200){
            let data = 'b_id='+that.b_id
            setTimeout(function() {
              wx.navigateTo({
                url:`/pages/adverse_reaction/main?${data}`
              })
            },300);
          }
        }
      }
    },
    mounted(){

    },
    onLoad: function (option) {
      this.b_id = ''
      this.e_id = ''
      this.patient = '暂无患者'
      this.realname = ''
      this.gender = 1
      this.gender_text = '男'
      this.nation = '汉族'
      this.phone = ''
      this.diseases = ''
      this.birth_time = ''
      this.deepLength = 0
      this.patientList = []
      this.pickerValueArray = []
      this.pickerValueSelect = ''
      this.pickerValueDefault = [0]
      this.weight = ''
      this.photo = ''
      this.whether = 2
      this.whetherList = [{value: 1, text: '是', checked: false},{value: 2, text: '否', checked: true},{value: 3, text: '不详', checked: false}]
      this.describe = ''
      this.family_whether = 2
      this.family_whetherList = [{value: 1, text: '有', checked: false},{value: 2, text: '无', checked: true},{value: 3, text: '不详', checked: false}]
      this.family_describe = ''
      this.information_text = ''
      this.other = ''
      this.isDisabled = false
      this.ishave = false
      this.describeShow = true
      this.familyShow = true
      this.otherShow = false
      this.b_id = option.b_id;
    },
    onShow(){
      this.init_end_time = this.formatData(new Date());
      this.pickerValueArray = [];
      this.pickerValueSelect = '';
      this.showPatientPicker();
    },
    onUnload(){

    },
  }
</script>

<style lang="less" scoped>
  @import '../../static/less/common.less';
  .step{
    display: flex;
    margin: 30px/2 100px/2;
    .step-one{
      width: 60px/2;
      height: 60px/2;
      background:url('../../../static/img/step/one-01.png') center no-repeat;
      background-size: cover;
    }
    .step-two{
      width: 60px/2;
      height: 60px/2;
      background:url('../../../static/img/step/two-01.png') center no-repeat;
      background-size: cover;
    }
    .step-three{
      width: 60px/2;
      height: 60px/2;
      background:url('../../../static/img/step/three-02.png') center no-repeat;
      background-size: cover;
    }
    .step-arrow1{
      width: 160px/2;
      height: 60px/2;
      margin: 0 20px/2;
      background:url('../../../static/img/step/arrow-01.png') center no-repeat;
      background-size: 160px/2 60px/2;
    }
    .step-arrow2{
      width: 160px/2;
      height: 60px/2;
      margin: 0 20px/2;
      background:url('../../../static/img/step/arrow-02.png') center no-repeat;
      background-size: 160px/2 60px/2;
    }
  }
  .container{
    min-height: 500px;
  }
  .container .item{
    width: 490px/2;
    margin: 0 30px/2;
    font-family: STZhongsong;
    height: 100px/2;
    line-height: 100px/2;
    border-bottom: 1px solid #e2e2e2;
    padding-left: 200px/2;
    position: relative;
    .arrows_r{
      position: absolute;
      right: 10px/2;
      top: 35px/2;
      width:16px/2;
      height:29px/2;
      background: url("../../../static/img/arrows_right.png") center center;
      background-size: 100% 100%;
    }
  }
  .container .none{
    border-bottom: none;
  }
  .item .title{
    position: absolute;
    font-size: 36px/2;
    left: 20px/2;
    color: #4d4d4d;
    span{
      font-size: 30px/2;
      color: #999999;
    }
  }
  .item .i_title{
    position: absolute;
    font-size: 36px/2;
    left: 7px/2;
    color: #4d4d4d;
    span{
      font-size: 30px/2;
      color: #df5c3e;
    }
  }
  label{
    font-family: STZhongsong;
    font-size: 30px/2;
    color: #4d4d4d;
  }
  .modal{
    .line_h1{
      background-color: #f5f5f5;
      height: 36px/2;
    }
    .modal_item{
      margin: 0 30px/2;
      font-family: STZhongsong;
      line-height: 100px/2;
      position: relative;
      .title{
        font-size: 36px/2;
        color: #666666;
        span{
          font-size: 30px/2;
          color: #999999;
        }
      }
      .flex .flex-group{
        padding: 0 50px/2;
        display: flex;
        border-bottom: 1px solid #e2e2e2;
        justify-content: space-between;
      }
      .check-flex{
        height: 400px/2;
        .check-group{
          width: 50%;
          float: left;
        }
      }
      input{
        color: #1a1a1a;
        height: 100px/2;
        font-size: 36px/2;
        line-height: 100px/2;
        font-family: STZhongsong;
        border-bottom: 1px solid #e2e2e2;
      }
    }
  }
  .item input{
    color: #1a1a1a;
    height: 100px/2;
    font-size: 36px/2;
    line-height: 100px/2;
    font-family: STZhongsong;
  }
  .savedata{
    margin-top: 70px/2;
    margin-bottom: 40px/2;
    margin-left: 35px/2;
    width: 680px/2;
    height:80px/2;
    line-height: 80px/2;
    font-size: 30px/2;
    color: #ffffff;
    text-align: center;
    background-color: #2dc9aa;
    border-radius: 10px/2;
  }
  .imgurl{
    width: 220px;
  }
  .mpvue-picker__action {
    flex:1;
    color:#2dc9aa;
  }
  .item view{
    font-size:36px/2;
  }
  .mui-poppicker-header .mui-btn-blue {
    background:  #2dc9aa;;
    border-color:  #2dc9aa;;
  }
  .mui-pciker-rule {
    line-height:30/2px !important;
  }
  .mui-pciker-rule-ft{
    height: 70/2px!important;

  }
  .mui-poppicker-btn-ok{
    color:@color_fff;
  }
</style>
