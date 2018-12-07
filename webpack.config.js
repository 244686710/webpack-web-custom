module.exports = function(env, argv) {
  return argv.mode === 'production' ?
    require('./build/webpack.prod.conf') :
    require('./build/webpack.dev.conf')
}
