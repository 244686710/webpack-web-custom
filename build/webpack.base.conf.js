const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vueLoader 一个神奇的插件

function resolve (dir) { // 路径封装的函数
  return path.join(__dirname, '..', dir)
}

const crateLintingRule = () => ({// 语法检测的加载器
  test: /\.(js|vue)$/,
  loader: 'eslint-loader', //npm install eslint-loader -D来安装
  enforce: 'pre',
  include: [resolve('src')],
  options: {
    formatter: require('eslint-friendly-formatter'), //错误输出的格式 npm install eslint-friendly-formatter -D
    emitWarning: true
  }
})

module.exports = {
  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      crateLintingRule(),
      {
        test: /\.vue$/,
        loader: 'vue-loader' //npm install vue-loader vue-template-compiler -D 都需要安装 解析vue文件模板的加载器
      },
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [".vue", ".mjs", ".js", ".json", ".jsx"],
  },

  plugins: [
    // new VueLoaderPlugin(), // vue-loader的插件， 是必须的
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: './index.html', // 配置文件模板
    }),
  ],

}
