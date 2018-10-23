<template>
  <div class="container" :class="{fixed:!isauth&&authreturn}">
    <div id="index_gallerySlider" class="index_gallerySlider">
      <swiper :indicator-dots="indicatorDots"
              @change="bannerChange"
              :autoplay="true" :circular="true" :interval="3000"
              :duration="duration" indicator-color="rgba(226,226,226,1)" indicator-active-color="#ffffff">
        <template v-if="movies.length">
          <block v-for="(item,i) in movies">
            <swiper-item>
              <a @click.stop="tonewpage(item.url,item.urlid)">
                <image v-if="item.picpath" :src="item.picpath" class="slide-image" width="355" height="150"/>
                <image v-if="!item.picpath" src="/static/img/bg_banner.png"></image>
              </a>
            </swiper-item>
          </block>
        </template>
      </swiper>
    </div>
    <div v-for="(citem,i) in coumn_item">
      <div v-if="citem.c_target_type==1&&citem.show_css==1" class="handbook-info">
        <div class="line-division"></div>
        <div class="common-head headbook-head">
          <span class="handbook-icon"><image :src="imgUrl+citem.c_icon_path" alt=""></image><span>{{citem.c_name}}</span></span>
          <div class="content_main">
            <div class="navigation">
              <a class="" v-for="(listc,il) in citem.child" @click.stop="tonewpage('pkselect','pid='+listc.target_id)">
                <div class="navigation_icon"><image :src="imgUrl+listc.icon_path" alt=""></image></div>
                <div class="navigation_label">{{listc.name}}</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-if="citem.c_target_type==1&&citem.show_css==2" class="handbook-info">
        <div class="line-division"></div>
        <div class="common-head headbook-head">
          <span class="handbookpersonn-icon"><image :src="imgUrl+citem.c_icon_path" alt=""></image><span>{{citem.c_name}}</span></span>
          <div class="personalwelfare">
            <swiper :indicator-dots="indicatorDots"
                    @change="swiperChange"
                    :autoplay="false" :circular="true" :interval="3000"
                    :duration="duration" indicator-color="rgba(226,226,226,0)" indicator-active-color="rgba(226,226,226,0)" previous-margin='138px' next-margin='138px'>
              <template v-if="citem.child.length">
                <block v-for="(listc,il) in citem.child">
                  <swiper-item :class="{activezindex:swiperIndex==il?true:false}">
                    <image @click.stop="tonewpage('pkselect','pid='+listc.target_id)" :src="imgUrl+listc.icon_path" class="slide-image" :class="{active:swiperIndex==il?true:false}"><span class="font">{{listc.name}}</span></image>
                  </swiper-item>
                </block>
              </template>
            </swiper>
          </div>
        </div>
      </div>
      <div v-if="citem.c_target_type==2&&citem.show_css==3" class="handbook-info">
        <div class="line-division"></div>
        <div class="common-head headbook-head ">
          <span class="headcompany-head"><image :src="imgUrl+citem.c_icon_path" alt=""></image><span>{{citem.c_name}}</span></span>
          <a  @click.stop="tonewpage('morecompany','')" class="ui-link"><span>更多<i>></i></span></a>
          <ul class="contain_company" v-for="(listc,il) in citem.child">
            <li @click.stop="tonewpage('company','pid='+listc.target_id)">
              <div class="companyhead"><image v-if="listc.cp_picpath" :src="imgUrl+listc.cp_picpath"></image><image v-if="!listc.cp_picpath" src="/static/img/policy_default.jpg"></image></div>
              <div class="companymess">
                <p class="companyname">{{listc.cp_name}}</p>
                <p class="companyleab"><span v-for="(ticp,ia) in listc.cp_tags">{{ticp}}</span></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="handbook-info">
      <div class="line-division"></div>
      <div class="common-head headbook-head ">
        <span class="headgift-head">商家福利</span>
        <a class="ui-link" :href="'/pages/giftlist/main'"><span>更多<i>></i></span></a>
      </div>
    </div>
    <!--<div class="gift_title"><span></span><i></i><image src="/static/img/liwu.png"></image>为礼物而挑战<i></i><span></span></div>-->
    <ul class="gift_list">
      <li v-for="(v,i) in win_treasure" >
        <main @click.stop="tonewpage('giftsdetail','tid='+v.tickt_id+'&vid='+v.id)">
          <div class="itemheadk">
            <div>
              <image :src="v.piclogo"></image>
              <div class="itemmodel">查看详情&gt;</div>
            </div>
          </div>
          <h3>{{v.ticket_name}}</h3>
        </main>
        <a @click="reward(v.id,v.isReward)" :class="{'disabled':v.isReward<=0}">挑战</a>
      </li>
    </ul>
    <mptoast/>
  </div>
