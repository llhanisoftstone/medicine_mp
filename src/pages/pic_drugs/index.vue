<template>
  <div class="content">
    <div class="item">
      <div class="i_title">姓名</div>
      <input type="text" placeholder="请输入患者姓名" v-model.trim="userName" :disabled="disabled">
    </div><div class="item">
      <div class="i_title">药品名称</div>
      <input type="text" placeholder="请输入药品名称" v-model.trim="medicine" :disabled="disabled">
    </div>
    <div class="item" @click="showList">
      <div class="i_title">不良反应</div>
      <i class="arrows_r" v-if="!disabled"></i>
    </div>
    <div class="modal">
      <div class="modal_item" v-if="isShow">
        <div class="check-flex">
          <checkbox-group @change="changeCheckBox">
            <div class="check-group"  v-for="(item,index) in badFeedList" :key="index">
              <checkbox class="item-group" :checked="item.checked" :value="item.name"/>
              <span>{{item.name}}</span>
            </div>
          </checkbox-group>
        </div>
      </div>
    </div>
    <div class="item" v-if="adverse_text">
      <input type="text" disabled="disabled" v-model.trim="adverse_text">
    </div>
    <div class="upload">
      <p>不良反应报告<span>（最少上传两张图片）</span></p>
      <div class="imgList">
        <div v-for="(item,idx) in picpathlist" :key="idx" class="imgItem">
          <img :src="item" alt="">
          <i @click="deleteimg(item)" v-if="!disabled"></i>
        </div>
        <div class="addPic" @click="showModal" v-if="!disabled"><img src="/static/img/add_img.png" alt=""></div>
      </div>
    </div>
    <div class="commit" @click="commit" v-if="!disabled">提交</div>
    <div id="select_IMG" class="mui-popover mui-popover-action mui-popover-bottom appcommonupload"
         v-if="show"
         catchtouchmove='true'
         @touchmove.prevent
         @click.stop="closeModel()">
      <div class="appuploadcont" v-if="show">
        <div class="sign_text">
          <ul class="send_img_content">
            <li class="camera_img_item" @click.stop="openImg('camera')">
              <div class="uploadImg">
                <input id="cameraupload" class="cameraupload" type="default" disabled="disabled" accept="image/*">
                <div class="Img imgcamera"></div>
              </div>
              <p style="font-size: 14px;line-height: 2.5;text-align: center;">打开相机</p>
            </li>
            <li class="album_img_item" @click.stop="openImg('album')">
              <div class="uploadImg">
                <input id="photoupload" class="photoupload" type="default" disabled="disabled" accept="image/*">
                <div class="Img imgphoto"></div>
              </div>
              <p style="font-size:14px;line-height: 2.5;text-align: center;">打开图库</p>
            </li>
          </ul>
        </div>
        <div class="sign_close co_ffffff" id="gdfk_shopCart_modal" @click.stop="closeModel"></div>
      </div>
    </div>
    <mptoast />
    <confirm ref="confirm"/>
  </div>
</template>

