<!--
 * @Description:
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-04 10:30:59
 * @LastEditors  : lys1626/刘芹芹
 * @LastEditTime : 2019-12-25 17:08:36
 -->
<template>
  <div class="app-wrap">
    <div class="app-content">
      <header>
        <i class="iconfont  icon--hc"></i>
        <h1>XX数据中心云平台</h1>
      </header>
      <div class=" app-middle-content">
        <div class="content-left">
          <!-- 已用资源统计 -->
          <div class="already-use use-count-left">
            <use-title title="已用资源统计" height="21" unit=""></use-title>
            <div class="already-con">
              <div class="host-con con-flag">
                <div class="host-num num-flag">{{server}}</div>
                <div class="host-img img-flag">
                  <img src="../assets/imgs/cloud-host-img.png" alt="主机数量" width="65" height="65">
                </div>
                <div class="host-info info-flag">
                  主机数量
                </div>
              </div>
              <div class="contact-lines">................</div>
              <div class="power-con con-flag">
                <div class="num-flag" style="color:#fdd912">{{powerServer}}</div>
                <div class="img-flag">
                  <img src="../assets/imgs/power-img.png" alt="power小机数量" width="65" height="65">
                </div>
                <div class="info-flag" style="width:150%">
                  power小机数量
                </div>
              </div>
              <div class="contact-lines">................</div>
              <div class="bare-con con-flag">
                <div class="num-flag" style="color:#02f235;width:100%">{{bareMetal}}</div>
                <div class="img-flag">
                  <img src="../assets/imgs/bare-metal-img.png" alt="裸金属数量" width="65" height="65">
                </div>
                <div class="info-flag" style="width:100%">
                  裸金属数量
                </div>
              </div>
            </div>
          </div>
          <!-- 各租户拥有虚机数量Top5 -->
          <div class="host-top5 use-count-left">
            <use-title
              title="各租户拥有虚机数量Top5"
              height="21"
              unit=""></use-title>
            <div class="host-top5-con">
              <div class="host-top5-title">
                平台租户总量
                <span class="host-top5-total">
                  {{tenantTotal}}</span>个
              </div>
              <div class="host-top5-progress-bar">
                <div
                  class="progress-bar"
                  v-for="(item, index) in hostTop5"
                  :key="index">
                  <div class="progress-bar-text">
                    <span class="progress-bar-title">
                      <span class="title-no" style="margin-right:8px" :style="noColorSty(index)">
                        {{index + 1}}
                      </span>
                      {{ item.title }}
                    </span>
                    <span class="progress-bar-ratio">{{ item.value }}</span>
                  </div>
                  <div class="progress-bar-wrapper">
                    <div class="progress-bar-already" :style="{width: item.width}"></div>
                    <div class="progress-bar-total"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-middle">
          <use-title title="云计算整体架构" height="21" unit=""></use-title>
          <div class="content-middle-con">
            <topo-chart></topo-chart>
          </div>
        </div>
        <div class="content-right">
          <!-- cpu 历史使用量 -->
          <div class="cpu-use use-count">
            <use-title title="CPU历史使用量" :unit="cpuUnit" height="21"></use-title>
            <div class="history-con">
              <usage-line-chart
                flag-id="cpu-use-con"
                line-color="#0397ff"
                :series-data="cpuUsedHistory"
                name-flag="CPU使用量"
                :row-data="historyDays"></usage-line-chart>
            </div>
          </div>
          <!-- 内存历史使用量 -->
          <div class="memory-use use-count">
            <use-title title="内存历史使用量" :unit="memoryUnit" height="21"></use-title>
            <div class="history-con">
              <usage-line-chart
                line-color="#fdd912"
                flag-id="memory-use-con"
                :series-data="memoryUsedHistory"
                name-flag="内存使用量"
                :row-data="historyDays">
              </usage-line-chart>
            </div>
          </div>
          <!-- 存储历史使用量 -->
          <div class="storage-use use-count">
            <use-title title="存储历史使用量" :unit="storageUnit" height="21"></use-title>
            <div class="history-con">
              <usage-line-chart
                line-color="#02f235"
                flag-id="storage-use-con"
                :series-data="storageUsedHistory"
                name-flag="存储使用量"
                :row-data="historyDays"></usage-line-chart>
            </div>
          </div>
        </div>
      </div>
      <div class="app-bottom-content">
        <div class="circle-con" style="position: relative;padding-top: 3.5%;">
          <div style="position: absolute;left: 0; width: 25%">
            <circle-process
              :unit="cpuUnit"
              text-color="#05c9fb"
              :percent="cpuPercent"
              :all-have="cpuTotal"
              :already-have="cpuUsed"
              hard-name="CPU"></circle-process>
          </div>
          <div class="split-line-left"></div>
          <div style="width: 28%">
            <circle-process
              :unit="memoryUnit"
              text-color="#fdd912"
              :all-have="memoryTotal"
              :already-have="memoryUsed"
              :percent="memoryPercent"
              hard-name="内存"></circle-process>
          </div>
          <div class="split-line-right">
          </div>
          <div style="position: absolute;right: -5px;width: 28%">
            <circle-process
              :unit="storageUnit"
              text-color="#02f235"
              :all-have="storageTotal"
              :already-have="storageUsed"
              :percent="storagePercent"
              hard-name="存储"></circle-process>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UseTitle from '@/components/UseTitle.vue';
