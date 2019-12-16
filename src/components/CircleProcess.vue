<!--
 * @Description: 
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-06 15:01:28
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-16 18:55:48
 -->
<template>
  <div class="hard-ware-con" style="width:100%">
    <div class="circle-container">
      <i-circle
        :size="size"
        :percent="percent"
        trail-color="#023d7f"
        :trail-width="8.5"
        :stroke-color="color"
        :stroke-width="8.5">
        <span class="demo-Circle-inner">{{showPercent}}
          <span class="demo-Circle-inner-icon">%</span>
        </span>
      </i-circle>
    </div>
    <!-- 硬件信息 -->
    <div class="hard-ware-info">
      <div style="display: table-cell;vertical-align: middle;">
        <span class="info-name" :style="{color: textColor}">{{hardName}}</span>
        <span class="clip-text" :style="hardSty" :title="settitle(alreadyHave,allHave,unit)">
          <span class="already-have" :style="{color: textColor}">{{alreadyHave}}</span>
          <span class="all-have">/{{allHave}}</span>
          <span class="unit">{{unit}}</span>
        </span>
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
      default: 105
    },
    color: {
      type: [String, Array],
      default: '#3be5fe'
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
    showPercent() {
      return (this.percent * 100).toFixed(1);
    },
    hardSty() {
      return {
        width: `${200 - this.size}px`
      };
    },
    settitle(val1, val2, val3) {
      return (val1, val2, val3) => {
        return val1 + '/' + val2 + val3;
      };
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

.demo-Circle-inner {
  color: #fff;
  font-size: 3rem;
  font-family: Fette-Engschrift;
}

.demo-Circle-inner-icon {
  font-size: 1.875rem;
}

.hard-ware-con {
  width: 200px;
  position: relative;

  .circle-container {
    position: relative;
    display: inline-block;
  }

  .hard-ware-info {
    height: 100%;
    position: absolute;
    top: 0;
    // right: 0;
    left: 100px;
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

    .clip-text {
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
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
