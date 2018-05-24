<template>
    <div class="bg_color">
      <div class="my_box">
        <p>挑战者</p>
        <ul>
          <li v-if="challenger==user.userid"><image :src="userinfo.avatarUrl"></image></li>
          <li v-if="(challenger!=user.userid)&&i==0" v-for="(v,i) in team"><image :src="v.picpath"></image></li>
        </ul>
      </div>
      <div class="team_box">
        <p>亲友团</p>
        <ul>
          <li v-if="challenger!=user.userid"><image :src="userinfo.avatarUrl"></image></li>
          <li v-for="(v,i) in team" v-if="i!=0&&i<13"><image :src="v.picpath"></image></li>
          <li class="add" v-if="team.length<14"></li>
        </ul>
      </div>
      <h2 v-if="isprop">您使用了延迟针，时间延长了10s</h2>
      <!--答题模块-->
      <div class="time_box" v-if="isstart">
        <counddown :time="times"></counddown>
      </div>
      <div class="answer" v-if="isstart">
        <!--<answer :title="answer.category_name" :answer="answer.name">-->
          <!--<ul slot="list" class="answer_box_ul">-->
            <!--<li :class="{'correct':v.right&&isshow,'n_correct':index==i&&isshow&&!v.right}" v-for="(v,i) in answer.answer_json" v-on:click="submit(i,v.right)">{{v.answer}}</li>-->
          <!--</ul>-->
        <!--</answer>-->
        <answer title="分类" answer="题目" distance="1">
        <ul slot="list" class="answer_box_ul">
        <li :class="{'correct':v.right&&isshow,'n_correct':index==i&&isshow&&!v.right}" v-for="(v,i) in an" v-on:click="submit(i,v.right)">{{v.answer}}<span>{{stat[i]}}人</span></li>
        </ul>
        </answer>
      </div>
      <p class="provide" v-if="isstart">本题由{{answer.organiz_name}}提供</p>
      <!--邀请模块-->
      <div class="invite_box" v-if="!isstart">
        <image src="/static/img/yaoqing.png"></image>
        <button :class="{'disabled':challenger!=user.userid}">开始游戏</button>
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
            <li>
              <span>【系统】</span>：
              <span>回答正确</span>
            </li>
            <li>
              <span>【系统】</span>：
              <span>1111111111111111111111111111111111111111111111111111111111111111111111</span>
            </li>
            <li>
              <span>【系统】</span>：
              <span>1111111111111111111111111111111111111111111111111111111111111111111111</span>
            </li>
            <li>
              <span>【系统】</span>：
              <span>1111111111111111111111111111111111111111111111111111111111111111111111</span>
            </li>
            <li>
              <span>【系统】</span>：
              <span>1111111111111111111111111111111111111111111111111111111111111111111111</span>
            </li>
            <li>
              <span>【系统】</span>：
              <span>1111111111111111111111111111111111111111111111111111111111111111111111</span>
            </li>
          </ul>
        </scroll-view>
      </div>
      <div class="publish_box">
        <div>
          <input type="text" v-model="content">
        </div>
        <button @click="send">发表</button>
        <a href="" v-if="challenger==user.userid"><image src="/static/img/daojushangdian_11.png"></image><span>0</span></a>
        <a href="" v-if="challenger==user.userid"><image src="/static/img/daojushangdian_13.png"></image><span>0</span></a>
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
              scrollTop:1000,           //聊天滚动条高度
              stat:[],                //统计信息
              team:[],               //亲友团
              chat:[],                   //聊天信息
              content:'',                 //输入框内容
              an:[
                {
                  answer:'1',
                  right:false
                },
                {
                  answer:'2',
                  right:false
                },
                {
                  answer:'3',
                  right:false
                },
                {
                  answer:'4',
                  right:true
                }
              ]
            }
        },
        methods: {
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

          },
          join(){    //加入房间
              let that = this
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
            }
        },
    onLoad(option){
            let that =this
            this.challenger=option.id
            for( let i=0; i<this.an.length;i++){
                this.stat.push(0)
            }
            if(this.challenger == this.$store.state.user.userid){
                this.team.push({
                  id:this.$store.state.user.userid,
                  nickname:this.$store.state.userinfo.nickName,
                  picpath:this.$store.state.userinfo.avatarUrl
                })
            }
            this.$socket.on('data_chain',d=>{
                if(d.cmd=='login'){
                  if(this.challenger != this.$store.state.user.userid){
                    this.join()
                  }
                }else if(d.cmd =='fight'){
                  that.$store.commit('get_room',d.room_id)
                  if(d.user){
                    for(let i=0;i<d.user.length;i++){
                        that.team.push(d.user[i])
                    }
                  }
                }
                console.log(d)
            })
    }

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .bg_color{
      background: #fff3f3;
      padding-top: 20px/2;
      height: 100%;
    }
    .my_box{
      width: 100%;
      height: 89px/2;
      display: flex;
      flex-wrap: wrap;
      margin-bottom:20px/2;
      align-items: center;
      p{
        padding-left: 26px/2;
        padding-right: 14px/2;
        font-size: 32px/2;
        color: #333;
      }
      ul{
        display: flex;
        align-items: center;
        height: 89px/2;
        li{
          height: 89px/2;
          display: flex;
          align-items: center;
          justify-content: center;
          width:89px/2;
          image{
            width: 83px/2;
            height: 83px/2;
            border:3px/2 solid #fff;
            border-radius: 50%;
          }
        }
      }
    }
    .team_box{
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
      height: 89px/2;
      display: flex;
      margin-right:11px/2;
      margin-bottom: 11px/2;
      align-items: center;
      justify-content: center;
      width:89px/2;
    image{
      width: 83px/2;
      height: 83px/2;
      border:3px/2 solid #fff;
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
      margin-bottom:53px/2;
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
      margin-bottom: 38px/2;
      font-size:24px/2;
      margin-top:29px/2;
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
      border-top:1px solid #e2e2e2;
      position: fixed;
      bottom:0;
      left:0;
      background: #fff;
      z-index:3;
      padding: 17px/2 14px/2;
      display: flex;
      align-items: center;
      justify-content: center;
      div{
        flex:1;
        padding-right: 15px/2;
        height: 100%;
        input{
          border-bottom: 2px/2 solid @bg_color;
          color: #333;
          font-size: 28px/2;
          width: 100%;
        }
      }
    button{
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
      width: 30px/2;
      height: 30px/2;
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
      button{
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
</style>
