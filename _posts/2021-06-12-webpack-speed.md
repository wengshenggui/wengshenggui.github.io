---
title: Webpack 测量构建时间
categories: [前端, Webpack]
tags: [Webpack]
---

# speed-measure-webpack-plugin

## 测量构建时间

优化 webpack 构建速度的第一步是知道将精力集中在哪里。我们可以通过 speed-measure-webpack-plugin 测量你的 webpack 构建期间各个阶段花费的时间：

## [speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin)

![preview](https://github.com/stephencookdev/speed-measure-webpack-plugin/raw/master/preview.png){: .normal}

## 使用 speed-measure-webpack-plugin

需要包裹住整个webpackConfig

### 步骤一：安装 speed-measure-webpack-plugin

```shell
npm install speed-measure-webpack-plugin --save-dev
```

### 步骤二：配置

```js
// 分析打包时间
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
// ...
module.exports = smp.wrap(webpackConfig)
```

它能够：

- 分析整个打包总耗时；
- 每个插件和 loader 的耗时情况；

方便开发人员定位打包耗时瓶颈。

## vue-cli中使用

### Vue-cli 3.x 中如下（主要区别是包裹 configureWebpack ）

```js
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin({
  outputFormat: 'human'
})
module.exports = {
  configureWebpack: smp.wrap({
    plugins: []
  })
}
```

