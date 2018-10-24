<template>
    <div>
        <ul class="companylist">
          <li v-for="(item,i) in company_list" @click.stop="tonewpage('company','pid='+item.id)">
            <div class="box-left"><image v-if="item.picpath" :src="item.picpath"></image><image v-if="!item.picpath" src="/static/img/policy_default.jpg"></image></div>
            <div class="box-center">
              <div class="name mui-ellipsis">{{item.name}}</div>
              <div class="taglist mui-ellipsis" ><span v-for="(itetag,t) in item.taglist">{{itetag}}</span></div>
              <div class="detatils mui-ellipsis">{{item.name}}</div>
            </div>
            <div class="box-right"></div>
          </li>
        </ul>
      <div v-if="scrollIcon" @click="scrolltoTop" id="scrollToTop" class="footcgotop"></div>
      <div class="nogetList" v-if="nogetshow">暂无记录</div>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'morecompany',
        props: [],
        data(){
            return {
              scrollTop:0,
              page:1,
              size:10,
              scrollIcon:false,
              nogetshow:false,
              isposition:true,
              company_list:[],
            }
        },
      onPullDownRefresh () {
        this.page=1;
        this.company_list=[];
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
        tonewpage(urlname,data){
          wx.navigateTo({
            url:`/pages/${urlname}/main?${data}`
          })
        },
        async getList() {
          let that = this;
          let data = {
            page:this.page,
            size:this.size,
            status:'1',
            order:'create_time desc',
          };
          let res = await that.$get('/rs/company',data);
          if (res.code == 200){
            that.nogetshow=false;
            if (res.rows.length > 0){
              for (let i=0; i<res.rows.length; i++){
                  if(!res.rows[i].picpath || res.rows[i].picpath==''){
                  res.rows[i].picpath= '';
                 }else{
                  res.rows[i].picpath = that.$store.state.url+res.rows[i].picpath;
                  }
                  if(res.rows[i].tag){
                      res.rows[i].taglist=res.rows[i].tag.split(",");
                  }else{
                    res.rows[i].taglist=[];
                  }
              }
              that.company_list = that.company_list.concat(res.rows);
            }
          }else if (res.code == 602 && that.page == 1){
            that.nogetshow=true;
          }
        },
        async refresh(){
          this.getList();
        },
        loadmore(){
          this.getList();
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
      onLoad: function (option) {
        this.nogetshow = false;
        this.company_list=[];
        this.page=1
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
    .nogetList{
      padding-top: 290px;
      box-sizing:border-box;
      background: url(../../../static/img/konhyemain.jpg) center 100px no-repeat;
      background-size:145px 148px;
      width: 100%;
      height: 297px;
      color: #999999;
      font-size: 14px;
      text-align: center;
      margin-bottom: 50px;
    }
  .companylist{
    padding:0 25px/2;
    li{
      border-bottom:1px solid #e2e2e2;
      padding:37px/2 30px/2;
      display:flex;
      justify-content: flex-start;
      align-items: center;
      position:relative;
      .box-left{
        width:125px/2;
        height:125px/2;
        border-radius:50%;
        margin-right:30px/2;
        image{
          width:125px/2;
          height:125px/2;
          border-radius:50%;
        }
      }
      .box-center{
        width:440px/2;
        margin-right:40px/2;
        .name{
          font-size:14px;
          color:#333;
          width:440px/2;
        }
        .taglist{
          font-size:21px/2;
          color:#666;
          width:440px/2;
          margin-top:10px/2;
          span{
            background:#eaeaea;
            padding:0 5px;
            height:32px;
            line-height:32px/2;
            margin-right:10px/2;
            border-radius:20px/2;
          }
        }
        .detatils{
          font-size:18px/2;
          margin-top:10px/2;
          color:#666;
          width:440px/2;
        }
      }
      .box-right{
        position:absolute;
        right:30px/2;
        width:18px/2;
        height:37px/2;
        background:url(../../../static/img/arrorcompany.png) no-repeat center center;
        background-size:18px/2 37px/2;
      }
    }
    .mui-ellipsis{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
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
  }
</style>
