<!--
 * @Description: 
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-09 15:38:51
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-09 17:31:24
 -->
<template>
  <div class="topo-chart-container">
    <div id="topo-chart">
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: 'TopoChart',
  data() {
    return {
      topoChartNode: null,
      topoChartOption: {
        name: '',
        grid: {
          left: '0%',
          right: '0%',
          bottom: '0%',
          top: '0%'
        },
        series: [
          {
            name: '飞线图',
            type: 'lines',
            coordinateSystem: 'cartesian2d',
            zlevel: 20,
            animation: false,
            polyline: true,
            lineStyle: {
              normal: {
                color: 'transparent',
                type: 'solid',
                width: 1,
                curveness: 0.3
              }
            },
            effect: {
              show: true,
              color: 'orange',
              period: 6,
              trailLength: 0.2,
              symbol: 'circle',
              symbolSize: 3,
              constantSpeed: 0,
              loop: true
            },
            data: [
              // { coords: [[110, 200], [340, 200]] },
              // { coords: [[340, 200], [85, 135]] }
            ]
          }
        ],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          position: 'bottom',
          inverse: false,
          max: 600,
          min: 0,
          name: '',
          nameLocation: 'end',
          nameTextStyle: {
            color: '#ffffff',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 12,
            fontFamily: '微软雅黑'
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#00748e',
              width: 3,
              type: 'solid'
            }
          },
          axisLabel: {
            show: false,
            formatter: '{value}',
            interval: 'auto',
            rotate: 0,
            margin: 8,
            textStyle: {
              color: '#0094d9',
              fontSize: 12,
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontFamily: '微软雅黑',
              align: 'center',
              baseline: 'top'
            }
          },
          axisTick: {
            show: false,
            interval: 0,
            inside: false,
            length: 5,
            lineStyle: {
              color: '#00748e',
              width: 1
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#003346',
              width: 1,
              type: 'solid'
            }
          },
          splitArea: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: false,
          position: 'left',
          inverse: false,
          min: 0,
          max: 300,
          nameLocation: 'end',
          nameTextStyle: {
            color: '#ffffff',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 12,
            fontFamily: '微软雅黑'
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#00748e',
              width: 3,
              type: 'solid'
            }
          },
          axisLabel: {
            show: true,
            formatter: '{value}',
            interval: 0,
            rotate: 0,
            margin: 8,
            textStyle: {
              color: '#0094d9',
              fontSize: 12,
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontFamily: '微软雅黑',
              align: 'right',
              baseline: 'middle'
            }
          },
          axisTick: {
            show: true,
            interval: 'auto',
            inside: false,
            length: 5,
            lineStyle: {
              color: '#00748e',
              width: 1
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#003346',
              width: 1,
              type: 'solid'
            }
          },
          splitArea: {
            show: false
          }
        },
        animationEasing: 'cubicOut ',
        animationDuration: 700
      },
      /*每个部门的矩形图片位置*/
      buildingJsonModalData: {
        民航公安局: {
          coords: [[245, 145], [155, 175]]
        },
        森林公安局: {
          coords: [[218, 132], [158, 101], [127, 110]]
        },
        龙洞堡交警总队: {
          coords: [[267, 116], [155, 59]]
        },
        警察学院: {
          coords: [[337, 95], [249, 49]]
        },
        政务服务中心: {
          coords: [[337, 95], [437, 63], [385, 37]]
        },
        '110服务中心': {
          coords: [[380, 117], [512, 73]]
        },
        消防总队: {
          coords: [[429, 141], [513, 116]]
        },
        警犬基地: {
          coords: [[430, 141], [498, 177]]
        },
        省看守所: {
          coords: [[370, 166], [468, 218]]
        },
        边防总队: {
          coords: [[350, 195], [378, 208], [332, 225]]
        },
        海关缉私局: {
          coords: [[312, 185], [217, 218]]
        }
      },
      // 每个部位的光点移动坐标
      orangeNodes: [
        { coords: [[305, 145], [265, 129]] }
        // { coords: [[110, 200], [85, 20]] }
      ],
      blueNodes: [
        { coords: [[340, 200], [383, 47]] },
        { coords: [[340, 200], [523, 74]] },
        { coords: [[340, 200], [555, 140]] }
      ]
    };
  },
  methods: {
    initData() {
      let option = _.cloneDeep(this.topoChartOption);
      option.series[0].data = this.orangeNodes;
      // option.series[1].data = this.blueNodes;
      return option;
    },
    addColorData() {},
    initChart() {
      // this.initData(); // 加工数据
      this.topoChartNode.setOption(this.initData());
      console.log(this.topoChartNode);
    }
  },
  mounted() {
    this.topoChartNode = this.$echarts.init(
      document.getElementById('topo-chart')
    );
    this.initChart();
  }
};
</script>
<style lang="less" scoped>
.topo-chart-container {
  position: relative;
  width: 100%;
  height: 100%;

  #topo-chart {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
