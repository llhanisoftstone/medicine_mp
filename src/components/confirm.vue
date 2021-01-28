<template>
  <cover-view class="mui-popup-backdrop mui-active" style="display: block;" v-if="isshow">
    <cover-view class="mui-popup mui-popup-in" style="display: block;">
      <cover-view class="mui-popup-inner">
        <cover-view class="mui-popup-title">{{title}}</cover-view>
        <cover-view class="mui-popup-text">{{content}}</cover-view>
      </cover-view>
      <cover-view class="mui-popup-bordebottom"></cover-view>
      <cover-view class="mui-popup-buttons">
        <cover-view @click.stop="runcallback('0')" class="mui-popup-button">取消</cover-view>
        <cover-view class="mui-popup-borderright"></cover-view>
        <cover-view @click.stop="runcallback('1')" class="mui-popup-button mui-popup-button-bold">{{confirmText}}</cover-view>
      </cover-view>
    </cover-view>
  </cover-view>
</template>

<script type="javascript">
  export default {
    props: [],
    data () {
      return {
        title:"提示",
        content:"确认执行该操作？",
        confirmText:"确定",
        callback:null,
        isshow:false,
        isruntime:null
      }
    },
    methods:{
      show(obj){
        if(obj){
          this.title=obj.title||"提示";
          this.content=obj.content||"确认执行该操作？";
          this.confirmText=obj.confirmText||"确定";
          this.callback=obj.success||obj.complete
        }
        this.isshow=true;
      },
      hide(){
        this.isshow=false;
      },
      runcallback(code){
        if(this.isruntime){
          return;
        }
        this.hide();
        var that=this;
        this.isruntime=setTimeout(function(){
          that.isruntime=null;
          if(that.callback){
            if(code==1){
              that.callback({confirm:true});
            }else{
              that.callback({cancel:true});
            }
          }
        },300)
      }
    },
    onUnload(){
      this.isshow=false;
    }
  }
</script>

<style scoped>
  .mui-popup-backdrop.mui-active {
    opacity: 1;
  }
  .mui-popup-backdrop {
    position: fixed;
    z-index: 998;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    -webkit-transition-duration: 400ms;
    transition-duration: 400ms;
    opacity: 0;
    background: rgba(0,0,0,.4);
  }
  .mui-popup.mui-popup-in {
    display: block;
    -webkit-transition-duration: 400ms;
    transition-duration: 400ms;
    -webkit-transform: translate3d(-50%,-50%,0) scale(1);
    transform: translate3d(-50%,-50%,0) scale(1);
    opacity: 1;
  }
  .mui-popup {
    position: fixed;
    z-index: 10000;
    top: 50%;
    left: 50%;
    display: none;
    overflow: hidden;
    width: 270px;
    -webkit-transition-property: -webkit-transform,opacity;
    transition-property: transform,opacity;
    -webkit-transform: translate3d(-50%,-50%,0) scale(1.185);
    transform: translate3d(-50%,-50%,0) scale(1.185);
    text-align: center;
    opacity: 0;
    color: #000;
    border-radius: 13px;
  }
  .mui-popup-inner {
    position: relative;
    padding: 15px;
    background: rgba(255,255,255,.95);
    /*border-bottom: 1px solid #ccc;*/
  }
  .mui-popup-title {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
  }
  .mui-popup-title+.mui-popup-text {
    font-family: inherit;
    font-size: 14px;
    margin: 5px 0 0;
  }
  .mui-popup-buttons {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    height: 44px;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
  .mui-popup-button {
    font-size: 17px;
    line-height: 44px;
    position: relative;
    display: block;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    /*padding: 0 5px;*/
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    background: rgba(255,255,255,.95) !important;
    -webkit-box-flex: 1;
  }
  .mui-popup-button {
    color: #333;
    /*border-right:1px solid #ccc;*/
  }
  .mui-popup-button.mui-popup-button-bold {
    font-weight: normal;
    color: #2dc9aa;
  }
  .mui-popup-button:last-child {
    /*border-right:none;*/
  }
  .mui-popup-bordebottom{
    width: 100%;
    height: 1px;
    background: #ccc;
  }
  .mui-popup-borderright{
    width: 1px;
    height: 100%;
    flex: none;
    background: #ccc;
  }
  cover-view.mui-popup-text{
    white-space: normal;
  }
</style>
