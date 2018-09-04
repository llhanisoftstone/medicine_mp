<template>
  <div>
      <div class="widthk">
        <div class="width"></div>
      </div>
      <div class="searchk">
        <picker
          mode="selector"
          :value="pickerIndex"
          :range="pickerValueArray"
          @change="bindPickerChange">
          <div class="org-box" v-show="pickerIndex>=0">{{pickerValueArray[pickerIndex]}}</div>
          <div class="org-box" v-show="pickerIndex==-1">请选择</div>
        </picker>
        <a class="ui-link" :href="'/pages/policylist/main'">
          <div class="searchinput">请输入标题或内容</div>
        </a>
      </div>
      <div class="hot-info" v-if="is_hot_hide">
        <div class="common-head hot-head">
          <span class="hot-icon">热门关注</span>
          <div class="hot-list">
            <swiper :display-multiple-items="buylimitlistcount" :next-margin="marginright"
                    :autoplay="false" :circular="true">
              <block  v-for="(v,_index) in hot_list" :key="v._index">
                <swiper-item>
                  <div class="item">
                    <a :href="'/pages/policydetails/main?pid='+v.id" class="item-details">
                      <div class="hot_item">
                        <div class="imgk">
                          <img :src="v.pic_abbr" alt="">
                          <div class="imgkinfok">
                            <div class="imgkinfo">
                              <span class="imgkinfo_name">{{v.organiz_name||" "}}</span>
                              <span class="imgkinfo_count">{{v.view_count}}</span>
                            </div>
                          </div>
                        </div>
                        <div class="item_title">{{v.title}}</div>
                      </div>
                    </a>
                  </div>
                </swiper-item>
              </block>
            </swiper>
          </div>
          <!--<ul class="hot-list">-->
            <!--<li v-for="(v,_index) in hot_list" :key="v._index">-->
              <!--<a :href="'/pages/policydetails/main?pid='+v.id" class="item-details">-->
                <!--<div class="hot_item">-->
                  <!--<div class="imgk">-->
                    <!--<img :src="v.pic_abbr" alt="">-->
                    <!--<div class="imgkinfok">-->
                      <!--<div class="imgkinfo">-->
                        <!--<span class="imgkinfo_name">{{v.organiz_name||" "}}</span>-->
                        <!--<span class="imgkinfo_count">{{v.view_count}}</span>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div class="item_title">{{v.title}}</div>-->
                <!--</div>-->
              <!--</a>-->
            <!--</li>-->
          <!--</ul>-->
        </div>
      </div>
      <div class="handbook-info" v-if="is_bl_hide">
        <div class="line-division"></div>
        <div class="common-head headbook-head">
          <span class="handbook-icon">办理手册</span>
          <a class="ui-link" :href="'/pages/policylist/main?pid=zcbl'"><span>更多></span></a>
          <ul class="headbook-list">
            <li v-for="(item,i) in headbook_list" :key="item.id">
              <a :href="'/pages/policydetails/main?pid='+item.id" class="item-details">
                <div class="msg-box">
                  <div class="message-img">
                    <img :src="item.pic_abbr" alt="">
                  </div>
                  <div class="info-content">
                    <div class="message">
                      <span class="pub-name">
                          <span>{{item.title}}</span>
                      </span>
                    </div>
                    <p class="message-info mui-ellipsis-2">
                      {{item.remark}}
                    </p>
                    <div class="label-info clearfix">
                      <div class="info-left">{{item.organiz_name||" "}}</div>
                      <div class="info-right rt icon-reading">
                        <span>{{item.view_count}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="policy-list" v-if="is_bk_hide">
        <div class="line-division"></div>
        <div class="common-head policy-head">
          <span class="policy-icon">政策百科</span>
          <a :href="'/pages/policylist/main?pid=zcbk'" class="ui-link"><span>更多></span></a>
          <ul class="policy-list">
            <li v-for="(item1,i) in policy_list" :key="item1.id">
              <a :href="'/pages/policydetails/main?pid='+item1.id" class="item-details">
                <div class="msg-box">
                  <div class="message-img">
                    <img :src="item1.pic_abbr" alt="">
                  </div>
                  <div class="info-content">
                    <div class="message">
                      <span class="pub-name">
                          <span>{{item1.title}}</span>
                      </span>
                    </div>
                    <p class="message-info mui-ellipsis-2">
                      {{item1.remark}}
                    </p>
                    <div class="label-info clearfix">
                      <div class="info-left">{{item1.organiz_name||" "}}</div>
                      <div class="info-right rt icon-reading">
                        <span>{{item1.view_count}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <a class="ui-link" :href="'/pages/questions/main'">
        <div class="zc_btn"><div class="zcbtn_top">我要了解</div></div>
      </a>
  </div>
</template>

<script type="javascript">
  export default {
    data () {
      return {
        buylimitlistcount:3,
        marginright:"180rpx",
        is_hot_hide: false,
        is_bl_hide: false,
        is_bk_hide: false,
        hot_list:[],
        headbook_list:[],
        policy_list:[],
        pickerIndex:-1,
        pickerValueArray:[],
        wishidlist:null,
        org_id:null,
        pickerwishText:''
      }
    },

    methods: {
      async getpolicyMain() {
        let that = this;
        let infodata={};
        if(that.org_id){
          infodata.organiz_id= that.org_id;
        }
        let res = await this.$get('/rs/info_policy',infodata);
        if (res.code == 200){
          if (res.hots.length > 0){
            for (var i=0;i<res.hots.length; i++){
              res.hots[i]._index = i+1;
              res.hots[i].pic_abbr = that.$store.state.url+res.hots[i].pic_abbr;
              res.hots[i].view_count = that.commons.zcount(res.hots[i].view_count)
            }
            that.hot_list = res.hots;
            if(that.hot_list.length>2){
              that.buylimitlistcount=2
            }else{
              that.buylimitlistcount=that.hot_list.length
            }
            that.is_hot_hide = true;
          }else{
            that.hot_list = [];
            that.is_hot_hide = false;
          }
          if (res.zcbl.length > 0){
            for (var i=0; i<res.zcbl.length; i++){
              res.zcbl[i].view_count = that.commons.zcount(res.zcbl[i].view_count)
              res.zcbl[i].pic_abbr = that.$store.state.url+res.zcbl[i].pic_abbr;
            }
            that.headbook_list = res.zcbl;
            that.is_bl_hide = true;
          }else{
            that.headbook_list = [];
            that.is_bl_hide = false;
          }
          if (res.zcbk.length > 0){
            for (var i=0; i<res.zcbk.length; i++){
              res.zcbk[i].view_count = that.commons.zcount(res.zcbk[i].view_count)
              res.zcbk[i].pic_abbr = that.$store.state.url+res.zcbk[i].pic_abbr;
            }
            that.policy_list = res.zcbk;
            that.is_bk_hide = true;
          }else{
            that.policy_list = [];
            that.is_bk_hide = false;
          }
        }
      },
      async getorganiz(){
        let than = this;
        let res = await this.$get('/rs/organiz');
        if (res.code == 200){
          var obj = [];
          var array=[];
          for(var i=0;i<res.rows.length;i++){
            var o = {};
            array.push(res.rows[i].name)
            o.id = res.rows[i].id;
            o.name = res.rows[i].name;
            obj.push(o);
          }
          than.pickerValueArray=array;
          than.wishidlist = obj;
        }
      },
      bindPickerChange(e){
        let that=this;
        let ival=e.mp.detail.value;
        that.pickerIndex=ival;
        that.pickerwishText=that.pickerValueArray[ival];
        for(let wishVal of that.wishidlist ){
          if(that.pickerwishText==wishVal.name){
            that.org_id=wishVal.id;
            that.getpolicyMain();
          }
        }
      },
    },

    created () {
      console.log(wx.getSystemInfoSync().windowWidth)
      this.getpolicyMain()//获取政策百科主页数据
    },
    onLoad:function(){
      let that=this;
      let width750="";
      let width="";
      wx.createSelectorQuery().select('.width').boundingClientRect(function (rect) {
        width750=rect.width;
        wx.createSelectorQuery().select('.searchk').boundingClientRect(function (rect) {
          width=rect.width;
          that.marginright=parseInt(that.marginright)-(parseInt(width750)-parseInt(width))+"rpx";
        }).exec();
      }).exec();
    },
    onShow: function() {
      this.pickerIndex=-1;
      this.org_id='';
      this.getorganiz(); //获取组织列表
      this.getpolicyMain()//获取政策百科主页数据
    },
    onUnload(){
      this.pickerwishText='';
      this.org_id='';
      this.pickerIndex=-1;
    },
  }
</script>

<style scoped lang="less">
  @import "../../static/less/common.less";
  .widthk{
    width: 1px;
    overflow: hidden;
    opacity: 0;
    position: absolute;
    top:0;
    left:0;
  }
  .width{
    width: 750/2px;
    height: 1px;
  }
  .zc_btn{
    position: fixed;
    z-index: 999;
    bottom:300/2px;
    right:30/2px;
    width: 85/2px;
    height:85/2px;
    box-sizing: border-box;
    border-radius: 50%;
    background: linear-gradient(135deg,#f4c8be 0%, #df5c3e 50% ,#b54b32 100%);
    box-shadow: 1px 1.5px 1px 1px rgba(0,0,0,.2);
    .zcbtn_top{
      position: absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      margin:auto;
      border-radius: 50%;
      background: #df5c3e;
      width: 75/2px;
      height:75/2px;
      padding: 13/2px;
      box-sizing: border-box;
      font-size: 23/2px;
      line-height: 25/2px;
      color: #fff;
      text-align: center;
    }
  }
  .searchk{
    width: 100%;
    padding: 10px/2 12px/2;
    background: #f6f6f6;
    box-sizing: border-box;
    display:flex;
    .org-box{
      box-sizing: border-box;
      width:230px/2;
      height: 70px/2;
      line-height: 70/2px;
      font-size: 28px/2;
      color: #888;
      overflow: hidden;
      padding:0 70px/2 0 15px/2;
      background: #fff url("../../../static/img/arrow-down.png") 179px/2 center no-repeat;
      background-size: 26px/2 25px/2;
      border-radius: 10/2px;
    }
    .ui-link{
      width:520px/2;
      box-sizing: border-box;
    }
  }
  .searchinput{
    width: 100%;
    box-sizing: border-box;
    height: 70px/2;
    border-radius: 10/2px;
    background: #fff url("../../../static/img/zc_5.png") 14px/2 center no-repeat;
    background-size: 40px/2 40px/2;
    color: #888;
    font-size: 30px/2;
    line-height: 70/2px;
    padding-left: 62/2px;
  }
  .common-head{
    width: 100%;
    overflow: hidden;
    line-height: 0.36rem;
    margin: 0.126rem 0 0 0;
    position: relative;
  }
  .common-head .ui-link{
    display: block;
    position: absolute;
    right: 0;
    top: 0;
  }
  .common-head .ui-link span{
    padding-right: 0.288rem;
    font-size: 26px/2;
    float: left;
    display: block;
    height: 0.35rem;
    color: #df5c3e;
  }
  .hot-icon{
    display: block;
    line-height: 0.4rem;
    font-size: 0.32rem;
    color: #df5c3e;
    margin-left: 0.288rem;
    padding-left: 0.48rem;
    background: url('../../../static/img/zc_1.png') no-repeat left center;
    background-size: 0.32rem 0.32rem;
  }
  .handbook-icon{
    display: block;
    line-height: 0.4rem;
    font-size: 0.32rem;
    color: #df5c3e;
    margin-left: 0.288rem;
    padding-left: 0.48rem;
    background: url('../../../static/img/zc_2.png') no-repeat left center;
    background-size: 0.330667rem 0.32rem;
  }
  .policy-icon{
    display: block;
    line-height: 0.4rem;
    font-size: 0.32rem;
    color: #df5c3e;
    margin-left: 0.288rem;
    padding-left: 0.48rem;
    background: url('../../../static/img/zc_3.png') no-repeat left center;
    background-size: 0.352rem 0.32rem;
  }
  .hot-list{
    padding:22/2px 0 0 27/2px;
    &:after{
      display: table;
      content: '';
      clear: both;
    }
    /*<!--swiper-item{-->*/
      /*<!--width: 257/2px!important;-->*/
    /*<!--}-->*/
  }
  .hot-list .item{
    /*float: left;*/
    word-wrap:break-word;
    color: #333333;
    font-size: 0.298667*46.875/2px;
    margin-right:17/2px;
    width: 257/2px;
    //269
    height:281/2px;
    .hot_item{
      position: relative;
      width: 257/2px;
      //269
      height:281/2px;
      .imgk{
        position: relative;
        width: 257/2px;
        height:210/2px;
        border-radius: 10/2px;
        overflow: hidden;
        image{
          width: 257/2px;
          height:210/2px;
        }
      }
      .imgkinfok{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height:100%;
        z-index: 10;
        box-shadow: 0 0 100px 1px rgba(0,0,0,.5) inset;
      }
      .imgkinfo{
        position: absolute;
        bottom:6/2px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .imgkinfo_name{
          font-size: 20/2px;
          padding-left: 31/2px;
          overflow: hidden;
          white-space: nowrap;
          width:100/2px ;
          text-overflow: ellipsis;
          color: #fff;
          line-height: 24/2px;
          height: 24/2px;
          background: url("../../../static/img/bumenimg.png")no-repeat 6/2px center;
          background-size: 17/2px 16/2px;
        }
        .imgkinfo_count{
          padding-right: 8/2px;
          padding-left:32/2px;
          font-size: 20/2px;
          color: #fff;
          background: url("../../../static/img/viewimg.png")no-repeat 0 center;
          line-height: 24/2px;
          height: 24/2px;
          background-size: 27/2px 17/2px;
        }
      }
      .item_title{
        width: 100%;
        padding: 0 7/2px;
        color: #666;
        font-size: 25/2px;
        height:59/2px;
        line-height: 59/2px;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .hot-list .item .item-details{
    background-color: inherit;
    opacity: 1;
    position: inherit;
    white-space: normal;
    word-break: break-all;
  }
  .headbook-list .item .item-details{
    background-color: inherit;
    opacity: 1;
    position: inherit;
  }
  .policy-list li .item-details{
    background-color: inherit;
    opacity: 1;
    position: inherit;
  }
  .line-division {
    height: 0.1386667rem;
    background-color: #f6f6f6;
  }
  .headbook-head li{
    border-top: 1px solid #e2e2e2;
    padding: 0.32rem 0.288rem 0.288rem;
  }
  .headbook-head li:first-child{
    border-top: 0;
  }
  .headbook-head .msg-box{
    display: flex;
  }
  .policy-head li{
    border-top: 1px solid #e2e2e2;
    padding: 0.32rem 0.288rem 0.288rem;
  }
  .policy-head li:first-child{
    border-top: 0;
  }
  .policy-head .msg-box{
    display: flex;
  }
  .message-img img{
    width: 1.984rem;
    height: 1.632rem;
  }
  .info-content{
    position: relative;
    width: 479/2px;
    padding-left: 0.21335rem;
    flex:auto;
  }
  .info-content .message{
    /*margin-bottom: 0.192rem;*/
  }
  .message .pub-name{
    font-size: 0.32rem;
    line-height: 0.4rem;
    font-weight: bold;
    color: #666666;
  }
  .message .pub-name span{
    display: -webkit-box;
    overflow: hidden;
    white-space: normal!important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .info-content .message-info{
    font-size: 0.23465rem;
    line-height: 0.34165rem;
    color: #666666;
    margin-bottom: 0.24535rem;
    word-break: break-all;
    word-wrap: break-word;
    display: -webkit-box;
    overflow: hidden;
    white-space: normal!important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .info-content .label-info {
    padding: 0;
    position: absolute;
    bottom:0;
    width: 100%;
    left:0;
    padding-left: 0.21335rem;
    box-sizing: border-box;
  }
  .info-left{
    float: left;
    font-size: 26/2px;
    padding-left: 39/2px;
    overflow: hidden;
    white-space: nowrap;
    width:260/2px ;
    text-overflow: ellipsis;
    color: #666;
    line-height: 50/2px;
    height: 50/2px;
    background: url("../../../static/img/zcbmh.png")no-repeat 0 9/2px;
    background-size: 36/2px 33/2px;
  }
  .info-right {
    padding-left: 0.416rem;
    line-height: 0.32rem;
    float: right;
  }
  .icon-reading {
    background: url('../../../static/img/zc_4.png') no-repeat left center;
    background-size: 30px/2 18px/2;
  }
  .info-right span {
    font-size: 0.261rem;
    line-height: 0.5rem;
    color: #666666;
  }
</style>
