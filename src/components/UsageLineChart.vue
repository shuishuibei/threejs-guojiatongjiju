<!--
 * @Description: 
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-05 11:50:21
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-11 17:37:58
 -->
<template>
  <div></div>
</template>
<script>
import _ from 'lodash';
import colorChange from '@/assets/js/color-change.js';
import { on, off } from '@/assets/js/dom.js';

export default {
  name: 'UsageLineChart',
  mixins: [colorChange],
  props: {
    seriesData: {
      type: [Object, Array],
      required: true
    },
    rowData: {
      type: [Object, Array],
      required: true
    },
    flagId: {
      type: String,
      required: true
    },
    lineColor: {
      type: String,
      default: '#01a2f6'
    }
  },
  data() {
    return {
      useChart: null,
      useChartOption: {
        name: '',
        grid: {
          left: '10%',
          right: '5.5%',
          bottom: '25%',
          top: '12%'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}月份<br/>活跃用户数：{c}',
          axisPointer: {
            type: 'line',
            textStyle: {
              color: '#fff'
            },
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, //坐标轴两边留白策略
          data: [],
          splitLine: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
              fontSize: '0.75rem'
            }
          },
          axisLabel: {
            interval: 0
          },
          axisTick: {
            show: false
          },
          axisPointer: {
            triggerTooltip: true
          }
        },
        yAxis: {
          type: 'value',
          min: 0, // 坐标轴刻度最小值
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
              fontSize: '0.75rem'
            }
          },
          axisLabel: {
            interval: 0 //坐标轴刻度标签的显示间隔 0强制显示所有标签
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#192e48'
            }
          }
        },
        series: [
          {
            data: [],
            type: 'line',
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 8,
            itemStyle: {
              borderColor: this.lineColor,
              borderWidth: 2
            },
            markPoint: {
              symbol: 'circle',
              symbolSize: 30,
              itemStyle: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#fff' // 0% 处的颜色
                    },
                    {
                      offset: 0.2,
                      color: '#fff' // 100% 处的颜色
                    },
                    {
                      offset: 0.4,
                      color: this.lineColor.colorRgba(0.6) // 100% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: this.lineColor.colorRgba(0.4) // 100% 处的颜色
                    },
                    {
                      offset: 0.8,
                      color: this.lineColor.colorRgba(0.2) // 100% 处的颜色
                    }
                  ]
                },
                shadowBlur: 20,
                // opacity: 0,
                label: {
                  show: true
                }
              },
              data: [
                {
                  type: 'max',
                  name: '最大值',
                  label: {
                    show: true,
                    position: 'right',
                    color: '#fff',
                    formatter: a => {
                      return ['{a|' + a.data.value + '}'].join('\n');
                    },
                    rich: {
                      a: {
                        color: '#fff',
                        // height: 20,
                        // width: 30,
                        backgroundColor: this.lineColor.colorRgba(0.6),
                        align: 'center',
                        borderRadius: 3,
                        // verticalAlign: 'middle',
                        padding: [2, 10, 4, 10],
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 12
                      }
                    }
                  }
                },
                {
                  type: 'min',
                  name: '最小值',
                  label: {
                    show: true,
                    position: 'right',
                    color: '#fff',
                    formatter: a => {
                      return ['{a|' + a.data.value + '}'].join('\n');
                    },
                    rich: {
                      a: {
                        color: '#fff',
                        // height: 15,
                        // width: 30,
                        backgroundColor: this.lineColor.colorRgba(0.6),
                        align: 'center',
                        padding: [2, 10, 4, 10],
                        borderRadius: 3,
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 12
                      }
                    }
                  }
                }
              ]
            },
            lineStyle: {
              width: 1
            },
            color: this.lineColor,
            smooth: true
            // areaStyle: {
            //   normal: {
            //     color: new this.$echarts.graphic.LinearGradient(
            //       0,
            //       0,
            //       0,
            //       1,
            //       [
            //         {
            //           offset: 0,
            //           color: 'rgba(1, 162, 246, 0.25)'
            //         },
            //         {
            //           offset: 1,
            //           color: 'rgba(125, 178, 244, 0.02)'
            //         }
            //       ],
            //       false
            //     )
            //   }
            // }
          }
        ]
      }
    };
  },
  methods: {
    init() {
      this.useChart = this.$echarts.init(this.$parent.$refs[this.flagId]);
      this.useChart.setOption(this.setData());
    },
    setData() {
      let option = _.cloneDeep(this.useChartOption);
      option.series[0].data = this.seriesData;
      option.xAxis.data = this.rowData;
      return option;
    },
    handleResize() {
      this.useChart.resize();
    }
  },
  mounted() {
    this.init();
    on(window, 'resize', this.handleResize);
  },
  beforeDestroy() {
    off(window, 'resize', this.handleResize);
  }
};
</script>