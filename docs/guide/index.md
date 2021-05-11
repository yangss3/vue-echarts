# Introduction

几个简单的基于 Vue 3 和 ECharts 5 的图表组件。

## Why?

在使用 ECharts 画一些简单的图表(例如柱状图、折线图、饼图等等)时，经常需要去查找配置，做重复的工作。 所以针对一些常见的图表做了几个 Vue 组件，意在减少样板代码的编写，快速实现简单的图表。

## Install

```bash
# npm
npm install @yangss/vue-echarts
# yarn
yarn add @yangss/vue-echarts
```
## Usage

全局注册
```js
import { createApp } from 'vue'
import App from './App.vue'
import VueECharts from '@yangss/vue-charts'

createApp(App).use(VueECharts).mount('#app')
```

按需引入
```js
import { BaseChart, LineBarChart } from '@yangss/vue-echarts'

export default {
  components: {
    BaseChart,
    GridChart
  },
  // ...
}
```
