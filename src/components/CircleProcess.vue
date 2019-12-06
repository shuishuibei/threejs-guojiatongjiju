<!--
 * @Description: 
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-06 15:01:28
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-06 17:28:00
 -->
<template>
  <div class="circle-container">
    <div class="bottom-circle"></div>
    <div class="top-circle"></div>
    <div class="center-text"></div>
    <!-- <i-circle :percent="80" :size="105" :stroke-width="8">
      <span class="demo-Circle-inner" :style="textSty">80%</span>
    </i-circle> -->
  </div>
</template>
<script>
export default {
  name: "CircleProcess",
  data() {
    return {
      textSty: {
        color: "#fff",
        fontWeight: "700",
        fontSize: "2.5em"
      }
    };
  }
};
</script>
<style lang="less" scoped>
svg > path:nth-child(2) {
  stroke: red;
}
.circle-container {
  width: 90px;
  height: 90px;
  border: 1px solid red;
  position: relative;
  z-index: 0;
  .bottom-circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid green;
    border-radius: 50%;
    z-index: 10;
    // border-radius: 80%;
    // -webkit-transform: rotate(45deg);
    // -ms-transform: rotate(45deg);
    // -o-transform: rotate(45deg);
    // transform: rotate(50deg);
  }
  .top-circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 10px solid blue;
    border-radius: 50%;
    z-index: 20;
    // transition: 1.5s all;
    // transform: rotate(35deg);
    // transform-origin: right center;
    // border-bottom-color: white;
  }
}
</style>
