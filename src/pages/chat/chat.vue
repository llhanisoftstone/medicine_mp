<template>
  <div class="mui-content" :class="{'body_ipxclass':isiphoneX}">
        <scroll-view
          @touchstart="touchStart($event)"
          @touchend="touchEnd($event)"
          @click="isMoreShow=false;"
          :scroll-y="true"
          @scroll="chatScroll"
          :scroll-with-animation="true"
          :scroll-into-view="toView"
          class="mui-scroll-wrapper"
          :style="{height:windowheight+'px'}">
          <div id="customerMessage_content" class="box">
          <div class="mui-content-padded">
            <div id="messageListData">
              <div
                v-for="(chat,indx) in chatdata"
                class="box_bd" id="messageList">
                <div v-if="indx%size==0" class="time"><span>{{chat.create_time}}</span></div>
                <!--我发送的-->
                <div
                  v-if="u_id==chat.u_id"
                  class="message me">
                  <div class="avatar bg_touxiang80">
                    <image
                      @click="showimg(useravatar,useravatar)"
                      :src="useravatar"></image>
                  </div>
                  <div v-if="chat.data_type==1" class="content">
                    <div class="sendmessage">
                      <div style="">
                        <p :id="chat.id">{{chat.details}}</p>
                      </div>
                    </div>
                  </div>
                  <div v-if="chat.data_type==2" class="content">
                    <div
                      :id="chat.id"
                      class="sendmessage imgbox">
                      <image
                        mode="widthFix"
                        @click="showimg(imgURL+chat.details,imgURL+chat.details)"
                        :src="imgURL+chat.details"></image>
                    </div>
                  </div>
                  <div v-if="chat.data_type==4" class="content">
                    <div class="sendmessage voicebox">
                      <div style="">
                        <p
                          :id="chat.id"
                          class="voicebtn v_right"
                          :class="{'play':acitveVoice==chat.id&&isStop==false}"
                          :style="{width:chat.duration*7/2+'px'}"
                          @click="play(chat.details,chat.id)"
                        >{{chat.duration}}''</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!--接收的消息-->
                <div
                  v-if="u_id!=chat.u_id"
                  class="message">
                  <div class="avatar bg_touxiang80">
                    <image
                      @click="showimg(to_avatar_url,to_avatar_url)"
                      :src="to_avatar_url"></image>
                  </div>
                  <!--文字-->
                  <div v-if="chat.data_type==1" class="content">
                    <div class="getmessage">
                      <p :id="chat.id">{{chat.details}}</p>
                    </div>
                  </div>
                  <!--图片-->
                  <div v-if="chat.data_type==2" class="content">
                    <div
                      :id="chat.id"
                      class="getmessage imgbox">
                      <image
                        @click="showimg(imgURL+chat.details,imgURL+chat.details)"
                        mode="widthFix"
                        :src="imgURL+chat.details"></image>
                    </div>
                  </div>
                  <!--音频-->
                  <div v-if="chat.data_type==4" class="content">
                    <div class="getmessage voicebox">
                      <p
                        :id="chat.id"
                        class="voicebtn v_left"
                        :class="{'play':acitveVoice==chat.id&&isStop==false}"
                        :style="{width:chat.duration*7/2+'px'}"
                        @click="play(chat.details,chat.id)"
                      >{{chat.duration}}''</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </scroll-view>
    <div class="sendarea" :class="{'sendarea_ipxclass':isiphoneX}">
      <div class="common" >
        <span
          @click="voiceBtnClick"
          v-show="action=='keyboard'"
          class="functions voice"></span>
        <span
          @click="keyboardBtnClick"
          v-show="action=='voice'"
          class="functions keyboard" ></span>
        <input
          v-show="action=='keyboard'"
          v-model.trim="sendMsg"
          type="text"
          maxlength="140"
          :ref="saytext"
          @focus=""
          :confirm-hold="true"
          cursor-spacing="5"
          @click="inputfocus=true;"
          id="saytext"
          name="saytext"
          @confirm="sendMessage"
          class="input_text"/>
        <div
          v-show="action=='voice'"
          :class="{'record-box':true,'active':recordclicked}"
          @touchstart="recordStart"
          @touchend="recordStop">{{voicetip}}</div>
        <!--<span class="functions face"></span>-->
        <template v-if="sendMsg.length>=1">
          <span
            @click="sendMessage"
            class="sendBtn">发送</span>
        </template>
        <template v-else>
          <span
            @click="inputfocus=false;isMoreShow=true;"
            class="functions more"></span>
        </template>
      </div>
      <div class="face_content">

      </div>
      <div
        v-show="isMoreShow"
        class="module more_content" >
        <div class="m_item">
          <div
            @click="sendImg('album')"
            class="img_select_box to_img" style="margin-right: 1.28rem">
            <image src="/static/img/dakaituku.png"></image>
            <p class="send_item_name">相册</p>
          </div>
          <div
            @click="sendImg('camera')"
            class="img_select_box to_camera">
            <image src="/static/img/dakaixiangji.png"></image>
            <p class="send_item_name">相机</p>
          </div>
        </div>
      </div>
      <div
        v-show="recordclicked"
        class="voicetipbox">
        <image src="/static/img/sound.gif"></image>
      </div>
    </div>
    <mptoast/>
  </div>
