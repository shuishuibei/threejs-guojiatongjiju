<!--
 * @Description: 
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-09 15:38:51
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-12 10:11:52
 -->
<template>
  <div class="topo-chart-container">
    <div id="topo-chart">
    </div>
    <div class="topo-description">
      <div class="topo-type">
        <span class="topo-type-color"></span>
        <span class="topo-type-info">与SDN控制器相关联</span>
      </div>
      <div class="topo-type">
        <span class="topo-type-color" style="background:#037aff"></span>
        <span class="topo-type-info">与Power管理容器相关联</span>
      </div>
      <div class="topo-type">
        <span class="topo-type-color" style="background:#03d0f1"></span>
        <span class="topo-type-info">与裸金属/虚拟化管理节点</span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { on, off } from '@/assets/js/dom.js';

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
              color: '#03d0f1',
              period: 6,
              trailLength: 0.2,
              symbol: 'circle',
              symbolSize: 3,
              constantSpeed: 0,
              loop: true
            },
            data: []
          },
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
              color: '#037aff',
              period: 6,
              trailLength: 0.2,
              symbol: 'circle',
              symbolSize: 3,
              constantSpeed: 0,
              loop: true
            },
            data: []
          },
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
              color: '#fdd912',
              period: 6,
              trailLength: 0.2,
              symbol: 'circle',
              symbolSize: 3,
              constantSpeed: 0,
              loop: true
            },
            data: []
          },
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
              color: '#55fe7c',
              period: 6,
              trailLength: 0.2,
              symbol: 'circle',
              symbolSize: 3,
              constantSpeed: 0,
              loop: true
            },
            data: []
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
      // 裸金属/虚拟化管理节点 #03d0f1
      bareNodes: [
        { coords: [[280, 244], [203, 213]] },
        // { coords: [[294, 239], [217, 208]] }
        { coords: [[294, 239], [22, 130], [52, 118]] },
        { coords: [[386, 214], [324, 239]] }
      ],
      powerNodes: [
        // 域power管理容器相关联
        { coords: [[464, 182], [534, 156]] },
        { coords: [[529, 133], [406, 83]] },
        { coords: [[239, 167], [374, 114]] },
        { coords: [[225, 166], [275, 145], [250, 134]] }
      ],
      // SDN控制器相关联
      sdnNodes: [
        { coords: [[305, 150], [260, 131]] },
        { coords: [[360, 148], [410, 129]] },
        { coords: [[299, 172], [262, 187]] },
        { coords: [[363, 175], [385, 184]] }
      ],
      // vxLan
      vxNodes: [
        { coords: [[165, 96], [138, 85]] },
        { coords: [[265, 84], [338, 56]] },
        { coords: [[155, 130], [80, 160]] }
      ],
      // 地点标题名字
      titleArr: [
        {
          title: '云管理平台',
          x: '14%',
          y: '74.5%',
          color: '#e5f8fc',
          shadowColor: '#1fadd6'
        },
        {
          title: 'Power机管理容器',
          x: '35%',
          y: '84%',
          color: '#e5f8fc',
          shadowColor: '#1fadd6'
        },
        {
          title: '防火墙设备',
          x: '45%',
          y: '67%',
          color: '#e5f8fc',
          shadowColor: '#1fadd6'
        },
        {
          title: 'Power机资源池',
          x: '69%',
          y: '53%',
          color: '#e5f8fc',
          shadowColor: '#1fadd6'
        },
        {
          title: 'SDN控制器',
          x: '30%',
          y: '52%',
          color: '#fdd912',
          shadowColor: '#fdd912'
        },
        {
          title: '裸金属/虚拟化管理节点',
          x: '1%',
          y: '41%',
          color: '#e5f8fc',
          shadowColor: '#1fadd6'
        },
        {
          title: '04X出口设备',
          x: '17%',
          y: '34%',
          color: '#e5f8fc',
          shadowColor: '#1fadd6'
        },
        {
          title: '裸金属资源池',
          x: '18%',
          y: '11%',
          color: '#e5f8fc',
          shadowColor: '#1fadd6'
        },
        {
          title: 'VxLAN',
          x: '47%',
          y: '34.5%',
          color: '#55fe7c',
          shadowColor: '#05ee3b'
        },
        {
          title: '虚拟化资源池',
          x: '82%',
          y: '7.5%',
          color: '#e5f8fc',
          shadowColor: '#1fadd6'
        }
      ]
    };
  },
  methods: {
    /**
     * @function: initData
     * @description: 初始化光点移动数据
     * @param {type}
     * @returns: {void}
     */
    initData() {
      let option = _.cloneDeep(this.topoChartOption);
      option.series[0].data = this.bareNodes;
      option.series[1].data = this.powerNodes;
      option.series[2].data = this.sdnNodes;
      option.series[3].data = this.vxNodes;
      return option;
    },
    /**
     * @function: addTitleLocation
     * @description: 添加地址名称
     * @param {type}
     * @returns: {void}
     */
    addTitleLocation() {
      let container = document.getElementsByClassName(
        'topo-chart-container'
      )[0];

      this.titleArr.forEach(value => {
        let node = document.createElement('div');
        node.innerHTML = value.title;
        node.style.position = 'absolute';
        node.style.top = value.x;
        node.style.left = value.y;
        node.style.color = value.color;
        node.style.fontSize = '0.875rem';
        node.style.fontFamily = 'MicrosoftYaHei';
        node.style.textShadow = `4px -2px 4px ${value.shadowColor}`;
        node.style.transform = 'skew(0deg,28deg)';
        container.appendChild(node);
      });
    },
    initChart() {
      let data = this.initData();
      this.topoChartNode.setOption(data);
      this.addTitleLocation();
    },
    handleResize() {
      this.topoChartNode.resize();
    }
  },
  mounted() {
    this.topoChartNode = this.$echarts.init(
      document.getElementById('topo-chart')
    );
    this.initChart();
    on(window, 'resize', this.handleResize);
  },
  beforeDestroy() {
    off(window, 'resize', this.handleResize);
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

  .topo-description {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 26.5%;
    height: 17.5%;
    background: rgba(2, 101, 212, 0.25);
    border-radius: 5px;
    padding-left: 2%;
    padding-top: 1.8%;
    padding-bottom: 1.8%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .topo-type {
      .topo-type-color {
        display: inline-block;
        width: 15px;
        height: 3px;
        background: #fdd912;
        vertical-align: middle;
      }

      .topo-type-info {
        padding-left: 10px;
        color: #fff;
        font-size: 0.75rem;
        font-family: 'MicrosoftYaHei';
        vertical-align: middle;
      }
    }
  }
}
</style>
