<template>
    <div class="traininglist">
      <div class="trainingTop">
        <div class="topTitle">藤罗网络的员工，上午好</div>
        <div class="topCard">
          <div class="cardText">培训是最大的福利,企业最重要的事就是培训,如果不能把你的员 工培训到你想达到的标准,你就难以达成目标。</div>
          <div class="cardName">—— 牛根生</div>
        </div>
        <div class="topNav">
          <ul class="navBox">
            <li :class="{ activeli: curTab==1 }" @click="curTab=1">待培训</li>
            <li :class="{ activeli: curTab==2 }" @click="curTab=2">已培训</li>
          </ul>
        </div>
      </div>
      <ul class="trainingList">
        <li v-show="curTab==1">
          <div class="listImg">
            <image src="/static/img/xiangmutoutu@1.png"></image>
            <div class="imgTitle mui-ellipsis">企业制度培训企业制度培训企业制度培训企业制企业制度培训企业制度培训企业制度培训企业制</div>
          </div>
          <div class="listFooter">
            <div class="footerLeft">
              <div class="footerTime">时间：2018-10-15   15:00-18:00</div>
              <div class="footerAddress mui-ellipsis">地点：一楼会议室妖灵妖领室一楼会一楼会议地点一楼会议室妖灵妖领室一楼会一楼会议</div>
            </div>
            <div class="footerRight">打卡</div>
          </div>
        </li>
        <li v-show="curTab==2">
          <div class="listImg">
            <image src="/static/img/xiangmutoutu@1.png"></image>
            <div class="imgTitle mui-ellipsis">企业制度培训企业制度培训企业制度培训企业制企业制度培训企业制度培训企业制度培训企业制</div>
          </div>
          <div class="listFooter">
            <div class="footerLeft">
              <div class="footerTime">时间：2018-10-16</div>
              <div class="footerAddress mui-ellipsis">地点：一楼会议室妖灵妖领室一楼会一楼会议地点一楼会议室妖灵妖领室一楼会一楼会议</div>
            </div>
            <div class="footerRight">打卡</div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'traininglist',
        data(){
          return {
            curTab: 1,
          }
        },
        methods: {
          tabactive(){
          }
        },
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
    .traininglist{
      background-color: #f6f6f6;
      padding-bottom: 12px/2;
    }
    .trainingTop{
      width: 100%;
      height:auto;
      padding: 27px/2 27px/2 30px/2 27px/2;
      background-color: #fff;
      .topTitle{
        font-size: 40px/2;
        color: #333;
        margin-bottom: 28px/2;
        padding: 0 4px/2;
      }
      .topCard{
        width: 100%;
        height: auto;
        border-radius: 10px/2;
        background-color: #f6f6f6;
        padding: 20px/2;
        .cardText{
          color: #999;
          font-size: 23px/2;
        }
        .cardName{
          color: #999;
          font-size: 23px/2;
          text-align: right;
        }
      }
      .topNav{
        width: 100%;
        height: auto;
        margin-top: 30px/2;
        display: flex;
        justify-content: center;
        .navBox{
          width: 254px/2;
          height: 50px/2;
          line-height: 50px/2;
          display: flex;
          li{
            width: 127px/2;
            height: 50px/2;
            color: #666;
            border: 1px solid #e2e2e2;
            line-height: 50px/2;
            text-align: center;
            font-size: 24px/2;
          }
          li:first-child{
            border-radius: 50px/2 0 0 50px/2;
          }
          li:last-child{
            border-radius: 0 50px/2 50px/2 0;
          }
          .activeli{
            border:0;
            background-color: #df5c3e;
            color: #fff;
          }
        }
      }
    }
    .trainingList{
      width: 100%;
      height: auto;
      li{
        width: 100%;
        height: 504px/2;
        background-color: #fff;
        margin-top: 12px/2;
        .listImg{
          width: 100%;
          height: 374px/2;
          position: relative;
          image{
            width: 100%;
            height: 100%;
            display: block;
          }
          .imgTitle{
            width: 100%;
            height: 70px/2;
            background-color: rgba(0,0,0,0.5);
            line-height: 70px/2;
            color: #fff;
            font-size: 30px/2;
            padding: 0 26px/2;
            position: absolute;
            bottom: 0;
          }
        }
        .listFooter{
          width: 100%;
          height: 130px/2;
          padding:26px/2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .footerLeft{
            width: 603px/2;
            height: 100%;
            .footerTime{
              width: 100%;
              font-size: 26px/2;
              color: #666;
            }
            .footerAddress{
              width: 100%;
              font-size: 26px/2;
              color: #666;
              margin-top: 12px/2;
            }
          }
          .footerRight{
            width: 77px/2;
            height: 77px/2;
            border-radius: 50%;
            background-color: #df5c3e;
            color: #fff;
            text-align: center;
            line-height: 77px/2;
            font-size: 28px/2;
          }
        }
      }
    }
</style>
