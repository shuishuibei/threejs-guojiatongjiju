/*
 * @Description
 * @Author ys1983/张睿博
 * @Date 2019-10-29 10:29:09
 * @LastEditors ys1983/张睿博
 * @LastEditTime 2019-10-29 11:13:11
 */
module.exports = { //这个是最新的配置  这样才能加上兼容前缀
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['last 5 versions', "> 1%", "IE 10"]
    })
  ]
}
