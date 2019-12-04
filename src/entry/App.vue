<!--
 * @Description
 * @Author ys1983/张睿博
 * @Date 2019-10-29 10:29:09
 * @LastEditors ys1983/张睿博
 * @LastEditTime 2019-11-07 10:42:15
 -->
<template>
  <div class="app-wrap">
    <div id="echarts"></div>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang='less'>
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.app-wrap {
  width: 100%;
  height: 100%;
}
#echarts {
  width: 700px;
  height: 700px;
  border: 1px solid red; /*no*/
  margin: auto;
}
</style>
