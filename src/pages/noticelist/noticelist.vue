<template>
  <div class="mui-content ">
      <ul class="content-box" >
        <li v-for="(item,idx) in seasondata"
            @click.stop="tonewpage('noticedetail','pid='+item.id)"
            :key="idx">
          <div class="left-item">
            <p class="title">{{item.name}}</p>
            <p class="date">{{item.create_time}}</p>
          </div>
          <image :src="item.list_pic_path"></image>
        </li>
      </ul>
      <div class="nogetList" v-show="iskong">暂无信息</div>
      <div v-if="scrollIcon" @click="scrolltoTop" id="scrollToTop" class="footcgotop"></div>
  </div>
</template>
<script type="javascript">
  export default {
    name: 'fourseasons',
    props: [],
    data () {
      return {
        iskong:false,
        istop:false,
        page:1,
        size:6,
        scrollIcon:false,
        scrollTop:0,
        seasondata:[],
        type:"",
        compid:''
      }
    },
    methods: {
      tabclickbtn(eq){
        this.type=eq
        this.page=1;
        this.seasondata=[];
        this.refresh();
      },
      tonewpage(urlname,data){
        wx.navigateTo({
          url:`/pages/${urlname}/main?${data}`
        })
      },
      async refresh(){
        this.getlistdata();
      },
      loadmore () {
        this.getlistdata();
      },
      async getlistdata(pid){
        let that = this;
        let data={
          page:this.page,
          size:this.size,
          status:"1",
          order:'is_main desc,sequence desc,create_time desc',
          comp_id:this.compid
        };
        let res = await that.$get('/rs/notify/',data);
        if(res.code==200){
          that.iskong=false;
          if(that.page==1){
            that.seasondata=[];
          }
          if(res.rows.length>0){
            for(var i=0;i<res.rows.length;i++){
              if(res.rows[i].list_pic_path){
                res.rows[i].list_pic_path=that.$store.state.url+res.rows[i].list_pic_path;
              }else{
                //res.rows[i].list_pic_path='/static/img/default_img/moren227141.jpg';
              }
              res.rows[i].create_time = this.commons.getDate(res.rows[i].create_time);
            }
            if(that.page==1){
              that.seasondata=res.rows;
            }else{
              that.seasondata=that.seasondata.concat(res.rows);
            }
          }
        }else if(res.code==602 &&that.page==1){
          that.iskong=true;
          that.seasondata=[];
        }
      },
      scrolltoTop(){
        if (wx.pageScrollTo) {
          wx.pageScrollTo({
            scrollTop: 0,
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
    onPageScroll:function(res){
      let top = res.scrollTop;
      if (top > 400) {
        this.scrollIcon = true;
      } else {
        this.scrollIcon = false;
      }
    },
    onPullDownRefresh () {
//      wx.showNavigationBarLoading() //在标题栏中显示加载
      this.page=1;
      this.seasondata=[];
      this.refresh();
      // 下拉刷新
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },
    onReachBottom () {
      this.page++;
      this.loadmore()
    },
    onLoad: function (option) {
      this.page=1;
      this.type=1;
      this.seasondata=[];
      this.iskong=false;
      this.compid=option.pid;
      this.getlistdata(option.pid);
    },
    onUnload:function (){
      this.seasondata=[];
    }
  }
</script>

<style scoped lang="less">
  @import "../../static/less/common.less";
  p{
    margin-bottom: 0;
  }
  .ellipsis(@count:1){
    display: -webkit-box;
    -webkit-line-clamp: @count;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .content-box{
    margin:0;
    li{
      border-top: 1px solid #e2e2e2;
      padding:20px/2 28px/2;
      display:flex;
      justify-content: space-between;
      width:100%;
      box-sizing: border-box;
      .left-item{
        width:458px/2;
        position:relative;
      }
      .title{
        color:@color_666;
        font-size: 28px/2;
        line-height: 38px/2;
        padding-top: 8px/2;
        word-break:break-all;
        .ellipsis(2);
      }
      .date{
        font-size: 18px/2;
        color:@color_99;
        position:absolute;
        bottom:0;
      }
      image{
        width:227px/2;
        height:141px/2;
      }
    }
  }
  .nogetList{
    padding-top: 594px/2;
    background: url("../../../static/img/konhyemain.jpg") center 258px/2 no-repeat;
    background-size: 289px/2 296px/2;
    width: 100%;
    height: 594px/2;
    color:@color_99;
    font-size:28px/2;
    text-align: center;
    margin-bottom:30px;
  }
  .footcgotop{
    position: fixed;
    z-index: 100;
    bottom: 100px/2;
    right: 30px/2;
    width: 82px/2;
    height: 82px/2;
    background:url('../../../static/img/scrollTop.png') center no-repeat;
    background-size: 82px/2 82px/2;
  }
</style>
