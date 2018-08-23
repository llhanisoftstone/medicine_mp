<template>
    <div class="container">
      <form id="complaintsfrom">
        <ul class="complaintslist">
          <li data-type="1" v-if="!isjy">
            <span>咨询分类</span>
            <picker
              mode="selector"
              :value="pickerIndex"
              :range="pickerValueArray"
              @change="bindPickerChange">
              <input class="picker-input" :value="pickerValueArray[pickerIndex]" disabled="disabled" placeholder="请选择咨询分类" confirm-type="next">
            </picker>
          </li>
          <li data-type="2" >
            <span>联系人</span>
            <input type="text" class="select-item" v-model='realname' maxlength="10"  placeholder="请输入联系人"/>
          </li>
          <li data-type="3" >
            <span>联系电话</span>
            <input class="select-item" type="number" v-model='userphone' maxlength="11"  placeholder="请输入联系电话" />
          </li>
        </ul>
        <div class="textareak">
          <textarea id="complaintstext" :placeholder="text" v-model="details" :show-confirm-bar="false" maxlength="200"></textarea>
        </div>
      </form>
      <mpvue-picker
        ref="mpvuePicker" @pickerCancel="pickerCancel"
        :pickerValueArray="pickerValueArray"
        :pickerValueDefault='pickerValueDefault'
        :mode="mode"
        @onConfirm="onConfirm"
      >
      </mpvue-picker>
      <button type="button" class="sumbutton" id="submit_button" :style="{'bottom':isiphonex?'68rpx':0}" @click="submitData">提交</button>
      <mptoast/>
    </div>
</template>

