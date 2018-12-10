const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")//抽离css的插件 npm install mini-css-extract-plugin -D 来安装
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = merge(baseConfig, {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'vue-style-loader',
          'css-loader',
          'sass-loader',
          // 'postcss-loader',//css自动加上兼容性前缀
        ]
      },
    //   {
    //     test:/\.css$/,//同上
    //     use:[
    //         'style-loader',
    //         'vue-style-loader',
    //         'css-loader',
    //         'postcss-loader',//css自动加上兼容性前缀
    //     ]
    //  },
    ],
  },

  devServer: {
    port: '1234',
    hot: true, // dev server 的配置要启动 hot，或者在命令行中带参数开启
    before(app){
      app.get('/api/test.json', function(req, res) {
        res.json({ code: 200, message: 'hello world' })
      })
    },
  },

  plugins: [
    new VueLoaderPlugin(), // vue-loader的插件， 是必须的
    new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
    new HtmlWebpackPlugin({
      filename: 'index.html',//开发环境下的文件名
      template: './index.html',//开发环境下的模板路径
      inject: true//是否自动添加资源引入
   }),
  ]
})

config.plugins.push(
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(true),
  })
)

module.exports = config
