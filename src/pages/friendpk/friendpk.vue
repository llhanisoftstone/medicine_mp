<template>
    <div class="pad">
      <h2><image src="/static/img/paihangbang_1.png"></image>排行榜</h2>
      <div class="pk_box">
        <div class="tab">
          <span :class="{'active':isFriends}" @click="switchtab(true)">好友排行</span>
          <span class="border"></span>
          <span :class="{'active':!isFriends}" @click="switchtab(false)">全国排行</span>
        </div>
        <ul class="list">
          <li v-for="(v,i) in rankings">
            <span class="order" :class="{'front':i<3}">{{i+1}}</span>
            <image :src="v.avatar_url"></image>
            <span class="nickname">{{v.nickname}}</span>
            <span class="integral"><image src="/static/img/paihangbang.png"></image>{{v.points}}</span>
          </li>
        </ul>
      </div>
      <button open-type="share" class="pk_btn" v-if="isFriends">挑战好友</button>
      <a :href="'/pages/loadpk/main?from=2&&id='+user.userid" class="pk_btn" v-if="!isFriends">全网挑战</a>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'friendpk',
        data(){
            return {
                isFriends:true,     //true 好友排行    false 全国排行
                rankings:[]
            }
        },
        methods: {
          switchtab(flag){
              this.isFriends = flag
          },
          getdata(){
              let that=this
              if(this.isFriends){
                this.$get('/rs/member_relation',{u_id:this.$store.state.user.userid,order:'total_points desc,update_time'}).then(res=>{
                  if(res.code == 200){
                    for(var i=0;i<res.rows.length;i++){
                      if(res.rows[i].avatar_url==""||res.rows[i].avatar_url==null){
                        res.rows[i].avatar_url='/static/img/people.png'
                      }
                    }
                    that.rankings=res.rows
                  }else if(res.code == 602){
                    that.rankings=[]
                  }
                })
              }else{
                  this.$get('/rs/member',{order:'total_points desc,create_time',page:1,size:50,rank:1}).then(res=>{
                      if(res.code == 200){
                          for(var i=0;i<res.rows.length;i++){
                              if(res.rows[i].avatar_url==""||res.rows[i].avatar_url==null){
                                res.rows[i].avatar_url='/static/img/people.png'
                              }
                          }
                          that.rankings=res.rows
                      }else if(res.code == 602){
                        that.rankings=[]
                      }
                  })
              }
          }
        },
      watch:{
        isFriends(val,oldval){
          this.getdata()
        }
      },
        mounted(){
            this.getdata()
        },
        components: {},
        computed:{
            user(){
                return this.$store.state.user
            }
        },
      onShareAppMessage(res){
        let that = this
        if (res.from === 'menu') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        return {
          title: '@你 向你发起挑战，点击应战~',
          path: `/pages/loadpk/main?from=1&&id=${this.$store.state.user.userid}`,
          imageUrl: `${that.$store.state.url}/admin/img/friend.jpg`,
          success: (r)=>{
              console.log(r)
            wx.navigateTo({
              url:"/pages/loadpk/main?from=1"
            })
          },
          fail: (err)=>{
              console.log(err)
          }
        }
      }

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .pad{
      padding-bottom: 1px/2;
    }
    h2{
      display: flex;
      height: 130px/2;
      width: 100%;
      font-size: 50px/2;
      color: @bg_color;
      align-items: center;
      justify-content: center;
      image{
        width: 59px/2;
        height: 54px/2;
        margin-right: 14px/2;
      }
    }
    .pk_box{
      width: 640px/2;
      margin:0 auto;
      height: auto;
      background: #ffb3a3;
      padding-bottom: 50px/2;
      border-radius: 20px/2;
      .tab{
        width: 100%;
        height: 84px/2;
        border-bottom: 4px/2 solid @bg_color;
        border-top-left-radius: 20px/2;
        border-top-right-radius: 20px/2;
        box-shadow: #f8c3c3 0 2px/2 4px/2;
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: space-between;
        span{
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size:28px/2;
        }
        span:nth-child(1), span:nth-child(3){
          flex:1;
        }
        .active{
          color: @bg_color;
        }
        span:nth-child(2){
          width: 4px/2;
          height: 60px/2;
          background: @bg_color;
        }
      }
    }
    .list{
      width: 100%;
      max-height: 780px/2;
      overflow: auto;
      height: auto;
      li{
        width: 100%;
        height:86px/2;
        border-bottom:1px solid #fff;
        display: flex;
        box-sizing: border-box;
        padding: 0 34px/2;
        align-items: center;
        .order{
          width: 37px/2;
          height: 37px/2;
          border-radius: 50%;
          color: #fff;
          font-size:28px/2;
          margin-right: 16px/2;
          /*display: flex;*/
          /*align-items: center;*/
          /*align-content: center;*/
          /*justify-content: center;*/
          display: block;
          line-height: 37px/2;
          text-align: center;
        }
        .front{
          background: #ff7400;
        }
        image{
          width: 55px/2;
          height: 55px/2;
          border-radius: 50%;
          margin-right: 15px/2;
        }
        .nickname{
          font-size: 28px/2;
          color: #fff;
          width: 300px/2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .integral{
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex:1;
          color: #fff;
          font-size: 28px/2;
          image{
            width: 24px/2;
            height: 21px/2;
            border-radius: 0%;
            margin-right: 12px/2;
          }
        }
        &:nth-last-child(1){
           border:none;
         }
      }
    }
    .pk_btn{
      background: @bg_color;
      width: 538px/2;
      height: 70px/2;
      margin:0 auto;
      margin-top:50px/2;
      border:none;
      margin-bottom:64px/2;
      color: #fff;
      font-size: 32px/2;
      border-radius: 50px/2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
</style>
