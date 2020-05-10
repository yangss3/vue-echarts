# HorizontalBarChart

横向的柱状图, 主要用于同一系列中各类目的数据对比或两个不同系列之间的数据对比

|   props    |                                               description                                                |                             type                             |         default          |
| :--------: | :------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------: | :----------------------: |
|   width    |                          图表容器的宽度, 可以是父容器宽度的百分比或绝对像素值等                          |                           `string`                           |         `"100%"`         |
|   height   |                          图表容器的高度, 可以是父容器高度的百分比或绝对像素值等                          |                           `string`                           |         `"100%"`         |
|  adaptive  |                             当窗口 resize 时, 是否让图表重绘以自适应窗口大小                             |                          `boolean`                           |         `false`          |
|    type    |                          类型, 支持单向(`"one-way"`)和双向(`"two-way"`)两种类型                          |                   `"one-way" | "two-way"`                    |       `"one-way"`        |
|  category  |                                               类目名的数组                                               |                       `Array<string>`                        |            -             |
|   series   |                                               系列数据数组                                               | `Array<{data: Array<number>, name?:string, color?: string}>` |            -             |
|   color    |                                 文本的颜色, 包括标题,类目名,图例文本等等                                 |                           `string`                           |         `'#000'`         |
|   title    |                                                   标题                                                   |                           `string`                           |            -             |
| titleSize  |                                           标题字体大小，像素值                                           |                           `number`                           | 默认根据容器尺寸自动计算 |
| titleColor |                                               标题字体颜色                                               |                           `string`                           | 默认取 `color` 属性的值  |
| labelSize  |                              本文字体大小，包括类目名,图例文本等等, 像素值                               |                           `number`                           | 默认根据容器尺寸自动计算 |
|   stack    |                          不同系列是否堆叠显示, 仅 `type` 为 `'one-way'` 时有效                           |                          `boolean`                           |         `false`          |
|   round    |                                             柱条是否显示圆角                                             |                          `boolean`                           |          `true`          |
| background |                         柱条是否显示背景色, 默认为 true, 也可以传入具体的颜色值                          |                      `boolean | string`                      |          `true`          |
|   border   |                                           柱条是否显示背景边框                                           |                          `boolean`                           |         `false`          |
|  gradient  |                                             柱条颜色是否渐变                                             |                          `boolean`                           |         `false`          |
| labelLeft  | 当 `type` 为 `'two-way'` 时, 指定中间类目名到容器左侧的距离, 可以是相对容器宽度的百分比,或者是绝对像素值 |                      `string | number`                       |          `46%`           |
| gridWidth  |    当 `type` 为 `'two-way'` 时, 指定左右两侧 grid 的宽度,可以是相对容器宽度的百分比,或者是绝对像素值     |                      `string | number`                       |          `37%`           |


<p class="codepen" data-height="400" data-theme-id="dark" data-default-tab="js,result" data-user="yshushan" data-slug-hash="RwWMXre" data-preview="true" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="HorizontalBarChart">
  <span>See the Pen <a href="https://codepen.io/yshushan/pen/RwWMXre">
  HorizontalBarChart</a> by Shushan Yang (<a href="https://codepen.io/yshushan">@yshushan</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>