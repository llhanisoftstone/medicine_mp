<template>
  <div>
    <ul class="gift_list">
      <li v-for="(v,i) in policy_list" :class="{iskong:v.iskong}">
        <main @click.stop="tonewpage('giftsdetail','tid='+v.ticket_id+'&vid='+v.id)" v-if="!v.iskong">
          <div class="itemheadk">
          <div>
            <image :src="v.piclogo"></image>
            <div class="itemmodel">查看详情&gt;</div>
          </div>
          </div>
          <h3>{{v.ticket_name}}</h3>
        </main>
        <a @click="reward(v.id)" v-if="!v.iskong&&v.amount_z>0">挑战</a>
        <a v-if="!v.iskong&&v.amount_z<=0" class="hui">挑战</a>
      </li>
    </ul>
    <div class="nogetList" v-if="iskong">暂无礼物</div>
  </div>
</template>

<script type="javascript">
  export default {
    data () {
      return {
        policy_list:[],
        scrollIcon:false,
        scrollTop:0,
        iskong:false,
        page:1,
        size:12
      }
    },
    onPullDownRefresh () {
      wx.showNavigationBarLoading();//在标题栏中显示加载
      this.page=1;
      this.policy_list=[];
      this.refresh();
      // 下拉刷新
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },
    onReachBottom () {
      this.page++;
      this.loadmore()
      // 上拉加载
    },
    methods: {
      async getpolicyList() {
        let that = this;
        let data = {
          page:this.page,
          size:this.size,
          id:">,10",
          status:1,
          store_status:1,
          ticket_status:1,
          order:'order_code desc,create_time desc'
        };
        let res = await that.$get('/rs/v_game_config',data)
        if(res.code == 200){
          that.iskong=false;
          for(let i = 0;i<res.rows.length;i++){
            res.rows[i].piclogo = that.$store.state.url+ res.rows[i].piclogo
            //res.rows[i].tickt_id = res.rows[i].level_json[0].reward[0].id
            if(res.rows[i].amount>0){
              res.rows[i].amount_z=res.rows[i].amount-res.rows[i].send_amount
            }else{
              res.rows[i].amount_z=res.rows[i].total_amount-res.rows[i].send_amount
            }
          }
          if (res.rows.length > 0){
            that.policy_list = that.policy_list.concat(res.rows);
          }
          if(res.rows.length<12&&res.rows.length%3!=0){
              for(var n=0;n<3-res.rows.length%3;n++){
                that.policy_list.push({iskong:true})
              }
          }
        }else if (res.code == 602 && that.page == 1){
            that.iskong=true;
        }
      },
      refresh(){
        this.page = 1;
        this.getpolicyList();
      },
      loadmore () {
        this.getpolicyList();
      },
      scrolltoTop(){
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
      tonewpage(urlname,data){
        wx.navigateTo({
          url:`/pages/${urlname}/main?${data}`
        })
      },
      reward(r_id){
        let that=this;
        this.r_id=r_id;
        this.$socket.emit('data_chain',{
          cmd:'fight',
          u_id: that.$store.state.user.userid,
          game_cfg_id: r_id,
          game_type:1,
          level:1,
          type:0
        })
      },
      watchsocket(){
        let that=this
        that.$socket.removeAllListeners('data_chain')
        that.$socket.on('data_chain',d=>{
          if(d.cmd == 'answer'&&d.step == 1){
            that.$socket.removeAllListeners('data_chain')
            that.$store.commit('get_answer',d.details[0])
            that.$store.commit('get_step',d.step)
            that.$store.commit('get_level',1)
            that.$store.commit('get_room',d.room_id)
            that.$store.commit('get_max_nub',d.max_step)
            that.$store.commit('get_que_type',d.type)
            wx.navigateTo({
              url:`/pages/alone/main?id=${that.r_id}`
            })
          }
        })
      },
    },
    onLoad: function (option) {

    },
    onShow:function(){
      this.page = 1;
      this.policy_list = [];
      this.getpolicyList()//获取数据
      this.watchsocket()
    },
    onUnload: function () {
      this.page = 1;
      this.policy_list = [];
      this.iskong = false;
      this.scrollIcon=false;
      this.scrollTop=0;
    },
    onPageScroll:function(res){
      let top = res.scrollTop;
      if (top > 400) {
        this.scrollIcon = true;
      } else {
        this.scrollIcon = false;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../static/less/common.less";

  .mui-ellipsis{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }
  div,p,ul,li,input{
    box-sizing:border-box;
  }
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
  .gift_list{
    width: 100%;
    box-sizing: border-box;
    padding:26px/2;
    display: flex;
    flex-flow: wrap;
    align-content: space-between;
    justify-content: space-between;
    li{
      &.iskong{
        opacity: 0;
      }
      width: 219px/2;
      height: 327px/2;
      box-shadow: #acacac 4px/2 5px/2 15px/2;
      margin-bottom:20px/2;
      border-radius: 10px/2;
      background: #fff;
      /*<!--margin-right:11px/2;-->*/
      &:nth-of-type(3n){
        margin-right: 0;
      }
      div.itemheadk{
        width: 219px/2;
        height: 220px/2;
        box-sizing: border-box;
        padding: 20px/2;
        div{
          position: relative;
          width: 100%;
          height: 100%;
          .itemmodel{
            position: absolute;
            bottom:0;
            left:0;
            width:100%;
            font-size: 16/2px;
            padding:6/2px;
            padding-top: 20/2px;
            line-height: 16/2px;
            height: 22/2+20/2px;
            text-align: right;
            color: #fff;
            box-sizing: border-box;
            background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.4));
          }
          image{
            width: 100%;
            height: 100%;
          }
        }
      }
      h3{
        width: 100%;
        padding: 0 17px/2;
        font-size:28px/2;
        color: #333;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
      a{
        margin:0 auto;
        margin-top:16px/2;
        display: flex;
        width: 100px/2;
        height: 43px/2;
        border-radius: 50px/2;
        font-size: 30px/2;
        box-sizing: border-box;
        line-height: normal;
        color: #fff;
        justify-content: center;
        align-items: center;
        align-content: center;
        padding-bottom: 2px/2;
        background: @bg_color;
        &.hui{
          background: #999;
        }
      }
    }
  }
</style>
