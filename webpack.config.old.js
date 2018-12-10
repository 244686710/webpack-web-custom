const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = (env, argv) => ({
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?/, // 支持 js 和 jsx
        include: [
          path.resolve(__dirname, 'src') // src 目录下的才需要经过 babel-loader 处理
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/, //图片预处理
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      }
    ]
  },

  // 代码路径解析的配置
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src')
    ],

    extensions: [".vue", ".mjs", ".js", ".json", ".jsx"],
  },

  plugins: [
    new UglifyJsPlugin(),
    // 使用 uglifyjs-webpack-plugin 来压缩 JS 代码
    // 如果你留意了我们一开始直接使用 webpack 构建的结果，你会发现默认已经使用了 JS 代码压缩的插件
    // 这其实也是我们命令中的 --mode production 的效果，后续的小节会介绍 webpack 的 mode 参数
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'assets/index.html' // 配置文件模板
    }),
    // 引入插件，配置文件名，这里同样可以使用 [hash]
    new ExtractTextPlugin('[hash].css'),

    // DefinePlugin 是 webpack 内置的插件，可以使用 webpack.DefinePlugin 直接获取。
    // 这个插件用于创建一些在编译时可以配置的全局常量，这些常量的值我们可以在 webpack 的配置中去指定，例如：
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true), // const PRODUCTION = true
      VERSION: JSON.stringify('5fa3b9'), // const VERSION = '5fa3b9'
      BROWSER_SUPPORTS_HTML5: true, // const BROWSER_SUPPORTS_HTML5 = 'true'
      TWO: '1+1', // const TWO = 1 + 1,
      CONSTANTS: {
        APP_VERSION: JSON.stringify('1.1.2') // const CONSTANTS = { APP_VERSION: '1.1.2' }
      }
    })
  ],

  devServer: {
    port: '1234',
    before(app){
      app.get('/api/test.json', function(req, res) { // 当访问 /some/path 路径时，返回自定义的 json 数据
        res.json({ code: 200, message: 'hello world' })
      })
    }
  },

  optimization: {
    minimize: false,
    // 使用 argv 来获取 mode 参数的值
    minimizer: argv.mode === 'production' ? [
      new UglifyJsPlugin({ /* 你自己的配置 */ }),
      // 仅在我们要自定义压缩配置时才需要这么做
      // mode 为 production 时 webpack 会默认使用压缩 JS 的 plugin
    ] : [],
  },
})
