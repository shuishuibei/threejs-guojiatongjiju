/*
 * @Description:
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-04 10:30:32
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-17 15:10:10
 */
const webpackConfig = require("./webpack.common.config"); // 引入公共的的配置文件
const merge = require("webpack-merge"); // 用来合并和覆盖相同配置项的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //指定html模板的插件 还可以用来压缩html文件

// 合并
const devWebpackConfig = merge(webpackConfig, {
  // devtool: "cheap-module-eval-source-map", // 开发环境下建议用这个配置 生产环境下用source-map 官方推荐
  plugins: [
    new webpack.NamedModulesPlugin(), // HMR在更新时在控制台显示正确的文件名
    new webpack.NoEmitOnErrorsPlugin(), // 当编译出现错误的时候 来跳过输出阶段 可以确保资源输出不会包含错误
    new HtmlWebpackPlugin({
      filename: "index.html", // 开发环境下的文件名
      template: "./src/entry/index.html", // 开发环境下的模板路径
      inject: true // 是否自动添加资源引入
    }),
    // 抽离css文件的插件
    new MiniCssExtractPlugin({
      filename: "style.css", // 文件命名
      chunkFilename: "styles/[name].css" // 打包完文件的存放地址
    }),
    new webpack.DefinePlugin({
      // 跨域,一定要用JSON.stringify方法来转成字符串 否则会报错
      SERVICE_URL: JSON.stringify("http://localhost:9000/")
    })
  ]
});

module.exports = devWebpackConfig;
