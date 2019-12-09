<!--
 * @Description: 
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-06 15:01:28
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-09 14:19:50
 -->
<template>
  <div class="hard-ware-con" style="width:200px">
    <div class="circle-container" :style="circleSize">
      <!-- width="100%" height="100%" version="1.1" -->
      <svg viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M 50,50 m 0,-46
                a 46,46 0 1 1 0,92
                a 46,46 0 1 1 0,-92" stroke="#eaeef2" stroke-width="5" fill-opacity="0" stroke-linecap="round"></path>
        <path d="M 50,50 m 0,-46
                a 46,46 0 1 1 0,92
                a 46,46 0 1 1 0,-92"
          stroke-linecap="round"
          :stroke="shadowStrokeColor"
          stroke-width="12"
          fill-opacity="0"
          :style="pathStyle"></path>
        <!-- <path d="M 50,50 m 0,-46
                a 46,46 0 1 1 0,92
                a 46,46 0 1 1 0,-92"
        stroke-linecap="round"
        stroke="#2d8cf0"
        stroke-width="8"
        fill-opacity="0"
        style="stroke-dasharray: 289.027px, 289.027px; stroke-dashoffset: 57.8053px;
                 transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;"></path> -->
        <path d="M 50,50 m 0,-46
                a 46,46 0 1 1 0,92
                a 46,46 0 1 1 0,-92"
          stroke-linecap="round"
          :stroke="color"
          stroke-width="8"
          fill-opacity="0"
          :style="pathStyle"></path>
      </svg>
      <div class="inner-text">
        <span style="color: rgb(255, 255, 255); font-weight: 700; font-size: 2.5em;">80%
        </span>
      </div>
    </div>
    <!-- 硬件信息 -->
    <div class="hard-ware-info" :style="hardSize">
      <div style="display: table-cell;vertical-align: middle;">
        <span class="info-name">{{hardName}}</span>
        <br>
        <span class="already-have">{{alreadyHave}}</span>/
        <span class="all-have">{{allHave}}</span>
        <span class="unit">{{unit}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import colorChange from '@/assets/js/color-change.js';
export default {
  name: 'CircleProcess',
  mixins: [colorChange],
  props: {
    percent: {
      type: Number,
      default: 50
    },
    size: {
      type: Number,
      default: 100
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    color: {
      type: [String, Array],
      default: '#2d8cf0'
    },
    hardName: {
      type: [String],
      default: 'CPU'
    },
    alreadyHave: {
      type: [Number],
      default: 0
    },
    allHave: {
      type: [Number],
      default: 0
    },
    unit: {
      type: String,
      default: '核'
    }
  },
  data() {
    return {
      textSty: {
        fontWeight: '700',
        fontSize: '2.5em'
      }
    };
  },
  methods: {},
  computed: {
    shadowStrokeColor() {
      return this.color.colorRgba();
    },
    circleSize() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      };
    },
    hardSize() {
      return {
        width: `${200 - this.size}px`,
        height: `${200 - this.size}px`
      };
    },
    radius() {
      return 50 - this.strokeWidth / 2;
    },
    len() {
      return Math.PI * 2 * this.radius;
    },
    pathStyle() {
      let style = {};
      if (this.dashboard) {
        style = {
          'stroke-dasharray': `${(this.percent / 100) * (this.len - 75)}px ${
            this.len
          }px`,
          'stroke-dashoffset': `-${75 / 2}px`,
          transition:
            'stroke-dashoffset .3s ease 0s, stroke-dasharray .6s ease 0s, stroke .6s, stroke-width .06s ease .6s'
        };
      } else {
        style = {
          'stroke-dasharray': `${this.len}px ${this.len}px`,
          'stroke-dashoffset': `${((100 - this.percent) / 100) * this.len}px`,
          transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
        };
      }
      return style;
    }
  }
};
</script>
<style lang="less" scoped>
// svg > path:nth-child(2) {
//   stroke: red;
// }
.hard-ware-con {
  width: 200px;
  position: relative;
  .circle-container {
    position: relative;
    display: inline-block;
    .inner-text {
      width: 100%;
      text-align: center;
      position: absolute;
      left: 0;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
      line-height: 1;
    }
  }
  .hard-ware-info {
    position: absolute;
    top: 0;
    right: 0;
    display: table;
    color: #fff;
    font-size: 1em;
    font-weight: 700;
    padding-left: 20px;
  }
}
</style>
