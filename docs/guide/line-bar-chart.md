# LineBarChart

柱图和线图组件，内部为柱图和线图的提供了一些默认配置，你只需要提供较少的配置即可实现简单的柱图和线图。

## API


|    Name     |                     Description                  |         Type          |             Default              |
| :---------: | :----------------------------------------------: | :-------------------: | :------------------------------: |
|    width    | 图表容器的宽度，可以是绝对像素值或父元素宽度的百分比 | string  | `'100%'` |
|   height    | 图表容器的高度，可以是绝对像素值或父元素高度的百分比 | string  | `'100%'` |
|   theme   | 图表主题，可选 'light' 或 'dark'，默认 'light' | 'light' \| 'dark'  | `'light'` |
|  adaptive   | 当窗口 resize 时，是否让图表重绘以自适应窗口大小，默认自适应    | boolean | `true`  |
|    type     | 图表类型, 默认为 line  |'line' \| 'vertical-bar' \| 'horizontal-bar'| 'line'  |
|    title    | 标题                                             |  string     |    -    |
|  category   | 类目轴数据                                        |  string[]   |    -    |
|valueAxisName| 数值轴的名称                                        |  string   |    -    |
|   series    | 系列数据，接受标准的 [LineSeriesOption](https://echarts.apache.org/zh/option.html#series-line) 和 [BarSeriesOption](https://echarts.apache.org/zh/option.html#series-bar) 配置 |  (LineSeriesOption \| BarSeriesOption) \| (LineSeriesOption \| BarSeriesOption)[] |  -  |
|    stack    | 不同系列的数据是否堆叠显示                                    |   boolean  |   `false`  |
|    rounded  | 柱图是否显示圆角                                             |   boolean  |   `false`   |
|   smooth    | 线图是否开启平滑处理，如果是 number 类型(取值范围 0 到 1)，表示平滑程度，越小表示越接近折线段，反之越平滑。设为 `true` 时相当于设为 0.5             |   boolean \| number    |   `false`  |
| showToolbox | 是否显示 toolbox，(type 为 'line' 或 'vertical-bar' 时生效) |   boolean  |  `false` |
|  showLabel  | 是否显示柱条的 label (仅当 type 为 'horizontal-bar' 时生效) |  boolean   | `false` |
| showBackground | 柱条是否显示背景 (仅当 type 为 'horizontal-bar' 时生效) |  boolean   | `false` |
| labelTop | 当柱条显示背景时，柱条的 label 距离柱条包装容器顶部的距离，可以是百分比或绝对像数值 (仅当 type 为 'horizontal-bar' 时生效) |  string \| number   | `25%` |
| option | ECharts 原生的配置对象 [EChartsOption](https://echarts.apache.org/zh/option.html)  | EChartsOption |    -     |



::: tip 关于 series 和 option

LineBarChart 通过 `series` 属性接受系列数据，可以传递标准的 [LineSeriesOption](https://echarts.apache.org/zh/option.html#series-line) 和 [BarSeriesOption](https://echarts.apache.org/zh/option.html#series-bar) 来配置系列的每一个细节。

通常你不需要配置 `option` 属性就能实现简单的线图和柱图，但如果设置 LineBarChart 提供的便捷属性无法达到你想要的效果，你也可以通过配置 `option` 来实现更细粒度的控制，`option` 的配置格式与 ECharts 实例方法 `setOption` 的第一个参数完全相同，实际上，LineBarChart 在内部会将 `option` 与预设配置合并，然后传递给 `setOption` 方法。它比预设的配置具有更高的优先级。

:::


## Example
<!--
<div style="height:20px;"></div>
<p class="codepen" data-height="389" data-theme-id="dark" data-default-tab="js,result" data-user="yshushan" data-slug-hash="xxwWvea" data-preview="true" style="height: 389px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="GridChart">
  <span>See the Pen <a href="https://codepen.io/yshushan/pen/xxwWvea">
  GridChart</a> by Shushan Yang (<a href="https://codepen.io/yshushan">@yshushan</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script> -->
