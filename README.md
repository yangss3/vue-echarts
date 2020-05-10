# echarts-vue-components

几个简单的基于 Vue 的 ECharts 组件

## Why?

在使用 `ECharts` 画一些简单常见的图表(例如柱状图、折线图、饼图等等)时, 经常需要去查找配置, 做重复的工作. 所以根据图表的使用的频率做了几个 Vue 组件, 意在减少编写样板代码, 不需要写很多配置就能画出一些简单的图表.

<image src="./images/ratio.gif"/>

## Install

### 通过 npm 安装

`echarts-vue-components` 本身没有包含 `echarts`, 所以需要同时安装 `echarts`

```
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

### 组件介绍

#### BaseChart

|  props   |                      description                       |   type    | default  |
| :------: | :----------------------------------------------------: | :-------: | :------: |
|  width   | 图表容器的宽度, 可以是父容器宽度的百分比或绝对像素值等 | `string`  | `"100%"` |
|  height  | 图表容器的高度, 可以是父容器高度的百分比或绝对像素值等 | `string`  | `"100%"` |
| adaptive |    当窗口 resize 时, 是否让图表重绘以自适应窗口大小    | `boolean` | `false`  |
|  option  |  图表的配置对象, 与 `echarts` 原生的配置对象完全一致   | `Object`  |    -     |

基础图表组件, 如果你熟悉 echarts 的配置, 且需要对 echarts 特性的完全掌控, 可以使用这个组件, 该组件只对原生的 echarts 实例进行了浅封装, 组件实例的 `chart` 属性暴露了当前图表的 echarts 实例对象, 例如:

```js
// A component using BaseChart as child
{
  template: `<div>
    <BaseChart ref="myChart" :option="option" />
  </div>`,

  data() {
    return {
      option: {
        // ...
        // config object
      }
    }
  },
  // ...
}
```

这里, 你可以通过 `this.$refs.myChart.chart` 来访问 [echarts 实例对象上的所有 API](https://www.echartsjs.com/zh/api.html#echartsInstance)

#### GridChart

直角坐标系图表, 一般指柱图和折图
| props | description | type | default |
| :--------: | :------------------------------------------------------: | :------------------------: | :-------------------------------------------: |
| type | 图表类型, 可以是`"line"`(线图)或`"bar"`(柱图), 或者这里不指定, 而通过 `option` 对象来为每个系列单独指定 `type`| `"line" | "bar" | undefined` | - |
| stack | 柱图是否堆叠显示| `boolean` | `false`|
| round| 柱图是否显示圆角 | `boolean` | `false`|
|smooth| 线图是否为光滑曲线 | `boolean` | `true` |
|gradient| 柱图的颜色或线图下方区域的颜色是否渐变, 可以同时指定, 也可以单独指定 | `boolean | { line?: boolean, bar?: boolean }` | `false` |
|color| 坐标轴线和文本的颜色| `string`| `"#000"`|
|option| `echarts` 原生的配置对象, 用于更细粒度的配置| `Object`| - |

```html
<template>
  <div>
    <grid-chart />
    <pie-chart />
  </div>
