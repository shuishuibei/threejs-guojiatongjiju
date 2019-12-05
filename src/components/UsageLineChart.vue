<!--
 * @Description: 
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-05 11:50:21
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-05 19:16:37
 -->
<template>
  <div></div>
</template>
<script>
import _ from 'lodash';

export default {
  name: 'UsageLineChart',
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
              fontSize: '0.41rem'
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
              color: '#fff'
            }
          },
          axisLabel: {
            interval: 0 //坐标轴刻度标签的显示间隔 0强制显示所有标签
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
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
              borderColor: '#01a2f6',
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
                      color: 'rgba(1, 162, 246, 0.6)' // 100% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: 'rgba(1, 162, 246, 0.4)' // 100% 处的颜色
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(1, 162, 246, 0.2)' // 100% 处的颜色
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
                        height: 15,
                        width: 30,
                        backgroundColor: 'blue',
                        align: 'center'
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
                        height: 15,
                        width: 30,
                        backgroundColor: 'red',
                        align: 'center'
                      }
                    }
                  }
                }
              ]
            },
            lineStyle: {
              width: 1
            },
            color: '#01a2f6',
            smooth: true,
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(1, 162, 246, 0.25)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(125, 178, 244, 0.02)'
                    }
                  ],
                  false
                )
              }
            }
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
    }
  },
  mounted() {
    this.init();
  }
};
</script>