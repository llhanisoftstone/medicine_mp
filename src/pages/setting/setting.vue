<template>
    <div class="container">
      <ul class="listUi">
        <li>
          <a href="/pages/userdata/main">
            <span class="personfile">个人资料</span>
            <img src="/static/img/arrow.png"/>
          </a>
        </li>
        <li>
          <a href="/pages/partner/main">
            <span class="companycomp">合作商</span>
            <img src="/static/img/arrow.png"/>
          </a>
        </li>
        <li>
          <a  href="/pages/aboutus/main">
            <span class="aboutus">关于我们</span>
            <img src="/static/img/arrow.png"/>
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
