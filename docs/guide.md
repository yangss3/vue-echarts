# Introduction

几个简单的基于 Vue 的 ECharts 组件

## Why?

在使用 `ECharts` 画一些简单常见的图表(例如柱状图、折线图、饼图等等)时, 经常需要去查找配置, 做重复的工作. 所以根据图表的使用的频率做了几个 Vue 组件, 意在减少编写样板代码, 不需要写很多配置就能画出一些简单的图表.

<image src="./images/ratio.gif"/>

## Install

`echarts-vue-components` 将 `echarts` 作为外部依赖, 所以需要同时引入 `echarts`

### 通过 bundler 使用

```bash
# npm
npm install echarts @yangss/echarts-vue-components
# yarn
yarn add echarts @yangss/echarts-vue-components
```

### 通过 CDN 引入

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/4.7.0/echarts.min.js"></script>
<script src="https://unpkg.com/@yangss/echarts-vue-components/lib/echarts-vue-components.min.js"></script>
```

## Usage

### 全局注册

```js
import Vue from 'vue';
import echartsComponents from '@yangss/echarts-vue-components';
// 全局注册所有组件
Vue.use(echartsComponents);
```

### 局部引入

```js
import { BaseChart, GridChart } from '@yangss/echarts-vue-components';

export default {
  components: {
    BaseChart,
    GridChart,
  },
};
```
