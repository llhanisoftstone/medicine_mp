<template>
    <div >
      <div class="giftcontent" v-if="exist">
        <img class="headimg" :src="messageData.picurl">
        <div class="giftname">
          <div class="name">{{messageData.name}}</div>
          <div class="count">{{messageData.count}}人已获得</div>
        </div>
        <div class="shop-info">
            <div class="icon-box">
              <img :src="messageData.store_picpath" alt="">
            </div>
            <div class="info-box">
              <div class="company-box">
                <div class="cname">{{messageData.store_name}}</div>
                <div class="site" @click.stop="tonewpage('shop','pid='+messageData.store_id)" >公司主页</div>
              </div>
              <div class="location">{{messageData.province_name||""}}{{messageData.city_name||""}}{{messageData.area_name||""}}{{messageData.store_address||""}}&nbsp;</div>
              <div class="intro">
                简介：{{messageData.store_details}}
              </div>
            </div>
        </div>
        <div class="product-detail">
            <div class="pdt-title">
                <div class="title">产品详情</div>
                <div class="line"></div>
            </div>
            <div class="content" v-html="messageData.details">

            </div>
        </div>
      </div>
      <div v-if="scrollIcon" @click.stop="scrolltoTop" id="scrollToTop" class="footcgotop"></div>
      <div class="nogetList" v-if="nogetshow">暂无内容</div>
      <div class="buybutton">
        <a v-if="exist" @click="reward(game_cfg_id)" >立即挑战</a>
      </div>
    </div>
</template>

