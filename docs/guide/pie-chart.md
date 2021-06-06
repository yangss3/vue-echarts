# PieChart

饼图组件，内部提供了一些默认配置，可快速实现饼图、南丁格尔图和圆环图。
## API

|    Name     |                     Description                  |         Type          |             Default              |
| :---------: | :----------------------------------------------: | :-------------------: | :------------------------------: |
|    width    | 图表容器的宽度，可以是绝对像素值或父元素宽度的百分比 | string  | `'100%'` |
|   height    | 图表容器的高度，可以是绝对像素值或父元素高度的百分比 | string  | `'100%'` |
|   theme   | 图表颜色主题 | 'light' \| 'dark'  | `'light'` |
|  adaptive   | 当窗口 resize 时，是否让图表自动 resize 以自适应窗口大小 | boolean | `true` |
|    type     | 饼图的类型  |'pie' \| 'angle' \| 'ring' \| 'angle-ring'| 'pie'  |
|    title    | 标题                                             |  string  |   -   |
| textColor   | 全局文本的颜色                                        |  string   |    `#333`    |
|   series    | 系列数据，接受标准的 [PieSeriesOption](https://echarts.apache.org/zh/option.html#series-pie) 配置 |  PieSeriesOption \| PieSeriesOption[] |  -  |
| showLegend  | 是否显示 legend |   boolean   |   `false`  |
| bordered  | 每个类目块是否显示 border  |   boolean   |   `false`  |
| borderColor  | border 的颜色  |   string   |   `#fff`  |
| borderRadius  | border 圆角大小  |   number   |   `8`  |
| borderWidth  | border 的宽度  |   number   |   `2`  |
| labelFormatter  | 标签内容格式器，具体用法请参考[series-pie.label.formatter](https://echarts.apache.org/zh/option.html#series-pie.label.formatter)  |   string \| Function   |   `{b}`  |
|  radius  | 饼图的半径，也可以通过数组指定内径和外径 |  number \| string \| (number \| string)[]   | `['40%', '60%']` |
|  hideLabel  | 是否隐藏 label |  boolean   | `false` |
| option | ECharts 原生的配置对象 [EChartsOption](https://echarts.apache.org/zh/option.html)  | EChartsOption |    -     |



::: tip 关于 series 和 option

PieChart 通过 `series` 属性接受系列数据，可以传递标准的 [PieSeriesOption](https://echarts.apache.org/zh/option.html#series-line) 来配置系列的每一个细节。

通常你不需要配置 `option` 属性就能实现简单的饼图，但如果设置 PieChart 提供的便捷属性无法达到你想要的效果，也可以通过配置 `option` 来实现更细粒度的控制，`option` 的配置格式与 ECharts 实例方法 `setOption` 的第一个参数完全相同，实际上，PieChart 在内部会将 `option` 与预设配置合并，然后传递给 `setOption` 方法。它比预设的配置具有更高的优先级。
:::


## Example
<iframe src="https://codesandbox.io/embed/vue-echarts-demo-pujot?fontsize=14&hidenavigation=1&initialpath=%2Fpie-chart&module=%2Fsrc%2Fdemo%2Fpie-chart-demo.vue&theme=light"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-echarts-demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


