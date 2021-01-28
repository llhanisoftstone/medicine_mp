<template>
  <div class="container">
    <div class="item">
      <div class="title">姓&emsp;名</div>
      <input type="text" disabled="disabled" v-model="user.realname" confirm-type="next" placeholder="患者姓名"/>
    </div>
    <div class="item">
      <div class="title">性&emsp;别</div>
      <input type="text" disabled="disabled" v-model="user.gender" confirm-type="next"  placeholder="性别"/>
    </div>
    <div class="item">
      <div class="title">出生日期</div>
      <input type="text" disabled="disabled" v-model='user.birth_time' confirm-type="next"  placeholder="出生日期"/>
    </div>
    <div class="item">
      <div class="title">民&emsp;族</div>
      <input type="text" disabled="disabled" v-model='user.nation' confirm-type="next"  placeholder="民族"/>
    </div>
    <div class="item">
      <div class="title">体&emsp;重</div>
      <input type="text" disabled="disabled" v-model='user.weight' confirm-type="next"  placeholder="体重"/>
    </div>
    <div class="item">
      <div class="title">联系电话</div>
      <input type="text" disabled="disabled" v-model='user.phone' confirm-type="next"  placeholder="联系电话"/>
    </div>
    <div class="item">
      <div class="title">原患疾病</div>
      <input type="text" disabled="disabled" v-model='user.diseases' confirm-type="next"  placeholder="原患疾病"/>
    </div>
    <div class="line_h1"></div>
    <div class="item_modal">
      <scroll-view class="scroll-view_H" scroll-x="true" style="width: 100%" >
        <view class="view_bg" v-for="(item,i) in drugs_list" @click="tab_drugs(item.id)" :class="{active:item.id==d_id?true:false}">
          <div class="text">{{item.label}}</div>
        </view>
      </scroll-view>
    </div>
    <div class="item">
      <div class="title">批准文号</div>
      <input type="text" disabled="disabled" v-model='drugs.approval_number' confirm-type="next"  placeholder="批准文号"/>
    </div>
    <div class="item">
      <div class="title">商品名称</div>
      <input type="text" disabled="disabled" v-model='drugs.title' confirm-type="next"  placeholder="商品名称"/>
    </div>
    <div class="item">
      <div class="title">通用名称</div>
      <input type="text" disabled="disabled" v-model='drugs.common_name' confirm-type="next"  placeholder="通用名称"/>
    </div>
    <div class="item">
      <div class="title">生产厂家</div>
      <input type="text" disabled="disabled" v-model='drugs.company_name' confirm-type="next"  placeholder="生产厂家"/>
    </div>
    <div class="item">
      <div class="title">用法用量</div>
      <input type="text" disabled="disabled" v-model='drugs.usage_dosage' confirm-type="next"  placeholder="用法用量"/>
    </div>
    <div class="item_modal">
      <div class="title">用药起止时间</div>
      <input type="text" disabled="disabled" v-model='drugs.date_time' confirm-type="next"  placeholder="用药时间"/>
    </div>
    <div class="item_modal">
      <div class="title">不良反应/事件名称</div>
      <input type="text" disabled="disabled" v-model='bads.event_text' confirm-type="next"  placeholder="不良反应/事件名称"/>
    </div>
    <div class="item_modal">
      <div class="title">不良反应/事件发生时间</div>
      <input type="text" disabled="disabled" v-model='bads.occurrence_time' confirm-type="next"  placeholder="不良反应/事件发生时间"/>
    </div>
    <div class="item_modal">
      <div class="title">不良反应/事件过程描述</div>
      <input type="text" disabled="disabled" v-model='bads.details' confirm-type="next"  placeholder="不良反应/事件过程描述"/>
    </div>
    <div class="item_modal">
      <div class="title">不良反应/事件结果</div>
      <input type="text" disabled="disabled" v-model='bads.result' confirm-type="next"  placeholder="不良反应/事件结果"/>
    </div>
    <div class="item_modal">
      <div class="title">停药或减量后，症状是否消失或减轻</div>
      <input type="text" disabled="disabled" v-model='bads.subseq' confirm-type="next"  placeholder=""/>
    </div>
    <div class="item_modal">
      <div class="title">再次使用是否出现同样反应</div>
      <input type="text" disabled="disabled" v-model='bads.reuse' confirm-type="next"  placeholder=""/>
    </div>
    <div class="item_modal">
      <div class="title">对原患疾病的影响</div>
      <input type="text" disabled="disabled" v-model='bads.affect' confirm-type="next"  placeholder=""/>
    </div>
    <div class="modal_item" v-if="alarm != ''">
      <div class="title">请选择处理结果</div>
      <div class="flex">
        <radio-group class="flex-group" @change="changeRadio">
          <label v-for="(item, index) in typeList" v-bind:key="index"><radio :value="item.value" :checked="item.checked"/>{{item.text}}</label>
        </radio-group>
      </div>
    </div>
    <div v-if="alarm != ''" class="savedata" @click.stop="savetype()">提交</div>
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
        user:{},
        bads:{},
        drugs:{},
        drugs_list:[],
        d_id: '',
        pid: '',
        alarm: '',
        type: 0,
        typeList: [{value: 1, text: '新的', checked: false},{value: 2, text: '一般', checked: false},{value: 3, text: '严重', checked: false}],
        resultText:['','痊愈','好转','未好转'],
        affectText:['','不明显','病情延长','病情加重'],
        reuseText:['','是','否','不明','未再使用'],
        subseqText:['','是','否','不明','未停药或未减轻']
      }
    },
    methods: {
      async savetype(){
        let that = this;
        if(this.type == 0){
          return this.$mptoast("请选择处理结果");
        }
        let res = await this.$put('/rs/bad_record/'+this.pid, {type: this.type});
        if(res.code == 200){
          that.$mptoast("提交成功!");
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          },1000);
        }
      },
      async getreportDetails () {
        let that = this;
        let res = await this.$get('/rs/bad_record_details',{b_id: this.pid});
        if (res.code == 200) {
          if(res.user.gender == 1){
            res.user.gender = '男'
          }else{
            res.user.gender = '女'
          }
          if(res.user.birth_time){
            res.user.birth_time = res.user.birth_time.substring(0,10);
          }
          that.user = res.user;
          res.bads.result = that.resultText[res.bads.result];
          res.bads.affect = that.affectText[res.bads.affect];
          res.bads.reuse = that.reuseText[res.bads.reuse];
          res.bads.subseq = that.subseqText[res.bads.subseq];
          if(res.bads.occurrence_time){
            res.bads.occurrence_time = res.bads.occurrence_time.substring(0,10);
          }
          that.bads = res.bads;
          let array = [];
          let index = 0;
          if(res.suspected.length > 0){ //疑似
            res.suspected[0].date_time = res.suspected[0].start_time.substring(0,10) + '~' + res.suspected[0].end_time.substring(0,10);
            that.d_id = res.suspected[0].id
            that.drugs = res.suspected[0];
            for(let i=0; i<res.suspected.length; i++){
              index++
              res.suspected[i].label = '疑似药品'+parseInt(index);
              array.push(res.suspected[i]);
            }
          }
          if(res.blending.length > 0){  //并用
            if(index == 0){
              res.blending[0].date_time = res.blending[0].start_time.substring(0,10) + '~' + res.blending[0].end_time.substring(0,10);
              that.d_id = res.blending[0].id;
              that.drugs = res.blending[0];
            }
            for(let i=0; i<res.blending.length; i++){
              index++
              res.blending[i].label = '并用药品'+parseInt(index);
              array.push(res.blending[i]);
            }
          }
          that.drugs_list = array;
        }
      },
      tab_drugs (id) {
        this.d_id = id;
        for (let i = 0; i < this.drugs_list.length; i++) {
          if (id == this.drugs_list[i].id) {
            this.drugs_list[i].date_time = this.drugs_list[i].start_time.substring(0,10) + '~' + this.drugs_list[i].end_time.substring(0,10);
            this.drugs = this.drugs_list[i];
          }
        }
      },
      changeRadio(e){
        if(!this.isDisabled){
          this.type = e.target.value;
          for(let i=0; i<this.typeList.length; i++){
            if(this.typeList[i].value == e.target.value){
              this.typeList[i].checked = true;
            }else{
              this.typeList[i].checked = false;
            }
          }
        }
      }
    },
    mounted(){

    },
    onLoad: function (option) {
      if(option.pid){
        this.pid = option.pid
      }
      this.alarm = option.alarm || ''
    },
    onShow(){
      this.user = {}
      this.bads = {}
      this.drugs = {}
      this.drugs_list = []
      this.d_id = ''
      this.type = 0
      this.getreportDetails()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/less/common.less';
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
    label{
      font-family: STZhongsong;
      font-size: 30px/2;
      color: #4d4d4d;
    }
    .marleft{
      margin-left: 50px/2;
    }
  }
  .item_modal{
    width: 690px/2;
    margin: 0 30px/2;
    font-family: STZhongsong;
    line-height: 100px/2;
    border-bottom: 1px solid #e2e2e2;
    padding-left: 20px/2;
  }
  .item_modal .title{
    font-size: 36px/2;
    left: 20px/2;
    color: #4d4d4d;
    span{
      font-size: 30px/2;
      color: #999999;
    }
  }
  .item_modal input{
    color: #1a1a1a;
    height: 100px/2;
    font-size: 36px/2;
    line-height: 100px/2;
    font-family: STZhongsong;
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
  .item input{
    color: #1a1a1a;
    height: 100px/2;
    font-size: 36px/2;
    line-height: 100px/2;
    font-family: STZhongsong;
  }
  .item_modal scroll-view{
    height: 100px/2;
    font-family: STZhongsong;
    font-size: 30px/2;
    color: #4d4d4d;
  }
  .item_modal view.view_bg{
    width: 200px/2;
    height: 70px/2;
    position: relative;
    display: inline-block;
    text-align: center;
    border-radius: 30px/2;
    line-height: 70px/2;
    margin: 15px/2 20px/2 15px/2 0;
    color: #1a1a1a;
    background-color: #ffffff;
  }
  .item_modal view.active{
    color: #ffffff;
    background-color: #2dc9aa;
  }
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
      color: #4d4d4d;
      border-bottom: 1px solid #e2e2e2;
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
</style>