</template>

<script>
  import mptoast from '../../components/mptoast'
  export default{
    data(){
      return {
        action:'keyboard',
        sendMsg:'',
        isMoreShow:false,
        path:'',//音频路径
        to_u_id:'',
        u_id:'',
        chatdata:[],
        chatType:1, //类型，1-文字；2-图片；3-视频；4-语音
        to_avatar_url:'',//对方的头像
        voicetip:'按住 说话',
        recordclicked:false,
        page:1,
        size:10,
        getNodata:false,
        setTime:null,
        setTimeNum:0,
        inputfocus:false,
        windowheight:10,
        scrollTop:0,
        toView:'',
        scrollHeight:0,
        isiphoneX:false,
        acitveVoice:-1,//当前播放音频ID
        isStop:false,//播放是否暂停
        recordCancel:false,
      }
    },
    components: {
      mptoast
    },
    computed:{
      useravatar(){//当前用户头像
        return this.$store.state.userinfo.avatarUrl;
      },
      imgURL(){
        return this.$store.state.url;
      },
    },
    watch:{
      setTimeNum:{
        handler:function(oldval,newval){
            console.log('settimeNum:'+newval)
          if(newval>=59){
            this.recordStop();
          }
        },
        deep:true
      },
      sendMsg(){
        this.sendMsg=this.sendMsg.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.\,\?\<\>\。\，\-\——\=\;\！\!\+\？\、\；\$]/g,'');
      }
    },
    /*onPullDownRefresh () {
      if(this.getNodata){
        wx.stopPullDownRefresh()
        return;
      }
      wx.showNavigationBarLoading();//在标题栏中显示加载
      this.loadMore();
      // 下拉加载
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh()     //停止下拉刷新
    },*/
    /*onReachBottom () {
      this.page++;
    },*/
    methods:{
      sendMessage(){
        let that=this;
        if(that.sendMsg==''){
            return;
        }
        that.inputfocus=true;
        that.chatType=1;
        this.$socket.emit('data_chain',{
          cmd:'msgchat',
          u_id: that.$store.state.user.userid,
          to_u_id: that.to_u_id,
          type:that.chatType,
          detail:that.sendMsg
        });
        that.sendMsg=''
      },
      loadMore(){
        if(this.getNodata){
          wx.hideNavigationBarLoading(); //完成停止加载
            return;
        }
        this.page++;
        this.getChatdata();
      },
      voiceBtnClick(){
        this.action='voice';
        this.inputfocus=false;
        this.isMoreShow=false;
      },
      keyboardBtnClick(){
        this.action='keyboard';
        this.inputfocus=true;
        //this.$refs['saytext'].focus();
        this.isMoreShow=false;
      },
      watchsocket(){
        let that=this
        that.$socket.removeAllListeners('data_chain')
        that.$socket.on('data_chain',d=>{
          if(d.cmd == 'msgchat' ){
            that.toView='';
            let msg_id='msg'+Math.random().toString(36).substr(2)
            let msgdata={
                u_id: d.u_id,
                to_u_id: d.to_u_id,
                data_type:d.type,
                id:msg_id
            }
            if(d.type==4){
              msgdata.details=this.getvoiceurl(d.detail);
              msgdata.duration=this.getduration(d.detail);
            }else{
              msgdata.details=d.detail;
            }
            if(!d.create_time){
                msgdata.create_time=this.getCurrentTime();
            }
            if(d.u_id==that.u_id){
              that.chatdata.push(msgdata);
              that.pageScrollToBottom(msg_id)
            }
          }
        })
      },
      async getChatdata(){
        let that = this;
        let data={
          page:this.page,
          size:this.size,
          status:'1',
          to_id:this.to_u_id,
          u_id:this.$store.state.user.userid,
          order:'create_time desc'
        };
        let res = await that.$get('/rs/contact_chats',data);
        if (res.code == 200){
          wx.hideNavigationBarLoading(); //完成停止加载
            let chat=res.rows;
            if(res.rows){
              //res.rows[0].create_time=this.formatedate(res.rows[0].create_time);
              for(let val of chat){
                  if(this.u_id==val.to_id){
                    that.to_avatar_url=val.avatar_url;
                  }
                  if(val.data_type==4){
                    val.duration=that.getduration(val.details);
                    val.details=that.getvoiceurl(val.details);
                  }
              }
            }
          chat=chat.reverse();
          if(that.page==1){
            that.chatdata=chat;
            chat[chat.length-1].id='msg'+chat[chat.length-1].id;
            that.toView=chat[chat.length-1].id;
          }else{
            chat=chat.concat(that.chatdata);
            that.chatdata=chat;
          }
        }else if(res.code==602){
          wx.hideNavigationBarLoading(); //完成停止加载
          that.getNodata=true;
        }else{
          wx.hideNavigationBarLoading(); //完成停止加载
          that.getNodata=true;
        }
      },
      recordStart(e){
        wx.vibrateShort();
        let that=this;
        that.recordCancel=false;
        clearInterval(that.setTime);
        that.setTime=null;
        that.setTimeNum=0;
        that.$stopAudio();
        that.startXs = e.mp.changedTouches[0].clientX;
        that.startYs = e.mp.changedTouches[0].clientY;
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.record']) {
              that.$mptoast('请先开启录音权限');
              setTimeout(()=>{
                wx.openSetting();
              },1500)
              return;
            }
          }
        })
        that.inputfocus=false;
        that.recordclicked=true;
        that.voicetip='松开 结束';
        that.$startManager();
        that.setTime=setInterval(()=>{
          that.setTimeNum++;
        },1000)
      },
      recordStop(e){
        let that = this;
        that.inputfocus=false;
        clearInterval(that.setTime);
        that.setTime=null;
        that.setTimeNum=0;
        that.recordclicked=false;
        that.voicetip='按住 说话';
        if(e){
          that.endXs = e.mp.changedTouches[0].clientX;
          that.endYs = e.mp.changedTouches[0].clientY;
          console.log(this.startYs-this.endYs)
          if(that.startYs-that.endYs > 10 || that.startYs-that.endYs < 0){//上滑取消录音
            that.recordCancel=true;
          }
        }
        that.chatType=4;
        that.$stopRecorder();//停止录音
        that.$stopManager(res =>{
          let data = JSON.parse(res.data)
          // let data = res.data
          console.log(data)
          let file=res.file;
          if(file.duration<1000){
              that.$mptoast('录音时间太短');
          }else{
            if(!that.recordCancel){
              that.path = data[0].url;
              that.$socket.emit('data_chain',{
                cmd:'msgchat',
                u_id: that.$store.state.user.userid,
                to_u_id: that.to_u_id,
                type:that.chatType,
                detail:data[0].url+','+file.duration,
              });
            }
          }
        })
      },
      play(path,id){
        console.log(id)
        this.$playAudio(this.$store.state.url + path,id);
      },
      sendImg(imgType){
        let that=this;
        that.chatType=2;
        that.$uploadImg({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: [imgType],
        },function (rs) {
          let obj = JSON.parse(rs);
          console.log(obj[0])
          that.$socket.emit('data_chain',{
            cmd:'msgchat',
            u_id: that.$store.state.user.userid,
            to_u_id: that.to_u_id,
            type:2,
            detail:obj[0].url
          });
        });
        that.isMoreShow=false;
      },
      getvoiceurl(data){
          if(data){
              let str=data.split(',')
              if (str.length>=2){
                  str=str[0].toString();
                return str;
              }else{
                return '';
              }
          }
      },
      getduration(data){
        if(data){
          let time=data.split(',');
          if (time.length>=2){
            time=Math.ceil(parseInt(time[1])/1000)
            return time;
          }else{
            return 0;
          }
        }
      },
      showimg(img,arr){
        let that = this;
        wx.previewImage({
          current: img||"", // 当前显示图片的http链接
          urls: [arr] // 需要预览的图片http链接列表
        })
      },
      // 滑动开始
      touchStart(e){
        this.toView='';
        // 获取移动距离，
        this.startX = e.mp.changedTouches[0].clientX;
        this.startY = e.mp.changedTouches[0].clientY;
        //console.log('startY:'+this.startY)
      },
      // 滑动结束
      touchEnd(e,index){
        // 获取移动距离
        this.endX = e.mp.changedTouches[0].clientX;
        this.endY = e.mp.changedTouches[0].clientY;
        //console.log(this.startY-this.endY)
        if(this.startY-this.endY < 0){//下拉
          wx.showNavigationBarLoading();//在标题栏中显示加载
          this.loadMore();
        } else {//上拉

        }
      },
      pageScrollToBottom: function (msgid) {
        let that=this;
        this.$nextTick(()=>{
          that.toView=msgid
        })
      },
      getSysteminfo(){
        let that=this;
        try {
          let res = wx.getSystemInfoSync();
          if(res.model.match(/iPhone X/ig)){
            that.isiphoneX=true;
            that.windowheight=res.windowHeight-34;
          }else{
            that.isiphoneX=false;
            that.windowheight=res.windowHeight;
          }
        } catch (e) {

        }
      },
      chatScroll(e){
        console.log('scrollHeight:'+e.mp.detail.scrollHeight)
        //console.log(e.mp.detail)
        this.scrollHeight=e.mp.detail.scrollHeight;
      },
      getCurrentTime(){
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();           //秒
        var clock = year + "-";
        if(month < 10)
          clock += "0";
        clock += month + "-";
        if(day < 10)
          clock += "0";
        clock += day + " ";
        if(hh < 10)
          clock += "0";
        clock += hh + ":";
        if (mm < 10) clock += '0';
        clock += mm + ":";
        if (ss < 10) clock += '0';
        clock += ss;
        return(clock);
      },
    },
    onLoad:function (option){
        this.recordclicked=false;
        this.getNodata=false;
        this.getSysteminfo();
        this.to_u_id=option.tuid;
        this.u_id=this.$store.state.user.userid;
        console.log(this.$store.state.user);
        this.getChatdata();
        var that=this;
      this.$voice.onPlay(function (id) {
        console.log('开始播放回调'+id);
        that.isStop=false;
        that.acitveVoice=id;
      })
      this.$voice.onPause(function (id) {
        console.log('监听音频暂停事件回调'+id);
        that.isStop=true;
      })
      this.$voice.onEnded(function (id) {
        console.log('监听音频自然播放至结束的事件回调'+id);
        that.acitveVoice=-1;
        that.isStop=false;
      })

    },
    onShow:function(){
      this.recordclicked=false;
      this.isMoreShow=false;
      this.sendMsg='';
      this.page=1;
      clearInterval(this.setTime)
      this.setTime=null
      this.watchsocket();
      this.pageScrollToBottom();
    },
    onUnload:function(){
      this.$stopAudio();
      this.$stopRecorder();
      this.chatdata=[];
    },
    onHide:function(){
      this.$stopAudio();
      this.$stopRecorder();
      wx.stopBackgroundAudio()
    }
  }