</template>

<script type="javascript">
  import userinfo from '../../components/userinfo'
  import mptoast from '../../components/mptoast'
  export default {

  data () {
    return {
      p_number:0,
      win_treasure: [],
      coumn_item:[],
      r_id:0,
      points:0,
      tickt_id:'',
      activityShow:false,
      banner:0,
      movies:[],
      bannerperson:0,
      swiperIndex:0,
    }
  },

  components: {
    userinfo,
    mptoast
  },

  methods: {
    tonewpage(urlname,data){
      wx.navigateTo({
        url:`/pages/${urlname}/main?${data}`
      })
    },
    async getbanner (){
      let thiz=this;
      let getdata={
        page:1,
        size:10,
        status:1,
        category:1,
        order:'create_time desc'
      };
      let res = await thiz.$get('/rs/banner',getdata);
      if (res.code == 200){
        if (res.rows.length > 0){
          for(var i=0;i<res.rows.length;i++){
            res.rows[i].picpath=thiz.$store.state.url+res.rows[i].picpath;
            res.rows[i].url=(res.rows[i].urlpath).replace(/.html/,"").split("?")[0];
            res.rows[i].urlid=(res.rows[i].urlpath).split("?")[1];
          }
          thiz.movies=res.rows;
        }
      }else{
        thiz.movies=[{picpath:``}]
      }
    },
    bannerChange(even){
      this.banner=even.mp.detail.current;
    },
    swiperChange(e){
        console.log(JSON.stringify(e.mp.detail.current))
      this.swiperIndex= e.mp.detail.current;
    },
    async getuserperson(){
      let aa = await this.$get('/rs/member',{id:this.$store.state.user.userid});
      if(aa.code==200){
        this.$store.commit('get_sliver',aa.rows[0].points);
        this.$store.commit('get_openid',aa.rows[0].open_id);
        this.points=aa.rows[0].points;
      }
    },
    async getpage(){
        let that = this
        let res = await that.$get('/rs/first_page')
      if(res.code == 200){
            if(res.activity==1){
                that.activityShow=true;
            }else{
              that.activityShow=false;
            }
            that.p_number = res.present_count
        if(res.win_treasure&&res.win_treasure.length>0){
          for(let i = 0;i<res.win_treasure.length;i++){
            res.win_treasure[i].piclogo = that.$store.state.url+ res.win_treasure[i].piclogo
            res.win_treasure[i].tickt_id = res.win_treasure[i].level_json[0].reward[0].id
            let amount = Number(res.win_treasure[i].amount)==0?Number(res.win_treasure[i].total_amount):Number(res.win_treasure[i].amount)
            res.win_treasure[i].isReward = amount - Number(res.win_treasure[i].send_amount)
          }
          that.win_treasure = res.win_treasure
        }else{
          that.win_treasure=[]
        }
        if(res.column_item&&res.column_item.length>0){
            for(var j=0;j<res.column_item.length;j++){
                if(res.column_item[j].c_target_type==1&&res.column_item[j].show_css==2){
                    if(res.column_item[j].child.length>0){
                        if(res.column_item[j].child.length==1){
                          res.column_item[j].child.push(res.column_item[j].child[0]);
                          res.column_item[j].child.push(res.column_item[j].child[0])
                        }else if(res.column_item[j].child.length==2){
                          res.column_item[j].child.push(res.column_item[j].child[0]);
                          res.column_item[j].child.unshift(res.column_item[j].child[1]);
                        }
                    }
                }
                if(res.column_item[j].c_target_type==2&&res.column_item[j].show_css==3){
                    if(res.column_item[j].child.length>0){
                        for(var k=0;k<res.column_item[j].child.length;k++){
                            if(res.column_item[j].child[k].cp_tag){
                              res.column_item[j].child[k].cp_tags=res.column_item[j].child[k].cp_tag.split(",");
                            }
                        }
                    }
                }
            }
          that.coumn_item=res.column_item;
          console.log(that.coumn_item)
        }else{
          that.coumn_item=[];
        }
        }else{
          that.p_number=0
          that.win_treasure=[]
          that.coumn_item=[]
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
    survey(r_id,gametype){
      this.$socket.emit('data_chain',{
        cmd:'fight',
        u_id: this.$store.state.user.userid,
        game_cfg_id: r_id,
        game_type:1,
        level:1,
        type:gametype
      })
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
    tonewpage(urlname,data){
      wx.navigateTo({
        url:`/pages/${urlname}/main?${data}`
      })
    },
  },
  computed:{
    isauth(){
      if(this.$store.state.isauth){
        wx.showTabBar({animation:true})
      }else{
        if(this.$store.state.authreturn){
          wx.hideTabBar({animation:true})
        }
      }
      return this.$store.state.isauth
    },
    authreturn(){
      return this.$store.state.authreturn
    },
    userinfo(){
        return this.$store.state.userinfo
    },
    user(){
        return this.$store.state.user
    },
    imgUrl(){
      return this.$store.state.url
    }
  },
    watch:{
      user(val,oldval){
        this.getuserperson()
      }
    },
  created () {
    // 调用应用实例的方法获取全局数据
//    this.getLogin()
  },
    onLoad(){
      this.activityShow=false;
      this.watchsocket();
      this.getbanner();
      if(this.$store.state.isauth){
        wx.showTabBar({animation:true})
      }else{
        if(this.$store.state.authreturn){
          wx.hideTabBar({animation:true})
        }
      }
    },
    onShow(){
      this.$store.commit('getorganizid','');
      if(this.$store.state.user.userid){
        this.getuserperson()
      }
      this.watchsocket()
      this.getpage()
    },
    onHide(){
      this.$socket.removeAllListeners('data_chain')
    },
    onShareAppMessage(res){
      let that=this;
      let title='边玩边学，游戏学习两不误！';
      let img=`${that.$store.state.url}/admin/img/1.jpg`;
      let url='/pages/index/main'
      return {
        title:title,
        path: url,
        imageUrl: img,
        success: (r)=>{
        },
        fail: (err)=>{
        }
      }
    },
}
</script>

<style scoped lang="less">
  @import "../../static/less/common.less";
  @keyframes gift {
    1% {
      transform: translate(0, 0) rotate(6.5deg)
    }

    2% {
      transform: translate(0, 0) rotate(3.5deg)
    }

    3% {
      transform: translate(0, 0) rotate(-3.5deg)
    }

    4% {
      transform: translate(0, 0) rotate(5.5deg)
    }

    5% {
      transform: translate(0, 0) rotate(-4.5deg)
    }

    6% {
      transform: translate(0, 0) rotate(-4.5deg)
    }

    7% {
      transform: translate(0, 0) rotate(-6.5deg)
    }

    8% {
      transform: translate(0, 0) rotate(2.5deg)
    }

    9% {
      transform: translate(0, 0) rotate(-5.5deg)
    }

    10% {
      transform: translate(0, 0) rotate(.5deg)
    }

    11% {
      transform: translate(0, 0) rotate(-3.5deg)
    }

    12% {
      transform: translate(0, 0) rotate(-6.5deg)
    }

    13% {
      transform: translate(0, 0) rotate(6.5deg)
    }

    14% {
      transform: translate(0, 0) rotate(1.5deg)
    }

    15% {
      transform: translate(0, 0) rotate(-5.5deg)
    }

    16% {
      transform: translate(0, 0) rotate(7.5deg)
    }

    17% {
      transform: translate(0, 0) rotate(-3.5deg)
    }

    18% {
      transform: translate(0, 0) rotate(7.5deg)
    }

    19% {
      transform: translate(0, 0) rotate(-5.5deg)
    }

    20% {
      transform: translate(0, 0) rotate(3.5deg)
    }
    0%,21%,50%,100% {
      transform: translate(0, 0) rotate(0)
    }
  }
  a{
    background: transparent;
    opacity: 1;
  }
  .user_box{
    padding-top: 13px/2;
    padding-bottom: 15px/2;
  }
  .btn_sign{
    width: 120px/2;
    height: 50px/2;
    border-radius: 50px/2;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 26px/2;
    background: @bg_color;
    box-shadow: #923c3c 2px/2 5px/2 15px/2;
    margin-top: 40px/2;
  }
  .container{
    background: #fff;
    background-size: 100% auto;
    &.fixed{
      display: block;
      position: fixed;
      top:0;
      left:0;
      overflow: hidden;
      height:100%;
    }
  }
  .match_box{
    padding: 0 26px/2;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
    display: flex;
  .challenge_b{
    width: 46.333%;
    height: 412px/2;
  }
    .challenge{
      width: 100%;
      height: 412px/2;
      border-radius: 10px/2;
      background: #ff862d url(../../../static/img/paiming.png) no-repeat;
      background-position: 155px/2 245px/2;
      background-size: 146px/2 148px/2;
      box-sizing: border-box;
      padding: 0 28px/2;
      padding-top: 53px/2;
      h2{
        color: #fff;
        font-size: 33px/2;
        margin:0;
        font-weight: bold;
        padding-bottom: 7px/2;
      }
      h4{
        padding-top: 8px/2;
        font-size: 26px/2;
        color: #fff;
        line-height: 26px/2;
      }
    }
    .challenge_box{
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      width: 51.2%;
      height: 380px/2;
    a{
      width: 100%;
      height: 183px/2;
    }
      div{
        width: 100%;
        height: 183px/2;
        box-sizing: border-box;
        padding: 0 20px/2;
        padding-top: 43px/2;
        border-radius: 10px/2;
        h2{
          color: #fff;
          font-size: 33px/2;
          margin:0;
          font-weight: bold;
          line-height: 33px/2;
          padding-bottom: 30px/2;
        }
        h4{
          padding-bottom: 5px/2;
          font-size: 26px/2;
          color: #fff;
          line-height: 26px/2;
        }
      }
      .item_1{
        background: #ffc02a url(../../../static/img/jiangbei.png) no-repeat;
        background-position: 94.21% 10px/2;
        background-size: 99px/2 99px/2;
      }
      .item_2{
        height: 215px/2;
        background: #76caff url(../../../static/img/huangguan.png) no-repeat;
        background-size: 99px/2 111px/2;
        background-position: 93.21% 16px/2;
        h2{
          padding-bottom: 62px/2;
        }
      }
    }
  }
  .index_gallerySlider{
    width: 750px/2;
    min-height: 342px/2;
    swiper,swiper-item,image{
      width:100%;
      height:342/2px;
    }
  }
  .personalwelfare{
    width: 750px/2;
    padding:10px 0 15px 0;
    min-height: 265px/2;
    box-sizing:border-box;
    swiper,swiper-item{
      height: 240px/2;
    }
    .swiper-block{
      height: 240px/2;
      width: 100%;
    }
    swiper-item{
      display:flex;
      align-items: center;
      z-index:1;
      overflow:visible;
      text-align:center;
      position:relative;
      image{
        height:160px/2;
        width:250px/2;
        box-shadow:0 2.5px 2.5px rgba(101,101,101,0.75);
        border-radius:20px/2;
        position:relative;
        span{
          position:absolute;
          right:8px;
          bottom:8px;
          font-size:14px;
          z-index:30;
          color:#fff;
        }
      }
      image.active{
          transform:scale(1.44);
          transition: all 0.5s;
          border-radius:30px/2;
      }
    }
    swiper-item.activezindex{
      z-index:20;
    }
  }
  .common-head{
    width: 100%;
    overflow: hidden;
    margin:11px 0 0 0;
    line-height: 0.36rem;
    position: relative;
  }
  .common-head .ui-link{
    display: block;
    position: absolute;
    right: 0;
    top: 0;
  }
  .common-head .ui-link span{
    padding-right:13px;
    font-size: 26px/2;
    float: left;
    display: block;
    line-height: 0.4rem;
    color: #666;
    i{
      color: #df5c3e;
      font-style: normal;
      display:inline-block;
    }
  }
  .handbook-icon{
    display: block;
    font-size: 15px;
    color: #333;
    margin-left:13px;
    line-height: 0.4rem;
    image{
      width:31px/2;
      height:31px/2;
      margin-top:-1px;
      vertical-align: middle;
      margin-right:5.5px;
    }
  }
  .handbookpersonn-icon{
    display: block;
    font-size: 15px;
    color: #333;
    margin-left:13px;
    line-height: 0.4rem;
    image{
      width:32px/2;
      height:32px/2;
      margin-top:-1px;
      vertical-align: middle;
      margin-right:5px;
    }
  }
  .headgift-head{
    display: block;
    font-size: 15px;
    color: #333;
    margin-left:13px;
    padding-left: 43px/2;
    line-height: 0.4rem;
    background: url('../../../static/img/icon4.png') no-repeat left center;
    background-size: 32px/2 32px/2;
  }
  .headcompany-head{
    display: block;
    font-size: 15px;
    color: #333;
    margin-left:13px;
    line-height: 0.4rem;
    image{
      width:32px/2;
      height:32px/2;
      margin-top:-1px;
      vertical-align: middle;
      margin-right:5px;
    }
  }
  .line-division {
    height: 5px;
    background-color: #f6f6f6;
  }
  .content_main{
    background: #fff;
    margin:auto 26px/2;
    padding-top: 20px/2;
    .navigation{
      box-sizing: border-box;
      width: 100%;
      justify-content: space-between;
      a{
        display: inline-block;
        width:25%;
        padding-bottom: 30px/2;
      }
      .navigation_icon{
        width: 92px/2;
        height: 92px/2;
        margin:0 auto;
        image{
          width:100%;
          height:100%;
          border-radius:50%;
        }
      }
      .navigation_label{
        margin-top: 15px/2;
        font-size: 26px/2;
        line-height: 26px/2;
        color: #666;
        text-align: center;
      }

    }
  }
  .contain_company{
    overflow:hidden;
    padding:13px 13px 9px;
    li{
      width:47%;
      padding:17px/2 9px/2 17px/2 6px/2;
      margin-right:2%;
      float:left;
      display:flex;
      background:#f3f3f3;
      border-radius:5px;
      margin-bottom:13px/2;
      justify-content: flex-start;
      align-items: center;
      .companyhead{
        width:40px;
        height:40px;
        border-radius:50%;
        vertical-align:middle;
        margin-right:5px;
        image{
          width:40px;
          height:40px;
          border-radius:50%;
          vertical-align:middle;
        }
      }
      .companymess{
        width:75%;
      }
      .companyname{
        max-width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
        word-wrap: break-word;
        font-size:12px;
        color:#666;
      }
      .companyleab{
        max-width:100%;
        font-size:10px;
        color:#999;
        padding-left: 28px/2;
        line-height: 0.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
        background: url('../../../static/img/biaoqian.png') no-repeat left center;
        background-size: 21px/2 20px/2;
        span{
          margin-right:5px;
        }
      }
    }
    li:nth-child(2n){
      margin-right:0;
    }
  }
  .gitf_box{
    width: 100%;
    height: 182px/2;
    padding: 0 26px/2;
    box-sizing: border-box;
    .gift{
      width: 100%;
      padding-left: 25px/2;
      padding-right: 50px/2;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .gift_text{
        width: 100%;
        h2{
          padding-top: 60px/2;
          padding-bottom: 11px/2;
          font-size: 40px/2;
          color: #df5c3e;
          line-height: 40px/2;
          font-weight: bold;
        }
        p{
          padding-top: 11px/2;
          padding-bottom: 36px/2;
          font-size: 26px/2;
          color: #df5c3e;
          line-height: 26px/2;
          display: flex;
          justify-content: space-between;
          .toduo{
            padding-right:40/2px;
          }
        }
      }
      i{
        animation: gift 3s infinite;
        width: 98px/2;
        height: 123px/2;
        position: absolute;
        right: 0;
        image{
          width: 98px/2;
          height: 123px/2;
        }
      }
    }
  }
  .gift_list{
    width: 100%;
    box-sizing: border-box;
    padding: 0 26px/2;
    margin-top:20px/2;
    display: flex;
    flex-flow: wrap;
    align-content: space-between;
    li{
      width: 31%;
      height: 327px/2;
      box-shadow: #acacac 4px/2 5px/2 15px/2;
      margin-bottom:20px/2;
      border-radius: 10px/2;
      background: #fff;
      margin-right:3.15%;
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
      a{
        margin:0 auto;
        margin-top:16px/2;
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
  .survey-box{
    box-sizing: border-box;
    width:100%;
    padding: 0 26px/2;
    image{
      width:698px/2;
      height:176px/2;
      max-width:100%;
    }
  }
</style>
