<template>
    <div class="trainingdetails">
      <div class="detailsTop"><image src="/static/img/xiangmutoutu@1.png"></image></div>
      <div class="detailsBody">
        <div class="detailsTitle mui-ellipsis">企业培训企业培训企业培训企业培训</div>
        <ul>
          <li>
            <div class="liLeft"><image src="/static/img/huodongdizhi.png" class="dizhiImg"></image>地址</div>
            <div class="liRight mui-ellipsis">陕西省西安市世纪大道陕西省西安市世纪大道陕西省西安市世纪大道陕西省西安市世纪大道</div>
          </li>
          <li>
            <div class="liLeft"><image src="/static/img/huodongshijian.png" class="shijianImg"></image>活动时间</div>
            <div class="liRight mui-ellipsis">2018-01-02 10:00-12:00</div>
          </li>
        </ul>
        <div class="detailsNote">免费送你50本书，一起来画画吧！免费送你50本书，一起来画画吧！免费送你50本书，一起来画画吧 ！免费送你50免费送你50本书，一起来画画吧！免费送你50本书，一起来画画吧！免费送你50本书，一起来画画吧 ！免费送你50</div>
      </div>
      <div class="signIn">
        <div class="signInBtn">签到打卡</div>
      </div>
    </div>
</template>

<script type="javascript">
    import mptoast from '../../components/mptoast';
    export default {
        name: 'trainingdetails',
        data(){

        },
        methods: {

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
        height: 90px/2;
        line-height: 90px/2;
        font-size: 30px/2;
        color: #333;
        border-bottom: 1px solid #e2e2e2;
        padding: 0 23px/2;
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
          .liRight{
            width: 550px/2;
            font-size: 26px/2;
            color: #666;
            padding-left: 18px/2;
            border-left: 1px solid #e2e2e2;
          }
        }
      }
      .detailsNote{
        font-size: 26px/2;
        color: #666;
        line-height: 40px/2;
        text-indent:52px/2;
        margin-top: 28px/2;
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
