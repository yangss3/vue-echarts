# RatioChart

用于展示占比情况、进度等场景，内部预设了圆环图、仪表盘和水滴图的配置
## API

|    Name     |                     Description                  |         Type          |             Default              |
| :---------: | :----------------------------------------------: | :-------------------: | :------------------------------: |
|    width    | 图表容器的宽度，可以是绝对像素值或父元素宽度的百分比 | string  | `'100%'` |
|   height    | 图表容器的高度，可以是绝对像素值或父元素高度的百分比 | string  | `'100%'` |
|   theme   | 图表主题，可选 'light' 或 'dark'，默认 'light' | 'light' \| 'dark'  | `'light'` |
|  adaptive   | 当窗口 resize 时，是否让图表重绘以自适应窗口大小，默认自适应    | boolean | `true` |
|    type     | 图表类型  | 'ring' \| 'gauge' \| 'liquid' | `'ring'`  |
|    title    | 描述文本                                             |  string  |   -   |
|    radius   | 圆的半径                                             |  string \| number |   `'75%'`  |
|    value    | 值 (当 type 为 'liquid' 时，只能是 0 到 1 之间的数)     |  number |   `0`  |
|    max      | 最大值 (type 为 'ring' 或 'gauge' 时有效)             |  number |   `1`  |
|   textStyle | 显示文本的样式       |  { titleSize?: number; titleOffset?: number \| string; valueSize?: number; valueOffset?: number \| string; color?: string; } |  `{ titleSize: 18, titleOffset: type === 'ring' ? -16 : '80%', valueSize: 30, valueOffset: type === 'ring' ? 16 : '60%', color: color }`   |
| itemWidth | 进度条的宽度 (type 为 'ring' 或 'gauge' 时有效)             |  number |   `20`  |
| color | 进度条或水滴的颜色           |  sting |   -   |
| bgColor | 进度条或水滴的背景颜色           |  sting |   -   |
| shadow | 进度条是否显示阴影 (type 为 'ring' 或 'gauge' 时有效)          |  boolean |   `false`   |
| liquid | 水滴图 [liquidFill](https://github.com/ecomfe/echarts-liquidfill#readme) 的标准配置对象 (type 为 'liquid' 时有效)    |  object |   -   |
| gauge  | 仪表盘的标准配置对象，接受标准的 [GaugeSeriesOption](https://echarts.apache.org/zh/option.html#series-gauge) 配置 (type 为 'gauge' 时有效) |  object |  -  |

::: tip 关于 liquid 和 gauge 属性

LineBarChart 通过 `series` 属性接受系列数据，可以传递标准的 [LineSeriesOption](https://echarts.apache.org/zh/option.html#series-line) 和 [BarSeriesOption](https://echarts.apache.org/zh/option.html#series-bar) 来配置系列的每一个细节。

通常你不需要配置 `option` 属性就能实现简单的线图和柱图，但如果设置 LineBarChart 提供的便捷属性无法达到你想要的效果，你也可以通过配置 `option` 来实现更细粒度的控制，`option` 的配置格式与 ECharts 实例方法 `setOption` 的第一个参数完全相同，实际上，LineBarChart 在内部会将 `option` 与预设配置合并，然后传递给 `setOption` 方法。它比预设的配置具有更高的优先级。

:::


## Example
<iframe src="https://codesandbox.io/embed/vue-echarts-demo-pujot?fontsize=14&hidenavigation=1&initialpath=%2Fratio-chart&module=%2Fsrc%2Fdemo%2Fratio-chart-demo.vue&theme=light"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-echarts-demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
