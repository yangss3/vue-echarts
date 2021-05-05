# PieChart

饼图组件，内部提供了一些默认配置，可快速实现饼图、南丁格尔图和圆环图
## API

|    Name     |                     Description                  |         Type          |             Default              |
| :---------: | :----------------------------------------------: | :-------------------: | :------------------------------: |
|    width    | 图表容器的宽度，可以是绝对像素值或父元素宽度的百分比 | string  | `'100%'` |
|   height    | 图表容器的高度，可以是绝对像素值或父元素高度的百分比 | string  | `'100%'` |
|   theme   | 图表主题，可选 'light' 或 'dark'，默认 'light' | 'light' \| 'dark'  | `'light'` |
|  adaptive   | 当窗口 resize 时，是否让图表重绘以自适应窗口大小，默认自适应    | boolean | `true` |
|    type     | 饼图类型，默认为 'pie'  |'pie' \| 'angle' \| 'ring'| 'pie'  |
|    title    | 标题                                             |  string  |   -   |
|   series    | 系列数据，接受标准的 [PieSeriesOption](https://echarts.apache.org/zh/option.html#series-pie) 配置 |  PieSeriesOption \| PieSeriesOption[] |  -  |
| bordered  | 是否显示 border  |   boolean   |   `false`  |
|  hideLabel  | 是否隐藏 label |  boolean   | `false` |
| option | ECharts 原生的配置对象 [EChartsOption](https://echarts.apache.org/zh/option.html)  | EChartsOption |    -     |



::: tip 关于 series 和 option

PieChart 通过 `series` 属性接受系列数据，可以传递标准的 [PieSeriesOption](https://echarts.apache.org/zh/option.html#series-line) 来配置系列的每一个细节。

通常你不需要配置 `option` 属性就能实现简单的线图和柱图，但如果设置 PieChart 提供的便捷属性无法达到你想要的效果，你也可以通过配置 `option` 来实现更细粒度的控制，`option` 的配置格式与 ECharts 实例方法 `setOption` 的第一个参数完全相同，实际上，PieChart 在内部会将 `option` 与预设配置合并，然后传递给 `setOption` 方法。它比预设的配置具有更高的优先级。
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
