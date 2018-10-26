<template>
    <div>
      <div class="mui-control-content mui-active friend_content">
        <ul class="box mui-table-view" id="datalist">
          <li
            @click="tonewpage('chat','tuid='+item.to_u_id)"
            :key="i"
            class=" mui-table-view-cell" v-for="(item,i) in contactlist">
            <div class="mui-table-cell box_item">
              <div class="box_left">
                <div class="box-left_div bg_touxiang80">
                  <image :src="item.to_avatar_url" alt=""></image>
                  <span class="mui-bage" v-if="item.unread_count>0&&item.unread_count<=99">{{item.unread_count}}</span>
                  <span class="mui-bage" v-if="item.unread_count>0&&item.unread_count>99">99+</span>
                </div>
                <div class="item-info">
                  <div class="name_info">
                    <p class="namefriend mui-ellipsis">{{item.to_nickname}}</p>
                  </div>
                  <p class="chatDetail mui-ellipsis">{{item.details}}</p>
                </div>
              </div>
              <div class="box_right">
                <span class="info" style="text-align: right;color:rgb(200,200,200)">{{item.update_time}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="scrollIcon" @click="scrolltoTop" id="scrollToTop" class="footcgotop"></div>
      <div class="nogetList" v-if="nogetshow"><image src="/static/img/kongyemian_03.png"></image><p>暂无记录</p></div>
    </div>
</template>

<script type="javascript">
  export default{
    name: 'questionlist',
    props: [],
    data(){
      return{
        page:1,
        size:10,
        scrollTop:0,
        contactlist:[],
        scrollIcon:false,
        nogetshow:false,
        isposition:true,
      }
    },
    onPullDownRefresh () {
      this.page=1;
      this.contactlist=[];
      this.refresh();
      // 下拉刷新
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },
    onReachBottom () {
      this.page++;
      this.loadmore()
    },
    methods:{
      async getList() {
        let that = this;
        let data = {
          page:this.page,
          size:this.size,
          u_id:this.$store.state.user.userid,
          order:'is_read desc,create_time desc',
        };
        let res = await that.$get('/rs/contact_chats_list',data);
        if (res.code == 200){
          that.nogetshow=false;
          if(that.page==1){
            that.contactlist=[];
          }
          if (res.rows.length > 0){
            for (let i=0; i<res.rows.length; i++){
              if(!res.rows[i].to_avatar_url || res.rows[i].to_avatar_url==''){
                res.rows[i].to_avatar_url= '/static/img/policy_default.jpg';
              }
              if(res.rows[i].data_type==2){
                res.rows[i].details="[图片]"
              }else if(res.rows[i].data_type==4){
                res.rows[i].details="[语音]"
              }
              res.rows[i].update_time = this.conversionTime(res.rows[i].update_time,'-');
              that.contactlist.push(res.rows[i]);
            }

          }
        }else if (res.code == 602 && that.page == 1){
          that.nogetshow=true;
          that.contactlist=[];
        }
      },
      conversionTime(time,sign){
        if(time==null){
          return;
        }
        time=time.replace(/-/g, '/');
        var data = new Date(time);
        var month=parseInt(data.getMonth()+1);
        var months="";
        months=month;
        var day=data.getDate();
        return data.getFullYear()+sign+months+sign+day;
      },
      async refresh(){
        this.getList();
      },
      loadmore(){
        this.getList();
      },
      tonewpage(urlname,data){
        if(!urlname){return;}
        wx.navigateTo({
          url:`/pages/${urlname}/main?${data}`
        })
      },
      scrolltoTop(){
        let zhiz=this;
        if(zhiz.time){
          clearTimeout(zhiz.time);
        }
        zhiz.time=setTimeout(function(){
          zhiz.scrollIcon = false;
        },1000)
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
    computed:{
    },
    components:{
      confirm
    },
    onShow: function (option) {
      this.nogetshow = false;
      this.page=1;
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
<style>
  page{ background: rgb(234,234,234); }
</style>
<style lang="less" scoped>
    @import '../../static/less/common.less';
    .nogetList{
      margin-top:100px;
      box-sizing:border-box;
      width: 100%;
      height: 297px;
      color: #999999;
      font-size: 14px;
      text-align: center;
      margin-bottom: 50px;
      image{
        width:289px/2;
        height:296px/2;
      }
      p{
        margin-top:15px;
      }
    }
    .friend_content{
      margin-top:10px/2;
      background:#fff;
      padding-left:25px/2;
      li{
        border-top:1px solid #e3e3e3;
        padding:12px/2 0;
      }
      li:first-child{
        border:none;
      }
    }
    .box_item{
      display: flex;
      height:115px/2;
      justify-content: space-between;
    }
    .box-left_div{
      position:relative;
      .mui-bage{
        line-height: 1.1;
        display: inline-block;
        padding: 3px 6px;
        position:absolute;
        font-size:12px;
        top:-2px;
        right:-8px;
        color: #fff;
        border-radius: 100px;
        background-color: #e60012;
      }
    }
    .box_item image{
      display: block;
      float: left;
      width:115px/2;
      height:115px/2;
      border-radius:50%;
    }
    .item-info{
      text-align: left;
      margin-left: 20px/2;
    }
    .name_info{
      margin-top: 13px/2;
      height:46.875px/2;
    }
    .namefriend{
      font-size: 34px/2;
      width:328px/2;
      max-width: 354px/2;
      height:46.875px/2;
      line-height:39px/2;
      color: rgb(120,120,120);
      padding: 2px 0;
    }
    .chatDetail {
      max-width:328.125px/2;
      font-size: 28px/2;
      line-height:120%;
      color: rgb(200,200,200);
      margin-top: 13px/2;
    }
    .phone{
      max-width: 10rem;
      font-size:468px/2;
      line-height:30px/2;
      color: rgb(200,200,200);
      margin-top:15px/2;
    }
    .box_right{
      margin-right:30px/2;
      margin-top:15px/2;
      height:108px/2;
    }
    .box_left{
      display: flex;
    }
    .mui-ellipsis{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
    }
    .info{
      max-width:290px/2;
      display: inline-block;
      font-size: 21px/2;
      color:rgb(95,193,139);
      margin-top:5px/2;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
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
