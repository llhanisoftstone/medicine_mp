<template>
    <div >
      <div class="gallaryslider">
        <swiper
          class="swiper-box"
          @change="bannerChange"
          :autoplay="true"
          :interval="3000"
          :circular="true"
          :indicator-dots="false">
          <block
            :key="idx"
            v-for="(item,idx) in banner">
            <swiper-item>
              <a
                @click.stop="tonewpage(item.urlpath,'')">
                <image :src="item.picpath"></image>
              </a>
            </swiper-item>
          </block>
        </swiper>
        <view class="dots">
          <block :key="banneridx"
                 v-for="(item,banneridx) in banner">
            <view
              :class="{'dot':true,'active':currentSwiper==banneridx}"
            ></view>
          </block>
        </view>
      </div>
      <!--培训学习-->
      <div
        v-for="(column,colidx) in column_item"
        :key="colidx"
        class="study_box">
        <div class="titie_box">
          <div class="icon_box">
              <image
                class="study_icon"
                :src="imgURL+column.c_icon_path"></image>
            <div class="title">{{column.c_name}}</div>
          </div>
        </div>
        <ul class="category_box">
          <li
            v-for="(citem,cidx) in column.child"
            :key="citem.id"
            @click.stop="tonewpage('pkselect','')">
            <image :src="imgURL+citem.icon_path"></image>
            <p>{{citem.name}}</p>
          </li>
        </ul>
      </div>

      <!--通知公告-->
      <div class="notice_box">
        <div class="titie_box">
          <div class="icon_box">
            <div class="notice_icon"></div>
            <div class="title">通知公告</div>
          </div>
          <div
            @click.stop="tonewpage('noticelist')"
            class="more">更多<span>&gt;</span></div>
        </div>
        <ul class="notice_msg">
          <li
            v-for="(notice,nidx) in noticeArray"
            :key="nidx"
            @click.stop="tonewpage('noticedetail','pid='+notice.id)">
            <div class="left_item">{{notice.name}}</div>
            <div class="right_item"></div>
          </li>
        </ul>
      </div>
      <!--员工福利-->
      <div class="gift_box">
        <div class="titie_box">
          <div class="icon_box">
            <div class="gift_icon"></div>
            <div class="title">员工福利</div>
          </div>
          <div
            @click.stop="tonewpage('giftlist')"
            class="more">更多<span>&gt;</span></div>
        </div>
        <ul class="gift_list">
          <li  v-for="(v,i) in win_treasure" >
            <main @click.stop="tonewpage('giftsdetail','tid='+v.tickt_id+'&vid='+v.id)">
              <div class="itemheadk">
                <div>
                  <image :src="v.piclogo"></image>
                  <div class="itemmodel">查看详情&gt;</div>
                </div>
              </div>
              <h3>{{v.ticket_name}}</h3>
            </main>
            <div class="btn_box">
              <a @click="reward(v.id,v.isReward)" :class="{'disabled':v.isReward<=0}">挑战</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script type="javascript">
  import common from '../../static/js/common'
    export default {
      name: 'companyindex',
        data(){
            return {
              win_treasure: [],
              currentSwiper:0,
              banner:[
                {picpath:'../../../static/img/logo_moren.jpg'},
              ],
              noticeArray:[],//通知列表
              column_item:[], //栏目
            }
        },
      methods: {
        bannerChange(e){
          this.currentSwiper=e.mp.detail.current;
        },
          showimg(img,imglist){
            wx.previewImage({
              current: img||"", // 当前显示图片的http链接
              urls: imglist // 需要预览的图片http链接列表
            })
          },
          tonewpage(urlname,data){
            if(!urlname){return;}
            wx.navigateTo({
              url:`/pages/${urlname}/main?${data}`
            })
          },
          async getBanner (pid){
            let thiz = this;
            let data = {
              status:1,
              category:2,
              order:'create_time desc'
            };
            let res = await thiz.$get('/rs/banner', data);
            if (res.code == 200){
              if(res.rows){
                  for(let val of res.rows){
                      val.picpath=thiz.formatPicUrl(val.picpath,'logo_moren.jpg');
                  }
                  thiz.banner=res.rows;
              }
            }else if(res.code==602){

            }
          },
        async getNotice (pid){
          let thiz = this;
          let data = {
            status:1,
            is_main:1,
            order:'sequence desc,create_time desc'
          };
          let res = await thiz.$get('/rs/notify', data);
          if (res.code == 200){
            let noticeArr=res.rows;
            if(noticeArr){
                if(noticeArr.length<=4){
                    thiz.noticeArray=noticeArr;
                }else{
                  thiz.noticeArray=noticeArr.slice(0,4);
                }
            }
          }else if(res.code==602){

          }
        },
        async getpage(pid){
          let that = this
          let res = await that.$get('/rs/main_page/',{comp_id:pid})
          if(res.code == 200){
            that.column_item=res.column_item;

            for(let i = 0;i<res.win_treasure.length;i++){
              res.win_treasure[i].piclogo = that.$store.state.url+ res.win_treasure[i].piclogo
              res.win_treasure[i].tickt_id = res.win_treasure[i].level_json[0].reward[0].id
              let amount = Number(res.win_treasure[i].amount)==0?Number(res.win_treasure[i].total_amount):Number(res.win_treasure[i].amount)
              res.win_treasure[i].isReward = amount - Number(res.win_treasure[i].send_amount)
            }
            that.win_treasure = res.win_treasure;
          }else{
            that.win_treasure=[]
          }
        },
        reward(r_id,amount){
          if(amount>0){
            this.r_id=r_id
            this.$socket.emit('data_chain',{
              cmd:'fight',
              u_id: this.$store.state.user.userid,
              game_cfg_id: r_id,
              game_type:1,
              level:1,
              type:0
            })
          }
        },
        watchsocket(){
          let that=this
          that.$socket.removeAllListeners('data_chain')
          that.$socket.on('global_chain',d=>{
            if(d.cmd=='error' && d.errcode==303){
              that.$mptoast('该活动只能参加一次');
            }
          });
          that.$socket.on('data_chain',d=>{
            if(d.cmd == 'answer'&&d.step == 1 ){
              if(d.type==1){
                if(d.details[0]){
                  let answerjson=d.details[0].answer_json;
                  for(let val of answerjson){
                    val.right='true';
                  }
                  d.details[0].answer_json=answerjson;
                }else{
                  that.$mptoast('暂无题目');
                }
              }
              that.$store.commit('get_answer',d.details[0])
              that.$store.commit('get_step',d.step)
              that.$store.commit('get_level',1)
              that.$store.commit('get_room',d.room_id)
              that.$store.commit('get_max_nub',d.max_step)
              that.$store.commit('get_que_type',d.type)
              console.log(d.details[0])
              if(d.details[0]){
                that.$socket.removeAllListeners('data_chain')
                wx.navigateTo({
                  url:`/pages/alone/main?id=${that.r_id}`
                })
              }
            }
          })
        },
          formatPicUrl(pic,moren){
            let thiz=this;
            if(!pic||pic=="undefined"||pic==null){
              return '/static/img/'+moren;
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
      computed:{
        imgURL(){
          return this.$store.state.url;
        }
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
        this.getBanner(option.pid);
        this.getNotice(option.pid);
        this.getpage(option.pid)
        //this.watchsocket()
      },
      onShow(){
        this.watchsocket()
      },
      onHide(){
        this.$socket.removeAllListeners('data_chain')
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
      position: relative;
      swiper,swiper-item,image{
        width:100%;
        height:342px/2;
        vertical-align: bottom;
      }
      .dots{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 5px/2;
        display: flex;
        justify-content: center;
        .dot{
          margin: 0 5px/2;
          width: 10px/2;
          height: 10px/2;
          background-color: #cecece;
          border-radius: 50%;
          transition: all .3s;
          &.active{
            background: #e26c15;
          }
        }
      }
    }
    .titie_box{
      display:flex;
      justify-content: space-between;
      align-items: center;
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
    .more{
      font-size: 26px/2;
      color:#666666;
      span{
        color:#df5c3e;
      }
    }
    .study_box{
      border-top: 10px/2 solid #f6f6f6;
      .study_icon{
        width:31px/2;
        height:31px/2;
      }
      .category_box{
        padding:0 52px/2 0;
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
            .ellipsis();
          }
        }
      }
    }
    .notice_box{
      border-top: 10px/2 solid #f6f6f6;
      .notice_icon{
        width:32px/2;
        height:28px/2;
        background: #fff url(../../../static/img/company/icon_notice.png) no-repeat center;
        background-size: 32px/2 28px/2;
      }
      .notice_msg{
        padding-bottom: 30px/2;
        li{
          width:100%;
          height:60px/2;
          display:flex;
          align-items: center;
          justify-content: space-between;
          font-size: 26px/2;
          color:#666666;
          padding:0 26px/2;
          border-top: 1px solid #e2e2e2;
          &:last-child{
            border-bottom: 1px solid #e2e2e2;
          }
        }
        .left_item{
          .ellipsis();
          width:90%;
        }
        .right_item{
          width:12px/2;
          height:24px/2;
          background: #fff url(../../../static/img/arrow.png) no-repeat center;
          background-size: 12px/2 24px/2;
        }
      }

    }
    .gift_box{
      border-top: 10px/2 solid #f6f6f6;
      .gift_icon{
        width:31px/2;
        height:31px/2;
        background: #fff url(../../../static/img/company/fuli.png) no-repeat center;
        background-size: 31px/2 31px/2;
      }
      .gift_list{
        width: 100%;
        box-sizing: border-box;
        padding: 0 26px/2;
        display: flex;
        flex-flow: wrap;
        align-content: space-between;
        li{
          width: 31%;
          height: 327px/2+43px/2;
          padding-bottom: 18px/2;
          box-shadow: #acacac 4px/2 5px/2 15px/2;
          margin-bottom:20px/2;
          border-radius: 10px/2;
          background: #fff;
          margin-right:3.15%;
          position:relative;
          &:nth-of-type(3n){
            margin-right: 0;
          }
          div.itemheadk{
            width: 100%;
            height: 220px/2;
            box-sizing: border-box;
            padding: 20px/2;
            div{
              position: relative;
              width: 100%;
              height: 100%;
              .itemmodel{
                position: absolute;
                bottom:0;
                left:0;
                width:100%;
                font-size: 16/2px;
                padding:6/2px;
                padding-top: 20/2px;
                line-height: 16/2px;
                height: 22/2+20/2px;
                text-align: right;
                color: #fff;
                box-sizing: border-box;
                background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.4));
              }
              image{
                width: 100%;
                height: 100%;
              }
            }
          }
          h3{
            width: 100%;
            padding: 0 17px/2;
            font-size:28px/2;
            color: #333;
            box-sizing: border-box;
            word-break: break-all;
            .ellipsis(2)
          }
          .btn_box{
            width:100%;
            position:absolute;
            bottom:16px/2;
            text-align: center;
          }
          a{
            margin:0 auto;
            display: flex;
            width: 100px/2;
            height: 43px/2;
            border-radius: 50px/2;
            font-size: 30px/2;
            box-sizing: border-box;
            line-height: normal;
            color: #fff;
            justify-content: center;
            align-items: center;
            align-content: center;
            padding-bottom: 2px/2;
            background: @bg_color;
          }
          .disabled{
            background: #999;
          }
        }
        li:nth-of-type(3n){
          margin-right: 0;
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
