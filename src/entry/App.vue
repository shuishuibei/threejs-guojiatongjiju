<!--
 * @Description: 
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-04 10:30:59
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-06 15:02:14
 -->
<template>
  <div class="app-wrap">
    <div class="app-content">
      <header></header>
      <div class="app-middle-content">
        <div class="content-left">
          <!-- 已用资源统计 -->
          <div class="already-use use-count">
            <use-title title="已用资源统计" height="21" unit=""></use-title>
            <div class="already-con">
            </div>
          </div>
          <!-- 各租户拥有虚机数量Top5 -->
          <div class="host-top5 use-count">
            <use-title title="各租户拥有虚机数量Top5" height="21" unit=""></use-title>
            <div class="host-top5-con">
              <div class="host-top5-title">平台租户总量<span style="padding: 0px 15px;">{{tenantTotal}}</span>个</div>
              <div class="host-top5-progress-bar">
                <div class="progress-bar" v-for="(item,index) in hostTop5" :key="index">
                  <div class="progress-bar-text">
                    <span class="progress-bar-title">{{item.title}}</span>
                    <span class="progress-bar-ratio">{{item.value}}</span>
                  </div>
                  <div class="progress-bar-wrapper">
                    <div class="progress-bar-already" :style="item.sty"></div>
                    <div class="progress-bar-total"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-middle"></div>
        <div class="content-right">
          <!-- cpu 历史使用量 -->
          <div class="cpu-use use-count">
            <use-title title="CPU历史使用量" height="21"></use-title>
            <div class="history-con" ref="cpu-use-con">
              <usage-line-chart
                flag-id="cpu-use-con"
                :series-data="CpuSeriesData"
                :row-data="CpuRowData"></usage-line-chart>
            </div>
          </div>
          <!-- 内存历史使用量 -->
          <div class="memory-use use-count">
            <use-title title="内存历史使用量" height="21"></use-title>
            <div class="history-con" ref="memory-use-con">
              <usage-line-chart
                flag-id="memory-use-con"
                :series-data="CpuSeriesData"
                :row-data="CpuRowData"></usage-line-chart>
            </div>
          </div>
          <!-- 存储历史使用量 -->
          <div class="storage-use use-count">
            <use-title title="内存历史使用量" height="21"></use-title>
            <div class="history-con" ref="storage-use-con">
              <usage-line-chart
                flag-id="storage-use-con"
                :series-data="CpuSeriesData"
                :row-data="CpuRowData"></usage-line-chart>
            </div>
          </div>
        </div>
      </div>
      <div class="app-bottom-content">
        <circle-process>
        </circle-process>
      </div>
    </div>
  </div>
</template>

<script>
import UseTitle from '@/components/UseTitle.vue';
import UsageLineChart from '@/components/UsageLineChart.vue';
import CircleProcess from '@/components/CircleProcess.vue';
export default {
  name: 'App',
  components: {
    'use-title': UseTitle,
    'usage-line-chart': UsageLineChart,
    'circle-process': CircleProcess
  },
  data() {
    return {
      CpuSeriesData: [50, 10, 65, 90, 15, 55],
      CpuRowData: ['11/23', '11/24', '11/25', '11/26', '11/27', '11/28'],
      tenantTotal: 800,
      hostTop5: [
        {
          title: '1.租户名称',
          value: 240,
          sty: {
            width: '50%'
          }
        },
        {
          title: '1.租户名称',
          value: 888,
          sty: {
            width: '50%'
          }
        },
        {
          title: '1.租户名称',
          value: 240,
          sty: {
            width: '50%'
          }
        },
        {
          title: '1.租户名称',
          value: 240,
          sty: {
            width: '50%'
          }
        },
        {
          title: '1.租户名称',
          value: 240,
          sty: {
            width: '50%'
          }
        }
      ]
    };
  },
  methods: {
    init() {},
    setProgressBar(obj) {
      let der = ((obj.value / this.tenantTotal) * 100).toFixed(2);
      if (der > 100) {
        obj.sty.width = '100%';
      } else {
        obj.sty.width = der + '%';
      }
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    getBarWidth(value) {
      return value / this.tenantTotal;
    }
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
@useCount: 21px;
// @font-face {
//   font-family: 'DS-Digital'; /*字体名称*/
//   src: url('字体/DS-Digital.eot') format('embedded-opentype'),
//     /* IE6-IE8 */ url('字体/DS-Digital.ttf') format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
// }

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
    }
    .app-middle-content {
      width: 100%;
      height: @middleHeight;
      box-sizing: border-box;
      display: flex;
      padding-left: 28px;
      padding-right: 28px;

      .content-left {
        width: 19.5%;
        background: black;
        display: flex;
        flex-direction: column;
        .use-count {
          width: 100%;
          .already-con {
            width: 100%;
            height: calc(~'100% - @{useCount}');
          }
          .host-top5-con {
            width: 100%;
            height: calc(~'100% - @{useCount}');
            padding-top: 12%;
            box-sizing: border-box;
            .host-top5-title {
              width: 100%;
              color: #fff;
              height: 5%;
            }
            .host-top5-progress-bar {
              width: 100%;
              position: relative;
              display: flex;
              flex-direction: column;
              height: 95%;
              margin-top: -7%;
              .progress-bar {
                flex: 1;
                width: 100%;
                position: relative;
                .progress-bar-text {
                  width: 98%;
                  font-size: 0.49rem;
                  position: absolute;
                  top: 55%;
                  font-family: 'Microsoft YaHei';
                  .progress-bar-title {
                    position: absolute;
                    left: 0;
                    color: #fff;
                  }
                  .progress-bar-ratio {
                    position: absolute;
                    right: 0;
                    color: #24ddfc;
                    font-family: DS-Digital;
                    font-size: 0.87rem;
                  }
                }
                .progress-bar-wrapper {
                  width: 100%;
                  height: 11%;
                  position: absolute;
                  bottom: 0;
                  .progress-bar-already {
                    height: 100%;
                    background: -moz-linear-gradient(
                      to right,
                      #03b3e4,
                      #01b074
                    );
                    background: -o-linear-gradient(to right, #03b3e4, #01b074);
                    background: linear-gradient(to right, #03b3e4, #01b074);
                    background: -webkit-linear-gradient(
                      to right,
                      #03b3e4,
                      #01b074
                    );
                    border-radius: 5px;
                    position: absolute;
                    left: 0;
                    z-index: 100;
                  }
                  /* IE8+ */
                  .start-gradient {
                    color: #26d1fc;
                    font-weight: bold;
                    font-size: 1.6rem;
                    font-family: Fette-Engschrift;
                  }
                  .progress-bar-already {
                    background-color: #03b3e4;
                  }
                  .progress-bar-total {
                    background: #093a5c;
                    border-radius: 5px;
                    position: absolute;
                    height: 100%;
                    width: 98%;
                    left: 0;
                    z-index: 10;
                  }
                }
              }
            }
          }
        }
        .already-use {
          height: 31%;
        }
        .host-top5 {
          height: 69%;
        }
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
          .history-con {
            width: 100%;
            height: calc(~'100% - 22px');
          }
        }
      }
    }
    .app-bottom-content {
      width: 100%;
      height: @bottomHeight;
      background: paleturquoise;
    }
  }
}
</style>
