<template>
    <div class="bg_color">
      <div class="userurl_box">
        <div class="my_box">
          <!--<p>挑战者</p>-->
          <ul>
            <li v-if="challenger==user.userid"><image :src="userinfo.avatarUrl"></image></li>
            <li v-if="(challenger!=user.userid)&&i==0" v-for="(v,i) in team"><image :src="v.picpath"></image></li>
          </ul>
        </div>
        <div class="team_box">
          <!--<p>亲友团</p>-->
          <ul>
            <li v-if="challenger!=user.userid"><image :src="userinfo.avatarUrl"></image></li>
            <li v-for="(v,i) in team" v-if="i!=0&&i<13"><image :src="v.picpath"></image></li>
          </ul>
        </div>
      </div>
      <h2 v-if="isprop">您使用了延迟针，时间延长了20s</h2>
      <!--答题模块-->
      <div class="time_box" v-if="isstart&&iswin==0">
        <counddown :time="times"></counddown>
      </div>
      <div class="answer" v-if="isstart&&iswin==0">
        <answer :title="answer.category_name" :answer="answer.name" distance="1">
          <ul slot="list" class="answer_box_ul">
            <li :class="{'correct':v.right&&isshow,'n_correct':index==i&&isshow&&!v.right}" v-for="(v,i) in answer.answer_json" v-on:click="submit(i,v.right)">{{v.answer}}<span>{{stat[i]}}人</span></li>
          </ul>
        </answer>
      </div>
      <p class="provide" v-if="isstart&&iswin==0">本题由{{answer.organiz_name}}提供</p>
      <!--邀请模块-->
      <div class="invite_box" v-if="iswin==0&&!isstart">
        <image src="/static/img/yaoqing.png"></image>
        <div :class="{'disabled':challenger!=user.userid}" @click="startgame">开始游戏</div>
      </div>
      <!--答题结果-->
      <div class="result" v-if="gameover">
        <h1>
          <image src="/static/img/t_suc.png" v-if="iswin==2"></image>
          <image src="/static/img/t_fail.png" v-if="iswin==1"></image>
        </h1>
        <div class="prize" v-if="iswin==2">
          <div class="team_prize">
            <image src="/static/img/pri.png"></image>
          </div>
          <div class="challenger">
            <image class="user" v-if="challenger==user.userid" :src="userinfo.avatarUrl"></image>
            <image class="user" v-if="(challenger!=user.userid)&&i==0" v-for="(v,i) in team" :src="v.picpath"></image>
            <image class="tz" src="/static/img/tz.png"></image>
          </div>
          <ul class="c_prize">
            <li v-if="card.id">
              <div>
                <image :src="url+card.ticket_pic"></image>
              </div>
              <p>{{card.title}}</p>
            </li>
            <li>
              <div>
                <image src="/static/img/sucm.png"></image>
              </div>
              <p>银两+20</p>
            </li>
          </ul>
        </div>
        <div class="fail" v-if="iswin==1">
          <image src="/static/img/team_fail.png"></image>
        </div>
      </div>
      <div class="result_btn">
        <a href="" v-if="iswin==2&&isnext" @click="next" :class="{'disabled':challenger!=user.userid}">挑战下一关</a>
        <button open-type="share" v-if="iswin==2">分享战绩</button>
        <a href="" v-if="iswin==1" @click="repeat" :class="{'disabled':challenger!=user.userid}">重新开始</a>
      </div>
      <!--聊天模块-->
      <div class="chat_box">
        <div class="chat_t">
          <i></i>
          <image src="/static/img/chat.png"></image>
          <span>讨论区</span>
          <i></i>
        </div>
        <scroll-view style="height:147px;" scroll-y="true" :scroll-top="scrollTop">
          <ul class="chat_list">
            <li v-for="(v,i) in chat">
              <span>{{v.nickname}}</span>：
              <span>{{v.msg}}</span>
            </li>
          </ul>
        </scroll-view>
      </div>
      <div class="publish_box">
        <div>
          <input type="text" v-model="content" cursor-spacing='15'>
        </div>
        <a class="send_btn" @click="send">发表</a>
        <a @click="userTools(user.tools[0].amount,1)" href="" v-if="challenger==user.userid"><image src="/static/img/daojushangdian_11.png"></image><span>{{user.tools[0].amount}}</span></a>
        <a @click="userTools(user.tools[1].amount,2)" href="" v-if="challenger==user.userid"><image src="/static/img/daojushangdian_13.png"></image><span>{{user.tools[1].amount}}</span></a>
      </div>
    </div>
