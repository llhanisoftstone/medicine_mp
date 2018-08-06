<template>
  <div>
      <div class="searchk">
        <a class="ui-link" :href="'/pages/policylist/main'">
          <div class="searchinput">请输入标题或内容</div>
        </a>
      </div>
      <div class="hot-info" v-if="is_hot_hide">
        <div class="common-head hot-head">
          <span class="hot-icon">热门关注</span>
          <ul class="hot-list">
            <li v-for="(v,_index) in hot_list" :key="v._index">
              <a :href="'/pages/policydetails/main?pid='+v.id" class="item-details">
                <div class="hot_item">
                  <div class="imgk">
                    <img :src="v.pic_abbr" alt="">
                    <div class="imgkinfok">
                      <div class="imgkinfo">
                        <span class="imgkinfo_name">陕西人社厅</span>
                        <span class="imgkinfo_count">{{v.view_count}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="item_title">{{v.title}}</div>
                </div>
              </a>
            </li>
          </ul>
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
  </div>
</template>

<script type="javascript">
  export default {
    data () {
      return {
        is_hot_hide: false,
        is_bl_hide: false,
        is_bk_hide: false,
        hot_list:[],
        headbook_list:[],
        policy_list:[]
      }
    },

    methods: {
      async getpolicyMain() {
        let that = this;
        let res = await this.$get('/rs/info_policy');
        if (res.code == 200){
          if (res.hots.length > 0){
            for (var i=0;i<res.hots.length; i++){
              res.hots[i]._index = i+1;
              res.hots[i].pic_abbr = 'https://policy.lifeonway.com'+res.hots[i].pic_abbr;
              res.hots[i].view_count = that.commons.zcount(res.hots[i].view_count)
            }
            that.hot_list = res.hots;
            that.is_hot_hide = true;
          }else{
            that.hot_list = [];
            that.is_hot_hide = false;
          }
          if (res.zcbl.length > 0){
            for (var i=0; i<res.zcbl.length; i++){
              res.zcbl[i].view_count = that.commons.zcount(res.zcbl[i].view_count)
              res.zcbl[i].pic_abbr = 'https://policy.lifeonway.com'+res.zcbl[i].pic_abbr;
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
              res.zcbk[i].pic_abbr = 'https://policy.lifeonway.com'+res.zcbk[i].pic_abbr;
            }
            that.policy_list = res.zcbk;
            that.is_bk_hide = true;
          }else{
            that.policy_list = [];
            that.is_bk_hide = false;
          }
        }
      }
    },

    created () {
      this.getpolicyMain()//获取政策百科主页数据
    },

    onShow: function() {
      this.getpolicyMain()//获取政策百科主页数据
    }
  }
</script>

<style scoped lang="less">
  @import "../../static/less/common.less";

  .searchk{
    width: 100%;
    padding: 10px/2 12px/2;
    background: #f6f6f6;
    box-sizing: border-box;
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
  }
  .hot-list li{
    float: left;
    word-wrap:break-word;
    color: #333333;
    font-size: 0.298667*46.875/2px;
    margin-right:10/2px;
    width: 343/2px;
    height:350/2px;
    .hot_item{
      position: relative;
      width: 343/2px;
      height:350/2px;
      .imgk{
        position: relative;
        width: 343/2px;
        height:280/2px;
        border-radius: 10/2px;
        overflow: hidden;
        img{
          width: 343/2px;
          height:280/2px;
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
        bottom:18/2px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .imgkinfo_name{
          font-size: 26/2px;
          padding-left: 39/2px;
          overflow: hidden;
          white-space: nowrap;
          width:165/2px ;
          text-overflow: ellipsis;
          color: #fff;
          line-height: 33/2px;
          height: 33/2px;
          background: url("../../../static/img/zcbm.png")no-repeat 0 0;
          background-size: 36/2px 33/2px;
        }
        .imgkinfo_count{
          padding-right: 13/2px;
          padding-left:39/2px;
          font-size: 25/2px;
          color: #fff;
          background: url("../../../static/img/zcview.png")no-repeat 0 0;
          line-height: 25/2px;
          height: 25/2px;
          background-size: 35/2px 25/2px;
        }
      }
      .item_title{
        width: 100%;
        padding: 0 13/2px;
        color: #666;
        font-size: 26/2px;
        height:70/2px;
        line-height: 70/2px;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .hot-list li .item-details{
    background-color: inherit;
    opacity: 1;
    position: inherit;
    white-space: normal;
    word-break: break-all;
  }
  .headbook-list li .item-details{
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
    width: 5.41865rem;
    padding-left: 0.21335rem;
  }
  .info-content .message{
    margin-bottom: 0.192rem;
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
