<template>
    <div class="bg_color">
      <div class="doommview">
        <p v-for="(v,i) in doommData" v-if="v.display" class="aon" :style="{'animation':'first '+v.time+'s linear forwards','top':v.top+'%','color':v.color,'font-size':15+(v.top/v.time)+'px'}">
          {{v.text}}
        </p>
      </div>
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
            <li v-for="(v,i) in team" v-if="((challenger!=user.userid)&&(i!=0&&i<14))||((challenger==user.userid)&&(i!=0&&i<15))"><image :src="v.picpath"></image></li>
          </ul>
        </div>
      </div>
      <h2 v-if="isprop">挑战者使用了延迟针，时间延长了20s</h2>
      <!--答题模块-->
      <div class="time_box" v-if="isstart&&iswin==0">
        <counddown :time="times" v-if="istimes"></counddown>
      </div>
      <div class="answer" v-if="isstart&&iswin==0">
        <!--<answer :title="answer.category_name+', 本题由'+answer.organiz_name+'提供'" :answer="answer.name" distance="1">-->
        <answer title="题库由西安市人社局失业保险处提供" :answer="answer.name" distance="1">
          <div slot="list">
            <ul :class="{'bottom1_an':isanimation&&(step!=1),'bottom_an':isanimation&&(step==1),'answer_box_ul':true}">
              <li :class="{'correct':v.right&&isshow,'n_correct':index==i&&isshow&&!v.right,'friend_c':is_f_click==i}" v-for="(v,i) in answer.answer_json" v-on:click="submit(i,v.right)">{{v.answer}}<span>{{stat[i]}}人</span></li>
            </ul>
          </div>

        </answer>
      </div>
      <!--<p class="provide" v-if="isstart&&iswin==0">本题由{{answer.organiz_name}}提供</p>-->
      <!--邀请模块-->
      <div class="invite_box" v-if="iswin==0&&!isstart">
        <image src="/static/img/yaoqing.png"></image>
        <p>
          邀请好友答题，挑战成功后，<br>
          挑战者和亲友均可获得120经验+20银两，<br>
          银两可用于购买道具
        </p>
        <div :class="{'disabled':challenger!=user.userid}" @click="startgame">开始游戏</div>
      </div>
      <!--答题结果-->

      <div class="result" v-if="gameover">
        <image src="/static/img/succ.jpg" v-if="iswin==2" class="re_bg"></image>
        <image src="/static/img/faild.jpg" v-if="iswin!=2" class="re_bg"></image>
        <div class="prize" v-if="iswin==2">
          <ul class="rank_list">
            <li>
              <i class="rank"></i>
              <span class="rank_nub">+{{rank*10}}</span>
              <span class="rank_name">{{user.rank_name}}</span>
            </li>
            <li>
              <i class="yl"></i>
              <span>+20</span>
            </li>
          </ul>
          <ul class="c_prize">
            <li v-if="card.id">
              <div>
                <image :src="url+card.ticket_pic"></image>
              </div>
              <p>战利品：<span>{{card.title}}</span></p>
            </li>
          </ul>
          <div class="team_prize_n">
            <span>亲友团：</span>
            <i></i>
            <span>+20</span>
          </div>
        </div>
        <div class="fail" v-if="iswin==1">
          <image src="/static/img/team_fail.png"></image>
          <p>留得青山在，不怕没柴烧</p>
        </div>
      </div>

      <div :class="{'result_btn':true,'btn_win':iswin==2,'btn_loss':iswin==1}" v-if="gameover">
        <a href="" v-if="iswin==2&&isnext" @click="next" :class="{'disabled':challenger!=user.userid}">挑战下一关</a>
        <button open-type="share" v-if="iswin==2">分享战绩</button>
        <button open-type="share" v-if="iswin==1">考考好友</button>
        <a href="" v-if="iswin==1" @click="repeat" :class="{'disabled':challenger!=user.userid}">重新开始</a>
      </div>
      <div class="publish_box" v-if="!gameover">
        <div class="btn_box_send">
          <p @click="send('陈独秀同学请坐下',0)">选1</p>
          <p @click="send('请给李时珍同学一个发言的机会',1)">选2</p>
          <p @click="send('你看后面的鲁迅同学脸色很难看',2)">选3</p>
          <p @click="send('还有，李云龙同学麻烦你让二营长把意大利面收起来，不要让陈皮同学在课堂上吃面。',3)">选4</p>
        </div>
        <i class="quick" @click="selectQuick">常用语</i>
        <a @click="userTools(user.tools[0].amount,1)" :class="{surplus:times<10}" href="" v-if="challenger==user.userid"><image src="/static/img/daojushangdian_11.png"></image><span>{{user.tools[0].amount>99?'99+':user.tools[0].amount}}</span></a>
        <a @click="userTools(user.tools[1].amount,2)" :class="{surplus:(times<10 && !istime)}" href="" v-if="challenger==user.userid"><image src="/static/img/daojushangdian_13.png"></image><span>{{user.tools[1].amount>99?'99+':user.tools[1].amount}}</span></a>
      </div>
      <div class="news_box" v-if="isquick">
        <ul>
          <li v-for="(v,i) in quick" @click="send(v.details)">{{v.details}}</li>
        </ul>
        <i></i>
      </div>
      <mptoast/>
    </div>
