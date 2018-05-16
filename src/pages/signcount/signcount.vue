<template>
    <div class="container">
      <div class="mui-media">
          <div class="logo-top">
            <img src="" alt="">
          </div>
          <div class="mui-media-body">
            <p class="sign-success">恭喜你签到成功，<span class="co_fe698a">+5！</span></p>
            <p class="p-margin">当前积分<span id="so-points" class="co_fe698a">821</span>
            </p>
          </div>
      </div>
      <div class="time-top">
        <div class="mui-pull-left" id="time">2018年5月16日</div>
      </div>
      <div class="calendar_th">

      </div>
      <div id="calendar">

      </div>
      <div class="back_line"></div>
      <div class="recommend">
        <p >礼物店</p>
      </div>
      <ul class="gift_list">
        <li>
          <div>
            <image src=""></image>
          </div>
          <h3>藤罗5元代金券</h3>
          <a href="">挑战</a>
        </li>
        <li>
          <div>
            <image src=""></image>
          </div>
          <h3>藤罗5元代金券</h3>
          <a href="">挑战</a>
        </li>
        <li>
          <div>
            <image src=""></image>
          </div>
          <h3>藤罗5元代金券</h3>
          <a href="">挑战</a>
        </li>
      </ul>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'signcount',
        props: [],
        data(){
            return {}
        },
        methods: {},
        components: {}

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .container .mui-media {
      padding:13px;
      height:64px;
      border-top:1px solid #e2e2e2;
      border-bottom:1px solid #e2e2e2;
      display:flex;
      justify-content: flex-start;
      align-items: center;
      font-size:14px;
      color:#333;
      .logo-top{
        width:38px;
        height:38px;
        margin-right:14px;
        border-radius:50%;
        image{
          width:38px;
          height:38px;
          border-radius:50%;
        }
      }
      .sign-success>span{
        color:#df5c3e;
      }
      .p-margin{
        margin-top:12px;
      }
      .p-margin>span{
        color:#df5c3e;
        font-size:15px;
      }
    }
  .time-top{
    margin-top:20px;
    padding-left:13px;
    font-size:12px ;
    color:#333;
  }
  .back_line{
    width:100%;
    height:8px;
    background:#f3f3f3;
  }
    .recommend {
      padding: 12px 0 12px 13px;
      border-top: 1px solid #e2e2e2;
      font-size:15px;
      border-bottom: 1px solid #e2e2e2;
      height: 40px;
      line-height:40px;
    }
    .gift_list{

      width: 100%;
      box-sizing: border-box;
      padding:12px 26px/2;
      display: flex;
      flex-flow: wrap;
      justify-content: space-between;
      li{
        width: 220px/2;
        height: 280px/2;
        box-shadow: #acacac 4px/2 5px/2 15px/2;
        margin-bottom:20px/2;
        border-radius: 10px/2;
        background: #fff;
        div{
          width: 220px/2;
          height: 173px/2;
          box-sizing: border-box;
          padding: 20px/2;
          image{
            width: 100%;
            height: 100%;
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
          color: #fff;
          align-items: center;
          justify-content: center;
          background: @bg_color;
        }
      }
    }
</style>
