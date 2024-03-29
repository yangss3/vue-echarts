# LineBarChart

柱图和线图组件，内部为柱图和线图的提供了一些默认配置，你只需要提供较少的配置即可实现简单的柱图和线图。

## API


|    Name     |                     Description                  |         Type          |             Default              |
| :---------: | :----------------------------------------------: | :-------------------: | :------------------------------: |
|    width    | 图表容器的宽度，可以是绝对像素值或父元素宽度的百分比 | string  | `'100%'` |
|   height    | 图表容器的高度，可以是绝对像素值或父元素高度的百分比 | string  | `'100%'` |
|   theme     | 图表颜色主题 | 'light' \| 'dark'  | `'light'` |
|  adaptive   | 当窗口 resize 时，是否让图表自动 resize 以自适应窗口大小  | boolean | `true`  |
|    type     | 图表类型 |'line' \| 'vertical-bar' \| 'horizontal-bar'|  `'line'`  |
|    title    | 标题                                             |  string     |    -    |
|  category   | 类目轴标签数据的数组                               |  string[]   |    -    |
|valueAxisName| 数值轴的名称                                        |  string   |    -    |
| textColor   | 全局文本的颜色                                        |  string   |    `#333`    |
|   series    | 系列数据，接受标准的 [LineSeriesOption](https://echarts.apache.org/zh/option.html#series-line) 和 [BarSeriesOption](https://echarts.apache.org/zh/option.html#series-bar) 配置 |  (LineSeriesOption \| BarSeriesOption) \| (LineSeriesOption \| BarSeriesOption)[] |  -  |
|    stack    | 不同系列的数据是否堆叠显示                                    |   boolean  |   `false`  |
|    rounded  | 柱图是否显示圆角， stack 为 `true` 时不生效                                            |   boolean  |   `false`   |
|   smooth    | 线图是否开启平滑处理，如果是 number 类型(取值范围 0 到 1)，表示平滑程度，越小表示越接近折线段，反之越平滑。设为 `true` 时相当于设为 0.5             |   boolean \| number    |   `false`  |
| barWidth |柱条的宽度，不设置时自适应 |   string \| number  |  - |
| showToolbox | 是否显示 toolbox (type 为 'line' 或 'vertical-bar' 时生效) |   boolean  |  `false` |
|  showLabel  | 是否显示 label |  boolean   | `false` |
| showBackground | 柱条是否显示背景 (仅当 type 为 'horizontal-bar' 时生效) |  boolean   | `false` |
| labelTop | 当柱条显示背景时，柱条的 label 距离柱条包装容器顶部的距离，可以是百分比(相对于柱条容器高度)或绝对像数值。 (仅当 type 为 'horizontal-bar' 时生效) |  string \| number   | `25%` |
| option   | ECharts 原生的配置对象 [EChartsOption](https://echarts.apache.org/zh/option.html)  | EChartsOption |    -     |



::: tip 关于 series 和 option

LineBarChart 通过 `series` 属性接受系列数据，可以传递标准的 [LineSeriesOption](https://echarts.apache.org/zh/option.html#series-line) 和 [BarSeriesOption](https://echarts.apache.org/zh/option.html#series-bar) 来配置系列的每一个细节。

通常你不需要配置 `option` 属性就能实现简单的线图和柱图，但如果设置 LineBarChart 提供的便捷属性无法达到你想要的效果，你也可以通过配置 `option` 来实现更细粒度的控制，`option` 的配置格式与 ECharts 实例方法 `setOption` 的第一个参数完全相同，实际上，LineBarChart 在内部会将 `option` 与预设配置合并，然后传递给 `setOption` 方法。它比预设的配置具有更高的优先级。

:::


## Example
<iframe src="https://codesandbox.io/embed/vue-echarts-demo-pujot?fontsize=14&hidenavigation=1&initialpath=%2Fline-bar-chart&module=%2Fsrc%2Fdemo%2Fline-bar-chart-demo.vue&theme=light"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-echarts-demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
