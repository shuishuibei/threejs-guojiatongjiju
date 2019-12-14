<!--
 * @Description: 
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-06 15:01:28
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-14 18:03:46
 -->
<template>
  <div class="hard-ware-con" style="width:100%">
    <div class="circle-container" style="width:50%;height:100%">
      <svg viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M 50,50 m 0,-46
                a 46,46 0 1 1 0,92
                a 46,46 0 1 1 0,-92" stroke="#023d7f" stroke-width="8.5" fill-opacity="0" stroke-linecap="round"></path>
        <!-- <path d="M 50,50 m 0,-46
                a 46,46 0 1 1 0,92
                a 46,46 0 1 1 0,-92"
          stroke-linecap="round"
          :stroke="shadowStrokeColor"
          stroke-width="11"
          fill-opacity="0"
          :style="pathStyle"></path> -->
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
          stroke-width="8.5"
          fill-opacity="0"
          :style="pathStyle"></path>
      </svg>
      <div class="inner-text">
        <span style="color: #fff;
          font-size: 3rem; 
          font-family: Fette-Engschrift;">
          {{percent}}
        </span>
        <span style="color: #fff;
        font-size: 1.875rem; 
        font-family: Fette-Engschrift;">
          %
        </span>
      </div>
    </div>
    <!-- 硬件信息 -->
    <div class="hard-ware-info" style="width:50%;height:100%">
      <div style="display: table-cell;vertical-align: middle;">
        <span class="info-name" :style="{color: textColor}">{{hardName}}</span>
        <span class="already-have" :style="{color: textColor}">{{alreadyHave}}</span>
        <span class="all-have">/{{allHave}}</span>
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
      default: '#3be5fe'
    },
    shadowColor: {
      type: [String, Array],
      default: '#0366fb'
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
    },
    textColor: {
      type: String,
      default: '#05c9fb'
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
      return this.color.colorRgba(0.2);
    },
    // 原形进度条大小
    circleSize() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      };
    },
    // 进度条旁边提示信息大小
    hardSize() {
      return {
        width: `${200 - this.size}px`,
        height: `${this.size}px`
      };
    },
    // 半径
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
@font-face {
  font-family: 'Fette-Engschrift'; /*字体名称*/
  src:
    /* IE6-IE8 */ url('../assets/font/Fette-Engschrift.ttf')
    format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
}

.hard-ware-con {
  width: 200px;
  position: relative;

  .circle-container {
    position: relative;
    display: inline-block;
    padding: 2px;

    .inner-text {
      width: 100%;
      text-align: center;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .hard-ware-info {
    position: absolute;
    top: 0;
    right: 0;
    display: table;
    color: #fff;
    font-size: 1em;
    padding-left: 25px;

    .info-name {
      font-family: 'MicrosoftYaHei';
      font-size: 1.25rem;
      display: block;
      padding-bottom: 13px;
    }

    .already-have {
      font-family: Fette-Engschrift;
      font-size: 2.5rem;
    }

    .all-have {
      font-family: Fette-Engschrift;
      font-size: 2.5rem;
      color: #fff;
    }

    .unit {
      font-family: 'MicrosoftYaHei';
      font-size: 1.125rem;
      color: #efeeee;
    }
  }
}
</style>
