<template>
    <div >
      <div class="giftcontent">
        <!--<img class="headimg" :src="messageData.banner_pic">-->
        <img class="headimg" src="/static/img/giftshop_moren2.jpg">
        <div class="giftname">
          <!--{{messageData.name}}-->
          <div class="name">50元代金券代金券代金券代金券代金券代金券代金券代金券</div>
          <div class="count">135人已获得</div>
        </div>
        <div class="shop-info">
            <div class="icon-box">
              <img src="/static/img/zhengce.png" alt="">
            </div>
            <div class="info-box">
              <div class="company-box">
                <div class="cname">她未来母婴商城她未来母婴商城她未来母婴商城</div>
                <div class="site" @click.stop="tonewpage('','')" >公司主页</div>
              </div>
              <div class="location">陕西省西安市雁塔区凤城三路25号陕西省西安市雁塔区凤城三路25号</div>
              <div class="intro">
                简介：她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城她未来母婴商城
              </div>
            </div>
        </div>
        <div class="product-detail">
            <div class="pdt-title">
                <div class="title">产品详情</div>
                <div class="line"></div>
            </div>
            <div class="content" >

            </div>
        </div>
      </div>
      <div v-if="scrollIcon" @click="scrolltoTop" id="scrollToTop" class="footcgotop"></div>
      <div class="buybutton">
        <a @click.stop="tonewpage('','')" >立即挑战</a>
      </div>
    </div>

</template>

<script type="javascript">
  import common from '../../static/js/common'
    export default {
      name: 'giftsdetail',
      props: [],
        data(){
            return {
              nogetshow:false,
              messageData:{},
              imgdetail:[],
              pid:'',
              tabli:1,
              page:1,
              size:6,
              scrollIcon:false,
              scrollTop:0,
              soldout:false
            }
        },
      onPullDownRefresh () {
        if(this.tabli==2) {
          wx.showNavigationBarLoading() //在标题栏中显示加载
          this.page = 1;
          this.refresh();
          // 下拉刷新
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }
      },
      onReachBottom () {
        if(this.tabli==2) {
          this.page++;
          this.loadmore()
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
          async getmessage (pid){
            let thiz = this;
            let data = {
              status:3
            };
            let res = await thiz.$get('/rs/v_ticket_details/' + pid, data);
            if (res.code == 200){
              thiz.nogetshow=false;
              if(!res.rows[0].banner_pics){
                res.rows[0].banner_pic= '/static/img/default_img/moren750x366.jpg';
              } else {
                  let pics=res.rows[0].banner_pics.split(",").reverse()[0];
                if (res.rows[0].banner_pics.substr(0,4).toLowerCase()!="http"){
                  res.rows[0].banner_pic=thiz.$store.state.url + pics.split('|')[0];
                } else {
                  res.rows[0].banner_pic=pics.split('|')[0];
                }
              }
              res.rows[0].price = thiz.commons.formatPrice(res.rows[0].price);
              res.rows[0].sale_price = thiz.commons.formatPrice(res.rows[0].sale_price);
              res.rows[0].delivery_price = thiz.commons.formatPrice(res.rows[0].delivery_price);
              res.rows[0].sale_count = thiz.commons.zcount(res.rows[0].sale_count);
              let imgarr = [];
              imgarr= res.rows[0].details_pics.split(',');
              for (let b = 0;b < imgarr.length;b++){
                res.rows[0].rule_detail=thiz.$store.state.url+imgarr[b].split('|')[0];
                thiz.imgdetail.push(thiz.$store.state.url+imgarr[b].split('|')[0]);
              }
              thiz.messageData=res.rows[0];
              wx.setNavigationBarTitle({
                title: res.rows[0].name ?res.rows[0].name : '礼物详情'
              })

            }else if(res.code==602){
                thiz.nogetshow=true;
            }

          },
          loadmore () {
            this.getevalatescrolllist(this.pid);
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
        this.imgdetail=[];
        this.pid=option.goods_id;
        this.nogetshow=false;
        this.soldout=false;
        this.page=1;
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
          .ellipsis();
        }
        .intro{
          color:#999;
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
      width: 82px/2;
      height: 82px/2;
      /*background:url('../../../static/img/top.png') center no-repeat;*/
      background-size: 82px/2 82px/2;
    }
    .nogetList{
      padding-top: 197px;
      background: url("../../../static/img/konhyemain.jpg") center 29px no-repeat;
      background-size:144.5px 148px;
      width: 100%;
      height: 97px;
      color:#999;
      font-size:14px;
      text-align: center;
      margin-bottom:30px;
    }
</style>
