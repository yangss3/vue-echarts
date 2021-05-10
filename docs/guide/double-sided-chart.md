# DoubleSidedChart

双边横向柱状图，可以快速实现两个系列的左右两边横向柱状图对比。

## API


|    Name     |                     Description                  |         Type          |             Default              |
| :---------: | :----------------------------------------------: | :-------------------: | :------------------------------: |
|   width    | 图表容器的宽度，可以是绝对像素值或父元素宽度的百分比 | string  | `'100%'` |
|   height    | 图表容器的高度，可以是绝对像素值或父元素高度的百分比 | string  | `'100%'` |
|   theme   | 图表主题，可选 'light' 或 'dark'，默认 'light' | 'light' \| 'dark'  | `'light'` |
|  adaptive   | 当窗口 resize 时，是否让图表重绘以自适应窗口大小，默认自适应    | boolean | `true`  |
|    title    | 标题                                             |  string     |    -    |
|  category   | 类目轴数据                                        |  string[]   |    -    |
|   series    | 系列数据，接受标准的 [BarSeriesOption](https://echarts.apache.org/zh/option.html#series-bar) 配置 (只支持两个系列) |  [BarSeriesOption, BarSeriesOption] |  -  |
|  rounded  | 柱图是否显示圆角                                             |   boolean  |   `false`   |
| background | 柱条是否显示背景 (传 string 类型时表示具体的颜色值)|  boolean \| string   | `false` |
| barWidth | 柱条的宽度 |  number   | `18` |
| grid | 坐标系的配置 |  { width: string \| number; top: string \| number; bottom: string \| number; labelLeft: string \| number; }   | `{ width: '40%', top: '10%', bottom: '10%', labelLeft: '51%' }` |



## Example
<iframe src="https://codesandbox.io/embed/vue-echarts-demo-pujot?fontsize=14&hidenavigation=1&initialpath=%2Fdouble-sided-chart&module=%2Fsrc%2Fdemo%2Fdouble-sided-chart-demo.vue&theme=light"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-echarts-demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
