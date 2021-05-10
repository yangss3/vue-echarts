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
<iframe src="https://codesandbox.io/embed/vue-echarts-demo-pujot?fontsize=14&hidenavigation=1&initialpath=%2Fpie-chart&module=%2Fsrc%2Fdemo%2Fpie-chart-demo.vue&theme=light"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-echarts-demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