</template>

<script type="javascript">
  import counddown from '../../components/countdown.vue'
  import answer from '../../components/answer.vue'
  import mptoast from '../../components/mptoast'

  export default {
        name: 'team',
        data(){
            return {
              doommData:[],          //弹幕
              do_i:0,
              challenger:'',          //挑战者id
              isprop:false,      //使用道具之后的提示
              istimes:false,     //是否显示倒计时
              surplus:false,   //剩余十秒
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
              timesfn:null,                     //定时器
              isjoin:false,                     // 是否发送加入房间请求
              is_f_click:-1,                        //亲友团选择答案
              til:null,                            //延时函数
              isanimation:false,           //是否显示动画
              tanswer:'',
              setfn:null,
              isquick:false,          //是否显示快捷语
              sendTime:0             //发送消息时间
            }
        },
        methods: {
          selectQuick(){
              this.isquick = !this.isquick
          },
          constructor(text,top,time,color){
            let that=this
            let item={}
            item.text = text;
            if(28<top<56){
                if(Math.random()>0.5){
                  top =  Math.random()*28
                }else{
                  top =  58+Math.random()*44
                }
            }
            item.top = top;
            item.time = time;
            item.color = color;
            item.display = true;
            item.id = that.do_i++;
//            setTimeout(function(){
//              that.doommData.splice(that.doommData.indexOf(item),1);//动画完成，从列表中移除这项
//            },item.time*1000)//定时器动画完成后执行。
            return item
          },
          getRandomColor() {
            let rgb = []
            for (let i = 0; i < 3; ++i) {
              let color = Math.floor(Math.random() * 256).toString(16)
              color = color.length == 1 ? '0' + color : color
              rgb.push(color)
            }
            return '#' + rgb.join('')
          },
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
                this.$mptoast('暂无该道具，请前往个人中心-道具商城购买');
                return
              }
            if(this.isanimation){
              return
            }
            if(nub>0){
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
                    this.$mptoast('一道题目只能使用一次');
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
                },2000)
              }
            }
          },
            countdownfn(){         //倒计时
              let that=this
              if(!that.isstart){
                  return
              }
              if(that.gameover){
                return
              }
              if(that.isclick){
                  if(that.challenger == that.$store.state.user.userid){
                      return
                  }
              }
              if(that.times == 0){
                return
              }
              if(that.isanimation){
                return
              }
              that.times=that.times-1
              if(that.times<10){
                that.surplus=true;
              }
            },
            startgame(){    //开始游戏
              let that = this
                if(that.challenger == that.$store.state.user.userid){
                    that.$socket.emit('data_chain',{
                      cmd:'fight',
                      u_id:that.challenger,
                      level:that.$store.state.level,
                      game_cfg_id:2,
                      game_type:2,
                      game_style:3
                    })
                  wx.showLoading({
                    mask:true
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
                wx.showLoading({
                  mask:true
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
              this.$store.commit('rightTitle',0)
              this.$store.commit('useTime',0)
              this.$store.commit('allTitle',0)

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
              this.doommData=[]
              this.content=''
              clearInterval(this.timesfn)
              this.timesfn=null
              this.isjoin=false
              this.is_f_click=-1
            },
          send(msg,index){       //发送聊天
            this.isquick = false
            let that =this
            if(new Date().getTime() - that.sendTime<1000){
              this.$mptoast('休息一下吧');
              return
            }
            that.sendTime = new Date().getTime()
                  //发送聊天内容
              that.$socket.emit('data_chain',{
                  cmd:'chat',
                  u_id:that.$store.state.user.userid,
                  room_id:that.$store.state.room_id,
                  data:msg,
                  type:1
              })
            if(that.challenger != that.$store.state.user.userid){
              that.submit(index)
            }
          },
          submit(index,right){    //提交答案
            if(!this.isstart){
                return
            }
            if(this.gameover){
                return
            }
            if(this.isanimation){
                return
            }
            if(this.isclick){
                return
            }
            if(this.isshow){
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
              if(reply==1){
                that.$store.commit('rightTitle',1)
              }
              if((30-this.times)>0){
                that.$store.commit('useTime',30-this.times)
              }
              that.$store.commit('allTitle',1)
            }else{
                that.is_f_click = index
                that.$socket.emit('data_chain',{
                  cmd:'chat',
                  type:5,
                  room_id:that.$store.state.room_id,
                  u_id:that.$store.state.user.userid,
                  level:that.$store.state.f_level,
                  step:that.$store.state.step,
                  data:`${that.index}`
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
              that.$store.commit('useTime',30)
              that.$store.commit('allTitle',1)
            }
          },
          join(){    //加入房间
            let that = this
            if(that.isjoin){
                  return
            }
            that.isjoin=true
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
          },
          tanswer(val,oldval){
            this.isanimation=true
            this.istimes=false
            clearTimeout(this.setfn)
            this.setfn=null
            this.setfn=setTimeout(()=>{
              this.times=30
              this.isanimation=false
              this.istimes=true
            },2500)
          }
        },
        components: {
          counddown,
          answer,
          mptoast
        },
        computed:{
            userinfo(){
                return this.$store.state.userinfo
            },
            answer(){
                  this.tanswer=this.$store.state.answer.name
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
            },
            isauth(){
              return this.$store.state.isauth
            },
            step(){
              return this.$store.state.step
            },
            quick(){
                return this.$store.state.quick
            },
            rank(){
                return this.$store.state.rightTitle
            }
        },
    onShareAppMessage(res){
      let that = this;
      let title='边玩边学，游戏学习两不误！';
      let img=`${that.$store.state.url}/admin/img/1.jpg`;
      let url='/pages/index/main';
      if(that.iswin==1){//失败
        title='@你 这道题有点难哦，快来帮帮我吧！';
        img=`${that.$store.state.url}/admin/img/3.jpg`;
        url='/pages/index/main';
      }else if(that.iswin==2){
        title='@你 挑战成功，快来加入我们的战队吧！带你一起闯关赢大奖~';
        img=`${that.$store.state.url}/admin/img/2.jpg`;
        url='/pages/index/main';
      }
      if (res.from === 'menu') {
        // 来自页面内转发按钮
        title='边玩边学，游戏学习两不误！';
        img=`${that.$store.state.url}/admin/img/1.jpg`;
        url='/pages/index/main';
        console.log(res.target)
      }
      return {
        title: title,
        path: url,
        imageUrl:img,
        success: (r)=>{
          console.log(r)
        },
        fail: (err)=>{
          console.log(err)
        }
      }
    },
    onShow(){
        console.log('show page')
    },
    onLoad(option){
//      wx.getSetting({
//        success: function (res) {
//          if (!res.authSetting['scope.userInfo']) {
//            if (that.$store.state.modalshow) {
//              that.$store.commit('getmodal', false)
//              wx.hideLoading()
//              wx.showModal({
//                title: '提示',
//                content: '未授权获取用户信息',
//                showCancel: false,
//                confirmText: '返回首页',
//                confirmColor: '#df5c3e',
//                mask: true,
//                complete: res => {
//                  wx.switchTab({
//                    url: '/pages/index/main'
//                  })
//                  that.$store.commit('getmodal', true)
//                }
//              })
//            }
//          }
//        }
//      })
      let that =this
      that.$store.commit('rightTitle',0)
      that.$store.commit('useTime',0)
      that.$store.commit('allTitle',0)
      that.$store.commit('getmodal', true)
      that.cleardata()
      clearInterval(that.til)
      that.til=null
      that.$store.commit('get_f_level',0)
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
      console.log('load page')
      console.log(that.$store.state.issocket)
      if(that.$store.state.issocket) {
        if(option.ismy == 1&&that.challenger == that.$store.state.user.userid){
          that.join()
        }else{
          if(that.challenger != that.$store.state.user.userid){
              console.log('已登录 加入')
            that.join()
          }
        }
      }
      that.$socket.removeAllListeners('data_chain')
      that.$socket.on('data_chain',d=>{
        if(d.cmd=='login'){
          if(option.ismy == 1&&that.challenger == that.$store.state.user.userid){
              console.log('发起者未登录  发起登录之后加入')
            that.join()
          }else{
            if((that.challenger != that.$store.state.user.userid)&&!that.$store.state.issocket){
              console.log('参与者未登录  发起登录之后加入')
              that.$store.commit('getsocket')
              that.join()
            }
          }
        }else if(d.cmd =='fight'){
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
                that.$socket.removeAllListeners('data_chain')
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


              that.doommData.push(that.constructor(d.data,Math.ceil(Math.random()*100),9+Math.ceil(Math.random()*5),that.getRandomColor()));
            } else {
              for (let i = 0; i < that.team.length; i++) {
                if (that.team[i].id == d.u_id) {
                  that.chat.unshift({
                    nickname: that.team[i].nickname,
                    msg: d.data
                  })
                  that.doommData.push(that.constructor(d.data,Math.ceil(Math.random()*100),9+Math.ceil(Math.random()*5),that.getRandomColor()));
                }
              }
            }
          } else if (d.type == 5) {
            for (let i = 0; i < d.stat.length; i++) {
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
                let level = (that.challenger == that.$store.state.user.userid)?that.$store.state.level:that.$store.state.f_level
            if(d.level == level){
              clearInterval(that.til)
              that.til=null
              that.isshow=true
              that.index = d.other_reply == null?-1:d.other_reply
              that.til=setTimeout(function(){
                  wx.hideLoading()
                that.$store.commit('get_answer',d.details[0])
                that.is_f_click=-1
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
              },2000)
            }else{    //当前关卡结束
              that.isshow=true
              clearInterval(that.til)
              that.til=null
              that.til=setTimeout(()=>{
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
                that.is_f_click=-1
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
                wx.setNavigationBarTitle({
                  title:`挑战结果`
                })
              },2000)
            }
          }else if(d.content_type == 2){    //全部挑战结束
            that.isshow=true
            clearInterval(that.til)
            that.til=null
            that.til=setTimeout(()=>{
              that.isnext=false
              that.iswin = 2
              that.gameover=true
              if(d.details[0]){
                that.$store.commit('get_prize',d.details[0])
              }else{
                that.$store.commit('get_prize',{})
              }
              wx.setNavigationBarTitle({
                title:`挑战结果`
              })
            },2000)
          }else if(d.content_type == 3){       //挑战失败
            that.isshow=true
            that.index = d.other_reply == null?-1:d.other_reply
            clearInterval(that.til)
            that.til=null
            that.til=setTimeout(()=>{
              wx.setNavigationBarTitle({
                title:`挑战结果`
              })
              that.$store.commit('get_prize',{})
              that.gameover=true
              that.iswin=1
              that.isshow=false
              that.index = -1
            },2000)
          }
        }
      })

    },
    onUnload(){
      let that =this
      that.surplus=false
      that.$store.commit('get_f_level',0)
      that.$store.commit('get_answer',{})
      that.$socket.emit('data_chain',{
            cmd:'left',
            room_id:that.$store.state.room_id,
            u_id:that.$store.state.user.userid,
            game_cfg_id:2,
            game_type:2
        })
      that.$socket.removeAllListeners('data_chain')
      that.cleardata()
      clearInterval(that.til)
      that.til=null
      that.$store.commit('get_room','')

    },
    onHide(){
//        console.log("隐藏页面")
//        this.$socket.removeAllListeners('data_chain')
//        this.$store.commit('get_f_level',0)
    }
  }
</script>

<style>
  /**定义从右边向左边的移动的动画**/
  @keyframes first{
    from{left: 100%; }
    to{left: -400%;}
  }
</style>
<style lang="less" scoped>
    @import '../../static/less/common.less';
    .aon{
      position: absolute;
      white-space:nowrap;/* 防止向下换行*/
    }
    .doommview{
      z-index: 3;
      height: 30%;
      width: 750px/2;
      position: absolute;
      box-sizing: border-box;
      overflow-x: hidden;
    }
    @keyframes swing {
      10% {
        transform: rotate(15deg);
      }
      20% {
        transform: rotate(-10deg);
      }
      30% {
        transform: rotate(5deg);
      }
      40% {
        transform: rotate(-5deg);
      }
      50%, 100% {
        transform: rotate(0deg);
      }
    }
    @keyframes showbottom1 {
      0%{
        transform: translateY(0px) scale(1,1);
        opacity: 1;
      }
      24%{
        transform: translateY(200px) scale(1,1);
        opacity: 0;
      }
      48%{
        transform: translateY(200px) scale(1,1);
        opacity: 0;
      }
      70%{
        transform: translateY(200px) scale(1,1);
        opacity: 0;
      }
      85%{
        transform: translateY(0px) scale(1,1);
        opacity: 1;
      }
      88%{
        transform: translateY(-8px) scale(1,0.93);
        opacity: 1;
      }
      100%{
        transform: translateY(0px) scale(1,1);
        opacity: 1;
      }
    }
    @keyframes showbottom {
      0%{
        transform: translateY(200px) scale(0,0);
        opacity: 0;
      }
      60%{
        transform: translateY(200px) scale(1,1);
        opacity: 0;
      }
      77%{
        transform: translateY(0px) scale(1,1);
        opacity: 1;
      }
      90%{
        transform: translateY(-8px) scale(1,0.93);
        opacity: 1;
      }
      100%{
        transform: translateY(0px) scale(1,1);
        opacity: 1;
      }
    }
    @keyframes title {
      0%{
        opacity: 0;
        transform: scale(1.5);
      }
      49%{
        opacity: 0;
        transform: scale(1.5);
      }
      50%{
        opacity: 1;
        transform: scale(2);
      }
      95%{
        opacity: 1;
        transform: scale(0.9);
      }
      100%{
        opacity: 1;
        transform: scale(1);
      }
    }
    @keyframes li1 {
      0%{
        opacity: 0;
        transform: scale(0);
      }
      67%{
        opacity: 0;
        transform: scale(0.5);
      }
      90%{
        opacity: 1;
        transform: scale(1.05);
      }
      100%{
        opacity: 1;
        transform: scale(1);
      }
    }
    @keyframes li2 {
      0%{
        opacity: 0;
        transform: scale(0);
      }
      75%{
        opacity: 0;
        transform: scale(0.5);
      }
      92%{
        opacity: 1;
        transform: scale(1.05);
      }
      100%{
        opacity: 1;
        transform: scale(1);
      }
    }
    @keyframes btn_win {
      0%{
        opacity: 0;
      }
      80%{
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
    }
    @keyframes btn {
      0%{
        opacity: 0;
      }
      67%{
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
    }
    @keyframes userurl {
      0%{
        transform: translateY(-200px);
      }
      100%{
        transform: translateY(0px);
      }
    }
    .bg_color{
      background: #fff;
      padding-top: 18px/2;
      height: 100%;
    }
    .userurl_box{
      animation: userurl .5s linear;
      width: 100%;
      height: auto;
      display: flex;
      box-sizing: border-box;
      padding: 0 41px/2;
      position: relative;
      z-index: 1;
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
    .friend_c{
      background: #ffc02a;
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
        white-space: nowrap;
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
      justify-content: flex-start;
      div{
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        width: (100px * 4 - 10px)/2;
        p{
          width: 90px/2;
          height: 48px/2;
          border-radius: 50px/2;
          border:1px solid #df5c3e;
          display: flex;
          font-size: 25px/2;
          align-items: center;
          justify-content: center;
          background: #df5c3e;
          color: #fff;
        }
      }
      .quick{
        width: 105px/2;
        height: 48px/2;
        color: #fff;
        font-size: 25px/2;
        border-radius: 50px/2;
        background: #df5c3e;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 30px/2;
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
      &.surplus{
        transform-origin: bottom center;
        animation: swing 2s .1s linear infinite;
      }
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
        padding: 4px/2 4px/2;
        min-width: 24px/2;
        height: 24px/2;
      }
    }
    }
    .invite_box{
      margin-top:170px/2;
      margin-bottom:86px/2;
      image{
        width: 117px/2;
        height: 100px/2;
        display: block;
        margin:0 auto;
        margin-bottom:19px/2;
      }
      p{
        font-size: 28px/2;
        color: #999;
        line-height: 40px/2;
        text-align: center;
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
      margin-top:-157px/2;
      margin-bottom: 51px/2;
      width: 100%;
      height: auto;
      box-sizing: border-box;
      position: relative;
      z-index:0;
      border-radius: 10px/2;
      .re_bg{
        width: 100%;
        height: 790px/2;
      }
      h1{
        animation: title .8s ease;
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
      width: 319px/2;
      margin:0 auto;
      margin-top: -80px/2;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-bottom: 1px solid #df5c3e;
      li{
        animation: li2 2s ease;
        width: 131px/2;
        height: 171px/2;
        padding-bottom: 18px/2;
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
      white-space: nowrap;
      justify-content: center;
      margin-top:16px/2;
      color: #df5c3e;
      font-size: 28px/2;
      height: 24px/2;
      span{
        color: #333;
      }
    }
      }
      li:nth-of-type(1){
        animation: li1 1.5s ease;
      }
    }
    .fail{
      width: 100%;
      height: 100%;
      margin-top: -160px/2;
      position: relative;
      z-index:1;
      image{
        width: 233px/2;
        height: 271px/2;
        display: block;
        margin:0 auto;
      }
      p{
        font-size: 28px/2;
        color: #567dff;
        margin-top:43px/2;
        text-align: center;
      }
    }
    .result_btn{
      margin-bottom:160px/2;
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
    .btn_auth{
      width: 750px/2;
      height: 100%;
      position: fixed;
      top:0;
      left:0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index:99;
      /*background: transparent;*/
      background: rgba(0,0,0,0.7);
      image{
        width: 377px/2;
        height: 360px/2;
        position: absolute;
        top:205px/2;
        left:0;
        right:0;
        margin:auto;
      }
      span{
        width: 100%;
        height: 30px/2;
        font-size: 30px/2;
        color: #fff;
        position: absolute;
        top:611px/2;
        left:0;
        right:0;
        text-align: center;
      }
    }
    .bottom_an{
      transform-origin: 50% 50% 0;
      animation: showbottom 2s ease;
    }
    .bottom1_an{
      transform-origin: 50% 50% 0;
      animation: showbottom1 2.5s ease-out;
    }
    .btn_win{
      animation: btn_win 2.5s ease;
    }
    .btn_loss{
      animation: btn 1.5s ease;
    }
  .news_box{
    width: 588px/2;
    position: fixed;
    bottom:80px/2;
    right:7px/2;
    height: auto;
    overflow: hidden;
    padding-bottom: 18px/2;
    z-index:10;
    i{
      position: absolute;
      bottom:0;
      right:231px/2;
      width: 33px/2;
      height: 23px/2;
      background: url(../../../static/img/cg.png) center no-repeat;
      background-size: 33px/2 23px/2;
    }
    ul{
      width: 100%;
      height: auto;
      border:5px/2 solid #df5c3e;
      border-radius: 20px/2;
      overflow: hidden;
      box-sizing: border-box;
      li{
        width: 100%;
        height: 61px/2;
        border-bottom:1px solid #df5c3e;
        background: #f3f3f3;
        font-size: 28px/2;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
      }
      li:nth-last-child(1){
        border:none;
      }
    }
  }
    .rank_list{
      width: 319px/2;
      height: auto;
      position: absolute;
      top:430px/2;
      left:0;
      right: 0;
      margin:auto;
      li{
        height: 82px/2;
        border-bottom: 1px solid #df5c3e;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        .rank{
          width: 39px/2;
          height: 39px/2;
          background: url(../../../static/img/jy.png) center no-repeat;
          background-size: 39px/2 39px/2;
        }
        span{
          font-size: 28px/2;
          color: #333;
        }
        .yl{
          width: 39px/2;
          height: 39px/2;
          background: url(../../../static/img/yl.png) center no-repeat;
          background-size: 39px/2 39px/2;
          margin-right: 28px/2;
        }
      }
      li:nth-of-type(1){
        justify-content: space-between;
        padding: 0 30px/2;
      }
    }
  .team_prize_n{
    width: 319px/2;
    margin:0 auto;
    height: 82px/2;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-top:-10px/2;
    i{
      width: 39px/2;
      height: 39px/2;
      background: url(../../../static/img/yl.png) center no-repeat;
      background-size: 39px/2 39px/2;
      margin-right: 28px/2;
    }
    span{
      font-size: 28px/2;
      color: #333;
    }
    span:nth-of-type(1){
      color: #df5c3e;
    }
  }
</style>