<script type="javascript">
  import mptoast from '../../components/mptoast';
  import confirm from '../../components/confirm';
  export default {
    data(){
        return {
          isShow: false,
          userName: '',
          medicine: '',
          badFeedList: [],
          show: false,
          adverse_text: '',
          picpath: [],
          picpathlist: [],
          disabled: false
        }
    },
    components: { mptoast,confirm },
    methods: {
      showList(){
        if (!this.disabled) {
          this.isShow = !this.isShow;
        }
      },
      showModal(){
        this.show = true;
      },
      closeModel(){
        this.show=false;
      },
      async showPatientPicker(){
        let res = await this.$get('/rs/event',{order:"create_time desc", status: 1})
        if(res.code==200){
          for(let i=0; i<res.rows.length; i++){
            res.rows[i].checked = false;
          }
          this.badFeedList = res.rows;
        }
      },
      openImg(type){
        let that=this;
        this.$uploadImg({
          count: 5,
          sizeType: ['original', 'compressed'],
          sourceType: [type],
        },function (rs) {
          let obj = JSON.parse(rs);
          that.picpath.push(obj[0].url);
          that.picpathlist.push(that.$store.state.url+obj[0].url);
        })
        this.show=false;
      },
      changeCheckBox(e){
        this.adverse_text = e.target.value.toString();
        for(let i=0; i<this.badFeedList.length; i++){
          if(this.adverse_text.indexOf(this.badFeedList[i].name) > -1){
            this.badFeedList[i].checked = true;
          }else{
            this.badFeedList[i].checked = false;
          }
        }
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
                  thia.picpathlist.splice(i,1);
                  thia.picpath.splice(i,1);
                }
              }
            }else {
              thia.$mptoast('删除失败');
            }
          }
        })
      },
      async commit(){
        if(!this.userName){
          this.$mptoast("请输入用户名");
          return;
        }if(!this.medicine){
          this.$mptoast("请输入药品名称");
          return;
        }
        if(!this.adverse_text){
          this.$mptoast("请选择不良反应/事件名称");
          return;
        }
        if(this.picpath.length < 2){
          this.$mptoast("请最少上传两张图片");
          return;
        }
        let data = {
          realname: this.userName,
          event_text: this.adverse_text,
          category: 2,
          progress:3,
          drugs: this.medicine,
          picpath: this.picpath.toString(),
          u_id: this.$store.state.user.userid
        }
        let res = await this.$post('/rs/bad_record',data);
        if(res.code == 200){
          wx.switchTab({
            url: '/pages/feedback/main'
          })
        }
      },
      initData(){
        this.isShow = false;
        this.userName = '';
        this.medicine = '';
        this.badFeedList = [];
        this.show = false;
        this.adverse_text = '';
        this.picpath = [];
        this.picpathlist = [];
      },
      async getUploadData(id){
        let res = await this.$get('/rs/bad_record', {id: id})
        if(res.code == 200){
          this.picpathlist = []
          this.disabled = true;
          this.userName = res.rows[0].realname;
          this.medicine = res.rows[0].drugs;
          this.adverse_text = res.rows[0].event_text;
          let picpath = res.rows[0].picpath.split(',');
          for (let i=0;i<picpath.length;i++){
            this.picpathlist.push(this.$store.state.url+picpath[i])
          }
        }
      }
    },
    onLoad: function (option) {
      this.initData();
      if(option.id){
        this.getUploadData(option.id);
      }else {
        this.disabled = false;
      }
    },
    onShow: function() {
      this.showPatientPicker()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/less/common.less';
  .content {
    padding: 16px/2 32px/2 0;
    .item {
      height: 100px/2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #D9D9D9;
      .i_title {
        width: 160px/2;
        font-size: 36px/2;
        color: #707070;
      }
      .arrows_r{
        width:16px/2;
        height:29px/2;
        background: url("../../../static/img/arrows_right.png") center center;
        background-size: 100% 100%;
      }
      input {
        flex: 1;
      }
    }
    .upload {
      font-size: 36px/2;
      color: #333333;
      margin: 50px/2 auto;
      span {
        color: #999999;
      }
      .imgList {
        .imgItem, .addPic{
          display: inline-block;
          width:196px/2;
          height:196px/2;
          text-align: center;
          line-height:194px/2;
          border-radius:6px/2;
          margin-top:28px/2;
          border:1px dashed #999999;
        }
        .imgItem{
          position: relative;
          &:not(:nth-child(3n)){
            margin-right: 40px/2;
          }
          img {
            width: 88%;
            height: 90%;
            vertical-align: middle;
          }
          i{
            width: 44px/2;
            height: 46px/2;
            background: url("../../../static/img/del.png") no-repeat center;
            background-size: 44px/2 46px/2;
            position: absolute;
            right:8px/2;
            bottom: 8px/2;
          }
        }
        .addPic{
          img {
            width: 60%;
            height: 60%;
            vertical-align: middle;
          }
        }
      }
    }
    .commit {
      height: 80px/2;
      line-height: 80px/2;
      font-size: 28px/2;
      color: #ffffff;
      text-align: center;
      border-radius: 40px/2;
      background-color: #2DC9AA;
    }
    .modal{
       .modal_item{
         margin: 0 30px/2;
         font-family: STZhongsong;
         line-height: 100px/2;
         .check-flex{
           overflow: hidden;
           .check-group{
             width: 50%;
             float: left;
           }
         }
       }
     }
    .appcommonupload {
      width:100%;
      height:100vh;
      position:absolute;
      top:0;
      left: 0;
      background-color:rgba(0,0,0,0.3);;
      z-index:200;
    }
    .appuploadcont{
      width:100%;
      height:264/2px;
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
      margin-top: 32/2px;
      .camera_img_item,.album_img_item{
        .uploadImg {
          width: 220/2px;
          height: 158/2px;
          text-align: center;
          line-height: 158/2px;
          border: 1px solid #D9D9D9;
          border-radius: 8/2px;
          input{
            display:inline-block;
            width:60/2px;
            height:55/2px;
            vertical-align: middle;
            background-size:100% 100%!important;
          }
        }
      }
      .cameraupload{
        background:url("../../../static/img/album.png") no-repeat center center;
      }
      .photoupload{
        background:url("../../../static/img/album.png") no-repeat center center;
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

  }
</style>
