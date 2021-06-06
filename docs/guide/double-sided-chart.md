# DoubleSidedChart

双边横向柱状图，可以快速实现两个系列的左右两边横向柱状图对比。

## API


|    Name     |                     Description                  |         Type          |             Default              |
| :---------: | :----------------------------------------------: | :-------------------: | :------------------------------: |
|   width    | 图表容器的宽度，可以是绝对像素值或父元素宽度的百分比 | string  | `'100%'` |
|   height    | 图表容器的高度，可以是绝对像素值或父元素高度的百分比 | string  | `'100%'` |
|   theme   | 图表颜色主题| 'light' \| 'dark'  | `'light'` |
|  adaptive   | 当窗口 resize 时，是否让图表自动 resize 以自适应窗口大小    | boolean | `true`  |
|    title    | 标题                                             |  string     |    -    |
|  category   | 类目轴标签数据的数组                                      |  string[]   |    -    |
|   series    | 系列数据，接受标准的 [BarSeriesOption](https://echarts.apache.org/zh/option.html#series-bar) 配置 (只支持两个系列) |  [BarSeriesOption, BarSeriesOption] |  -  |
| textColor   | 全局文本的颜色                                        |  string   |    `#333`    |
| colors   | 左右两边柱条的颜色                                        |  [string, string]   |  -   |
|  rounded  | 柱图是否显示圆角                                             |   boolean  |   `false`   |
| background | 柱条是否显示背景 (传 string 类型时表示具体的颜色值)|  boolean \| string   | `false` |
| barWidth | 柱条的宽度 |  number   | `18` |
| grid | 坐标系的配置 |  { width?: string \| number; top?: string \| number; bottom?: string \| number; labelLeft?: string \| number; }   | `{ width: '40%', top: '10%', bottom: '10%', labelLeft: '51%' }` |

::: tip 关于 grid
grid 属性用于配置左右两个坐标系的宽度，距离容器顶部和底部的距离以及中间label的位置调整，具体配置格式如下：
```ts
{
  width?: string | number;  // 左右两边图表的宽度，可以是容器宽度的百分比或绝对像素值
  top?: string | number;  // 图表距离容器顶部的距离，可以是容器高度的百分比或绝对像素值
  bottom?: string | number;  // 图表距离容器底部的距离，可以是容器高度的百分比或绝对像素值
  labelLeft?: string | number; // 中间的类目轴距离容器左边的距离，可以是容器宽度的百分比或绝对像素值
}
```
:::

::: tip 关于 series
DoubleSidedChart 通过 `series` 属性接受系列数据，可以传递标准的 [BarSeriesOption](https://echarts.apache.org/zh/option.html#series-bar) 来配置系列的每一个细节。注意，因为系列数据是展示在左右两边，所以只接受两个系列的数据，传入超过两个系列，只会取前两个系列，后面的系列将被忽略。
:::


## Example
<iframe src="https://codesandbox.io/embed/vue-echarts-demo-pujot?fontsize=14&hidenavigation=1&initialpath=%2Fdouble-sided-chart&module=%2Fsrc%2Fdemo%2Fdouble-sided-chart-demo.vue&theme=light"
     style="width:100%; height:400px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-echarts-demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
