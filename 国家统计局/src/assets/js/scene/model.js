// 引入Three.js
import * as THREE from 'three';
import { Vector3 } from 'three';
import { tag } from './messageTag';


let model = new THREE.Group(); //声明一个组对象
/**
 * 创建线条模型
 */
let geometry = new THREE.BufferGeometry(); //创建一个缓冲类型几何体
// 三维样条曲线
let curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(100, 0, -100),
  new THREE.Vector3(0, 80, 0),
  new THREE.Vector3(-100, 0, 100),
]);
//曲线上等间距返回多个顶点坐标
let points = curve.getSpacedPoints(100); //分段数100，返回101个顶点
// setFromPoints方法从points中提取数据赋值给attributes.position
geometry.setFromPoints(points);
let material = new THREE.LineBasicMaterial({
  color: 0x006666, //轨迹颜色
});
//线条模型对象
let line = new THREE.Line(geometry, material);
model.add(line);

let index = 20; //取点索引位置
let num = 15; //从曲线上获取点数量
let points2 = points.slice(index, index + num); //从曲线上获取一段
let curve1 = new THREE.CatmullRomCurve3(points2);
let newPoints2 = curve1.getSpacedPoints(100); //获取更多的点数
let geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(newPoints2);
// 每个顶点对应一个百分比数据attributes.percent 用于控制点的渲染大小
let percentArr = []; //attributes.percent的数据
for (let i = 0; i < newPoints2.length; i++) {
  percentArr.push(i / newPoints2.length);
}
let percentAttribue = new THREE.BufferAttribute(new Float32Array(percentArr), 1);
geometry2.attributes.percent = percentAttribue;
// 批量计算所有顶点颜色数据
let colorArr = [];
for (let i = 0; i < newPoints2.length; i++) {
  let color1 = new THREE.Color(0x006666); //轨迹线颜色 青色
  let color2 = new THREE.Color(0xffff00); //黄色
  let color = color1.lerp(color2, i / newPoints2.length)
  colorArr.push(color.r, color.g, color.b);
}
// 设置几何体顶点颜色数据
geometry2.attributes.color = new THREE.BufferAttribute(new Float32Array(colorArr), 3);

// 点模型渲染几何体每个顶点
let PointsMaterial = new THREE.PointsMaterial({
  // color: 0xffff00,
  size: 5.0, //点大小
  vertexColors: true, //使用顶点颜色渲染
});
let flyPoints = new THREE.Points(geometry2, PointsMaterial);
model.add(flyPoints);
// 修改点材质的着色器源码(注意：不同版本细节可能会稍微会有区别，不过整体思路是一样的)
PointsMaterial.onBeforeCompile = function (shader) {
  // 顶点着色器中声明一个attribute变量:百分比
  shader.vertexShader = shader.vertexShader.replace(
    'void main() {',
    [
      'attribute float percent;', //顶点大小百分比变量，控制点渲染大小
      'void main() {',
    ].join('\n') // .join()把数组元素合成字符串
  );
  // 调整点渲染大小计算方式
  shader.vertexShader = shader.vertexShader.replace(
    'gl_PointSize = size;',
    [
      'gl_PointSize = percent * size;',
    ].join('\n') // .join()把数组元素合成字符串
  );
};
// 飞线动画
let indexMax = points.length - num; //飞线取点索引范围
function animation() {
  if (index > indexMax) index = 0;
  index += 1
  points2 = points.slice(index, index + num); //从曲线上获取一段
  let curve = new THREE.CatmullRomCurve3(points2);
  let newPoints2 = curve.getSpacedPoints(100); //获取更多的点数
  geometry2.setFromPoints(newPoints2);

  requestAnimationFrame(animation);
}
animation();

