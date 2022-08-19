<!--
 * @Description: 
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-09 15:38:51
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-17 17:51:53
 -->
<template>
  <div class="topo-chart-container">
    <div id="topo-chart" ref="topoChart">
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
import * as THREE from 'three';
import { scene } from '@/assets/js/scene/index.js'//Three.js三维场景
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

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
              // color: '#03d0f1',
              // color: linear-gradient(to right, '#038bff', '#05cafb'),
              color: '#fff',
              period: 6,
              trailLength: 0.2,
              symbol: 'circle',
              symbolSize: 4,
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
              // color: '#037aff',
              color: '#fff',
              period: 6,
              trailLength: 0.2,
              symbol: 'circle',
              symbolSize: 4,
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
              // color: '#fdd912',
              color: '#fff',
              period: 6,
              trailLength: 0.2,
              symbol: 'circle',
              symbolSize: 4,
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
              // color: '#55fe7c',
              color: '#fff',
              period: 6,
              trailLength: 0.2,
              symbol: 'circle',
              symbolSize: 4,
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
        { coords: [[529, 133], [406, 84]] },
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
        { coords: [[165, 96], [138, 86]] },
        { coords: [[267, 84], [338, 57]] },
        { coords: [[154, 131], [80, 160]] }
      ],
      // 地点标题名字
      titleArr: [
        {
          title: '云管理平台',
          x: '14%',
          y: '74.5%',
          color: '#e5f8fc',
          shadowColor: '#059bf3'
        },
        {
          title: 'Power机管理容器',
          x: '35%',
          y: '84%',
          color: '#e5f8fc',
          shadowColor: '#059bf3'
        },
        {
          title: '防火墙设备',
          x: '45%',
          y: '67%',
          color: '#e5f8fc',
          shadowColor: '#059bf3'
        },
        {
          title: 'Power机资源池',
          x: '69%',
          y: '53%',
          color: '#e5f8fc',
          shadowColor: '#059bf3'
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
          shadowColor: '#059bf3'
        },
        {
          title: '04X出口设备',
          x: '17%',
          y: '34%',
          color: '#e5f8fc',
          shadowColor: '#059bf3'
        },
        {
          title: '裸金属资源池',
          x: '18%',
          y: '11%',
          color: '#e5f8fc',
          shadowColor: '#059bf3'
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
          shadowColor: '#059bf3'
        }
      ]
    };
  },
  methods: {
    /**
     * @function: initData
     * @description: 初始化光点移动数据
     * @param {type}
     * @returns: {Object} option
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
        node.style.textShadow = `0 0 10px ${value.shadowColor}`;
        node.style.transform = 'skew(0deg,28deg)';
        container.appendChild(node);
      });
    },
    /**
     * @function: initChart
     * @description: 初始化数据
     * @param {type}
     * @returns: {void}
     */
    initChart() {
      this.topoChartNode = this.$echarts.init(
        document.getElementById('topo-chart')
      );
      let data = this.initData();
      this.topoChartNode.setOption(data);
      this.addTitleLocation();
    },
    initThree(id) {
      let width = document.getElementById(id).clientWidth;
      let height = document.getElementById(id).clientHeight; //窗口文档显示区的高度
      /**
      * 透视投影相机设置
      */
      // 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
      let camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
      camera.position.set(-129, 211, 408);//相机在Three.js三维坐标系中的位置
      camera.lookAt(0, 0, 0);//相机指向Three.js坐标系原点
      /**
       * 创建渲染器对象
       */
      let renderer = new THREE.WebGLRenderer({
          antialias: true, //开启锯齿
      });
      renderer.setPixelRatio(window.devicePixelRatio);//设置设备像素比率,防止Canvas画布输出模糊。
      renderer.setSize(width, height); //设置渲染区域尺寸
      renderer.setClearColor(0xffffff, 0); //设置背景颜色

      // 创建一个CSS2渲染器CSS2DRenderer
      let labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(width, height);
      labelRenderer.domElement.style.position = 'absolute';
      // 相对标签原位置位置偏移大小
      labelRenderer.domElement.style.top = '0px';
      labelRenderer.domElement.style.left = '100px';
      // //设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
      labelRenderer.domElement.style.pointerEvents = 'none';
      document.body.appendChild(labelRenderer.domElement);
     
      let controls = new OrbitControls(camera, renderer.domElement);
      on(window, 'resize', function() {
        let width = document.getElementById('topo-chart').clientWidth;
        let height = document.getElementById('topo-chart').clientHeight;
        renderer.setSize(width, height);
        labelRenderer.setSize(width, height);
        camera.aspect = width / height;
        // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
        // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
        // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
        camera.updateProjectionMatrix();
      });
      function render() {
        renderer.render(scene, camera); //执行渲染操作
        labelRenderer.render(scene, camera); //渲染HTML标签对象
        requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
      }
      render();
      document.getElementById(id).appendChild(renderer.domElement);
    },
    handleResize() {
      this.topoChartNode.resize();
    },
  },
  mounted() {
    this.initThree('topo-chart');
    // this.initChart();
    // on(window, 'resize', this.handleResize);
  },
  beforeDestroy() {
    // off(window, 'resize', this.handleResize);
  }
};
</script>
<style>
  .tag {
    color: #fff;
    font-size: 18px;
  }
</style>
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
