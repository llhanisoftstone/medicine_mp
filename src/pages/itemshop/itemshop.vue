<template>
    <div class="container">
      <ul class="tablist">
        <li v-on:click="leftclick" stype="1" v-bind:class="{ on: isActive }">道具商店</li>
        <li stype="2" v-on:click="rightclick" v-bind:class="{ on: isclcik}">我的背包</li>
        <li class="left_line" v-bind:class="{ right: isSelect }"></li>
      </ul>
      <div class="itemlist" v-if="seen">
        <ul>
          <li><img src="/static/img/daojushangdian_11.png" alt=""><div class="bottomlist"><span class="sliverimg"></span><span>2000</span></div></li>
          <li><img src="/static/img/daojushangdian_13.png" alt=""><div class="bottomlist"><span class="sliverimg"></span><span>2000</span></div></li>
        </ul>
      </div>
      <div class="myitemlist" v-if="isshow">
        <ul>
          <li><img src="/static/img/daojushangdian_11.png" alt=""><div class="bottomlist">x2</div></li>
          <li><img src="/static/img/daojushangdian_13.png" alt=""><div class="bottomlist">x2</div></li>
        </ul>
      </div>
    </div>
</template>

<script type="javascript">
    export default {
        name: 'itemshop',
        props: [],
        data(){
            return {
              seen:true,
              isshow:false,
              isActive:true,
              isclcik:false,
              isSelect:false,
            }
        },
        methods: {
          leftclick(){
              this.seen=true;
              this.isshow=false;
              this.isActive=true;
              this.isclcik=false;
              this.isSelect=false;
          },
          rightclick(){
            this.seen=false;
            this.isshow=true;
            this.isActive=false;
            this.isclcik=true;
            this.isSelect=true;
          }
        },
        components: {}

    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .tablist{
      display:flex;
      justify-content: space-between;
      align-items: center;
      position:relative;
      li{
        width:50%;
        height:40px;
        line-height:40px;
        text-align:center;
        font-size:15px;
        color:#333;
      }
      li.on{
        color:#df5c3e;
      }
      .left_line{
        position:absolute;
        left:0;
        bottom:0;
        right:auto;
        transition: all .3s ease;
        border-bottom: none;
        width:50%;
        height:2px;
        background:#df5c3e;
      }
      .left_line.right{
        position:absolute;
        right:0;
        bottom:0;
        left:auto;
        transition: all .3s ease;
        border-bottom: none;
        width:50%;
        height:2px;
        background:#df5c3e;
      }
    }
  .itemlist{
    margin:13px;
    ul{
      li{
        float:left;
        width:106px;
        height:120px;
        border-radius:5px;
        background:#ffe7e8;
        margin-right:17px;
        text-align:center;
        position:relative;
        image{
          width:65px;
          height:65px;
          margin-top:20px;
        }
      }
      .bottomlist{
        margin-top:20px;
        width:100px;
        height:30px;
        border:2.5px solid #fff;
        border-radius:100px;
        background:#df5c3e;
        font-size:14px;
        color:#fff;
        text-align:center;
        z-index:50;
        display:flex;
        justify-content: center;
        align-items: center;
        span{
          display:inline-block;
        }
        .sliverimg{
          display:inline-block;
          width:20px;
          height:15px;
          background:url(../../../static/img/daojushangdian_18.png) no-repeat center center;
          background-size:cover;
          margin-right:4px;
        }
      }
    }
  }
  .myitemlist{
    margin:13px;
    ul{
      li{
        float:left;
        width:106px;
        height:106px;
        border-radius:5px;
        background:#ffe7e8;
        margin-right:17px;
        text-align:center;
        position:relative;
        image{
          width:65px;
          height:65px;
          margin-top:20px;
        }
      }
      .bottomlist{
        position:absolute;
        top:70px;
        left:70px;
        font-size:15px;
        color: #df5c3e;
      }
    }
  }

</style>
