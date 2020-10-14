<template>
  <div class="container">
    <div class="step">
      <i class="step-one"></i>
      <i class="step-arrow1"></i>
      <i class="step-two"></i>
      <i class="step-arrow1"></i>
      <i class="step-three"></i>
    </div>
    <div class="item" @click="clickcat">
      <div class="i_title"><span>*</span>不良反应/事件名称</div>
      <i class="arrows_r"></i>
    </div>
    <div class="modal">
      <div class="modal_item" v-if="isShow">
        <div class="check-flex">
          <checkbox-group @change="changeCheckBox">
            <div class="check-group"  v-for="item in adverse_list">
              <checkbox class="item-group" checked="{{item.checked}}" value="{{item.name}}"/>
              <span>{{item.name}}</span>
            </div>
          </checkbox-group>
        </div>
      </div>
    </div>
    <div class="item" v-if="adverse_text != ''">
      <input type="text" disabled="disabled" placeholder="" v-model.trim="adverse_text">
    </div>
    <div class="item">
      <picker mode="date" :start="init_start_time" :end="init_end_time" @change="bindBirthTimeChange">
        <div class="i_title"><span>*</span>不良反应/事件发生时间</div>
      </picker>
      <i class="arrows_r"></i>
    </div>
    <div class="item" v-if="occurrenceShow">
        <input type="text" disabled="disabled" placeholder="" v-model.trim="occurrence_time">
    </div>
    <div class="item">
      <div class="i_title"><span>*</span>不良反应/事件过程描述</div>
    </div>
    <div class="item item_textarea">
      <textarea v-model="details" placeholder="（包括症状、体征、临床检验等）及处理情况" maxlength="200"></textarea>
    </div>
    <div class="modal">
      <div class="line_h1"></div>
      <div class="modal_item">
        <div class="title">不良反应/事件的结果</div>
        <div class="flex">
          <radio-group class="flex-group" @change="changeRadio">
            <label v-for="(item, index) in resultList" v-bind:key="index"><radio value="{{item.value}}" checked="{{item.checked}}"/>{{item.text}}</label>
          </radio-group>
        </div>
      </div>
      <div class="modal_item">
        <div class="title">停药或减量后，反应/事件是否消失或减轻</div>
        <div class="flex">
          <radio-group class="flex-group" @change="change1Radio">
            <label v-for="(item, index) in subseqList" v-bind:key="index"><radio value="{{item.value}}" checked="{{item.checked}}"/>{{item.text}}</label>
          </radio-group>
        </div>
      </div>
      <div class="modal_item">
        <div class="title">再次使用后是否再次出现同样反应/事件</div>
        <div class="flex">
          <radio-group class="flex-group" @change="change2Radio">
            <label v-for="(item, index) in reuseList" v-bind:key="index"><radio value="{{item.value}}" checked="{{item.checked}}"/>{{item.text}}</label>
          </radio-group>
        </div>
      </div>
      <div class="modal_item">
        <div class="title">对原患疾病的影响</div>
        <div class="flex">
          <radio-group class="flex-group" @change="change3Radio">
            <label v-for="(item, index) in affectList" v-bind:key="index"><radio value="{{item.value}}" checked="{{item.checked}}"/>{{item.text}}</label>
          </radio-group>
        </div>
      </div>
    </div>
    <div class="savedata" @click.stop="savedrugs()">提交</div>
    <mptoast/>
    <confirm ref="confirm"/>
  </div>
</template>