</template>

<script type="javascript">
  import counddown from '../../components/countdown.vue'
  import answer from '../../components/answer.vue'

  export default {
        name: 'team',
        data(){
            return {
              challenger:'',          //挑战者id
              isprop:false,      //使用道具之后的提示
              times:30,
              isshow:false,          //是否显示答案
              isstart:false,           //是否开始游戏
              scrollTop:0,           //聊天滚动条高度
              stat:[],                //统计信息
              team:[],               //亲友团
              chat:[],                   //聊天信息
              content:'',                 //输入框内容
              gameover:false,              //游戏是否结束
              isclick:false,                   //是否选择答案
              index:-1,                     //选择的选项
              iswin:0,                    //  1失败  2成功
              isnext:true,                //是否有下一关
              tool_id:[],                 //使用过的道具id
              istime:false,                   //是否使用过延时
              timesfn:null                     //定时器
            }
        },
        methods: {
          userTools(nub,id){
              if(!this.isstart){
                  return
              }
              if(this.gameover){
                  return
              }
              if(this.isclick){
                  return
              }
              if(this.challenger != this.$store.state.user.userid){
                  return
              }
              if(this.times == 0){
                return
              }
            if(nub>0){
              console.log(`使用道具${id}`)
              if(Number(id) == 1){
                for(let i=0;i<this.$store.state.answer.answer_json.length;i++){
                  if(this.$store.state.answer.answer_json[i].right){
                    let use = this.$store.state.user
                    use.tools[0].amount = use.tools[0].amount-1
                    this.$store.commit('getm_user',use)
                    this.answernub = this.$store.state.user.tools[0].amount
                    this.timenub = this.$store.state.user.tools[1].amount
                    this.tool_id.push(Number(id))
                    this.submit(i,this.$store.state.answer.answer_json[i].right)
                  }
                }
              }else if(Number(id) == 2){
                  if(this.istime){
                      return
                  }
                  if(this.times == 0){
                      return
                  }
                  this.istime=true
                this.isprop=true
                this.times += 20
                let use =this.$store.state.user
                use.tools[1].amount = use.tools[1].amount-1
                this.$store.commit('getm_user',use)
                this.answernub = this.$store.state.user.tools[0].amount
                this.timenub = this.$store.state.user.tools[1].amount
//                this.tool_id.push(Number(id))
                this.$socket.emit('data_chain',{
                    cmd:'tool',
                    u_id: this.$store.state.user.userid,
                    tool_id: Number(id),
                    room_id: this.$store.state.room_id
                })
                setTimeout(()=>{
                  this.isprop=false
                },1000)
              }
            }
          },
            countdownfn(){     //倒计时
              let that=this
              if(!that.isstart){
                  return
              }
              if(that.gameover){
                return
              }
              if(that.times == 0){
                return
              }
              that.times=that.times-1
            },
            startgame(){    //开始游戏
              let that = this
                if(this.challenger == that.$store.state.user.userid){
                    that.$socket.emit('data_chain',{
                      cmd:'fight',
                      u_id:that.challenger,
                      level:that.$store.state.level,
                      game_cfg_id:2,
                      game_type:2,
                      game_style:3
                    })
                }
            },
            repeat(){   //重新开始
              let that = this
              if(this.challenger == that.$store.state.user.userid){
                that.$socket.emit('data_chain',{
                  cmd:'fight',
                  u_id:Number(that.challenger),
                  level:that.$store.state.level,
                  game_cfg_id:2,
                  game_type:2,
                  game_style:3,
                  play_again:1
                })
              }
            },
            next(){    //挑战下一关
              if(this.challenger != this.$store.state.user.userid){
                  return
              }
              wx.setNavigationBarTitle({
                title:`第${this.$store.state.step}/${this.$store.state.max_nub}题`
              })
              this.$socket.emit('data_chain',{
                cmd:'fight',
                u_id:this.challenger,
                level:this.$store.state.level,
                game_cfg_id:2,
                game_type:2,
                game_style:4
              })
            },
            cleardata(){
              this.istime=false
              this.iswin=0
              this.index=-1
              this.isclick=false
              this.challenger=''
              this.isprop=false
              this.times=30
              this.isshow=false
              this.isstart=false
              this.gameover=false
              this.scrollTop=0
              this.stat=[]
              this.team=[]
              this.chat=[]
              this.tool_id=[]
              this.content=''
              this.$store.commit('get_room','')
              clearInterval(this.timesfn)
              this.timesfn=null
            },
          send(){       //发送聊天
            let that =this
            if(that.content.replace(/(^\s*)|(\s*$)/g, "")!=''){
                  //发送聊天内容
              that.$socket.emit('data_chain',{
                  cmd:'chat',
                  u_id:that.$store.state.user.userid,
                  room_id:that.$store.state.room_id,
                  data:that.content.replace(/(^\s*)|(\s*$)/g, ""),
                  type:1
              })
              that.content=''
            }
          },
          submit(index,right){    //提交答案
            if(this.isclick){
                return
            }
            let that=this
            that.isclick=true
            that.index=index
            if(that.challenger == that.$store.state.user.userid){
              that.isshow = true    //显示答案
              let reply=0
              if(right){
                  reply=1
              }
              that.$socket.emit('data_chain', {
                cmd:'answer',
                room_id:that.$store.state.room_id,
                u_id:that.$store.state.user.userid,
                level:that.$store.state.level,
                reply:index,   //回答内容
                score:reply,   // 得分
                tool_id: that.tool_id,   // 使用道具
                use_time:(30-this.times)>0?30-this.times:0,   //使用时间   -1 自己延时
                step:that.$store.state.step
              })
            }else{
                that.$socket.emit('data_chain',{
                  cmd:'chat',
                  type:5,
                  room_id:that.$store.state.room_id,
                  u_id:that.$store.state.user.userid,
                  level:that.$store.state.level,
                  step:that.$store.state.step,
                  data:JSON.stringify(that.index)
                })
            }
          },
          overtime(){
            let that=this
            if(!that.isclick){
              that.$socket.emit('data_chain', {
                cmd:'answer',
                room_id:that.$store.state.room_id,
                u_id:that.$store.state.user.userid,
                level:that.$store.state.level,
                tool_id: that.tool_id,   // 使用道具
                use_time:-1,   //使用时间   -1 自己延时
                step:that.$store.state.step
              })
            }
          },
          join(){    //加入房间
              let that = this
            console.log("加入房间")
              that.$socket.emit('data_chain',{
                  cmd:'fight',
                  game_cfg_id:2,
                  game_type:2,
                  u_id:that.$store.state.user.userid,
                  to_u_id:that.challenger,
                  game_style:2
              })
          }
        },
        watch:{
          times(val,oldval){
            if(val == 0){
                if(this.challenger == this.$store.state.user.userid){
                  this.overtime()
                }
            }
          }
        },
        components: {
          counddown,
          answer
        },
        computed:{
            userinfo(){
                return this.$store.state.userinfo
            },
            answer(){
                  return this.$store.state.answer
            },
            user(){
                  return this.$store.state.user
            },
            card(){
                return this.$store.state.prize
            },
            url(){
                return this.$store.state.url
            }
        },
    onShareAppMessage(res){
      if (res.from === 'menu') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '分享战绩',
        path: '/pages/index/main',
        success: (r)=>{
          console.log(r)
        },
        fail: (err)=>{
          console.log(err)
        }
      }
    },
    onLoad(option){
      let that =this
      that.cleardata()
      clearInterval(that.timesfn)
      that.timesfn=setInterval(()=>{
        that.countdownfn()
      },1000)
      that.challenger=option.id
      if(that.challenger == that.$store.state.user.userid){
        that.team.push({
          id:that.$store.state.user.userid,
          nickname:that.$store.state.userinfo.nickName,
          picpath:that.$store.state.userinfo.avatarUrl
        })
      }
      if(!that.$store.state.issocket) {
        that.$socket.emit('data_chain', {
          cmd: 'login',
          u_id: that.$store.state.user.userid,
          nickname: that.$store.state.userinfo.nickName,
          picpath: that.$store.state.userinfo.avatarUrl
        })
      }
      if(that.$store.state.issocket){
        if(option.ismy == 1&&that.challenger == that.$store.state.user.userid){
          that.join()
        }else{
          if(that.challenger != that.$store.state.user.userid){
              console.log("直接加入房间")
            that.join()
          }
        }
      }
      that.$socket.removeAllListeners('data_chain')
      that.$socket.on('data_chain',d=>{
        if(d.cmd=='login'){
          if(option.ismy == 1){
            that.join()
          }else{
            if(that.challenger != that.$store.state.user.userid){
              that.$store.commit('getsocket')
              that.join()
            }
          }
        }else if(d.cmd =='fight'){
            console.log('多人测试')
            console.log(d)
          that.$store.commit('get_room',d.room_id)
          if(that.$store.state.user.userid==d.u_id){
            that.chat.unshift({
              nickname:'【系统】',
              msg:`${that.$store.state.userinfo.nickName}加入房间`
            })
          }else{
              let fl=false
              for(let i=0;i<that.team.length;i++){
                  if(that.team[i].id == d.user[0].id){
                    fl=true
                  }
              }
              if(!fl){
                that.chat.unshift({
                  nickname:'【系统】',
                  msg:`${d.user[0].nickname}加入房间`
                })
              }
          }
          if(d.user){
            for(let i=0;i<d.user.length;i++){
              let flag=false
              for(let j=0;j<that.team.length;j++){
                if(that.team[j].id == d.user[i].id){
                  flag=true
                }
              }
              if(!flag){
                that.team.push(d.user[i])
              }
            }
          }
        }else if(d.cmd == 'left'){
          if(d.u_id == that.challenger){
            wx.showModal({
              title: '提示',
              content: '挑战者已退出游戏',
              showCancel:false,
              confirmText:'返回首页',
              confirmColor:'#df5c3e',
              mask:true,
              complete: function(res) {
                  wx.switchTab({
                    url:`/pages/index/main`
                  })
                  that.$socket.emit('data_chain',{
                    cmd:'left',
                    room_id:that.$store.state.room_id,
                    u_id:that.$store.state.user.userid,
                    game_cfg_id:2,
                    game_type:2
                  })
                  console.log('用户点击确定')
              }
            })
          }else{
            for(let i=0;i<that.team.length;i++){
              if(that.team[i].id == d.u_id){
                that.chat.unshift({
                  nickname:'【系统】',
                  msg:`${that.team[i].nickname}离开房间`
                })
                that.team.splice(i,1)
                break
              }
            }
          }
        }else if(d.cmd == 'chat') {
          if (d.type == 1) {
            if (d.u_id == that.$store.state.user.userid) {
              that.chat.unshift({
                nickname: that.$store.state.userinfo.nickName,
                msg: d.data
              })
            } else {
              for (let i = 0; i < that.team.length; i++) {
                if (that.team[i].id == d.u_id) {
                  that.chat.unshift({
                    nickname: that.team[i].nickname,
                    msg: d.data
                  })
                }
              }
            }
          } else if (d.type == 5) {
            for (let i = 0; i < d.stat.length; i++) {
              console.log("统计信息")
              console.log(d.stat)
              if (d.stat[i]) {
                that.stat[i] = Number(d.stat[i])
              }
            }
            if (d.u_id == that.$store.state.user.userid) {
              that.chat.unshift({
                nickname: '【系统】',
                msg: `${that.$store.state.userinfo.nickName}已选择`
              })
            } else {
              for (let i = 0; i < that.team.length; i++) {
                if (that.team[i].id == d.u_id) {
                  that.chat.unshift({
                    nickname: '【系统】',
                    msg: `${that.team[i].nickname}已选择`
                  })
                }
              }
            }
          } else if (d.type == 6) {
            wx.setNavigationBarTitle({
              title: `第${that.$store.state.step}/${that.$store.state.max_nub}题`
            })
            that.gameover = false
            that.iswin = 0
            that.chat.unshift({
              nickname: '【系统】',
              msg: '下一关挑战开始'
            })
          }
        }else if(d.cmd == 'tool'){
          if(that.challenger != that.$store.state.user.userid){
            this.isprop=true
            this.times += 20
            setTimeout(()=>{
              this.isprop=false
            },1000)
          }
        }else if(d.cmd == 'answer'){
          that.$store.commit('get_room',d.room_id)
          if((that.challenger != that.$store.state.user.userid)&&(that.$store.state.f_level==0)){
            that.$store.commit('get_f_level',d.level)
          }
          if(d.content_type == 1){
                let level = that.challenger == that.$store.state.user.userid?that.$store.state.level:that.$store.state.f_level
            if(d.level == level){
              let til
              clearInterval(til)
              that.isshow=true
              that.index = d.other_reply == null?-1:d.other_reply
              til=setTimeout(function(){
                that.iswin=0
                that.gameover=false
                that.index=-1
                that.times=30
                that.isclick=false
                that.isshow=false
                that.isstart=true
                that.istime=false
                that.stat=[]
                that.tool_id=[]
                for(let i=0;i<d.details[0].answer_json.length;i++){
                  that.stat.push(0)
                }
                that.$store.commit('get_answer',d.details[0])
                if(that.challenger != that.$store.state.user.userid){
                  that.$store.commit('get_f_level',d.level)
                }else{
                  that.$store.commit('get_level',d.level)
                }
                that.$store.commit('get_step',d.step)
                that.$store.commit('get_max_nub',d.max_step)
                wx.setNavigationBarTitle({
                  title:`第${that.$store.state.step}/${that.$store.state.max_nub}题`
                })
              },1000)
            }else{    //当前关卡结束
              let useri = that.$store.state.user
              if(that.challenger == that.$store.state.user.userid){
                if(Number(d.level)>Number(useri.game_level)){
                  useri.game_level = d.level
                  that.$store.commit('getm_user',useri)
                }
              }
              if(that.challenger != that.$store.state.user.userid){
                that.$store.commit('get_f_level',d.level)
              }else{
                that.$store.commit('get_level',d.level)
              }
              that.$store.commit('get_step',d.step)
              that.$store.commit('get_max_nub',d.max_step)
              that.iswin = 2
              that.gameover=true
              that.index=-1
              that.times=30
              that.isclick=false
              that.isshow=false
              that.isstart=true
              that.stat=[]
              that.tool_id=[]
              if(d.details[0]){
                that.$store.commit('get_prize',d.details[0])
              }else{
                that.$store.commit('get_prize',{})
              }
            }
          }else if(d.content_type == 2){    //全部挑战结束
            that.isnext=false
            that.iswin = 2
            that.gameover=true
            if(d.details[0]){
              that.$store.commit('get_prize',d.details[0])
            }else{
              that.$store.commit('get_prize',{})
            }
          }else if(d.content_type == 3){       //挑战失败
            that.isshow=true
            that.index = d.other_reply == null?-1:d.other_reply
            setTimeout(()=>{
              that.$store.commit('get_prize',{})
              that.gameover=true
              that.iswin=1
              that.isshow=false
              that.index = -1
            },1000)
          }
        }
        console.log(d)
      })

    },
    onUnload(){
        let that =this
        that.$store.commit('get_f_level',0)
        that.$socket.emit('data_chain',{
            cmd:'left',
            room_id:that.$store.state.room_id,
            u_id:that.$store.state.user.userid,
            game_cfg_id:2,
            game_type:2
        })
      that.$socket.removeAllListeners('data_chain')
      that.cleardata()
    },
    onHide(){
        console.log("隐藏页面")
      that.$socket.removeAllListeners('data_chain')
    }
  }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .bg_color{
      background: #fff3f3;
      padding-top: 18px/2;
      height: 100%;
    }
    .userurl_box{
      width: 100%;
      height: auto;
      display: flex;
      box-sizing: border-box;
      padding: 0 41px/2;
    }
    .my_box{
      width: 140px/2;
      height: 140px/2;
      margin-right:33px/2;
      /*display: flex;*/
      /*flex-wrap: wrap;*/
      /*margin-bottom:20px/2;*/
      /*align-items: center;*/
      p{
        padding-left: 26px/2;
        padding-right: 14px/2;
        font-size: 32px/2;
        color: #333;
      }
      ul{
        display: flex;
        align-items: center;
        height: 140px/2;
        li{
          height: 140px/2;
          display: flex;
          align-items: center;
          justify-content: center;
          width:140px/2;
          image{
            width: 130px/2;
            height: 130px/2;
            border:5px/2 solid #fff;
            border-radius: 50%;
          }
        }
      }
    }
    .team_box{
      flex:1;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-bottom:16px/2;
      justify-content: flex-start;
    p{
      padding-left: 26px/2;
      padding-right: 14px/2;
      font-size: 32px/2;
      color: #333;
      height: 89px/2;
      display: flex;
      align-items: center;
    }
    ul{
      display: flex;
      height: auto;
      max-height: 200px/2;
      flex:1;
      flex-wrap: wrap;
      align-items: center;
    li{
      height: 65px/2;
      display: flex;
      margin-right:7px/2;
      margin-bottom: 8px/2;
      align-items: center;
      justify-content: center;
      width:65px/2;
    image{
      width: 61px/2;
      height: 61px/2;
      border:2px/2 solid #fff;
      border-radius: 50%;
    }
    }
    .add{
      background: url(../../../static/img/add.png) center no-repeat;
      background-size: 89px/2 89px/2;
    }
    }
    }
    h2{
      width: 100%;
      color: @bg_color;
      font-size: 30px/2;
      height: 30px/2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .time_box{
      width: 120px/2;
      height: 120px/2;
      margin:0 auto;
      margin-top:12px/2;
    }
    .answer{
      margin:0 auto;
      margin-top:18px/2;
      width: 524px/2;
      height: auto;
    }
    .answer{
    li{
      width: 524px/2;
      position: relative;
      padding: 0 24px/2;
      box-sizing: border-box;
      height: 80px/2;
      margin-bottom:40px/2;
      border-radius: 50px;
      background: #d6d6d6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px/2;
      color: #fff;
      span{
        position: absolute;
        right:-50px/2;
        top:0;
        color: #333;
        height:80px/2;
        font-size: 24px/2;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    li:nth-last-child(1){
      margin-bottom: 0;
    }
    .correct{
      background: #86d132;
    }
    .n_correct{
      background: #df5c3e;
    }
    }
    .provide{
      margin-bottom: 16px/2;
      font-size:24px/2;
      margin-top:16px/2;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  .chat_box{
    width: 100%;
    padding: 0 59px/2;
    box-sizing: border-box;
    height: 329px/2;
    margin-bottom:100px/2;
    .chat_t{
      width: 100%;
      height: 36px/2;
      display: flex;
      align-items: center;
      justify-content: center;
      image{
        width: 45px/2;
        height: 36px/2;
        margin-right:7px/2;
        margin-left: 14px/2;
      }
      span{
        font-size: 32px/2;
        color: #333;
        margin-right:14px/2;
      }
      i{
        height: 1px;
        box-sizing: border-box;
        border-top:1px dashed #333;
        width: 230px/2;
      }
    }
    .chat_list{
      width: 100%;
      li{
        width: 100%;
        line-height: 58px/2;
        font-size: 26px/2;
        color: #333;
        span{
          word-break: break-all;
        }
      }
    }
  }
    .publish_box{
      width: 100%;
      height: 100px/2;
      box-sizing: border-box;
      border-top:1px/2 solid #e2e2e2;
      position: fixed;
      bottom:0;
      left:0;
      background: #fff;
      z-index:3;
      border-radius: 0;
      padding: 17px/2 14px/2;
      display: flex;
      align-items: center;
      justify-content: center;
      div{
        flex:1;
        padding-right: 15px/2;
        height: 100%;
        input{
          border:none;
          border-radius: 0;
          border-bottom: 2px/2 solid @bg_color;
          color: #333;
          font-size: 28px/2;
          width: 100%;
          height: 58px/2;
        }
      }
    .send_btn{
      width: 70px/2;
      height: 51px/2;
      background: @bg_color;
      color: #fff;
      font-size: 26px/2;
      border-radius: 10px/2;
      line-height: normal;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      position: static;
    }
    a{
      width: 81px/2;
      position: relative;
      margin-left: 18px/2;
    image{
      width: 61px/2;
      height: 61px/2;
    }
    span{
      position: absolute;
      right:-1px/2;
      top:41px/2;
      background: @bg_color;
      color: #fff;
      font-size: 20px/2;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      padding: 4px/2;
    }
    }
    }
    .invite_box{
      margin-top:65px/2;
      margin-bottom:86px/2;
      image{
        width: 253px/2;
        height: 217px/2;
        display: block;
        margin:0 auto;
      }
      div{
        width: 300px/2;
        height: 70px/2;
        border-radius: 50px/2;
        background: @bg_color;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size:32px/2;
        margin:0 auto;
        margin-top: 67px/2;
        position: inherit;
      }
      .disabled{
        background: #e2e2e2;
      }
    }
    .result{
      margin:0 auto;
      margin-top:94px/2;
      margin-bottom: 51px/2;
      width: 510px/2;
      height: 463px/2;
      background: #ffb3a2;
      padding: 0 36px/2;
      box-sizing: border-box;
      position: relative;
      border-radius: 10px/2;
      h1{
        position: absolute;
        top:-55px/2;
        left:0;
        right:0;
        margin:auto;
        width: 427px/2;
        height: 95px/2;
        image{
          width: 100%;
          height: 100%;
        }
      }
    }
    .team_prize{
      padding-bottom: 29px/2;
      padding-top: 56px/2;
      border-bottom:1px dashed #fff;
      width: 100%;
      height: 81px/2;
      image{
        width: 277px/2;
        height: 81px/2;
        display: block;
        margin:0 auto;
      }
    }
    .challenger{
      width: 100%;
      height: 68px/2;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 7px/2;
      margin-top:16px/2;
      .user{
        width: 64px/2;
        height: 64px/2;
        border:2px/2 solid #fff;
        border-radius: 50%;
        margin-right: 13px/2;
      }
      .tz{
        width: 140px/2;
        height: 52px/2;
      }
    }
    .c_prize{
      width: 100%;
      height: 171px/2;
      display: flex;
      align-items: center;
      justify-content: space-around;
      li{
        width: 131px/2;
        height: 100%;
        div{
          width: 131px/2;
          height: 131px/2;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url(../../../static/img/prize_box.png) center no-repeat;
          background-size: 100%;
          image{
            width: 74px/2;
            height: 84px/2;
          }
        }
    p{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top:16px/2;
      color: #fff;
      font-size: 24px/2;
      height: 24px/2;
    }
      }
    }
    .fail{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      image{
        width: 233px/2;
        height: 271px/2;
      }
    }
    .result_btn{
      margin-bottom:60px/2;
      width: 100%;
      padding: 0 108px/2;
      box-sizing: border-box;
      height: 60px/2;
      display: flex;
      align-items: center;
      justify-content: space-around;
      a{
        width: 259px/2;
        height: 60px/2;
        border-radius: 50px;
        background: @bg_color;
        color: #fff;
        font-size:28px/2;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      button{
        width: 259px/2;
        height: 60px/2;
        padding: 0;
        margin:0;
        border-radius: 50px;
        background: @bg_color;
        color: #fff;
        font-size:28px/2;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .disabled{
        background: #e2e2e2;
      }
    }
</style>