import UsageLineChart from '@/components/UsageLineChart.vue';
import CircleProcess from '@/components/CircleProcess.vue';
import TopoChart from '@/components/TopoChart.vue';

export default {
  name: 'App',
  components: {
    'use-title': UseTitle,
    'usage-line-chart': UsageLineChart,
    'circle-process': CircleProcess,
    'topo-chart': TopoChart
  },
  data() {
    return {
      cpuUsedHistory: [50, 10, 60, 90, 25, 50], // cpu历史使用量
      historyDays: ['11/13', '11/14', '11/15', '11/16', '11/17', '11/18'],
      storageUsedHistory: [50, 82, 25, 60, 18, 48], // 存储历史使用量
      memoryUsedHistory: [5, 50, 40, 27, 75, 25], // 内存历史使用量
      tenantTotal: 852,
      // 各租户拥有虚机数量Top5
      hostTop5: [
        {
          width: '100%',
          title: '租户名称1',
          value: 240
        },
        {
          width: '80%',
          title: '租户名称2',
          value: 201
        },
        {
          width: '60%',
          title: '租户名称3',
          value: 146
        },
        {
          width: '50%',
          title: '租户名称4',
          value: 128
        },
        {
          width: '30%',
          title: '租户名称5',
          value: 64
        }
      ],
      bareMetal: 178, // 裸金属数量
      powerServer: 88, // power小机数量
      server: 298, // 主机数量
      cpuPercent: 0.25, // cpu百分比
      memoryPercent: 0.1, // memory百分比
      storagePercent: 0.5, // storage百分比
      cpuUsed: 80, // cpu已使用量
      cpuTotal: 320, // cpu总量
      memoryUsed: 12,
      memoryTotal: 120,
      storageUsed: 40,
      storageTotal: 80,
      cpuUnit: '核',
      storageUnit: 'TB',
      memoryUnit: 'GB'
    };
  },
  computed: {
    /**
     * @function: noColorSty
     * @description: Top5区分颜色
     * @param {type}
     * @returns: {void}
     */
    noColorSty() {
      let color = '';
      return index => {
        switch (index + 1) {
          case 1:
            color = '#ff3600';
            return {
              color: color
            };
          case 2:
            color = '#fdd912';
            return {
              color: color
            };
          case 3:
            color = '#02f235';
            return {
              color: color
            };
          case 4:
            color = '#0fe5fe';
            return {
              color: color
            };
          case 5:
            color = '#089cfd';
            return {
              color: color
            };
        }
      };
    }
  }
};
</script>

<style lang="less">
@font-face {
  font-family: 'DS-Digital'; /*字体名称*/
  src:
      /* IE6-IE8 */ url('../assets/font/DS-Digital.ttf')
    format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
}

@font-face {
  font-family: 'Fette-Engschrift'; /*字体名称*/
  src:
      /* IE6-IE8 */ url('../assets/font/Fette-Engschrift.ttf')
    format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
}

#app {
  width: 100%;
  height: 100%;
  min-height: 720px;
  min-width: 1280px;
  overflow: hidden;
  background: url('../assets/imgs/bg.png') center no-repeat;
  background-size: 100% 100%;
}
</style>

<style lang="less" scoped>
@headerHeight: 6.48%;
@middleHeight: 73.5%;
@bottomHeight: 20%;
@useCount: 21px;

@clientwidth: 1750vw;
@clientheight: 1000vh;
.count(@width,@height) {
  @w: @width / @clientwidth*100;
  @h: @height / @clientheight*100;
}
@topTitle: calc(~'100% + 16%');