<script type="javascript">
  import common from '../../static/js/common'
  import userinfo from '../../components/userinfo'
    export default {
      name: 'giftsdetail',
      props: [],
        data(){
            return {
              nogetshow:false,
              messageData:{},
              imgdetail:[],
              pid:'',
              shopid:'',
              scrollIcon:false,
              scrollTop:0,
              exist:false, //优惠券信息是否存在
              game_cfg_id:'',
              r_id:0,
            }
        },
      onPullDownRefresh () {
          wx.showNavigationBarLoading() //在标题栏中显示加载
          this.refresh();
          // 下拉刷新
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
      },
      onReachBottom () {

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
          reward(r_id){
            r_id=parseInt(r_id)
            this.r_id=r_id
            this.$socket.emit('data_chain',{
              cmd:'fight',
              u_id: this.$store.state.user.userid,
              game_cfg_id: r_id,
              game_type:1,
              level:1
            })
          },
          watchsocket(){
            let that=this
            that.$socket.removeAllListeners('data_chain')
            that.$socket.on('data_chain',d=>{
              if(d.cmd == 'answer'&&d.step == 1){
                that.$socket.removeAllListeners('data_chain')
                that.$store.commit('get_answer',d.details[0])
                that.$store.commit('get_step',d.step)
                that.$store.commit('get_level',1)
                that.$store.commit('get_room',d.room_id)
                that.$store.commit('get_max_nub',d.max_step)
                wx.navigateTo({
                  url:`/pages/alone/main?id=${that.r_id}`
                })
              }
            })
          },
          async getmessage (pid){
            let thiz = this;
            let data = {
              status:'<>,99'
            };
            let res = await thiz.$get('/rs/v_ticket_details/' + pid, data);
//            let res = await thiz.$get('/rs/v_ticket_details');
            if (res.code == 200){
              thiz.exist=true;
              thiz.nogetshow=false;
              if(!res.rows[0].picurl){
                res.rows[0].picurl= '/static/img/giftshop_moren2.jpg';
              } else {
                let picUrl=res.rows[0].picurl;
                if (picUrl.substr(0,4).toLowerCase()!="http" || picUrl.substr(0,5).toLowerCase()!="https"){
                  res.rows[0].picurl=thiz.$store.state.url + picUrl;
                }
              }
              if(!res.rows[0].store_picpath){
                res.rows[0].store_picpath= '/static/img/logo_moren.jpg';
              } else {
                let storeUrl=res.rows[0].store_picpath;
                if (storeUrl.substr(0,4).toLowerCase()!="http" || storeUrl.substr(0,5).toLowerCase()!="https"){
                  res.rows[0].store_picpath=thiz.$store.state.url + storeUrl;
                }
              }
              res.rows[0].count = thiz.commons.zcount(res.rows[0].count);
              let Details=res.rows[0].details;
              if (Details){
                let aimurl = this.$store.state.url+"/upload/ueeditor";
                Details=Details.replace(/\/upload\/ueeditor/g, aimurl);
                Details=Details.replace(/\<img/gi, '<img style="width:100%;max-width:100%;height:auto" ');
                res.rows[0].details=Details;
              }else{
                  this.nogetshow=true;
              }
              thiz.shopid=res.rows[0].store_id;
              thiz.messageData=res.rows[0];
              wx.setNavigationBarTitle({
                title: res.rows[0].name ?res.rows[0].name : '礼物详情'
              })
            }else if(res.code==602){
                thiz.exist=false;
                thiz.nogetshow=true;
            }
          },
          loadmore () {

          },
          refresh(){
            this.getmessage(this.pid);
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
        this.getmessage(this.pid);
      },
      onLoad: function (option) {
        this.messageData=[];
        this.pid=option.tid;//优惠券id
        this.game_cfg_id=option.vid;//挑战id
        this.nogetshow=false;
        this.exist=false;
        this.watchsocket()
      },
      onShow(){
        this.watchsocket()
      },
      onHide(){
        this.$socket.removeAllListeners('data_chain')
      },
      onPageScroll:function(res){
        let top = res.scrollTop;
        if (top > 400) {
          this.scrollIcon = true;
        } else {
          this.scrollIcon = false;
        }
      },
        components: {

        }

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .ellipsis(@count:1){
      display: -webkit-box;
      -webkit-line-clamp: @count;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .giftcontent{
      padding-bottom: 88/2px;
      .headimg{
        width:100%;
        height:366px/2;
        vertical-align: bottom;
      }
      .giftname{
        width:100%;
        box-sizing: border-box;
        height:100px/2;
        display:flex;
        justify-content: space-between;
        color:#333;
        padding:0 28px/2;
        border-bottom:1px solid #e2e2e2;
        .name{
          font-size: 35px/2;
          height:100px/2;
          line-height:100px/2;
          max-width: 70%;
          word-break:break-all;
          .ellipsis();
        }
        .count{
          font-size: 24px/2;
          height:100px/2;
          line-height:100px/2;
          max-width: 30%;
          overflow: hidden;
        }
      }
      .shop-info{
        width:100%;
        box-sizing: border-box;
        padding:13px/2 28px/2 28px/2 47px/2;
        display:flex;
        color:#666;
        font-size: 24px/2;
        background-color: #fff;
        .icon-box{
          font-size: 0;
          box-sizing: border-box;
          img{
            width:85px/2;
            height:85px/2;
            border-radius: 5px/2;
            vertical-align: bottom;
          }
        }
        .info-box{
          box-sizing: border-box;
          padding-left:19px/2;
          width:100%;
        }
        .company-box{
          box-sizing: border-box;
          width:100%;
          display:flex;
          justify-content: space-between;
          margin-top: 6px/2;
          .cname{
            font-size: 35px/2;
            height:36px/2;
            line-height: 36px/2;
            color:#333;
            font-weight: bold;
            width:70%;
            word-break:break-all;
            .ellipsis();
          }
          .site{
            font-size: 26px/2;
            color:#df5c3e;
            height:36px/2;
            line-height: 36px/2;
            padding-right: 27px/2;
            background:url(../../../static/img/right-icon.png) no-repeat right center;
            background-size: 12px/2 21px/2;
          }
        }
        .location{
          margin:12px/2 0 22px/2;
          word-break:break-all;
          .ellipsis(2);
        }
        .intro{
          color:#999;
          word-break:break-all;
          .ellipsis(3);
        }
      }
      .product-detail{
        .pdt-title{
          height:80px/2;
          width:100%;
          box-sizing: border-box;
          background-color: #F2F2F2;
          .title{
            width:152px/2;
            height:80px/2;
            line-height:80px/2;
            text-align: center;
            margin:0 auto;
            font-weight: bold;
            font-size: 35px/2;
            background-color: #F2F2F2;
            position:relative;
            color:#666;
            z-index: 10;
          }
         .line{
           position:relative;
           top:0;
           width:366px/2;
           margin:0 auto;
           &:after{
             content:'';
             display:block;
             height:1px;
             width:100%;
             border:0;
             background-color: #666;
             position:absolute;
             top:-40px/2;
           }

          }
        }
        .content{
          box-sizing: border-box;
          width:100%;
          background-color: #fff;
          word-break:break-all;
          img{
            width:100%!important;
            height:auto!important;
            vertical-align: bottom;
          }
          p{
            color:#333;
            margin-bottom: 0;
            word-break:break-all;
          }
        }
      }
    }
    .buybutton{
      width:100%;
      height:88px/2;
      background-color: #fff;
      position:fixed;
      bottom:0;
      text-align: center;
      a{
        display:block;
        width:538px/2;
        height:70px/2;
        line-height:70px/2;
        margin:5px/2 auto 0;
        border-radius: 40px/2;
        color:#fff;
        font-size: 30px/2;
        background-color: #df5c3e;
      }
    }
    .footcgotop{
      position: fixed;
      z-index: 100;
      bottom: 100px/2;
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
