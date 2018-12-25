<template>
    <div class="trainingdetails">
      <div class="detailsTop">
        <image :src="imgUrl+detailsInfo.pic_path" v-if="detailsInfo.pic_path"></image>
        <image src="/static/img/pxjg_moren.png" v-else></image>
      </div>
      <div class="detailsBody">
        <div class="detailsTitle">{{detailsInfo.name}}</div>
        <ul>
          <li>
            <div class="liLeft"><image src="/static/img/huodongdizhi.png" class="dizhiImg"></image>培训地址</div>
            <div class="liBorder"></div>
            <div class="liRight">{{detailsInfo.p_name}}{{detailsInfo.c_name}}{{detailsInfo.z_name}}{{detailsInfo.address}}</div>
          </li>
          <li>
            <div class="liLeft"><image src="/static/img/huodongshijian.png" class="shijianImg"></image>培训时间</div>
            <div class="liBorder"></div>
            <div class="liRight">{{detailsInfo.start_time}} 至 {{detailsInfo.end_time}}</div>
          </li>
        </ul>
        <div class="detailsNote" v-html="details"></div>
      </div>
      <div class="signIn">
        <div class="signInBtn" @click="tonewpage('mapdetail','act_id='+detailsInfo.id)" v-if="detailsInfo.count < 1">签到打卡</div>
        <div class="signInBtn"
             v-show="detailsInfo.scenc.length < detailsInfo.pic_count"
             @click="tonewpage('takephoto','type=2&act_id='+detailsInfo.id)"
             v-else
        >上传现场照</div>
      </div>
    </div>
</template>

<script type="javascript">
    import mptoast from '../../components/mptoast';
    export default {
        name: 'trainingdetails',
        data(){
          return {
            pid:"",
            detailsInfo:[],
            details:''
          }
        },
        computed:{
          imgUrl(){
            return this.$store.state.url;
          }
        },
        methods: {
          activityDetails(){
            let that=this;
            let data={
              id:this.pid
            }
            this.$get('/rs/activity_app',data).then(res=>{
              if(res.code == 200){
                this.detailsInfo = res.rows[0];
                this.detailsInfo.start_time = this.detailsInfo.start_time.slice(0,16);
                this.detailsInfo.end_time = this.detailsInfo.end_time.slice(0,16);
                let details=res.rows[0].details;
                let aimurl = 'src="'+that.$store.state.url+"/upload/";
                details=details.replace(/src=\"\/upload\//g, aimurl);
                that.details=details.replace(/\<img(.+?)src\=\"(.+?)\".+?\>/g,"<img style='max-width:100%;width:90%;height:auto' src='$2'>")
                if(this.detailsInfo.scene_pics){
                  this.detailsInfo.scenc = res.rows[0].scene_pics.split(",");
                }else{
                  this.detailsInfo.scenc = []
                }
              }
            })
          },
          tonewpage(urlname,data){
            if(!urlname){return;}
            wx.navigateTo({
              url:`/pages/${urlname}/main?${data}`
            })
          },
        },
        onLoad:function (option) {
          this.pid = option.pid;
          this.activityDetails();
        }
    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    body,div,span,p,ul,li,a{margin:0;padding:0;border:0;box-sizing: border-box};
    .mui-ellipsis{
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    .trainingdetails{
      background-color: #fff;
    }
    .detailsTop{
      width: 100%;
      height: 376px/2;
      image{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .detailsBody{
      width: 100%;
      height: auto;
      padding: 0 26px/2;
      .detailsTitle{
        width: 100%;
        height: auto;
        font-size: 30px/2;
        color: #666;
        border-bottom: 1px solid #e2e2e2;
        padding: 20px/2;
        word-wrap: break-word;
        word-break: normal;
      }
      ul{
        width: 100%;
        height: auto;
        li{
          width: 100%;
          height: 80px/2;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #e2e2e2;
          .liLeft{
            width: 200px/2;
            height: 100%;
            color: #666;
            font-size: 26px/2;
            display: flex;
            align-items: center;
            padding-left: 23px/2;
            .dizhiImg{
              width: 26px/2;
              height: 35px/2;
              margin-right: 14px/2;
              margin-left: 5px/2;
            }
            .shijianImg{
              width: 35px/2;
              height: 36px/2;
              margin-right: 12px/2;
            }
          }
          .liBorder{
            width: 1px;
            height: 30px/2;
            background-color: #e2e2e2;
          }
          .liRight{
            width: 550px/2;
            height: auto;
            font-size: 26px/2;
            color: #666;
            margin-left: 18px/2;
            word-wrap: break-word;
            word-break: normal;
          }
        }
      }
      .detailsNote{
        font-size: 26px/2;
        text-align: justify;
        color: #666;
        line-height: 40px/2;
        text-indent:52px/2;
        margin-top: 28px/2;
        margin-bottom: 135/2px;
        display: inline-block;
        word-break: break-all;
      }
    }
    .signIn{
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      background-color: #fff;
      position: fixed;
      bottom: 0;
      z-index: 99;
      .signInBtn{
        width: 538px/2;
        height: 70px/2;
        line-height: 70px/2;
        text-align: center;
        color: #fff;
        font-size: 32px/2;
        background-color: #df5c3e;
        border-radius: 70px/2;
        margin: 31px/2 0;
      }
    }
</style>
