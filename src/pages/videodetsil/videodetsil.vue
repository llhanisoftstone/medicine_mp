<template>
  <div class="trainingdetails">
    <div class="detailsTop" @click.stop="clickvideo()">
      <video class="video" id="video" :src="src"
        :controls="false"
        :show-fullscreen-btn="true"
        @timeupdate="bindtimeupdate($event)" @pause="bindpause()" @play="bindplay()"
      >
      </video>
      <!--<cover-image class="videobtn videoplay" v-if="videoplay" src="/static/img/videoplay.png"></cover-image>-->
      <cover-image class="videobtn videopuase" v-if="!videoplay" src="/static/img/videosuspend.png"></cover-image>
    </div>
    <div class="detailsBody">
      <div class="detailsTitle">{{detailsInfo.name}}</div>
      <div class="detailsNote" v-html="details"></div>
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
        src:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        detailsInfo:[],
        details:'',
        isok:false,
        video:null,
        time:0,
        videoplay:false,
        timei:0,
        times:[]
      }
    },
    computed:{
      imgUrl(){
        return this.$store.state.url;
      }
    },
    methods: {
      gettimes(){
        var that=this;
        this.$get('/rs/activity',{id:that.pid,time_gap:1}).then(res=> {
          if (res.code == 200) {
            that.isok=true;
            that.timei=0;
            that.times=res.rows[0].check_time_gap.split(",");
            for(var key in that.times){
              that.times[key]*=100
            }
            that.video=wx.createVideoContext("video");
            that.video.play();
            that.video.pause();
          }
        })
      },
      activityDetails(){
        let that=this;
        let data={
          id:this.pid
        }
        this.$get('/rs/activity_app',data).then(res=>{
          if(res.code == 200){
            this.detailsInfo = res.rows[0];
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
      bindtimeupdate(e){
        this.time=e.timeStamp;
        if(this.time>=this.times[this.timei]){
          this.video.pause()
          this.tonewpage("facecheck","act_id="+this.pid+"&isvideo=true")
        }
      },
      clickvideo(){
        if (this.video.action && this.video.action.method == "play") {
          this.video.pause()
        } else {
          if(this.isok&&(this.time<this.times[this.timei])){
            this.video.play()
          }else if(this.isok){
            this.tonewpage("facecheck","act_id="+this.pid+"&isvideo=true")
          }
        }
      },
      bindpause(){
        this.videoplay=false
      },
      bindplay(){
        this.videoplay=true
      }
    },
    onLoad:function (option) {
      this.pid = option.pid;
      this.gettimes();
      this.activityDetails();
    },
    onUnload:function(){
      this.timei=0;
      this.time=0;
      this.times=[];
      this.detailsInfo=[];
      this.details="";
      this.isok=false;
      this.video=null;
      this.videoplay=false;
    },
    onShow:function(){
      var that=this;
      if(this.$store.state.rlstatus==1){
          if(that.timei==that.times.length-1){
            that.timei=0;
          }
          that.$store.commit('getrlstatus', 0);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/less/common.less';
  body,div,span,p,ul,li,a{margin:0;padding:0;border:0;box-sizing: border-box};

  .detailsTop{
    position: relative;
    .video{
      width: 100%;
      height: 376px/2;
    }
    .videobtn{
      width: 104/2px;
      height:104/2px;
      position: absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      margin:auto;
    }
  }

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
