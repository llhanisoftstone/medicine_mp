<template>
    <div>
      <div class="user_box">
        <div class="cap_box">
          <capture :win="win" :iscard="iscard" :card="card"></capture>
        </div>
        <div class="user">
          <div class="user_item" :class="{'success':myscore>vsscore}">
            <div><i></i><image :src="userinfo.avatarUrl"></image></div>
            <h4>{{userinfo.nickName}}</h4>
            <p>{{myscore}}</p>
          </div>
          <div class="vs_icon"><image src="/static/img/vsresult.png"></image></div>
          <div class="user_item " :class="{'fail':myscore<vsscore}">
            <div><i></i><image :src="vsuser.picpath"></image></div>
            <h4>{{vsuser.nickname}}</h4>
            <p>{{vsscore}}</p>
          </div>
        </div>
      </div>
      <div :class="{'btn_box':true,'btn_win':myscore>vsscore,'btn_loss':!(myscore>vsscore)}">
        <navigator open-type = "redirect" :url="'/pages/loadpk/main?from='+from" v-if="(from==2)">再来一局</navigator>
        <navigator open-type = "redirect" :url="'/pages/loadpk/main?from='+from+'&&again=1'" v-if="(from==1)">再来一局</navigator>
        <button open-type="share" v-if="win==2">分享战绩</button>
        <button open-type="share" v-if="win!=2">考考好友</button>
      </div>
    </div>
</template>

<script type="javascript">
  import capture from '../../components/capture.vue'
    export default {
        name: 'result',
        data(){
            return {
                win:0,
                iscard:false,
                card:{},
                from: 2,

            }
        },
        methods: {
            cleardata(){
              this.win = 0
              this.iscard=false
              this.card={}
              this.from=2
            }
        },
        components: {
            capture
        },
        computed:{
          userinfo(){
              return this.$store.state.userinfo
          },
          vsuser(){
              return this.$store.state.vsuser
          },
          myscore(){
              return this.$store.state.myscore
          },
          vsscore(){
              return this.$store.state.vsscore
          },
          user(){
              return this.$store.state.user
          }
        },
      mounted(){
           if(this.$store.state.myscore>this.$store.state.vsscore) {
               this.win = 2
           }else if(this.$store.state.myscore == this.$store.state.vsscore){
               this.win = 1
           }else if(this.$store.state.myscore < this.$store.state.vsscore){
             this.win = 0
           }
           if(this.$store.state.prize.id){
               this.iscard = true
                this.card=this.$store.state.prize
             this.card.ticket_pic = this.$store.state.url + this.card.ticket_pic
           }
      },
      onShareAppMessage(res){
        let that = this
        if (res.from === 'menu') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        let til='@你 真烦人，又赢了，无敌是多么的寂寞~'
        let img = `${that.$store.state.url}/admin/img/success.jpg`
        if(that.myscore>that.vsscore){
          if(that.from == 1){
            til='@你 就你，单挑，敢不敢~'
          }else{
            til = '@你 真烦人，又赢了，无敌是多么的寂寞~'
          }
        }else if(that.myscore == that.vsscore){
            til = '@你 千金易得，对手难得，棋逢对手下次再战'
            img = `${that.$store.state.url}/admin/img/mean.jpg`
        }else{
            til = '@你 愈挫愈勇，我还会再回来的'
            img = `${that.$store.state.url}/admin/img/loss.jpg`
        }

        return {
          title: til,
          path: '/pages/index/main',
          imageUrl: img,
          success: (r)=>{
            console.log(r)
          },
          fail: (err)=>{
            console.log(err)
          }
        }
      },
      onLoad(option){
        wx.hideShareMenu()
          this.cleardata()
          this.from = option.from
      }

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
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
    @keyframes btn_win {
      0%{
        opacity: 0;
      }
      83%{
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
    .user_box{
      width: 100%px/2;
      height: auto;
      position: relative;
      h1{
        animation: title .8s ease;
        position: absolute;
        top:-71px/2;
        left:0;
        right:0;
        width: 493px/2;
        height: 110px/2;
        margin:auto;
        image{
          width: 100%;
          height: 100%;
        }
      }
    .user{
      position: absolute;
      top:0;
      left:0;
      right:0;
      margin:auto;
      padding: 113px/2 91px/2 29px/2;
      width: 100%;
      height: auto;
      display: flex;
      box-sizing: border-box;
      justify-content: space-between;
      .user_item{
        max-width:257px/2;
        div{
          width: 195px/2;
          height: 195px/2;
          border-radius: 50%;
          position: relative;
          box-sizing: border-box;
          image{
            width: 186px/2;
            height: 186px/2;
            border-radius: 50%;
            border:9px/4 solid #ffffff;
          }
        }
    h4{
      margin-top:15px/2;
      font-size: 28px/2;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #333;
      height: 32px/2;
      line-height: 32px/2;
      display: block;
      text-align: center;
      white-space: nowrap;
      width:195px/2;
    }
    p{
      margin-top:6px/2;
      max-width:195px/2;
      font-size: 28px/2;
      color: #333;
      height: 28px/2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
      }
    .success{
      div{
        image{
          border:9px/4 solid @bg_color;
        }
        i{
          background: url(../../../static/img/sucu.png) center no-repeat;
          background-size: 100px/2 78px/2;
          display: block;
          width: 100px/2;
          height: 78px/2;
          position: absolute;
          top:-42px/2;
          left:-13px/2;
        }
      }
    }
    .fail{
      div{
        image{
          border:9px/4 solid @bg_color;
        }
        i{
          background: url(../../../static/img/sucv.png) center no-repeat;
          background-size: 96px/2 87px/2;
          display: block;
          width: 96px/2;
          height: 87px/2;
          position: absolute;
          top:-39px/2;
          right:-31px/2;
        }
      }
    }
    .vs_icon{
      width: 90px/2;
      image{
        width: 90px/2;
        height: 72px/2;
        margin-top:60px/2;
      }
    }
    }
    }
    .cap_box{
      width: 100%;
      margin:0 auto;
    }
  .btn_box{
    width: 414px/2;
    margin:0 auto;
    margin-top:96px/2;
    height: auto;
    navigator{
      width: 100%;
      height: 68px/2;
      border-radius: 50px;
      background: @bg_color;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size:32px/2;
      margin-bottom: 23px/2;
      box-shadow: #ffffff 4px/2 -3rpx 0px, #df5c3e 7px/2 -8px/2px 0px;
    }
    button{
      width: 100%;
      height: 68px/2;
      border-radius: 50px;
      background: @bg_color;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size:32px/2;
      margin:0;
      box-shadow: #ffffff 4px/2 -3rpx 0px, #df5c3e 7px/2 -8px/2px 0px;
      &:after{
        border:none;
      }
    }
  }
    .btn_win{
      animation: btn_win 3s ease;
    }
    .btn_loss{
      animation: btn 1.5s ease;
    }
</style>
