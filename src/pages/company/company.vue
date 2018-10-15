<template>
    <div >
      <div class="gallaryslider">
        <image src="/static/img/logo_moren.jpg"></image>
      </div>
      <!--培训学习-->
      <div class="study_box">
        <div class="titie_box">
          <div class="icon_box">
            <div class="stydy_icon"></div>
            <div class="title">政策补贴</div>
          </div>
        </div>
        <ul class="category_box">
          <li>
            <image src="/static/img/company/zhidu.png"></image>
            <p>公司制度</p>
          </li>
          <li>
            <image src="/static/img/company/zhidu.png"></image>
            <p>公司制度</p>
          </li>
          <li>
            <image src="/static/img/company/zhidu.png"></image>
            <p>公司制度</p>
          </li>
          <li>
            <image src="/static/img/company/zhidu.png"></image>
            <p>公司制度</p>
          </li>
          <li>
            <image src="/static/img/company/zhidu.png"></image>
            <p>公司制度</p>
          </li>
        </ul>
      </div>
      <!--通知公告-->
      <div class="notice-box">

      </div>
      <!--员工福利-->
      <div class="gift-box">

      </div>
    </div>
</template>

<script type="javascript">
  import common from '../../static/js/common'

    export default {
      name: 'companyindex',
        data(){
            return {

            }
        },
      methods: {
          showimg(img,imglist){
            wx.previewImage({
              current: img||"", // 当前显示图片的http链接
              urls: imglist // 需要预览的图片http链接列表
            })
          },
          tonewpage(urlname,data){
            wx.navigateTo({
              url:`/pages/${urlname}/main?${data}`
            })
          },
          async listdata (pid){
            let thiz = this;
            let data = {

            };
            let res = await thiz.$get('/rs//' + pid, data);
            if (res.code == 200){

            }else if(res.code==602){

            }
          },
          topic(pic,moren){
            let thiz=this;
            if(!pic||pic=="undefined"||pic==null){
              return '/static/img/default_img/'+moren;
            } else {
              if (pic.substr(0,4).toLowerCase()!="http" ||pic.substr(0,4).toLowerCase()!="https" ){
                return thiz.$store.state.url + pic;
              } else {
                return thiz;
              }
            }
          },
          scrolltoTop(){
            if (wx.pageScrollTo) {
              wx.pageScrollTo({
                scrollTop: 0
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
              })
            }
          },
        },
      mounted(){

      },
      onLoad: function (option) {
        try {
          let res = wx.getSystemInfoSync();
          console.log(res)
          if(res.model.match(/iPhone X/ig)){

          }else{

          }
        } catch (e) {

        }
        //this.watchsocket()
      },
      onShow(){
//        this.watchsocket()
      },
      onHide(){
//        this.scrollIcon=false
//        this.$socket.removeAllListeners('data_chain')
      },
//      onPageScroll:function(res){
//        let top = res.scrollTop;
//        if (top > 400) {
//          this.scrollIcon = true;
//        } else {
//          this.scrollIcon = false;
//        }
//      },

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    div,p,ul,li,input{
      box-sizing:border-box;
    }
    image{
      vertical-align: bottom;
    }
    .ellipsis(@count:1){
      display: -webkit-box;
      -webkit-line-clamp: @count;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .gallaryslider{
      image{
        width:100%;
        height:342px/2;
        vertical-align: bottom;
      }
    }
    .titie_box{
      display:flex;
      justify-content: space-between;
      padding:22px/2 26px/2 28px/2;
      .icon_box{
        display:flex;
        align-items: center;
      }
      .title{
        font-size: 30px/2;
        color:#333333;
        padding-left:12px/2;
      }
    }
    .study_box{
      border-top: 10px/2 solid #f6f6f6;
      .stydy_icon{
        width:31px/2;
        height:31px/2;
        background: #fff url(../../../static/img/company/peixun.png) no-repeat center;
        background-size: 31px/2 31px/2;
      }
      .category_box{
        padding:0 52px/2 35px/2;
        width:100%;
        display:flex;
        flex-wrap:wrap;
        li{
          width:105px/2;
          text-align: center;
          margin-right: 75px/2;
          margin-bottom: 38px/2;
          &:nth-child(4n){
            margin-right:0;
          }
          image{
            width:90px/2;
            height:90px/2;
          }
          p{
            text-align: center;
            font-size: 26px/2;
            color:#666666;
            margin-top: 10px/2;
          }
        }
      }
    }

    .footcgotop{
      position: fixed;
      z-index: 100;
      bottom: 130px/2;
      right: 30px/2;
      width: 80px/2;
      height: 80px/2;
      background:url('../../../static/img/scrollTop.png') center no-repeat;
      background-size: 80px/2 80px/2;
    }
    .nogetList{
      padding-top: 630/2px;
      background: url("../../../static/img/konhyemain.jpg") center 250/2px no-repeat;
      background-size:144.5px 148px;
      width: 100%;
      color:#999;
      font-size:14px;
      text-align: center;
      margin-bottom:30px;
      box-sizing:border-box;
      height:594/2px;
    }
</style>
