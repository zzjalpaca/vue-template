# vue-template

## Project setup
```
yarn install 或 npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build:test # 测试环境
npm run build:prod # 正式线环境
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# 搭建vue 后台模板

### 项目地址
[https://github.com/zzjalpaca/vue-template.git](https://github.com/zzjalpaca/vue-template.git)

### 目录结构
```
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── icons                  # 项目所有 svg icons
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── vendor                 # 公用vendor
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```
### 
### 安装vue-cli
```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

### 创建项目
运行以下命令来创建一个新项目：
```bash
vue create hello-world
```

### 引入element-ui
安装
```javascript
# main.js 
import Element from 'element-ui'
Vue.use(Element, { size: 'mini', zIndex: 3000 })

# public/index.html 
# css 引入了官方css, 本地引入会有字体跨域问题，除非后端做了处理
<link rel="stylesheet" href="https://unpkg.com/element-ui@2.11.1/lib/theme-chalk/index.css">

```


### 添加环境变量
链接 [https://cli.vuejs.org/zh/guide/mode-and-env.html](https://cli.vuejs.org/zh/guide/mode-and-env.html)

```bash
.env.development     # 开发环境
.env.test            # 测试环境
.env.production      # 线上环境
.env.analyz          # 打包分析，用于查看打包文件大小，方便优化项目
```


### 修改 package.json 命令

```bash
"dev": "vue-cli-service serve",   # 项目启动 npm run dev
"serve": "vue-cli-service serve", # 项目启动 npm run serve                      
"build:test": "vue-cli-service build --mode test",  # 测试线打包 npm run build:test
"build:prod": "vue-cli-service build --mode production",  # 正式线打包 npm run build:prod
"analyz": "vue-cli-service build --mode analyz" # 打包分析
```


### 新建vue.config.js
参考地址： [https://cli.vuejs.org/zh/config/](https://cli.vuejs.org/zh/config/)

### 引入svg，excel等相关组件
参考地址： [https://panjiachen.github.io/vue-element-admin-site/zh/feature/component/excel.html#excel-%E5%AF%BC%E5%87%BA](https://panjiachen.github.io/vue-element-admin-site/zh/feature/component/excel.html#excel-%E5%AF%BC%E5%87%BA)

导出excle 封装方法在 utils/index.js handleExportExcel
回到顶部 封装方法在 utils/scroll-to.js

### 引入axios, 封装接口调用方法
方法在 utils/request.js

### 权限相关
动态权限主要是通过获取后端接口数据，将本地页面和接口路径做关联，最终拼接成可访问的路由，最后通过router.addRoutes(accessRoutes) 完成动态路由渲染。
可以参考src/permission.js 和 store/modules/permission.js 和 _import.js 
动态路由过滤函数在 utils/index.js 中的 filterAsyncRoutes
没有登录接口时，src/permission.js 文件中默认 **hasToken** 为true, 即 **_const hasToken = getToken().userId || true_**_ , _有登陆接口后可以改为_ _**_const hasToken = getToken().userId_**
**
### 可视化 webpack 构建

可视化 webpack 打包文件优化工具，帮助你分析打包文件，实现更好的优化。

首先，安装 webpack-bundle-analyzer：

```bash
yarn add webpack-bundle-analyzer -D
// or
npm install webpack-bundle-analyzer -D
```

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  configureWebpack: config => {
    const plugins = [new BundleAnalyzerPlugin()]
    if (process.env.IS_ANALYZ) {
      config.plugins = [...config.plugins, ...plugins]
    }
  }
}
```

### gzip 压缩

生成类似 chunk-vendors.f5cbf099.js.gz 格式的文件。
安装 compression-webpack-plugin：

```bash
yarn add compression-webpack-plugin -D
// or
npm install compression-webpack-plugin -D
```

```javascript
const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
  configureWebpack: config => {
    const plugins = [
      // gzip 压缩
      new CompressionPlugin({
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        algorithm: 'gzip',
        threshold: 10240,
        minRatio: 0.8
      })
    ]
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [...config.plugins, ...plugins]
    }
  }
}
```


### 删除 console.log

删除 console.log，减少代码体积。
注意：目前安装2.x的版本有报错现象，需要安装1.x的版本

安装 uglifyjs-webpack-plugin：

```bash
yarn add uglifyjs-webpack-plugin -D
// or
npm install uglifyjs-webpack-plugin -D
```

```javascript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  configureWebpack: config => {
    const plugins = [
      // 删除 console.log
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }
        },
        sourceMap: false,
        parallel: true
      })
    ]
    if (isProduction) {
      config.plugins = [...config.plugins, ...plugins]
    }
  }
}
```


### Eslint保存时自动修复错误

vscode 安装三个插件 [ESLint](https://link.juejin.im/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Ddbaeumer.vscode-eslint)、 [vetur](https://link.juejin.im/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Doctref.vetur)、 [Prettier - Code formatter](https://link.juejin.im/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Desbenp.prettier-vscode)
> 文件> 首选项 > 设置 > 用户设置 添加以下内容：



```json
    "eslint.autoFixOnSave": true, // 每次保存的时候将代码按eslint格式进行修复
    "prettier.eslintIntegration": true, //让prettier使用eslint的代码格式进行校验
    "prettier.semi": false, //去掉代码结尾的分号
    "prettier.singleQuote": true, //使用单引号替代双引号
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true, //让函数(名)和后面的括号之间加个空格
    "vetur.format.defaultFormatter.html": "js-beautify-html", //格式化.vue中html
    "vetur.format.defaultFormatter.js": "vscode-typescript", //让vue中的js按编辑器自带的ts格式进行格式化
    "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
    "wrap_attributes": "force-aligned" //属性强制折行对齐
    }
    },
    "eslint.validate": [ //开启对.vue文件中错误的检查
    "javascript",
    "javascriptreact",
    {
    "language": "html",
    "autoFix": true
    },
    {
    "language": "vue",
    "autoFix": true
    }
    ],

```

**eslint 一般关闭以下设置**：

```javascript
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'semi': 0, // 语句结尾分号
    'camelcase': 0, //驼峰命名
    'comma-dangle': 0, // 对象最后逗号
    'space-before-function-paren': 0, // 函数定义前，括号前分割
      // 函数名与括号间不加空格
    "space-before-function-paren": [2, { "anonymous": "never", "named": "never" }]
  },
```

### 参考文档
[vue-element-admin](https://panjiachen.gitee.io/vue-element-admin-site/zh/)
[Element官方文档](https://element.eleme.cn/#/zh-CN/)