</template>
```

#### PieChart

饼图组件, 内置了饼图(pie), 南丁格尔图(angle)和圆环图(ring)三种类型的配置

|   props    |                       description                        |            type            |                    default                    |
| :--------: | :------------------------------------------------------: | :------------------------: | :-------------------------------------------: |
|   width    |  图表容器的宽度, 可以是父容器宽度的百分比或绝对像素值等  |          `string`          |                   `"100%"`                    |
|   height   |  图表容器的高度, 可以是父容器高度的百分比或绝对像素值等  |          `string`          |                   `"100%"`                    |
|  adaptive  |     当窗口 resize 时, 是否让图表重绘以自适应窗口大小     |         `boolean`          |                    `false`                    |
|    type    | 饼图的类型, 内置提供"pie", "angle","ring" 三种简单的类型 | `"pie" | "angle" | "ring"` |                    `"pie"`                    |
|   title    |                           标题                           |          `string`          |                       -                       |
| titleColor |                      标题本文的颜色                      |          `string`          |                   `"#000"`                    |
| labelColor |                    类目标签本文的颜色                    |          `string`          |     默认和与之对应的类目 body 的颜色相同      |
| titleSize  |                标题本文的字体大小, 像素值                |          `number`          | 一般无需提供,默认根据容器尺寸自动计算字体大小 |
| labelSize  |              类目标签本文的字体大小, 像素值              |          `number`          | 一般无需提供,默认根据容器尺寸自动计算字体大小 |
|    data    |                         类目数据                         |          `Array`           |                       -                       |
|   option   |       `echarts` 原生的配置对象, 用于更细粒度的配置       |          `Object`          |                       -                       |

```js
{
  template: `
  <div>
    <PieChart
      type="ring"
      title="新冠肺炎全球死亡人数"
      title-color="#fff"
      :data=pieData
    />
  </div>
  `,

  data() {
    return {
      pieData: [
        { name: '中国', value: 3854 },
        { name: '美国', value: 65814 },
        { name: '意大利', value: 23982 },
        { name: '其它', value: 139283 }
      ]
    }
  }
}
```

如果默认的效果达不到你的需求, 你还可以通过 `option` 属性来进行更细粒度的配置.

> 注意: `PieChart` 默认配置只支持一个系列的数据, 如果需要显示多个系列, 请直接使用 `BaseChart`

#### HorizontalBarChart

横向的柱状图, 主要用于同一系列中各类目的数据对比或两个不同系列之间的数据对比

|   props    |                                               description                                                |                             type                             |         default          |
| :--------: | :------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------: | :----------------------: |
|   width    |                          图表容器的宽度, 可以是父容器宽度的百分比或绝对像素值等                          |                           `string`                           |         `"100%"`         |
|   height   |                          图表容器的高度, 可以是父容器高度的百分比或绝对像素值等                          |                           `string`                           |         `"100%"`         |
|  adaptive  |                             当窗口 resize 时, 是否让图表重绘以自适应窗口大小                             |                          `boolean`                           |         `false`          |
|    type    |                          类型, 支持单向(`"one-way"`)和双向(`"two-way"`)两种类型                          |                   `"one-way" | "two-way"`                    |       `"one-way"`        |
|   title    |                                                   标题                                                   |                           `string`                           |            -             |
|  category  |                                               类目名的数组                                               |                       `Array<string>`                        |            -             |
|   series   |                                               系列数据数组                                               | `Array<{data: Array<number>, name?:string, color?: string}>` |            -             |
|   stack    |                          不同系列是否堆叠显示, 仅 `type` 为 `'one-way'` 时有效                           |                          `boolean`                           |         `false`          |
|   round    |                                             柱条是否显示圆角                                             |                          `boolean`                           |          `true`          |
| background |                         柱条是否显示背景色, 默认为 true, 也可以传入具体的颜色值                          |                      `boolean | string`                      |          `true`          |
|   border   |                                           柱条是否显示背景边框                                           |                          `boolean`                           |         `false`          |
|  gradient  |                                             柱条是否颜色渐变                                             |                          `boolean`                           |         `false`          |
|   color    |                                 文本的颜色, 包括标题,类目名,图例文本等等                                 |                           `string`                           |         `'#000'`         |
|  fontSize  |                                           本文字体大小, 像素值                                           |                           `number`                           | 默认根据容器尺寸自动计算 |
| labelLeft  | 当 `type` 为 `'two-way'` 时, 指定中间类目名到容器左侧的距离, 可以是相对容器宽度的百分比,或者是绝对像素值 |                      `string | number`                       |          `46%`           |
| gridWidth  |    当 `type` 为 `'two-way'` 时, 指定左右两侧 grid 的宽度,可以是相对容器宽度的百分比,或者是绝对像素值     |                      `string | number`                       |          `37%`           |

#### RatioChart

这个组件专门用于需要展示百分比的需求, 提供了 圆环(ring), 圆弧(arc)和水波(liquid) 三种类型的图表
| props | description | type | default |
| :--------: | :------------------------------------------------------: | :----: | :-----------------------------------------------: |
| width | 图表容器的宽度, 可以是父容器宽度的百分比或绝对像素值等 | `string` | `"100%"` |
| height | 图表容器的高度, 可以是父容器高度的百分比或绝对像素值等 | `string` | `"100%"` |
| adaptive | 当窗口 resize 时, 是否让图表重绘以自适应窗口大小 | `boolean` | `false` |
| type | 类型, 内置提供"ring", "arc", "liquid"三种简单的类型 | `"ring" | "arc" | "liquid"` | `"ring"` |
| value | 0 到 1 之间的数值, 默认会以百分比的形式展示在图表中心 | `number` | - |
| label | 描述文本, 默认展示在图表中心 | `string` | - |
| color | 图表 body 的主色 | `string` | `"#387adf"` |
| bgColor | `type` 为`"ring"`时, 为圆环的填充底色, `type` 为`"liquid"`时, 为水波的背景色, `type` 为`"arc"`时无效 | `string` | ring: 根据 color 自动生成; liquid: `"transparent"` |
| labelColor | 本文的颜色 | `string` | `"#000"` |
| labelSize | 文本字体大小, 像素值 | `number` | 一般无需提供,默认根据容器尺寸自动计算字体大小 |
| formatter | 图表中心默认会显示 `label` 和 `value` 的百分比,如果这不满足你的需求,可以通过这个属性来定制你要显示的内容 | `string` | - |
| chartBgColor | 图表容器的背景色 | `string` | `"transparent"` |

#### AdaptiveWrapper

自适应屏幕比例的包装容器组件, 如果图表用于看板展示, 建议使用该组件来固定尺寸, 这样无需考虑最终屏幕的尺寸
