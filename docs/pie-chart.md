# PieChart

饼图组件，内置了饼图、南丁格尔图和圆环图，三种类型的配置

## API

### Props

|    Name     |                      Description                       |            Type            |                Default                 |
| :---------: | :----------------------------------------------------: | :------------------------: | :------------------------------------: |
|    width    | 图表容器的宽度，可以是绝对像素值或父元素宽度的百分比等 |          `string`          |                `"100%"`                |
|   height    | 图表容器的高度，可以是绝对像素值或父元素高度的百分比等 |          `string`          |                `"100%"`                |
|  adaptive   |    当窗口 resize 时，是否让图表重绘以自适应窗口大小    |         `boolean`          |                `false`                 |
|    type     |  饼图的类型，内置提供 pie, angle, ring 三种简单的类型  | `"pie" | "angle" | "ring"` |                `"pie"`                 |
|    title    |                        标题文本                        |          `string`          |                   -                    |
| titleColor  |                     标题本文的颜色                     |          `string`          |                `"#000"`                |
| labelColor  |                   类目标签本文的颜色                   |          `string`          | 默认和与之对应的类目 body 块的颜色相同 |
|  titleSize  |               标题本文的字体大小，像素值               |          `number`          |    默认根据容器尺寸自动计算字体大小    |
|  labelSize  |             类目标签本文的字体大小，像素值             |          `number`          |    默认根据容器尺寸自动计算字体大小    |
|    data     |                       类目的数据                       |          `Array`           |                   -                    |
|   option    |     **echarts** 原生的配置对象，用于更细粒度的配置     |          `Object`          |                   -                    |
| watchOption |           是否监听 `option` 的变动，默认开启           |         `boolean`          |                 `true`                 |

::: tip 关于 data 属性
**PieChart** 通过 `data` 来提供类目的数据，`data` 是一个包含每个类目配置对象的数组，数据格式与 [series-pie.data](https://echarts.apache.org/zh/option.html#series-pie.data) 完全相同。大多数情况下， 你不需要使用`option`，只需配置`data`就能实现简单的饼图效果。**PieChart** 内部也监听了 `data` 属性的变化，当 `data` 有变更时，会触发视图更新。
:::

::: tip 注意
**PieChart** 默认配置只支持一个系列的数据，如果需要展示多个系列，可以直接使用 **[BaseChart](/base-chart.md)** 组件自行配置。
:::

### Methods

|    Name     |                                                                                         Description                                                                                          |                           Parameters                           |
| :---------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------: |
| renderChart | 调用该方法会触发图表重绘，**PieChart** 内部默认只监听了`data`和`option`的变化，如果你动态修改了其它属性的值，或者你将 `watchOption` 属性设置为了 `false`，可以手动调用这个方法来触发视图更新 | noMerge: `boolean`，是否合并 `option`， 默认为 `false`，即合并 |

## Example

<!-- <div style="height:20px;"></div>
<p class="codepen" data-height="380" data-theme-id="dark" data-default-tab="js,result" data-user="yshushan" data-slug-hash="LYpdwEe" data-preview="true" style="height: 380px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="PieChart">
  <span>See the Pen <a href="https://codepen.io/yshushan/pen/LYpdwEe">
  PieChart</a> by Shushan Yang (<a href="https://codepen.io/yshushan">@yshushan</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script> -->
<iframe width="100%" height="450" src="//jsrun.net/GAvKp/embedded/all/light" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
