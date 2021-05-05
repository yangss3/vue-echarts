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
<!--
<div style="height:20px;"></div>
<p class="codepen" data-height="389" data-theme-id="dark" data-default-tab="js,result" data-user="yshushan" data-slug-hash="xxwWvea" data-preview="true" style="height: 389px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="GridChart">
  <span>See the Pen <a href="https://codepen.io/yshushan/pen/xxwWvea">
  GridChart</a> by Shushan Yang (<a href="https://codepen.io/yshushan">@yshushan</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script> -->
