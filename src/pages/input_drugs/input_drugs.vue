<template>
  <div class="container">
    <div class="item">
      <div class="title">商品名称</div>
      <input type="text" v-if="d_id" disabled="disabled" v-model='title' maxlength="20" confirm-type="next" placeholder="请输入商品名称"/>
      <input type="text" v-else="" v-model='title' maxlength="20" confirm-type="next" placeholder="请输入商品名称"/>
    </div>
    <div class="item">
      <div class="title" v-if="d_id">通用名称</div>
      <div class="i_title" v-else=""><span>*</span>通用名称</div>
      <input type="text" v-if="d_id" disabled="disabled" v-model='common_name' maxlength="20" confirm-type="next"  placeholder="请输入通用名称"/>
      <input type="text" v-else="" v-model='common_name' maxlength="20" confirm-type="next"  placeholder="请输入通用名称"/>
    </div>
    <div class="item">
      <div class="title" v-if="d_id">生产厂家</div>
      <div class="i_title" v-else=""><span>*</span>生产厂家</div>
      <input type="text" v-if="d_id" disabled="disabled" v-model='company_name' maxlength="30" confirm-type="next"  placeholder="请输入生产厂家"/>
      <input type="text" v-else="" v-model='company_name' maxlength="30" confirm-type="next"  placeholder="请输入生产厂家"/>
    </div>
    <div class="item">
      <div class="i_title"><span>*</span>开始时间</div>
      <picker mode="date" :start="init_start_time" :end="init_end_time" @change="bindstartDateChange">
        <input type="text" disabled="disabled" placeholder="请选择用药开始时间" v-model.trim="start_time">
        <i class="arrows_r"></i>
      </picker>
    </div>
    <div class="item">
      <div class="i_title"><span>*</span>结束时间</div>
      <picker mode="date" :start="init_start_time" :end="init_end_time" @change="bindendDateChange">
        <input type="text" disabled="disabled" placeholder="请选择用药结束时间" v-model.trim="end_time">
        <i class="arrows_r"></i>
      </picker>
    </div>
    <div class="item">
      <div class="title">药品类型</div>
      <div class="flex">
        <radio-group class="flex-group" @change="changeRadio">
          <label v-for="(item, inx) in drugs_type" v-bind:key="inx"><radio :value="item.value" :checked="item.checked"/>{{item.text}}</label>
        </radio-group>
      </div>
    </div>
    <div class="item">
      <div class="title">用法用量</div>
      <input type="text" v-model='usage_dosage' maxlength="100" confirm-type="next"  placeholder="请输入用法用量"/>
    </div>
    <div class="item">
      <div class="title">生产批号</div>
      <input type="text" v-model='batch_number' maxlength="20" confirm-type="next"  placeholder="请输入生产批号"/>
    </div>
    <div class="item">
      <div class="title">药品图片<span>&emsp;请上传药品说明书或药品包装图片</span></div>
    </div>
    <div class="up">
      <div class="imgk" v-model="photo" v-for="(limg,index) in picpathlist" :key="index">
        <image :src="limg" alt=""></image>
        <i @click="deleteimg(limg)"></i>
      </div>
      <span class="upimg"  @click="showModel()" v-if="imgbox"></span>
    </div>
    <div class="savedata" @click.stop="savedrugs()">保存</div>
    <div id="select_IMG" class="mui-popover mui-popover-action mui-popover-bottom appcommonupload"
         v-if="show"
         catchtouchmove='true'
         @touchmove.prevent
         @click.stop="closeModel()">
      <div class="appuploadcont" v-if="show">
        <div class="sign_text">
          <ul class="send_img_content">
            <li class="camera_img_item" @click.stop="openImg('camera')">
              <input id="cameraupload" class="cameraupload" type="default" disabled="disabled" accept="image/*">
              <div class="Img imgcamera"></div>
              <span style="font-size: 14px;line-height: 0.72533rem;" class="co_999999">打开相机</span>
            </li>
            <li class="album_img_item" @click.stop="openImg('album')">
              <input id="photoupload" class="photoupload" type="default" disabled="disabled" accept="image/*">
              <div class="Img imgphoto"></div>
              <span style="font-size:14px;line-height: 0.72533rem;" class="co_999999">打开图库</span>
            </li>
          </ul>
        </div>
        <div class="sign_close co_ffffff" id="gdfk_shopCart_modal" @click.stop="closeModel"></div>
      </div>
    </div>
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
        b_id: '',   //不良记录id
        d_id: '',    //药品id
        g_id: '',     //关联表id
        title: '',
        operation: 'add',
        common_name: '',
        company_name: '',
        batch_number: '',
        init_start_time: '2000-01-01',
        init_end_time: '',
        start_time: '',
        end_time: '',
        usage_dosage: '',
        type: 1,
        drugs_type: [{value: 1, text: '疑似药品', checked: true},{value: 2, text: '并用药品', checked: false}],
        picpathlist: [],
        pic_path: [],
        photo: '',
        index: 0,
        imgbox: true,
        show: false,
        isClick: false
      }
    },
    methods: {
      async getDrugs(){
        let that = this;
        if(that.g_id){
          let res = await this.$get('/rs/drugs_bads/'+this.g_id);
          if(res.code == 200){
            that.title = res.rows[0].title
            that.type = res.rows[0].type
            for(let i=0; i<this.drugs_type.length; i++){
              if(res.rows[0].type == this.drugs_type[i].value){
                this.drugs_type[i].checked = true
              }else{
                this.drugs_type[i].checked = false;
              }
            }
            that.common_name = res.rows[0].common_name
            that.company_name = res.rows[0].company_name
            that.start_time = res.rows[0].start_time.substring(0, 10)
            that.end_time = res.rows[0].end_time.substring(0, 10)
            that.usage_dosage = res.rows[0].usage_dosage
            that.batch_number = res.rows[0].batch_number
            that.pic_path = res.rows[0].picpath.split(',')
            if(that.pic_path.length > 0){
              let arr = [];
              for(let i=0; i<that.pic_path.length; i++){
                arr.push(that.$store.state.url+that.pic_path[i])
              }
            }
          }
        }else{
          let res = await this.$get('/rs/drugs/'+this.d_id);
          if(res.code == 200){
            that.title = res.rows[0].title
            that.type = res.rows[0].type
            that.common_name = res.rows[0].common_name
            that.company_name = res.rows[0].comp_name
            that.usage_dosage = res.rows[0].usage_dosage
            that.pic_path = res.rows[0].picpath.split(',')
            if(that.pic_path.length > 0){
              let arr = [];
              for(let i=0; i<that.pic_path.length; i++){
                arr.push(that.$store.state.url+that.pic_path[i])
              }
            }
          }
        }
      },
      bindstartDateChange(e) {
        this.start_time=e.target.value
      },
      bindendDateChange(e) {
        this.end_time=e.target.value
      },
      changeRadio(e){
        this.type = e.target.value;
        for(let i=0; i<this.drugs_type.length; i++){
          if(this.drugs_type[i].value == e.target.value){
            this.drugs_type[i].checked = true;
          }else{
            this.drugs_type[i].checked = false;
          }
        }
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
      openImg(){
        let that=this;
        this.$uploadImg({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
        },function (rs) {
          let obj = JSON.parse(rs);
          that.shop_logo=obj[0].url;
        })
      },
      showModel(){
        if(!this.d_id){
          this.show=true
        }
      },
      closeModel(){
        this.show=false;
      },
      openImg(type){
        let that=this;
        this.$uploadImg({
          count: 5,
          sizeType: ['original', 'compressed'],
          sourceType: [type],
        },function (rs) {
          let obj = JSON.parse(rs);
          if(that.index<3){
            that.index=parseFloat(that.index)+1;
            that.pic_path.push(obj[0].url);
            that.picpathlist.push(that.$store.state.url+obj[0].url)
            if(that.picpathlist.length>=3){
              that.imgbox=false;
            }
          }

        })
        this.show=false;
      },
      deleteimg(img){
        let thia=this;
        this.$refs.confirm.show({
          title: '提示',
          content: '确认删除吗？',
          confirmText: '确定',
          confirmColor: '#2dc9aa',
          mask: true,
          success: function(res) {
            if (res.confirm) {
              for(let i=0;i<thia.picpathlist.length;i++){
                if(thia.picpathlist[i]==img){
                  thia.index=thia.index-1;
                  thia.picpathlist.splice(i,1);
                  thia.pic_path.splice(i,1);
                  if(thia.picpathlist.length>=3){
                    thia.imgbox=false;
                  }else{
                    thia.imgbox=true;
                  }
                }
              }
            } else if (res.cancel) {

            }
          }
        })
      },
      cleardata(){
        this.d_id = ''
        this.b_id = ''
        this.g_id = ''
        this.operation = 'add'
        this.title = ''
        this.common_name = ''
        this.company_name = ''
        this.batch_number = ''
        this.usage_dosage = ''
        this.start_time = ''
        this.end_time = ''
        this.type = 1
        this.picpathlist = []
        this.pic_path = []
        this.photo = ''
        this.index = 0
        this.imgbox = true
        this.show = false
        this.isClick = false
      },
      async savedrugs(){
        let that = this;
        if(this.isClick){
          return
        }
        if(this.start_time == ''){
          this.$mptoast("请选择用药开始时间");
          return
        }
        if(this.end_time == ''){
          this.$mptoast("请选择用药结束时间");
          return
        }
        if(this.end_time < this.start_time){
          this.$mptoast("结束时间不能小于开始时间");
          return
        }
        if(this.operation == 'add'){  //新增
          if(this.b_id){  //已有不良反馈记录
            if(this.d_id){ //已有药品
              let data = {
                b_id: this.b_id,
                d_id: this.d_id,
                type: this.type,
                batch_number: this.batch_number,
                usage_dosage: this.usage_dosage,
                start_time: this.start_time,
                end_time: this.end_time
              }
              this.isClick = true
              let res = await this.$post('/rs/drugs_bads', data);
              if(res.code == 200){
                that.$mptoast("保存成功!");
                setTimeout(function() {
                  that.cleardata();
                  wx.navigateBack({
                    delta: 2
                  })
                },1000);
              }
            }else{        //新增药品
              if(this.common_name == ''){
                this.$mptoast("请输入药品通用名称");
                return
              }
              if(this.company_name == ''){
                this.$mptoast("请输入药品生产厂家");
                return
              }
              let data = {
                category: 1,
                b_id: this.b_id,
                type: this.type,
                title: this.title,
                common_name: this.common_name,
                company_name: this.company_name,
                picpath: this.pic_path.toString(),
                batch_number: this.batch_number,
                usage_dosage: this.usage_dosage,
                start_time: this.start_time,
                end_time: this.end_time
              }
              let res = await this.$post('/rs/drugs_bads', data);
              if(res.code == 200){
                that.$mptoast("保存成功!");
                setTimeout(function() {
                  that.cleardata();
                  wx.navigateBack({
                    delta: 2
                  })
                },1000);
              }
            }
          }else{          //无不良反馈记录
            if(this.d_id){
              let data = {
                d_id: this.d_id,
                type: this.type,
                category: 3,
                batch_number: this.batch_number,
                usage_dosage: this.usage_dosage,
                start_time: this.start_time,
                end_time: this.end_time
              }
              this.isClick = true
              let res = await this.$post('/rs/drugs_bads', data);
              if(res.code == 200){
                that.$mptoast("保存成功!");
                setTimeout(function() {
                  that.cleardata();
                  let data = 'pid='+res.b_id
                  wx.navigateTo({
                    url:`/pages/drugs/main?${data}`
                  })
                },1000);
              }
            }else{
              if(this.common_name == ''){
                this.$mptoast("请输入药品通用名称");
                return
              }
              if(this.company_name == ''){
                this.$mptoast("请输入药品生产厂家");
                return
              }
              let data = {
                category: 2,
                type: this.type,
                title: this.title,
                common_name: this.common_name,
                company_name: this.company_name,
                picpath: this.pic_path.toString(),
                batch_number: this.batch_number,
                usage_dosage: this.usage_dosage,
                start_time: this.start_time,
                end_time: this.end_time
              }
              let res = await this.$post('/rs/drugs_bads', data);
              if(res.code == 200){
                that.$mptoast("保存成功!");
                setTimeout(function() {
                  that.cleardata();
                  let data = 'pid='+res.b_id
                  wx.navigateTo({
                    url:`/pages/drugs/main?${data}`
                  })
                },1000);
              }
            }
          }
        }else{                        //编辑
          this.isClick = true
          let res = await this.$put('/rs/drugs_bads/'+this.g_id, {type: this.type, batch_number: this.batch_number, usage_dosage: this.usage_dosage, start_time: this.start_time, end_time: this.end_time});
          if(res.code == 200){
            that.$mptoast("保存成功!");
            setTimeout(function() {
              wx.navigateBack()
            },1000);
          }
        }
      }
    },
    mounted(){

    },
    onLoad: function (option) {
      this.d_id = option.d_id || ''
      this.b_id = option.b_id || ''
      this.g_id = option.g_id || ''
      this.operation = 'add'
      this.title = ''
      this.common_name = ''
      this.company_name = ''
      this.batch_number = ''
      this.start_time = ''
      this.end_time = ''
      this.type = 1
      this.usage_dosage = ''
      this.picpathlist = []
      this.pic_path = []
      this.photo = ''
      this.index = 0
      this.imgbox = true
      this.show = false
      if(option.operation){
        this.operation = option.operation
      }
    },
    onShow(){
      this.init_end_time = this.formatData(new Date());
      this.isClick = false
      if(this.g_id || this.d_id){
        this.getDrugs()
      }
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
      margin-right: 30px/2;
      font-size: 30px/2;
      color: #4d4d4d;
    }
    .marleft{
      margin-left: 50px/2;
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
  .item input{
    color: #1a1a1a;
    height: 100px/2;
    font-size: 36px/2;
    line-height: 100px/2;
    font-family: STZhongsong;
  }
  .savedata{
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
  .up{
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-left: 50px/2;
    margin-bottom: 50px/2;
    box-sizing:border-box;
    .imgk{
      width:217px/2;
      height:217px/2;
      border-radius:5px/2;
      margin-top:27px/2;
      margin-right:26px/2;
      position: relative;
      float:left;
      image{
        width: 100%;
        height: 100%;
        border-radius:10px/2;
      }
      i{
        width: 44px/2;
        height: 46px/2;
        background: url("../../../static/img/del.png") no-repeat center;
        background-size: 44px/2 46px/2;
        display: block;
        position: absolute;
        right:8px/2;
        bottom: 8px/2;
      }
    }
    .imgk:nth-child(3){
      margin-right:0;
    }
    span{
      display: inline-block;
      box-sizing:border-box;
      border:1px solid #e2e2e2;
      background: url(../../../static/img/add_img.png) center no-repeat;
      background-size:56px/2 56px/2;
      width:217px/2;
      height:217px/2;
      border-radius:10px/2;
      margin-top:28px/2;
      float:left;
      position: relative;

    }
  }
  .appcommonupload {
    width:100%;
    height:100vh;
    position:absolute;
    top:0;
    bottom: 0;
    background-color:rgba(0,0,0,0.3);;
    z-index:200;
  }
  .appuploadcont{
    width:100%;
    height:200/2px;
    position:fixed;
    bottom:0;
    color:#666666;
    background:#f6f6f6;
    z-index:110;
  }
  .send_img_content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 20/2px;
    .camera_img_item{
      input{
        display:block;
        width:90/2px;
        height:90/2px;
        margin:0.2rem auto 0;
        background-size:100% 100%!important;
      }
      .cameraupload{
        background:url("../../../static/img/dakai_08.png") no-repeat center center;
      }
    }
    .album_img_item{
      input{
        display:block;
        width:90/2px;
        height:90/2px;
        margin:0.2rem auto 0;
        background-size:100% 100%!important;
      }
      .photoupload{
        background:url("../../../static/img/dakai_09.png") no-repeat center center;
      }
    }
  }
  .sign_close{
    display:block;
    width:30/2px;
    height:30/2px;
    position:absolute;
    top:20/2px;
    right:20/2px;
    background:url("../../../static/img/close_03.png") no-repeat center center;
    background-size: 100% 100%;
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
