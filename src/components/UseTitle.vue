<!--
 * @Description: 
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-05 10:33:29
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-06 14:25:19
 -->
<template>
  <div class="title-wrapper" :style="{height: height + 'px'}">
    <img :src="titleImg" alt="标题图片" :style="{height: height + 'px',width: height + 'px'}">
    <div class="title-text"> {{title}}</div>
    <div class="unit-text">{{unit}}</div>
  </div>
</template> 
<script>
import titleImg from '@/assets/imgs/title-icon.png';
export default {
  name: 'UseTitle',
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    height: {
      type: String,
      required: true,
      default: '22'
    },
    unit: {
      type: String,
      default: '单位：%'
    }
  },
  data() {
    return {
      titleImg: titleImg
    };
  }
};
</script>
<style lang="less" scoped>
.title-wrapper {
  width: 100%;
  img {
    width: 22px;
    height: 22px;
    vertical-align: middle;
  }
  .title-text {
    display: inline-block;
    padding-left: 5px;
    color: #fff;
    font-size: 0.8em;
    vertical-align: middle;
  }
  .unit-text {
    float: right;
    color: #fff;
    font-size: 0.8em;
    vertical-align: middle;
    line-height: 1.7;
  }
}
</style>