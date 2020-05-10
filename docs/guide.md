# Introduction

几个简单的基于 Vue 的 ECharts 组件

## Why?

在使用 `ECharts` 画一些简单常见的图表(例如柱状图、折线图、饼图等等)时, 经常需要去查找配置, 做重复的工作. 所以根据图表的使用的频率做了几个 Vue 组件, 意在减少编写样板代码, 不需要写很多配置就能画出一些简单的图表.

<image src="./images/ratio.gif"/>

## Install

### 通过 npm 安装

`echarts-vue-components` 本身没有包含 `echarts`, 所以需要同时安装 `echarts`

```bash
npm install echarts @yangss/echarts-vue-components --save
```

## Usage

### 全局注册

```js
import Vue from 'vue'
import echartsComps from '@yangss/echarts-vue-components'

Vue.use(echartsComponents)
```

### 局部引入

```js
import { BaseChart, GridChart } from '@yangss/echarts-vue-components'

export default {
  components: {
    BaseChart,
    GridChart
  }
}
```