plane();//设置一个地面
function plane() {
    let gridHelper = new THREE.GridHelper(300, 15, 0x003333, 0x003333);
    model.add(gridHelper);
    let geometry = new THREE.PlaneGeometry(310, 310); 
    let material = new THREE.MeshLambertMaterial({
        // map: texture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 1
    model.add(mesh);
    mesh.rotateX(-Math.PI / 2);
}
// position: 圆柱体位置
// radius: 圆柱体半径
// height: 圆柱体高度
// color: 圆柱体颜色
// topColor: 圆柱体顶部颜色
function getCylinder(position, radius, height, color, topColor) {
  let geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
  let material = new THREE.MeshLambertMaterial({
    color,
    map: new THREE.TextureLoader().load('static/imgs/渐变.png'),
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
    depthTest: false,
  });
  let cylinder = new THREE.Mesh(geometry, material);
  let {x, y, z} = position;
  cylinder.position.set(x, y, z);
  model.add(cylinder);
  // 圆柱体上方的圆
  getCircle({
    x,
    z,
    y: y + height/2
  }, topColor, radius);
  // 圆柱体下方的圆
  getCircle({
    x,
    z,
    y: y - height/2
  }, color, radius);

  let light = new THREE.PointLight(color, height/2, 12);
  light.position.set(x, y, z);
  model.add(light);
  return light;
}
// 画圆形
function getCircle(position, color, radius) {
  let circle = new THREE.CircleGeometry(radius, 100);
  let circleMaterial = new THREE.MeshLambertMaterial({
    color,
    side: THREE.DoubleSide,
  });
  let circleMesh = new THREE.Mesh(circle, circleMaterial);
  circleMesh.rotateX(90 * Math.PI / 180);
  let {x, y, z} = position;
  circleMesh.position.set(x, y, z);
  model.add(circleMesh);
  return circleMesh;
}

function getCurve(position, radius, color) {
  let {x, y, z} = position;
  let curve = new THREE.EllipseCurve(x, y, radius, radius);
  let points = curve.getPoints(50);
  let geometry = new THREE.BufferGeometry().setFromPoints(points);
  let material = new THREE.LineBasicMaterial({
    color,
  });
  let ellipse = new THREE.Line(geometry, material);
  ellipse.translateX(0.5);
  ellipse.translateY(-10);
  ellipse.translateZ(z + radius/2 + 2.5);
  ellipse.rotateX(90 * Math.PI / 180);
  model.add(ellipse);
  return ellipse;
}

function getLine(point1, point2) {
  let geometry = new THREE.BufferGeometry(); //创建一个缓冲类型几何体
  // 三维样条曲线
  let curve = new THREE.CatmullRomCurve3([ point1, point2 ]);
  //曲线上等间距返回多个顶点坐标
  let points = curve.getSpacedPoints(10); //分段数100，返回101个顶点
  // setFromPoints方法从points中提取数据赋值给attributes.position
  geometry.setFromPoints(points);
  let material = new THREE.LineBasicMaterial({
    color: 0x1287FE, //轨迹颜色
    linewidth: 20, // 线宽设置无效，需要解决？
  });
  //线条模型对象
  let line = new THREE.Line(geometry, material);
  model.add(line);
}

function getPoint(position, color, radius) {
  let geometry = new THREE.CircleGeometry(radius, 32);
  let material = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
  });
  let circle = new THREE.Mesh(geometry, material);
  circle.rotateX(90 * Math.PI / 180);
  let {x, y, z} = position;
  circle.position.set(x, y, z);
  model.add(circle);
}

// 组件1: 圆柱体组件，用来表示资源池资源
function getComponent1(position) {
  let { x, y, z } = position;
  getCylinder(position, 5, 20, 0x22CAFE, 0x1287FE);
  getCylinder({ x: x + 7, y: y - 3.5, z: z + 6}, 1, 15, 0xF5AF03, 0xF5AF03);
  getCircle({ x, y: y - 10, z }, 0x0079DB, 12);
  getCurve({ x, y: y - 10, z }, 15, 0x0079DB);
}

for(let i = 0; i < 6; i++) {
  let z = 100 - i * 40;
  getComponent1({ x: -100, y: 0, z: z });
  getLine(new THREE.Vector3(-60, -10, z), new THREE.Vector3(-100, -10, z));
  getPoint({ x: -60, y: -10, z: z }, 0x20E763, 1.5);
}

getLine(new THREE.Vector3(-60, -10, 100), new THREE.Vector3(-60, -10, -100));

let messageTag = tag('虚拟化资源池');
messageTag.position.set(-60, -10, 140);
model.add(messageTag);

function getLathe() {
  let points = [];
  let height = 8;
  let count = 20;
  for(let i = 10;i < count; i++) {
    points.push(
      new THREE.Vector2(
        i,
        -(Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height
      )
    )
  }

  // for(let i = 10;i < count; i++) {
  //   points.push(
  //     new THREE.Vector2(
  //       i,
  //       (Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height
  //     )
  //   )
  // }

  let shape = new THREE.Shape();
  shape.splineThru(points);
  let splinePoints = shape.getPoints(500);
  let geometry = new THREE.LatheGeometry(splinePoints, 30);
  let material = new THREE.MeshPhongMaterial({
    color: 0x00EF65,
    side: THREE.DoubleSide,
  })
  let mesh = new THREE.Mesh(geometry, material);
  model.add(mesh);
}


getLathe();

export {
  model
}