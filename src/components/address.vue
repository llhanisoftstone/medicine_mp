<template name="cascade">
    <view class="cascade_box" animation="{{animationData}}">
      <view class="cascade_hei"></view>
      <view class="cascade_find">
        <view class="cascade_header">
          <text class='quxiao' catchtap="quxiao">取消</text>
          <text class="queren" catchtap="queren">确认</text>
        </view>
        <picker-view indicator-style="height: 40px;" style="width: 100%; height: 200px;" bindchange="bindChange">
          <picker-view-column>
            <view wx:for="{{sheng}}" wx:key='this' style="line-height: 40px;text-align:center;">{{item}}</view>
          </picker-view-column>
          <picker-view-column>
            <view wx:for="{{shi}}" wx:key='this' style="line-height: 40px;text-align:center;">{{item}}</view>
          </picker-view-column>
          <picker-view-column>
            <view wx:for="{{qu}}" wx:key='this' style="line-height: 40px;text-align:center;">{{item}}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </template>

<script type="javascript">
    export default {
        name: 'address',
        props: [],
        data(){
            return {}
        },
        methods: {},
        components: {}

    }
</script>

<style lang="less" scoped>
  .cascade_box{
    font-size:14px;
    width: 100%;
    height: 0;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .cascade_hei{
    width: 100%;
    height:365px;
    background: #000;
    opacity: 0.5;
  }
  .cascade_find{
    width: 100%;
    height: 500px;
    position: relative;
    /*bottom: 0;
    left: 0;*/
    background: #fff;
  }

  .quxiao,.queren{
    display: block;
    position: absolute;
    width: 100px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: #0f0;
  }
  .queren{
    right: 0;
    top: 0;
  }
  .cascade_header{
    height: 80px;
    width: 100%;
    margin-bottom: 20px;
  }

</style>
