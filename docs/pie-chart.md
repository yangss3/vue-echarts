# PieChart

饼图组件, 内置了饼图(pie), 南丁格尔图(angle)和圆环图(ring)三种类型的配置

|   props    |                       description                        |            type            |                    default                    |
| :--------: | :------------------------------------------------------: | :------------------------: | :-------------------------------------------: |
|   width    |  图表容器的宽度, 可以是父容器宽度的百分比或绝对像素值等  |          `string`          |                   `"100%"`                    |
|   height   |  图表容器的高度, 可以是父容器高度的百分比或绝对像素值等  |          `string`          |                   `"100%"`                    |
|  adaptive  |     当窗口 resize 时, 是否让图表重绘以自适应窗口大小     |         `boolean`          |                    `false`                    |
|    type    | 饼图的类型, 内置提供"pie", "angle","ring" 三种简单的类型 | `"pie" | "angle" | "ring"` |                    `"pie"`                    |
|   title    |                           标题                           |          `string`          |                       -                       |
| titleColor |                      标题本文的颜色                      |          `string`          |                   `"#000"`                    |
| labelColor |                    类目标签本文的颜色                    |          `string`          |     默认和与之对应的类目 body 的颜色相同      |
| titleSize  |                标题本文的字体大小, 像素值                |          `number`          | 一般无需提供,默认根据容器尺寸自动计算字体大小 |
| labelSize  |              类目标签本文的字体大小, 像素值              |          `number`          | 一般无需提供,默认根据容器尺寸自动计算字体大小 |
|    data    |                         类目数据                         |          `Array`           |                       -                       |
|   option   |       `echarts` 原生的配置对象, 用于更细粒度的配置       |          `Object`          |                       -                       |


如果默认的效果达不到你的需求, 你还可以通过 `option` 属性来进行更细粒度的配置.

> 注意: `PieChart` 默认配置只支持一个系列的数据, 如果需要显示多个系列, 请直接使用 `BaseChart`


<p class="codepen" data-height="380" data-theme-id="dark" data-default-tab="js,result" data-user="yshushan" data-slug-hash="LYpdwEe" data-preview="true" style="height: 380px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="PieChart">
  <span>See the Pen <a href="https://codepen.io/yshushan/pen/LYpdwEe">
  PieChart</a> by Shushan Yang (<a href="https://codepen.io/yshushan">@yshushan</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>