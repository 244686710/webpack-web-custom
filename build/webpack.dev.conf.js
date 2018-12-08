const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')

const config = merge(baseConfig, {
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   loader: "eslint-loader",
      // },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
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
    new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
  ]
})

config.plugins.push(
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(true),
  })
)

module.exports = config
