'use strict'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const environment = process.env.NODE_ENV
const port = 9527 // dev port
let rootDomain = ''
if (environment === 'test') {
  rootDomain = 'http://res.bch.leju.com' + '/assets/app/vue/see-edata'
} else if (environment === 'production') {
  rootDomain = 'http://res.leju.com' + '/assets/app/vue/see-edata'
} else {
  rootDomain = ''
}
// 打包开发根目录
const outputDir = `../../../../trunk/assets/app/vue/see-edata`

module.exports = {
  // publicPath: `${rootDomain}/assets/app/vue/see-edata`,
  publicPath: rootDomain,
  outputDir, // 打包输出路径
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  lintOnSave: environment === 'development', // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  productionSourceMap: false,
  devServer: {
    port: port,
    disableHostCheck: true,
    // host: 'mytest.dev.leju.com',
    open: true, // Set it to true to open your default browser.
    // Shows a full-screen overlay in the browser when there are compiler errors or warnings. Disabled by default. If you want to show only compiler errors:
    overlay: {
      warnings: false,
      errors: true
    },
    // 配置反向代理
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: config => {
    const plugins = []
    plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log']// 移除console
          }
        },
        sourceMap: false,
        parallel: true
      })
    )
    // 可视化 webpack 构建，打包分析
    if (process.env.IS_ANALYZ) {
      plugins.push(new BundleAnalyzerPlugin())
      config.plugins = [...config.plugins, ...plugins]
    }
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [...config.plugins, ...plugins]
    }
  },

  chainWebpack: config => {
    // 配置目录别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))

    // set svg-sprite-loader, 引入svg
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
