# RatioChart

用于展示占比情况、进度等场景，内部预设了圆环图、仪表盘和水滴图的配置
## API

|    Name     |                     Description                  |         Type          |             Default              |
| :---------: | :----------------------------------------------: | :-------------------: | :------------------------------: |
|    width    | 图表容器的宽度，可以是绝对像素值或父元素宽度的百分比 | string  | `'100%'` |
|   height    | 图表容器的高度，可以是绝对像素值或父元素高度的百分比 | string  | `'100%'` |
|   theme     | 图表颜色主题 | 'light' \| 'dark'  | `'light'` |
|  adaptive   | 当窗口 resize 时，是否让图表自动 resize 以自适应窗口大小   | boolean | `true` |
|    type     | 图表类型  | 'ring' \| 'gauge' \| 'liquid' | `'ring'`  |
|    title    | 描述文本                                          |  string  |   -   |
|    radius   | 圆环(ring)、仪表盘(gauge)、水滴(liquid)的半径，可以是相对于容器高宽中较小的一项的一半的百分比或绝对像素值  |  string \| number |   `'75%'`  |
|    value    | 值 (当 type 为 'liquid' 时，只能是 0 到 1 之间的数)     |  number |   `0`  |
|    max      | 最大值 (type 为 'ring' 或 'gauge' 时有效)             |  number |   `1`  |
|   textStyle | 仪表盘刻度标签文本和描述文本的样式 (type 为 'ring' 或 'gauge' 时有效)       |  { labelSize?: number; labelOffset?: number \| string; valueSize?: number; valueOffset?: number \| string; color?: string; } |  `{ labelSize: 18, labelOffset: type === 'ring' ? -16 : '80%', valueSize: 30, valueOffset: type === 'ring' ? 16 : '60%', color: color }`   |
| itemWidth | 进度条的宽度 (type 为 'ring' 或 'gauge' 时有效)             |  number |   `20`  |
| color | 进度条或水滴的颜色           |  sting |   -   |
| bgColor | 进度条或水滴的背景颜色           |  sting |   -   |
| shadow | 进度条是否显示阴影效果 (type 为 'ring' 或 'gauge' 时有效)          |  boolean |   `false`   |
| liquid | 水滴图 [liquidFill](https://github.com/ecomfe/echarts-liquidfill#readme) 的标准配置对象 (type 为 'liquid' 时有效)    |  object |   -   |
| gauge  | 仪表盘的标准配置对象，接受标准的 [GaugeSeriesOption](https://echarts.apache.org/zh/option.html#series-gauge) 配置 (type 为 'gauge' 时有效) |  object |  -  |

::: tip 关于 textStyle
可以通过 `textStyle` 属性设置仪表盘刻度标签文本、显示数值和描述文本的样式，`type` 为 'liquid' 时无效，具体说明如下：
```ts
{
  labelSize?: number  // 刻度标签文本和描述文本的字体大小
  labelOffset?: number | string // 描述文本相对于仪表盘中心的垂直偏移距离，可以是绝对像素值或相对于仪表盘半径的百分比
  valueSize?: number  // 数值显示文本的字体大小
  valueOffset?: number | string // 数值显示文本相对于仪表盘中心的垂直偏移距离，可以是绝对像素值或相对于仪表盘半径的百分比
  color?: string // 仪表盘刻度标线和标签文本、显示数值和表述文本的字体颜色，不传默认取 color 属性的值
}
```
:::

::: tip 关于 liquid 和 gauge 属性

当 `type` 为 'liquid' 时，如果默认的效果不满足你的需求， 可以通过配置 `liquid` 属性来完全控制水滴图的每个部分，它接受标准的 [liquidFill](https://github.com/ecomfe/echarts-liquidfill#readme) 配置对象。

同样当 `type` 为 'gauge' 时，也可以通过配置 `gauge` 属性来完全定制你的仪表盘，它接受标准的 [GaugeSeriesOption](https://echarts.apache.org/zh/option.html#series-gauge) 配置。

:::


## Example
<iframe src="https://codesandbox.io/embed/vue-echarts-demo-pujot?fontsize=14&hidenavigation=1&initialpath=%2Fratio-chart&module=%2Fsrc%2Fdemo%2Fratio-chart-demo.vue&theme=light"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-echarts-demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