</script>
<style>
  page{
    background: #f2f2f2;
    height: 100%;
  }
</style>
<style lang="less" scoped>
  @import '../../static/less/common.less';

  *{
    margin: 0;
    padding: 0;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }
  p,ul,li,div{
    padding:0;
    margin:0;
  }
  ul{
    list-style: none;
  }
  img,image{
    vertical-align: middle;
  }
  input{
    outline:none;
  }
  html, body {
    height: 100%;
    margin: 0px;
    padding: 0px;
    overflow: hidden;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
  }
  /*.mui-content{*/
    /*background: #f2f2f2;*/
    /*height: 100%;*/
    /*overflow: auto;*/
    /*position:relative;*/
  /*}*/
  #customerMessage_content {
    height: auto;
  }

  .mui-content-padded {
    margin: 0;
  }

  .mui-scroll-wrapper {
    box-sizing: border-box;
    padding-bottom: 93px/2;
  }

  /*聊天面板*/
  .sendarea{
    position: fixed;
    z-index:11;
    background-color: #fff;
    bottom: 0;
    left:0;
    width:100%;
  }
  .common{
    display: flex;
    -webkit-justify-content: space-between;
    width: 100%;
    height:90px/2;
    padding: 10px/2 20px/2;
    background: #f9f9f9;
    box-sizing: border-box;
  }

  .functions{
    width: 70px/2;
    height: 70px/2;
    vertical-align: middle;
  }
  .face{
    background: url("../../../static/img/biaoqing.png") no-repeat center center;
    background-size: 48px/2 48px/2;
  }
  .voice{
    background: url("../../../static/img/voice.png") no-repeat center center;
    background-size: 48px/2 48px/2;
  }
  .keyboard{
    background: url("../../../static/img/keyboard.png") no-repeat center center;
    background-size: 48px/2 48px/2;
  }
  .more{
    width:72px/2;
    background: url("../../../static/img/gengduo.png") no-repeat center center;
    background-size: 48px/2 48px/2;
  }

  #saytext,.record-box{
    width: 562px/2;
    height: 70px/2;
    border-radius: 12px/2;
    padding-left:10px/2 ;
    border: 1px solid #e3e3e3;
    font-size: 30px/2;
  }
  .record-box{
    text-align: center;
    color:#666666;
    line-height: 61px/2;
    &.active{
      background-color: #cccccc;
    }
  }
  .module{
    box-sizing: border-box;
    width:100%;
    height:310px/2;
    background: #f6f6f6;
    padding:36px/2 74px/2;
    border-top: 1px solid #e3e3e3;
  }

  .m_item{
    display: flex;
    text-align: center;
  }
  .m_item image{
    width:114px/2;
    height:114px/2;
  }
  .send_item_name{
    color:#999;
    font-size: 24px/2;
    height:24px/2;
    line-height: 24px/2;
    margin-top: 26px/2;
  }

  .sendBtn{
    -webkit-tap-highlight-color:transparent;
    display: block;
    float: right;
    width: 72px/2;
    height: 48px/2;
    background-color: #df5c3e;
    line-height: 48px/2;
    text-align: center;
    color: #ffffff;
    font-size: 24px/2;
    border-radius: 6px/2;
    margin-top: 10px/2;
    margin-left: 10px/2;
  }

  /*=============聊天消息框===============*/
  .voicetipbox{
    width:750px/2;
    margin:0 auto;
    text-align: center;
    position:absolute;
    bottom:500px/2;
    image{
      width:290px/2;
      height:290px/2;
    }
  }
  /*时间节点显示*/
  .time{
    margin-bottom:28px/2;
  }
  .time span{
    font-size: 24px/2;
    color: #999;
    width: 375px/2;
    margin-left: 243px/2;
    text-align: center;
  }
  /*wechat css*/
  .box {
    /*position: absolute;*/
    /*background-color: #eee;*/
    overflow: hidden;
    display: flex;
    flex-flow: column;
  }
  .box_bd {
    padding: 14px/2 20px/2;
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
  }
  .message.me {
    float: right;
    text-align: right;
    clear: right;
  }
  .message {
    margin-bottom: 24px/2;
    float: left;
    //width: 100%;
  }
  .message.me .avatar {
    float: right;
    width: 80px/2;
    height: 80px/2;
    border-radius:50%;
  }
  .message .avatar {
    width: 80px/2;
    height: 80px/2;
    cursor: pointer;
    float: left;
    border-radius:50%;
  }
  .message .content {
    overflow: hidden;
  }
  .bubble.bubble_primary {
    background-color: #fad3d8;
    margin-right: 33px/2;
  }
  .bubble {
    max-width: 70%;
    min-height: 1em;
    display: inline-block;
    vertical-align: top;
    position: relative;
    text-align: left;
    font-size: 12px/2;
    margin: 0 10px/2;
    margin-left: 32px/2;
  }
  .bubble.bubble_default {
    background-color: #fff;
  }
  .bubble.right:before, .bubble.right:after {
    left: 100%;
  }
  .bubble:before, .bubble:after {
    position: absolute;
    top: 26px/2;
    border: 6px/2 solid transparent;
    content: " ";
  }
  .bubble_cont {
    word-wrap: break-word;
    word-break: break-all;
    min-height: 25px/2;
  }
  .bubble_cont .plain {
    padding: 5px/2;
    font-size: 30px/2;
    border: 1px solid rgba(231,34,65,0.2);
  }
  pre {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    white-space: pre-wrap;
    word-break: initial;
  }
  #facebox{
    top: 2rem;
    left: 0.2rem;
  }
  .qqFace { margin-top: 0px;padding: 2px;  }
  .qqFace table td { padding: 0px 5px/2; }
  .qqFace table td img,.qqFace table td image { cursor: pointer;  }

  .message.me .avatar img,.message .avatar img,.message.me .avatar image,.message .avatar image{
    width: 80px/2;
    height: 80px/2;
    border-radius: 50%;
  }
  .face_content {
    display: none;
    height: 375px/2;
    background: #fff;
  }

  .imgupload .filecontent{
    width: 120px/2;
    height: 120px/2;
  }
  #uploadifive-file_upload_center{
    width: 120px/2;
    height: 120px/2;
  }
  .moduleitem1,.moduleitem2,.moduleitem3{
    float: left;
    padding-right: 50px/2;
  }
  .modulename{
    font-size: 30px/2;
    color: #666;
    text-align: center;
    margin: 12px/2 0 32px/2 0;
  }
  .bubble.bubble_primary.right:after {
    border-left-color: rgba(231,34,65,0.2);
    border-left-width: 10px/2;
  }


  #video {
    position: relative;
    width: 421px/2;
    height: auto;
    min-height: 328px/2;
  }
  .control {
    width: 140px/2;
    height: 140px/2;
    position: absolute;
    top: 94px/2;
    left: 140px/2;
  }


  .sendmessage {
    background-color: #fff;
    position: relative;
    font-size: 30px/2;
    float: right;
    margin-right: 15px/2;
    text-align: left;
    border-radius: 14px/2;
  }
  .sendmessageimg{
    position: relative;
    font-size: 30px/2;
    float: right;
    margin-right: 15px/2;
    border-radius: 14px/2;
  }
  .sendmessage .showloadimg{
    height: 210px/2;
    width: 164px/2;
  }
  .sendmessage p{
    line-height: 38px/2;
    max-width: 422px/2;
    color:#666;
    padding: 24px/2 26px/2;
    word-wrap: break-word; word-break: normal;
  }
  .sendmessageimg:after, .sendmessageimg:before {
    border: solid transparent;
    content: ' ';
    height: 0;
    left: 100%;
    position: absolute;
    width: 0;
  }
  .sendmessageimg:after {
    border-width: 6px/2;
    border-left-color: #fff;
    background: inherit;
    background-clip: border-box;
    background-origin: border-box;
    background-position: 20px/2 -30px/2;
    top: 10px/2;
  }

  .sendmessageimg:before {
    border-width: 8px/2;
    border-left-color: #fff;
    top: 8px/2;
  }
  .sendmessage:after, .sendmessage:before {
    border: solid transparent;
    content: ' ';
    height: 0;
    left: 100%;
    position: absolute;
    width: 0;
  }

  .sendmessage:after {
    border-width: 6px/2;
    border-left-color: #fff;
    top: 10px/2;
  }

  .sendmessage:before {
    border-width: 8px/2;
    border-left-color: #fff;
    top: 8px/2;
  }
  .sendmessage.voicebox:after {
    border-width: 6px/2;
    border-left-color: #df5c3e;
    top: 10px/2;
  }

  .sendmessage.voicebox:before {
    border-width: 8px/2;
    border-left-color: #df5c3e;
    top: 8px/2;
  }

  .sendmessage img,.sendmessage image{
    width: 200px/2;
  }

  .getmessageimg{
    position: relative;
    font-size: 30px/2;
    float: left;
    margin-left: 12px/2;
    text-align: left;
    border-radius: 14px/2;
  }
  .imgbox{

  }
  .voicebtn{
    min-width:90px/2;
    height:25px/2;
    line-height: 28px/2 !important;
    color: #ffffff !important;
    background-color: #df5c3e;
    border-radius: 10px/2;
    &.v_left{
      background:#df5c3e url("../../../static/img/voiceleft.png") no-repeat center left;
      background-size: 48px/2 48px/2;
      text-align: right;
      &.play{
        background:#df5c3e url("../../../static/img/leftplay.gif") no-repeat center left;
        background-size: 48px/2 48px/2;
      }
    }
    &.v_right{
      background:#df5c3e url("../../../static/img/voiceright.png") no-repeat center right;
      background-size: 48px/2 48px/2;
      text-align: left;
      &.play{
        background:#df5c3e url("../../../static/img/rightplay.gif") no-repeat center right;
        background-size: 48px/2 48px/2;
      }
    }
  }
  .getmessage img,.getmessage image{
    width: 200px/2;
    //max-width: 60px/2;
  }

  .getmessageimg:after, .getmessageimg:before {
    border: solid transparent;
    content: ' ';
    height: 0;
    right: 100%;
    position: absolute;
    width: 0;
  }
  .getmessage.voicebox:after {
    border-width: 6px/2;
    border-right-color: #df5c3e;
    top: 10px/2;
  }

  .getmessage.voicebox:before {
    border-width: 0;
    border-right-color: #df5c3e;
    top: 8px/2;
  }

  /*发送图片*/
  .sendmessageimg  img,.sendmessageimg  image{
    width: 40%;
    height: 40%;
    border-radius: 14px/2;
    padding: 2px;
  }
  /*发送图片end*/

  /*接收图片*/
  .getmessageimg  img,.getmessageimg  image{
    width: 40%;
    height: 40%;
    border-radius: 0.3rem;
    padding: 2px;
    background: #ffffff;
  }
  /*接收图片end*/

  .getmessage {
    background-color: #ffffff;
    position: relative;
    font-size: 30px/2;
    float: left;
    margin-left: 12px/2;
    text-align: left;
    border-radius: 14px/2;
  }
  .getmessage p{
    line-height: 38px/2;
    max-width: 445px/2;
    color:#666;
    padding: 24px/2 26px/2;
    word-wrap: break-word; word-break: normal;
  }

  .getmessage:after, .getmessage:before {
    border: solid transparent;
    content: ' ';
    height: 0;
    right: 100%;
    position: absolute;
    width: 0;
  }

  .getmessage:after {
    border-width: 6px/2;
    border-right-color: #ffffff;
    top: 10px/2;
  }

  .getmessage:before {
    border-width: 8px/2;
    border-right-color: #fff;
    top: 8px/2;
  }

  /*点击查看图片*/
  .mui-preview-image.mui-fullscreen {
    position: fixed;
    z-index: 20;
    background-color: #000;
  }
  .mui-preview-header,
  .mui-preview-footer {
    position: absolute;
    width: 100%;
    left: 0;
    z-index: 10;
  }
  .mui-preview-header {
    height: 44px/2;
    top: 0;
  }
  .mui-preview-footer {
    height: 50px/2;
    bottom: 0px;
  }
  .mui-preview-header .mui-preview-indicator {
    display: block;
    line-height: 44px;
    color: #fff;
    text-align: center;
    margin: 15px auto;
    width: 70px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    font-size: 16px;
  }
  .mui-preview-image {
    display: none;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  .mui-preview-image.mui-preview-in {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }
  .mui-preview-image.mui-preview-out {
    background: none;
    -webkit-animation-name: fadeOut;
    animation-name: fadeOut;
  }
  .mui-preview-image.mui-preview-out .mui-preview-header,
  .mui-preview-image.mui-preview-out .mui-preview-footer {
    display: none;
  }
  .mui-zoom-scroller {
    position: absolute;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    -webkit-backface-visibility: hidden;
  }
  .mui-zoom {
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
  .mui-slider .mui-slider-group .mui-slider-item img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
  .mui-android-4-1 .mui-slider .mui-slider-group .mui-slider-item img {
    width: 100%;
  }
  .mui-android-4-1 .mui-slider.mui-preview-image .mui-slider-group .mui-slider-item {
    display: inline-table;
  }
  .mui-android-4-1 .mui-slider.mui-preview-image .mui-zoom-scroller img {
    display: table-cell;
    vertical-align: middle;
  }
  .mui-preview-loading {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: none;
  }
  .mui-preview-loading.mui-active {
    display: block;
  }
  .mui-preview-loading .mui-spinner-white {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -25px;
    margin-top: -25px;
    height: 50px;
    width: 50px;
  }
  .mui-preview-image img.mui-transitioning {
    -webkit-transition: -webkit-transform 0.5s ease, opacity 0.5s ease;
    transition: transform 0.5s ease, opacity 0.5s ease;
  }
  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  p img,p image {
    max-width: 100%;
    height: auto;
  }


  .img_select_box{
    position:relative;
  }
  #facebox img{
    width: 30px/2;
    max-width: 30px/2;
    height: 30px/2;
  }
.body_ipxclass{
  margin-bottom: 68px/2 !important;
}
  .sendarea_ipxclass{
    bottom: 68px/2 !important;
  }
</style>
