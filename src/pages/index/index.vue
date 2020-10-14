<template>
    <div class="container">
      <div class="search">
        <div class="search_modal" v-on:click="tonewpage('search_drugs','type=1')"><div class="icon_search">请输入药品通用名称</div></div>
      </div>
      <div class="drugs_list">
        <ul class="chat-box">
          <li
            v-for="(item,index) in drugs_list" v-bind:key="index"
            @click.stop="tonewpage('drugs_details','pid='+item.id)">
            <div class="user-box">
              <image
                v-if="item.picpath"
                class="userpic"
                :src="item.picpath"></image>
              <image
                src="/static/img/user.png"
                v-else=""
                class="userpic"></image>
              <div class="userinfo">
                <div class="title">{{item.common_name}}</div>
                <div class="address">{{item.comp_name}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="nogetList" v-if="nogetshow"><img src="/static/img/empty-4.png"/><div class="nogetText">暂无药品</div></div>
      <div v-if="scrollIcon" @click="scrolltoTop" id="scrollToTop" class="footcgotop"></div>
      <mptoast/>
    </div>
</template>

<script type="javascript">
    import mptoast from '../../components/mptoast'
    export default {
      data(){
          return {
            drugs_list: [],
            nogetshow: false,
            comp_id: '',
            scrollIcon:false,
            scrollTop: 0,
            page: 1,
            size: 6,
          }
      },
      components: {
        mptoast
      },
      onPullDownRefresh () {
        this.page=1;
        this.drugs_list=[];
        this.refresh();
        // 下拉刷新
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
      onReachBottom () {
        this.page++;
        this.loadmore()
      },
      methods: {
        itemClick(id){

        },
        tonewpage(urlname, data){
          if(!urlname){return;}
          wx.navigateTo({
            url:`/pages/${urlname}/main?${data}`
          })
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
        async refresh(){
          this.getList();
        },
        loadmore(){
          this.getList();
        },
        async getList(){
          let that = this;
          let data = {
            page: this.page,
            size: this.size,
            type: 1,
            status: 1,
            order:'create_time desc',
          };
          if(this.comp_id){
            data.comp_id = this.comp_id;
          }
          let res = await that.$get('/rs/drugs',data);
          if (res.code == 200){
            that.nogetshow=false;
            if(that.page==1){
              that.drugs_list=[];
            }
            if (res.rows.length > 0){
              let array = []
              for (let i=0; i<res.rows.length; i++){
                if(!res.rows[i].picpath || res.rows[i].picpath==''){
                  res.rows[i].picpath= '/static/img/policy_default.jpg';
                }else{
                  res.rows[i].picpath = this.$store.state.url + res.rows[i].picpath.split(",")[0];
                }
                array.push(res.rows[i])
              }
              that.drugs_list = that.drugs_list.concat(array);
            }
          }else if (res.code == 602 && that.page == 1){
            that.nogetshow=true;
            that.drugs_list=[];
          }
        }
      },
      onLoad: function (option) {

      },
      onShow(){
        if(this.$store.state.compid){
          this.comp_id = this.$store.state.compid;
        }
        this.nogetshow = false;
        this.getList();
      },
      onPageScroll:function(res){
        let top = res.scrollTop;
        if (top > 400) {
          this.scrollIcon = true;
        } else {
          this.scrollIcon = false;
        }
      },
    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .search{
      height: 110px/2;
      background-color: #2dc9aa;
      .search_modal{
        width: 684px/2;
        height: 70px/2;
        background-color: #ffffff;
        border-radius: 32px/2;
        margin: 20px/2 33px/2;
        .icon_search{
          text-align: center;
          line-height: 70px/2;
          color: #d9d9d9;
          font-size: 30px/2;
          padding-left: 20px/2;
          background: url(../../../static/img/search.png) no-repeat 180px/2 center;
          background-size: 32px/2 32px/2;
        }
      }
    }
    ul.chat-box{
      box-sizing: border-box;
      padding:0 35px/2 0 12px;
      li{
        padding:37px/2 22px/2 37px/2 45px/2;
        border-bottom: 1px solid #e2e2e2;
        display:flex;
        align-items: center;
        justify-content: space-between;
        .user-box{
          display:flex;
          .userpic{
            width:140px/2;
            height:140px/2;
            border:1px/2 solid #e2e2e2;
            vertical-align: bottom;
          }
        }
        .userinfo{
          margin-left: 40px/2;
          .title{
            font-family: STZhongsong;
            font-size: 36px/2;
            font-weight: normal;
            font-stretch: normal;
            color: #1a1a1a;
          }
          .address{
            margin-top: 40px/2;
            font-family: STZhongsong;
            font-size: 26px/2;
            font-weight: normal;
            font-stretch: normal;
            color: #666666;
          }
        }
      }
    }
    .nogetList{
      padding-top: 200px/2;
      width: 450px/2;
      margin-left: 150px/2;
      img{
        width: 450px/2;
        height: 320px/2;
      }
      .nogetText{
        font-family: STZhongsong;
        color: #1a1a1a;
        font-size: 36px/2;
        text-align: center;
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
</style>
