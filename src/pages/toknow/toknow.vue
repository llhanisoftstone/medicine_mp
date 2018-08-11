<template>
    <div class="container">
      <form id="complaintsfrom">
        <ul class="complaintslist">
          <li data-type="1" v-if="!isjy">
            <span>咨询分类</span>
            <input class="select-item" @click="showwishPicker" :value="pickerwishText" disabled="disabled" placeholder="请选择咨询分类" confirm-type="next">
          </li>
          <li data-type="2" >
            <span>姓名</span>
            <input type="text" class="select-item" v-model='realname' maxlength="10"  placeholder="请输入姓名"/>
          </li>
          <li data-type="3" >
            <span>手机号</span>
            <input class="select-item" type="number" v-model='userphone' maxlength="11"  placeholder="请输入手机号" />
          </li>
        </ul>
        <textarea id="complaintstext" v-model="detail" :show-confirm-bar="false" :placeholder="text" maxlength="200"></textarea>
        <!--<div class="up" id="imgUpload" >-->
          <!--<span class="upimg"><p>上传照片</p></span>-->
        <!--</div>-->
      </form>
      <mpvue-picker
        ref="mpvuePicker" @pickerCancel="pickerCancel"
        :pickerValueArray="pickerValueArray"
        :pickerValueDefault='pickerValueDefault'
        :mode="mode"
        @onConfirm="onConfirm" >
      </mpvue-picker>
      <button type="button" class="sumbutton" id="submit_button" @click="submitData">提交</button>
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
              realname:'',
              userphone:'',
              detail:'',
              pickerValueArray:[],
              pickerValueDefault:[0],
              wishidlist:'',
              pickerwishText:'',
              wish_id:'',
              select:'',
              isBtnClicked:false,
            }
        },
        methods: {
            async getWishCate(){
              let that = this;
              //let res = await this.$get('/rs/wish_category');
//              if (res.code == 200){
//
//              }
            },
          showwishPicker() {
            var than=this;
            this.$get('/rs/wish_category').then(res=>{
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
                this.$refs.mpvuePicker.show();
              }
            });
          },
          onConfirm(e){
            if(this.select==1){
              this.pickerwishText = this.pickerValueArray[e[0]];
              for(var i=0;i<this.wishidlist.length;i++){
                if(this.pickerwishText==this.wishidlist[i].name){
                  this.wish_id=this.wishidlist[i].id;
                }
              }
            }
          },
          submitData(){
            if(!this.isBtnClicked){
                  return;
            }
            this.isBtnClicked = false;
            if((this.wish_id=="" || this.wish_id==null)&&!this.isjy){
              this.$mptoast('请选择咨询分类');
              return;
            }
            if((this.realname=="" || this.realname==null)&&!this.isjy){
              this.$mptoast('请输入姓名');
              return;
            }
            if((this.userphone=="" || this.userphone==null)&&!this.isjy){
              this.$mptoast('请输入手机号');
              return;
            }
            if(this.detail=="" || this.detail==null){
              this.$mptoast('请输入内容');
              return;
            }
            var data={
              //u_id:this.$store.state.user.userid,
              username:this.realname,
              phone:this.userphone,
              details:this.detail,
            };
            let url='/rs/wish_to_known';
            if (!this.isjy){
                data.category=this.wish_id;
            }else{
              url='/rs/suggest';
            }
            this.$post(url,data).then(res=>{
              if(res.code == 200){
                this.$mptoast('保存成功',100);
                setTimeout(function () {
                    wx.navigateBack({     //返回上一页面或多级页面
                      delta: 1
                    })
                }, 1500);
              }else{
                this.$mptoast('保存失败',100);
              }
            })
          },

        },
      onLoad: function (option) {
        this.isjy = option.isjy||false;
        if(this.isjy){
          this.text='请简单描述您想要建议的内容（200字以内）';
          wx.setNavigationBarTitle({
            title: '我要建议'
          })
        }
      },
      onShow(){
        this.isBtnClicked=true;
        this.realname='',
          this.userphone='',
          this.detail='',
          this.pickerwishText='',
          this.wish_id=''
      },

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .complaintslist{
      li{
        height: 72px/2;
        padding: 14px/2 14px/2 14px/2 0;
        border-bottom: 1px solid @color_e2;
        position: relative;
        display: flex;
        align-items: center;
        span:first-child{
          width:170px/2;
          font-size: 28px/2;
          padding:0 16px/2 0 42px/2;
          height: 100%;
          display: flex;
          align-items: center;
          text-align: right;
          border-right: 1px solid @color_e2;
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
      height: 240px/2;
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
