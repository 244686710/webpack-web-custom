// 获取屏幕宽度（viewport)
let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth

// 获取 html 的 dom
let htmlDom = document.getElementsByTagName('html')[0]

htmlDom.style.fontSize = htmlWidth / 10 + 'px'

window.addEventListener('resize', () => {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  // 设置 html 的 fontSize
  htmlDom.style.fontSize = htmlWidth / 10 + 'px'
})
