<!--
 * @Description: 
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-04 10:30:59
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-05 18:27:06
 -->
<template>
  <div class="app-wrap">
    <div class="app-content">
      <header></header>
      <div class="app-middle-content">
        <div class="content-left"></div>
        <div class="content-middle"></div>
        <div class="content-right">
          <!-- cpu 历史使用量 -->
          <div class="cpu-use use-count">
            <use-title title="CPU历史使用量" height="22"></use-title>
            <div class="history-con" ref="cpu-use-con">
              <usage-line-chart
                flag-id="cpu-use-con"
                :series-data="CpuSeriesData"
                :row-data="CpuRowData"></usage-line-chart>
            </div>
          </div>
          <!-- 内存历史使用量 -->
          <div class="memory-use use-count">
            <use-title title="内存历史使用量" height="22"></use-title>
            <div class="history-con" ref="memory-use-con">
              <usage-line-chart
                flag-id="memory-use-con"
                :series-data="CpuSeriesData"
                :row-data="CpuRowData"></usage-line-chart>
            </div>
          </div>
          <!-- 存储历史使用量 -->
          <div class="storage-use use-count">
            <use-title title="内存历史使用量" height="22"></use-title>
            <div class="history-con" ref="storage-use-con">
              <usage-line-chart
                flag-id="storage-use-con"
                :series-data="CpuSeriesData"
                :row-data="CpuRowData"></usage-line-chart>
            </div>
          </div>
        </div>
      </div>
      <div class="app-bottom-content"></div>
    </div>
  </div>
</template>

<script>
import UseTitle from '@/components/UseTitle.vue';
import UsageLineChart from '@/components/UsageLineChart.vue';
export default {
  name: 'App',
  components: {
    'use-title': UseTitle,
    'usage-line-chart': UsageLineChart
  },
  data() {
    return {
      CpuSeriesData: [50, 10, 65, 90, 15, 55],
      CpuRowData: ['11/23', '11/24', '11/25', '11/26', '11/27', '11/28']
    };
  },
  methods: {
    init() {}
  },
  mounted() {
    this.init();
  }
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
@headerHeight: 5.5%;
@middleHeight: 74.5%;
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
      box-sizing: border-box;
      display: flex;
      padding-left: 28px;
      padding-right: 28px;

      .content-left {
        width: 19.5%;
        background: black;
      }
      .content-middle {
        width: 61%;
        background: #fff;
      }
      .content-right {
        background: black;
        display: flex;
        flex-direction: column;
        width: 19.5%;
        .use-count {
          flex: 1;
          width: 100%;
          border: 1px solid red;
          .history-con {
            width: 100%;
            height: calc(~'100% - 22px');
            background: pink;
          }
        }
      }
    }
    .app-bottom-content {
      width: 100%;
      height: @bottomHeight;
      background: yellow;
    }
  }
}
</style>
