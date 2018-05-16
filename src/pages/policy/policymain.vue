<template>
  <div>
      <div class="hot-info">
        <div class="common-head hot-head">
          <span class="hot-icon">热门关注</span>
          <ul class="hot-list">
            <li v-for="(v,_index) in hot_list" :key="v._index">
              {{v._index}}.{{v.title}}
            </li>
          </ul>
        </div>
      </div>
      <div class="line-division"></div>
      <div class="handbook-info">
        <div class="common-head headbook-head">
          <span class="handbook-icon">办理手册</span>
          <a class="ui-link"><span>更多></span></a>
          <ul>
            <li v-for="(item,i) in headbook_list" :key="item.id">
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
            </li>
          </ul>
        </div>
      </div>
      <div class="line-division"></div>
      <div class="policy-list">
        <div class="common-head policy-head">
          <span class="policy-icon">政策百科</span>
          <a class="ui-link"><span>更多></span></a>
          <ul>
            <li v-for="(item1,i) in policy_list" :key="item1.id">
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
        hot_list:[],
        headbook_list:[],
        policy_list:[]
      }
    },


    methods: {
      async gethotList() {
        let that = this;
        let res = await this.$get('/rs/infomation',{is_hot:1,order:'hot_time asc',page:1,size:5});
        if (res.code == 200){
          for (var i=0;i<res.rows.length; i++){
              res.rows[i]._index = i+1;
          }
          that.hot_list = res.rows;
        }
      },
      async getheadbookList() {
        let that = this;
        let res = await this.$get('/rs/infomation',{unique_code:'zcbl',page:1,size:2});
        if (res.code == 200){
          for (var i=0; i<res.rows.length; i++){
              res.rows[i].pic_abbr = 'https://policy.lifeonway.com'+res.rows[i].pic_abbr;
          }
          that.headbook_list = res.rows;
        }
      },
      async getpolicyList(){
        let that = this;
        let res = await this.$get('/rs/infomation',{unique_code:'zcbk',page:1,size:2});
        if (res.code == 200){
          for (var i=0; i<res.rows.length; i++){
            res.rows[i].pic_abbr = 'https://policy.lifeonway.com'+res.rows[i].pic_abbr;
          }
          that.policy_list = res.rows;
        }
      }
    },

    created () {
      this.gethotList()//热点数据列表
      this.getheadbookList() //政策办理数据列表
      this.getpolicyList() //政策百科数据列表
    }
  }
</script>

<style scoped lang="less">
  @import "../../static/less/common.less";
  .common-head{
    line-height: 0.36rem;
    margin: 0.234667rem 0 0.257733rem 0;
    position: relative;
  }
  .common-head a{
    display: block;
    position: absolute;
    right: 0;
    top: 0;
  }
  .common-head a span{
    padding-right: 0.376665rem;
    font-size: 0.256rem;
    float: left;
    display: block;
    height: 0.35rem;
    color: #df5c3e;
  }
  .hot-icon{
    display: block;
    height: 0.35rem;
    line-height: 0.359rem;
    font-size: 0.32rem;
    color: #df5c3e;
    margin-left: 0.288rem;
    padding-left: 0.48rem;
    background: url('../../../static/img/zc_1.png') no-repeat left center;
    background-size: 0.32rem 0.32rem;
  }
  .handbook-icon{
    display: block;
    height: 0.35rem;
    line-height: 0.359rem;
    font-size: 0.32rem;
    color: #df5c3e;
    margin-left: 0.288rem;
    padding-left: 0.48rem;
    background: url('../../../static/img/zc_2.png') no-repeat left center;
    background-size: 0.330667rem 0.32rem;
  }
  .policy-icon{
    display: block;
    height: 0.35rem;
    line-height: 0.359rem;
    font-size: 0.32rem;
    color: #df5c3e;
    margin-left: 0.288rem;
    padding-left: 0.48rem;
    background: url('../../../static/img/zc_3.png') no-repeat left center;
    background-size: 0.352rem 0.32rem;
  }
  .hot-list{
    margin: 0.29867rem 0.448rem;
  }
  .hot-list li{
    margin: 0.213rem 0;
    color: #333333;
    font-size: 0.298667rem;
    line-height: 0.373333rem;
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
    line-height: 0.32rem;
    margin-bottom: 0.192rem;
  }
  .message .pub-name{
    font-size: 0.32rem;
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
    background-size: 0.352rem 0.32rem;
  }
  .info-right span {
    font-size: 0.261rem;
    line-height: 0.5rem;
    color: #666666;
  }
</style>
