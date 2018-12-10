module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    parser: 'babel-eslint'
  },
  env: {//要在配置文件里指定环境，使用 env 关键字指定你想启用的环境，并设置它们为 true
    browser: true,
  },
  extends: [
    'plugin:vue/essential', //需要使用的插件
    'standard'
  ],
  // 引入vue
  plugins: [
    'vue'
  ],
  rules: {//这里用来做一些规则配置 详细请查看官网
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}

