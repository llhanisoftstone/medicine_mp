<template>
    <div class="container">
      <ul class="listUi">
        <li>
          <a href="/pages/userdata/main">
            <span class="personfile">个人资料</span>
            <div>
              完善个人资料奖励50银两
            </div>
          </a>
        </li>
        <li>
          <a href="/pages/partner/main">
            <span class="companycomp">合作商招募</span>
            <div>
              提交申请，共同创富
            </div>
          </a>
        </li>
        <li>
          <a  href="/pages/aboutus/main">
            <span class="aboutus">关于我们</span>
            <div>
              让我们了解一下吧
            </div>
          </a>
        </li>
        <li>
          <a  href="/pages/questions/main?isjy=true">
            <span class="jianyi">我要建议</span>
            <div>
              提交建议，采纳后送100银两
            </div>
          </a>
        </li>
      </ul>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'setting',
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
    .listUi{
      padding:0 13px;
      >li a{
        height:45px;
        width:100%;
        font-size:14px;
        color:#333;
        display:flex;
        justify-content: space-between;
        align-items: center;
        border-bottom:1px solid #e2e2e2;
        >div{
          color: #999;
          font-size: 22/2px;
          line-height: 24/2px;
          background: url("../../../static/img/arrow.png")no-repeat right center;;
          background-size: 12/2px 24/2px;
          padding-right: 20/2px;
        }
        >span{
          margin-left:12px;
          padding-left:28px;
          display:inline-block;
          }
        .personfile{
          background:url(../../../static/img/xgzl@2x.png) no-repeat left center;
          background-size:15px 15px;
        }
        .companycomp{
          background:url(../../../static/img/hezuo@2x.png) no-repeat left center;
          background-size:15px 15px;
        }
        .aboutus{
          background:url(../../../static/img/guanyu@2x.png) no-repeat left center;
          background-size:15px 15px;
        }
        .jianyi{
          background:url(../../../static/img/jianyi.png) no-repeat left center;
          background-size:15px 15px;
        }
        image{
          width:6px;
          height:12px;
        }
        a:hover{
          background:#fff;
        }
        .navigator-hover{
          background:#fff;
        }
      }
    }

</style>
