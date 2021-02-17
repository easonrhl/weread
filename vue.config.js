const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        network: '@/network',
        views: '@/views',
        common: '@/common'
      }
    }
  },
  // devServer: {
  //   disableHostCheck: true,
  //   proxy: 'http://192.168.43.218:3000'
  // },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/base.less')]
    }
  }
}