<script type="javascript">
  import mpvuePicker from 'mpvue-picker';
  import mptoast from '../../components/mptoast';
    export default {
        name: 'toknow',
        props: [],
        components: {
          mptoast,
          mpvuePicker
        },
        data(){
            return {
              text:'请简单描述您想要了解的内容（200字以内）',
              isjy:false,
              isiphonex:false,
              realname:'',
              userphone:'',
              details:'',
              pickerValueArray:[],
              pickerValueDefault:[0],
              wishidlist:'',
              pickerwishText:'',
              wish_id:'',
              select:'',
              isBtnClicked:true,
              isModalShow:false,
              pickerIndex:-1,
              pikerShow:false
            }
        },
        methods: {
            async getWishCate(){
              let than = this;
              let res = await this.$get('/rs/wish_category');
              if (res.code == 200){
                var obj = [];
                var array=[];
                for(var i=0;i<res.rows.length;i++){
                  var o = {};
                  array.push(res.rows[i].c_name)
                  o.id = res.rows[i].id;
                  o.name = res.rows[i].c_name;
                  obj.push(o);
                }
                than.pickerValueArray=array;
                than.wishidlist = obj;
                this.select=1;
              }
            },
          bindPickerChange(e){
              let that=this;
              let ival=e.mp.detail.value;
              that.pickerIndex=ival;
              that.pickerwishText=that.pickerValueArray[ival];
              for(let wishVal of that.wishidlist ){
                if(that.pickerwishText==wishVal.name){
                  that.wish_id=wishVal.id;
                }
              }
          },
          submitData(){
            if(!this.isBtnClicked){
              return;
            }
            this.isBtnClicked = false;
            console.log(this.userphone)
            if((!this.wish_id)&&!this.isjy){
              this.$mptoast('请选择咨询分类');
              this.isBtnClicked = true;
              return;
            }
            if((!this.realname.trim())&&!this.isjy){
              this.$mptoast('请输入联系人');
              this.isBtnClicked = true;
              return;
            }
            if(this.userphone.trim()&&this.isjy&&!this.isPoneAvailable(this.userphone.trim())){
              this.$mptoast('请输入正确的11位手机号');
              this.isBtnClicked = true;
              return;
            }
            if(!this.isPoneAvailable(this.userphone.trim())&&!this.isjy){
              this.$mptoast('请输入正确的11位手机号');
              this.isBtnClicked = true;
              return;
            }
            if(!this.details.trim()){
              this.$mptoast('请输入内容');
              this.isBtnClicked = true;
              return;
            }
            var data={
              //u_id:this.$store.state.user.userid,
              username:this.realname,
              phone:this.userphone,
              details:this.details,
            };
            let url='/rs/wish_to_known';
            if (!this.isjy){
                data.category=this.wish_id;
            }else{
              url='/rs/suggest';
            }
            this.$post(url,data).then(res=>{
              if(res.code == 200){
                this.$mptoast('提交成功',100);
                setTimeout(function () {
                    wx.navigateBack({     //返回上一页面或多级页面
                      delta: 1
                    })
                }, 1500);
              }else{
                this.$mptoast('提交失败',100);
              }
            })
          },
          isPoneAvailable(str) {
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(str)) {
              return false;
            } else {
              return true;
            }
          }
        },
      onLoad: function (option) {
        this.getWishCate()//获取咨询分类
        if(option.isjy&&option.isjy!="false"){
          this.isjy = option.isjy;
        }else{
          this.isjy = false;
        }
        if(this.isjy){
          this.text='请简单描述您想要建议的内容（200字以内）';
          wx.setNavigationBarTitle({
            title: '我要建议'
          })
        }
        var that=this;
        try {
          var res = wx.getSystemInfoSync();
          console.log(res)
          if(res.model.match(/iPhone X/ig)){
            that.isiphonex=true;
          }else{
            that.isiphonex=false;
          }
        } catch (e) {
          // Do something when catch error
        }

      },
      onUnload(){
        this.isBtnClicked=true;
        this.realname='';
        this.userphone='';
        this.details='';
        this.pickerwishText='';
        this.wish_id='';
        this.pickerIndex=-1;
      },

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .container{
      width: 100%;
      overflow: hidden;
      position: absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      height: 100%;
    }
    .textareak{
      &:before{
        content:"";
        display:table;
      }
      position: relative;
    }
    .placeholder{
      margin: 24px/2 0 0 0;
      border: none;
      font-size: 26px/2;
      color: @color_99;
      padding:0 42px/2;
      line-height: 32px/2;
      box-sizing: border-box;
      width:750px/2;
      height: 400px/2;
      position: absolute;
      z-index: -1;
      top:0;
    }
    .complaintslist{
      li{
        height: 72px/2;
        padding: 14px/2 14px/2 14px/2 0;
        border-bottom: 1px solid @color_e2;
        display: flex;
        justify-content: flex-start;
        span:first-child{
          width:140px/2;
          font-size: 28px/2;
          padding:0 16px/2 0 42px/2;
          height: 100%;
          display: flex;
          align-items: center;
          text-align: right;
          border-right: 1px solid @color_e2;
          flex-shrink:0
        }
        .select-item{
          width:100%;
          font-size: 26px/2;
          line-height: 75px/2;
          height: 72px/2;
          padding-left: 23px/2 ;
          color: @color_666;
          border: none;
        }
        .picker-input{
          font-size: 26px/2;
          line-height: 75px/2;
          height: 72px/2;
          padding-left: 23px/2 ;
          color: @color_666;
          border: none;
          box-sizing: border-box;
        }
        picker{
          width:100%;
        }
      }
    }
    #complaintstext{
      margin: 24px/2 0 0 0;
      border: none;
      font-size: 26px/2;
      color: @color_666;
      padding:0 42px/2;
      line-height: 32px/2;
      box-sizing: border-box;
      width:750px/2;
      height: 400px/2;
    }
    textarea::-webkit-input-placeholder,
    input::-webkit-input-placeholder{
      color:@color_99;
    }
    textarea::-moz-placeholder,
    input::-moz-placeholder{
      color:@color_99;
    }
    .sumbutton{
      width: 100%;
      height: 84px/2;
      font-size: 32px/2;
      background-color: @bg_color;
      color: @color_fff;
      position: fixed;
      bottom: 0;
      line-height: 84px/2;
      text-align: center;
      border:none;
      padding:0;
      border-radius:0;
      &:disabled{
        opacity: 1;
      }
    }
    .mpvue-picker__action:last-child{
      color:@bg_color !important;
    }
</style>
