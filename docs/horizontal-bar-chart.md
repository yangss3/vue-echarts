# HorizontalBarChart

横向的柱状图，这个组件主要用于同一系列中各类目的数据对比，或两个不同系列之间的数据对比。

## API

### Props

|    Name    |                                           Description                                           |       Type        |         Default          |
| :--------: | :---------------------------------------------------------------------------------------------: | :---------------: | :----------------------: |
|   width    |                     图表容器的宽度，可以是父容器宽度的百分比或绝对像素值等                      |     `string`      |         `"100%"`         |
|   height   |                     图表容器的高度，可以是父容器高度的百分比或绝对像素值等                      |     `string`      |         `"100%"`         |
|  category  |                                          类目名的数组                                           |  `Array<string>`  |            -             |
|   series   |                                          系列数据数组                                           | `object | array`  |            -             |
|   color    |                           文本的颜色，包括标题，类目名，图例文本等等                            |     `string`      |         `'#000'`         |
|   title    |                                            标题文本                                             |     `string`      |            -             |
| titleSize  |                                      标题字体大小，像素值                                       |     `number`      | 默认根据容器尺寸自动计算 |
| titleColor |                                          标题文本颜色                                           |     `string`      | 默认取 `color` 属性的值  |
| labelSize  |                         本文字体大小，包括类目名，图例文本等等，像素值                          |     `number`      | 默认根据容器尺寸自动计算 |
|   round    |                                        柱条是否显示圆角                                         |     `boolean`     |          `true`          |
|  barWidth  |                                       柱条的宽度，像素值                                        |     `number`      |   默认最大宽度 `25px`    |
| labelLeft  | 当左右两个系列对比时，指定中间类目名到容器左侧的距离， 可以是相对容器宽度的百分比，或绝对像素值 | `string | number` |          `46%`           |
| gridWidth  |    当左右两个系列对比时，指定左右两侧 grid 的宽度，可以是相对容器宽度的百分比，或绝对像素值     | `string | number` |          `37%`           |
|  gridTop   |                grid 离容器上侧的距离，可以是相对容器高度的百分比，或者绝对像素值                | `string | number` |            -             |
| gridBottom |                grid 离容器下侧的距离，可以是相对容器高度的百分比，或者绝对像素值                | `string | number` |            -             |
|  adaptive  |                        当窗口 resize 时，是否让图表重绘以自适应窗口大小                         |     `boolean`     |         `false`          |

:::tip 关于 series

数据类型如下：

```ts
type SeriesItem = {
  data: number[], // 系列的数据
  name?: string, // 系列名
  color?: string | [string, string], // 柱条的颜色，不提供会默认使用调色盘的颜色，若提供一个数组，则显示渐变色
  bgColor?: string, // 柱条背景色，不提供默认会根据 color 的值生成
  maxValue?: number // 该系列数据的上限值
}

series: SeriesItem | SeriesItem[]
```

**HorizontalBarChart** 只支持最多两个系列的数据，如果 `series` 提供超过两个系列的数据，也只有前两个系列会生效：，

```js
series = [
  {
    data: [23, 24, 34, 56],
    name: '美国'
  },
  {
    name: '中国',
    data: [34, 13, 45, 32]
  },
  // 后面不会生效
  {
    name: '日本',
    data: [24, 33, 15, 32]
  }
]
```

:::

::: tip labelLeft, gridWidth, gridTop, gridBottom

根据容器尺寸的不同，你可能需要调整这几个属性来调整图表内容的位置
:::

### Methods

|    Name     |                                                                    Description                                                                    |                           Parameters                           |
| :---------: | :-----------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------: |
| renderChart | 调用该方法会触发图表重绘。**HorizontalBarChart** 内部只监听了`series`属性的变化，如果你动态修改了其它属性的值，可以手动调用这个方法来触发视图更新 | noMerge: `boolean`，是否合并 `option`， 默认为 `false`，即合并 |

## Example

<div style="height:20px;"></div>
<p class="codepen" data-height="400" data-theme-id="dark" data-default-tab="js,result" data-user="yshushan" data-slug-hash="RwWMXre" data-preview="true" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="HorizontalBarChart">
  <span>See the Pen <a href="https://codepen.io/yshushan/pen/RwWMXre">
  HorizontalBarChart</a> by Shushan Yang (<a href="https://codepen.io/yshushan">@yshushan</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
````