<script type="javascript">
  import mptoast from '../../components/mptoast';
  import confirm from '../../components/confirm';
  export default {
    components: {
      mptoast,
      confirm
    },
    data(){
      return {
        b_id: '',
        adverse_list:[],
        adverse_text:'',
        isShow: false,
        occurrenceShow: false,
        init_start_time: '1900-01-01',
        init_end_time: '',
        occurrence_time: '',
        details: '',
        result: 1,  //1-痊愈 2-好转 3-未好转
        resultList: [{value: 1, text: '痊愈', checked: true},{value: 2, text: '好转', checked: false},{value: 3, text: '未好转', checked: false}],
        subseq: 1,  //1-有 2-无 3-不明 4-未停药或未减量
        subseqList: [{value: 1, text: '有', checked: true},{value: 2, text: '无', checked: false},{value: 3, text: '不明', checked: false},{value: 4, text: '未停药', checked: false}],
        reuse: 1,   //1-有 2-无 3-不明 4-未再使用
        reuseList: [{value: 1, text: '有', checked: true},{value: 2, text: '无', checked: false},{value: 3, text: '不明', checked: false},{value: 4, text: '未再使用', checked: false}],
        affect: 1,  //1-不明显 2-病情延长 3-病情加重
        affectList: [{value: 1, text: '不明显', checked: true},{value: 2, text: '病情延长', checked: false},{value: 3, text: '病情加重', checked: false}],
      }
    },
    methods: {
      clickcat(){
        if(this.isShow){
          this.isShow = false;
        }else{
          this.isShow = true;
        }
      },
      async showPatientPicker(){
        var than=this;
        let res = await than.$get('/rs/event',{order:"create_time desc", status: 1})
        if(res.code==200){
          for(let i=0; i<res.rows.length; i++){
            res.rows[i].checked = false;
          }
          than.adverse_list = res.rows;
        }
      },
      changeRadio(e){
        this.result = e.target.value;
        for(let i=0; i<this.resultList.length; i++){
          if(this.resultList[i].value == e.target.value){
            this.resultList[i].checked = true;
          }else{
            this.resultList[i].checked = false;
          }
        }
      },
      change1Radio(e){
        this.subseq = e.target.value;
        for(let i=0; i<this.subseqList.length; i++){
          if(this.subseqList[i].value == e.target.value){
            this.subseqList[i].checked = true;
          }else{
            this.subseqList[i].checked = false;
          }
        }
      },
      change2Radio(e){
        this.reuse = e.target.value;
        for(let i=0; i<this.reuseList.length; i++){
          if(this.reuseList[i].value == e.target.value){
            this.reuseList[i].checked = true;
          }else{
            this.reuseList[i].checked = false;
          }
        }
      },
      change3Radio(e){
        this.affect = e.target.value;
        for(let i=0; i<this.affectList.length; i++){
          if(this.affectList[i].value == e.target.value){
            this.affectList[i].checked = true;
          }else{
            this.affectList[i].checked = false;
          }
        }
      },
      changeCheckBox(e){
        this.adverse_text = e.target.value.toString();
        for(let i=0; i<this.adverse_list.length; i++){
          if(this.adverse_text.indexOf(this.adverse_list[i].name) > -1){
            this.adverse_list[i].checked = true;
          }else{
            this.adverse_list[i].checked = false;
          }
        }
      },
      bindBirthTimeChange(e) {
        console.log(e);
        this.occurrence_time = e.target.value
        this.occurrenceShow = true
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
      pickerCancel(){
        this.showPicker = false;
      },
      async savedrugs(){
        if(this.adverse_text == ''){
          this.$mptoast("请选择不良反应/事件名称");
          return
        }
        if(this.occurrence_time == ''){
          this.$mptoast("请选择发生时间");
          return
        }
        if(this.details == ''){
          this.$mptoast("请输入过程描述信息");
          return
        }
        let data = {
          b_id: this.b_id,
          submit: 1,
          event_text: this.adverse_text,
          occurrence_time: this.occurrence_time,
          details: this.details.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, ''),
          result: this.result,
          subseq: this.subseq,
          reuse: this.reuse,
          affect: this.affect,
          progress: 3,
          status: 2
        }
        if(this.adverse_text.split(',').length >= 3){
          data.alarm = 2
        }
        let res = await this.$post('/rs/bad_record', data);
        if(res.code == 200){
          let data = 'code='+res.code
          setTimeout(function() {
            wx.navigateTo({
              url:`/pages/result/main?${data}`
            })
          },300);
        }else{
          console.log(res);
        }
      }
    },
    mounted(){

    },
    onLoad: function (option) {
      this.b_id = option.b_id;
    },
    onShow(){
      this.init_end_time = this.formatData(new Date());
      this.adverse_list = []
      this.adverse_text = ''
      this.isShow = false
      this.occurrenceShow = false
      this.init_end_time = ''
      this.occurrence_time = ''
      this.details = ''
      this.result = 1
      this.resultList = [{value: 1, text: '痊愈', checked: true},{value: 2, text: '好转', checked: false},{value: 3, text: '未好转', checked: false}]
      this.subseq = 1
      this.subseqList = [{value: 1, text: '有', checked: true},{value: 2, text: '无', checked: false},{value: 3, text: '不明', checked: false},{value: 4, text: '未停药', checked: false}]
      this.reuse = 1
      this.reuseList = [{value: 1, text: '有', checked: true},{value: 2, text: '无', checked: false},{value: 3, text: '不明', checked: false},{value: 4, text: '未再使用', checked: false}]
      this.affect = 1
      this.affectList = [{value: 1, text: '不明显', checked: true},{value: 2, text: '病情延长', checked: false},{value: 3, text: '病情加重', checked: false}]
      this.showPatientPicker()
    },
    onUnload(){

    },
  }
</script>

<style lang="less" scoped>
  @import '../../static/less/common.less';
  .container{
    min-height: 500px;
  }
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
      background:url('../../../static/img/step/three-01.png') center no-repeat;
      background-size: cover;
    }
    .step-arrow1{
      width: 160px/2;
      height: 60px/2;
      margin: 0 20px/2;
      background:url('../../../static/img/step/arrow-01.png') center no-repeat;
      background-size: 160px/2 60px/2;
    }
  }
  .container .item{
    margin: 0 30px/2;
    font-family: STZhongsong;
    height: 100px/2;
    line-height: 100px/2;
    border-bottom: 1px solid #e2e2e2;
    position: relative;
    input{
      color: #1a1a1a;
      height: 100px/2;
      font-size: 36px/2;
      line-height: 100px/2;
      font-family: STZhongsong;
    }
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
  .container .item_textarea{
    height: 240px/2;
    border-bottom: none;
    textarea{
      width: 100%;
      height: 200px/2;
      margin: 20px/2 0;
    }
  }
  .container .none{
    border-bottom: none;
  }
  .item .title{
    position: absolute;
    font-size: 36px/2;
    left: 20px/2;
    color: #666666;
    span{
      font-size: 30px/2;
      color: #999999;
    }
  }
  .item .i_title{
    position: absolute;
    font-size: 36px/2;
    left: 7px/2;
    color: #666666;
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
        margin-left: 10px/2;
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