.app-wrap {
  width: 100%;
  height: 100%;

  .app-content {
    position: relative;
    width: 100%;
    height: 100%;

    header {
      width: 100%;
      height: @headerHeight;
      background: url('../assets/imgs/top-bg.png') center no-repeat;
      background-size: 100% @topTitle;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: SimHei;
      // color: #019cec;
      h1 {
        font-size: 1.4rem;
        background: linear-gradient(to bottom, #f1f7fa, #6dd5fc, #4c7edd);
        background-clip: text;
        color: transparent;
        vertical-align: middle;
      }

      .iconfont {
        font-size: 4.5rem;
        margin-right: 14px;
        background: linear-gradient(to bottom, #faf1f6, #6dd5fc, #4c7edd);
        background-clip: text;
        color: transparent;
        vertical-align: middle;
      }
    }
    .app-middle-content {
      width: 100%;
      height: @middleHeight;
      box-sizing: border-box;
      display: flex;
      padding-left: 30px;
      padding-right: 30px;

      .content-left {
        width: 19.5%;
        display: flex;
        flex-direction: column;

        .use-count-left {
          width: 100%;

          .already-con {
            width: 100%;
            height: calc(~'96% - @{useCount}');
            display: flex;
            justify-content: space-between;

            .contact-lines {
              width: 12.5%;
              overflow: hidden;
              text-align: center;
              display: flex;
              color: #019cec;
              padding-top: 30%;
            }
            .con-flag {
              width: 25%;
              height: 100%;
              flex-direction: column;
              display: flex;
              text-align: center;
              align-items: center;
              padding-top: 6%;

              .num-flag {
                color: #05c9fb;
                font-size: 2.5rem;
                font-family: Fette-Engschrift;
                flex: 1;
                line-height: 3rem;
                text-align: center;
              }

              .img-flag {
                flex: 1;
                position: relative;
              }

              .info-flag {
                color: #fff;
                font-size: 0.875rem;
                font-family: 'MicrosoftYaHei';
                flex: 1;
                line-height: 2rem;
                text-align: center;
              }
            }

            .power-con {
              // width: 70px;
              height: 100%;
            }

            .bare-con {
              // width: 70px;
              height: 100%;
            }
          }

          .host-top5-con {
            width: 100%;
            height: calc(~'100% - @{useCount}');
            padding-top: 9%;
            box-sizing: border-box;

            .host-top5-title {
              width: 100%;
              height: 5%;
              font-family: 'MicrosoftYaHei';
              font-size: 1rem;
              color: #fff;
              vertical-align: middle;

              .host-top5-total {
                padding: 0px 15px;
                color: #fdd912;
                font-size: 2.25rem;
                font-family: DS-Digital;
                vertical-align: middle;
              }
            }
            .host-top5-progress-bar {
              width: 100%;
              position: relative;
              display: flex;
              flex-direction: column;
              height: 88%;

              .progress-bar {
                flex: 1;
                width: 100%;
                position: relative;

                .progress-bar-text {
                  width: 98%;
                  font-size: 0.49rem;
                  position: absolute;
                  top: 52%;
                  font-family: 'Microsoft YaHei';
                  line-height: 1rem;

                  .progress-bar-title {
                    position: absolute;
                    left: 0;
                    font-family: 'Microsoft YaHei';
                    color: #fff;
                    font-size: 0.875rem;
                  }

                  .progress-bar-ratio {
                    position: absolute;
                    right: 0;
                    font-family: DS-Digital;
                    font-size: 1.5rem;
                    color: #05c9fb;
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
                      #038bff,
                      #05cafb
                    );
                    background: -o-linear-gradient(to right, #038bff, #05cafb);
                    background: linear-gradient(to right, #038bff, #05cafb);
                    background: -webkit-linear-gradient(
                      to right,
                      #038bff,
                      #05cafb
                    );
                    border-radius: 5px;
                    position: absolute;
                    left: 0;
                    z-index: 100;
                  }

                  /* IE8+ */
                  .start-gradient {
                    color: #03b3e4;
                    font-weight: bold;
                    font-size: 1.6rem;
                    font-family: Fette-Engschrift;
                  }

                  .progress-bar-already {
                    background-color: #038bff;
                  }

                  .progress-bar-total {
                    background: #023d75;
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
          height: 32%;
        }
        .host-top5 {
          height: 68%;
        }
      }

      .content-middle {
        width: 58%;
        padding: 25px 40px;

        .content-middle-con {
          width: 100%;
          height: calc(~'100% - 21px');
          background: url('../assets/imgs/topology-img.png') center no-repeat;
          background-size: 99% 100%;
        }
      }
      .content-right {
        display: flex;
        flex-direction: column;
        width: 22.5%;

        .use-count {
          // flex: 1;
          width: 100%;
          height: 33.3%;

          .history-con {
            width: 100%;
            height: calc(~'100% - 21px');
          }
        }
      }
    }

    .app-bottom-content {
      width: 100%;
      height: @bottomHeight;
      background: url('../assets/imgs/bottom-bg.png') center no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;

      .circle-con {
        width: 58.5%;
        display: flex;
        justify-content: center;

        .split-line-left {
          width: 2px;
          height: 31%;
          background: #0e5d94;
          position: absolute;
          margin-top: 2%;
          left: 32%;
        }

        .split-line-right {
          width: 2px;
          height: 31%;
          background: #0e5d94;
          position: absolute;
          margin-top: 2%;
          right: 31%;
        }
      }
    }
  }
}
</style>
