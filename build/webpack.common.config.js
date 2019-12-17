const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const os = require("os"); //配和happypack插件来用 npm install os -D 来安装
const HappyPack = require("happypack"); //webpack默认在node上面是单进程 所以我们打包时间比较慢 我们可以用这个文件来配置多进程 提高效率 优化webpack  npm install happypack -D 来安装
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
}); //获取cpu的数量
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //抽离css的插件 npm install mini-css-extract-plugin -D 来安装
const VueLoaderPlugin = require("vue-loader/lib/plugin"); ///vueloader一个神奇的插件

// function resolve(dir) {
//   //获取外部路径的函数
//   return path.join(__dirname, "..", dir);
// }

const express = require("express");
const app = express();
const appData = require("@/assets/data/area.json"); // 加载本地json文件
const apiRoutes = express.Router();

app.use("/api", apiRoutes);

const webpackCommon = {
  context: path.resolve(__dirname, "../"),
  entry: {
    app: "@/entry/index.js", //主入口文件
    vue: ["vue"]
  },
  output: {
    filename: "static/js/[name].js", //出口文件地址的目录
    path: path.resolve(__dirname, "../dist"), //出口路径
    chunkFilename: "static/js/pages/[name].js", //分成块的打包地址会打包在static/js/pages文件下面
    publicPath: process.env.NODE_ENV ? "/" : "./" //公共路径
  },
  optimization: {
    //4.0新增的配置项
    splitChunks: {
      chunks: "all", //插件作用的范围 all全部, async按需加载, initial入口文件 三选一
      minSize: 30000, //最小打包的尺寸  超过30kb才会打包
      minChunks: 1, //最小引入的第三方库
      maxAsyncRequests: 5, //最大异步请求chunks
      maxInitialRequests: 3, //最大初始化chunks
      automaticNameDelimiter: "~", //如果不指定name，自动生成name的分隔符（‘runtime~[name]’）
      name: true, //split 的 chunks name
      cacheGroups: {
        //缓存组
        vendors: {
          //split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。
          chunks: "initial", //左右是入口文件
          test: /[\\/]node_modules[\\/]/, //过滤 打包node_modules文件下的引用的库
          name: "common/vender", //打包最后的路径 common/vender.js
          minChunks: 1, //最小引入数1
          priority: -10, //优先级
          enforce: true
        }
      }
    },
    runtimeChunk: {
      //运行是需要打包的js文件
      name: "page/manifest" //打包最后的路径 page/manifest.js
    }
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve("src") //路径别名
    }
  },
  module: {
    //模块配置项了
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader" //npm install vue-loader vue-template-compiler -D 都需要安装 解析vue文件模板的加载器
      },
      {
        test: /\.js$/, //es6语法转换加载器 配合happypack用多进程处理 效率更高
        exclude: "/(node_modules)/", //排除node_modules文件
        loader: "happypack/loader?id=happyBabel" //配置项 需要安装 npm intsall babel-loader babel-core babel-eslint babel-preset-env babel-preset-stage-3 -D 这些都需要安装 还需要在.babelrc里面配置
      },
      {
        test: /\.less$/, //我们可以使用css预编译工具   这里我用sass举例
        use: [
          //安装 npm install sass-loader node-sass css-loader vue-style-loader postcss-loader style-loader -D  反正后面也要安装 索性一股脑全安装了
          process.env.NODE_ENV //MiniCssExtractPlugin.loader 用来抽离css文件的 不用打包到js文件里
            ? "vue-style-loader"
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: "../../"
                }
              }, //可以再vue模板中的<style lang='scss'>使用sass
          "css-loader",
          "postcss-loader", //css自动加上兼容性前缀
          "less-loader"
        ]
      },
      {
        test: /\.css$/, //同上
        use: [
          "style-loader",
          process.env.NODE_ENV
            ? "vue-style-loader"
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: "../../"
                }
              }, //MiniCssExtractPlugin.loader 用来抽离css文件的 不用打包到js文件里
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|jpeg|jpg|svg|gif)$/, //图片加载器  我们url-loader内部封装了file-loader所以我们安装一个就行了
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 2048, //2048以内的文件我们打包进js
              name: "static/[path][name].[ext]" //2048之外的图片我们直接放到这个目录下 不打包
            }
          }
        ]
      },
      {
        test: /\.(woff|eot|ttf|otf|woff2|TTF|svg)(\?.*)?$/, //同上
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/fonts/[name].[hash:7].[ext]"
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      //拷贝文件到打包文件目录下的插件
      {
        from: path.resolve(__dirname, "../static"), //复制来自于static
        to: "/static", //粘贴到dist文件下static
        ignore: [".*"]
      }
    ]),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: "happyBabel",
      //如何处理  用法和loader 的配置一样
      loaders: [
        {
          loader: "babel-loader?cacheDirectory=true"
        }
      ],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true
    })
  ],
  devServer: {
    before(app) {
      app.get("/api/area", (reg, res) => {
        res.json({
          errno: 0,
          data: appData
        }); // 接口返回json数据
      });
    }
  }
};

module.exports = webpackCommon;
