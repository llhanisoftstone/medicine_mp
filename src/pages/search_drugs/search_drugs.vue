<template>
    <div class="container">
      <div class="search">
        <div class="search_icon"></div>
        <input confirm-type="search" focus="true" maxlength="20" placeholder-style="color: #d9d9d9" class="search-input" v-model.trim="searchVal" placeholder="请输入药品通用名称" @confirm="confirm($event)"/>
        <div class="clear" :class="{'clear_icon':clearhide}" v-on:click="clearInput"></div>
      </div>
      <div class="drugs_list">
        <ul class="chat-box">
          <li
            v-for="(item,index) in drugs_list" v-bind:key="index"
            @click.stop="jumpTopage(item.id)">
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
      <div class="nogetList" v-if="nogetshow"><img src="/static/img/empty-4.png"/><div class="nogetText">暂无该药品信息</div></div>
      <div class="addfeed" v-if="nogetshow && type == 2" @click.stop="jumpTopage()">手动输入药品</div>
      <div v-if="scrollIcon" @click="scrolltoTop" id="scrollToTop" class="footcgotop"></div>
      <mptoast/>
    </div>
</template>

<script type="javascript">
    import mptoast from '../../components/mptoast'
    export default {
      data(){
          return {
            b_id: '',
            searchVal: '',
            _search: '',
            type: 1,
            drugs_list: [],
            nogetshow: false,
            clearhide: false,
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
        jumpTopage(pid){
          if(this.type == 2){
            let urlname = 'input_drugs';
            let data = '';
            if(this.b_id){
              if(pid){
                data = 'd_id='+pid+'&b_id='+this.b_id
              }else{
                data = 'b_id='+this.b_id
              }
            }else{
              if(pid){
                data = 'd_id='+pid+'&operation=add'
              }else{
                data = 'operation=add'
              }
            }
            wx.navigateTo({
              url:`/pages/${urlname}/main?${data}`
            })
          }else{
            let urlname = 'drugs_details';
            let data = 'pid='+pid
            wx.navigateTo({
              url:`/pages/${urlname}/main?${data}`
            })
          }
        },
        tonewpage(urlname,data){
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
        confirm(e){
          if(!this.searchVal){
            this.$mptoast('请输入药品通用名称');
            return;
          }
          this.page=1;
          this.drugs_list=[];
          this._search = e.target.value;
          this.getList();
        },
        async refresh(){
          this.getList();
        },
        loadmore(){
          this.getList();
        },
        clearInput(){
          this.searchVal = '';
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
          if (this._search){
            data.search = 1;
            data.common_name = this._search;
            if (this.page > 1){
              data.page = 1;
              data.size = this.page * this.size;
            }
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
      watch:{
        searchVal(val){
          if (val.trim().length > 0){
            this.clearhide = true;
          }else{
            this.clearhide = false;
          }
        }
      },
      onLoad: function (option) {
        this.type = option.type || ''
        this.b_id = option.b_id || ''
      },
      onShow(){
        this.searchVal = '';
        this._search = '';
        this.drugs_list = [];
        this.nogetshow = false;
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
      padding: 20px/2 33px/2;
      background-color: #2dc9aa;
    }
    .search{
      display: flex;
      .search_icon{
        width: 10%;
        background: #ffffff url('../../../static/img/search.png') 14px/2 center no-repeat;
        background-size: 40px/2 40px/2;
        border-radius: 32px/2 0 0 32px/2;
      }
      input{
        width: 100%;
        color: #666666;
        font-size: 30px/2;
        height: 70px/2;
        background-color: #ffffff;
      }
      .clear_icon{
        background:url('../../../static/img/clear.png') center 20px/2 no-repeat;
        background-size: 30px/2 30px/2;
      }
      .clear{
        width: 10%;
        background-color: #ffffff;
        border-radius: 0 32px/2 32px/2 0;
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
    .addfeed{
      position: fixed;
      bottom: 40px/2;
      left: 35px/2;
      width: 680px/2;
      height:80px/2;
      line-height: 80px/2;
      font-size: 30px/2;
      color: #ffffff;
      text-align: center;
      background-color: #2dc9aa;
      border-radius: 10px/2;
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
