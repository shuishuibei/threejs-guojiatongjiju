/*
 * @Description:
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-09 11:28:49
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-12 10:16:55
 */
String.prototype.colorRgba = function(aph) {
  // 16进制颜色值的正则
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 把颜色值变成小写
  var color = this.toLowerCase();
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      var colorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    // 处理六位的颜色值，转为RGB
    var colorChange = [];
    for (var n = 1; n < 7; n += 2) {
      colorChange.push(parseInt("0x" + color.slice(n, n + 2)));
    }
    if (aph) {
      return "rgba(" + colorChange.join(",") + "," + aph + ")";
    }

    // } else {
    //   return "rgb(" + colorChange.join(",") + ")";
    // }
  } else {
    return color;
  }
};
