<!--
 * @Description: 
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-17 14:08:09
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-17 14:10:17
 -->
<template>
  <div class="loader">
    <i-icon type="ios-loading" :size="40" class="full-icon-load"></i-icon>
    <div>Loading</div>
  </div>
</template>

<style lang="less">
.ivu-spin-fullscreen {
  &.ivu-spin-fullscreen-wrapper {
    .ivu-spin-fix {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}

.full-icon-load {
  animation: ani-full-icon-load 1s linear infinite;
}

@keyframes ani-full-icon-load {
  from {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
