<!--
 * @Description: 
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-04 10:30:59
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-04 17:29:41
 -->
<template>
  <div class="app-wrap">
    <div class="app-content">
      <header></header>
      <div class="app-middle-content"></div>
      <div class="app-bottom-content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

<style lang="less" scoped>
@headerHeight: 6%;
@middleHeight: 74%;
@bottomHeight: 20%;
.app-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .app-content {
    position: relative;
    width: 100%;
    height: 100%;

    header {
      width: 100%;
      height: @headerHeight;
      background: red;
    }
    .app-middle-content {
      width: 100%;
      height: @middleHeight;
      background: blue;
    }
    .app-bottom-content {
      width: 100%;
      height: @bottomHeight;
      background: yellow;
    }
  }
}
</style>
