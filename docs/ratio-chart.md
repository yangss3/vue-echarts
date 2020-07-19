# RatioChart

这个组件用于需要展示百分比的需求，提供了圆环，圆弧和水波三种类型的配置。

## API

## Props

|     Name     |                                                                      Description                                                                      |             Type             |                         Default                          |
| :----------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------: | :------------------------------------------------------: |
|    width     |                                                图表容器的宽度，可以是绝对像素值或父元素宽度的百分比等                                                 |           `string`           |                         `"100%"`                         |
|    height    |                                                图表容器的高度，可以是绝对像素值或父元素高度的百分比等                                                 |           `string`           |                         `"100%"`                         |
|   adaptive   |                                                   当窗口 resize 时，是否让图表重绘以自适应窗口大小                                                    |          `boolean`           |                         `false`                          |
|     type     |                                                    类型，内置提供 ring, arc, liquid 三种简单的类型                                                    | `"ring" | "arc" | "liquid"`  |                         `"ring"`                         |
|    value     |                   0 到 1 之间的数值，默认会以百分比的形式展示在图表中心。组件内部监听了这个值的变动，更改这个属性的值会触发视图更新                   |           `number`           |                            -                             |
|    label     |                                                             描述文本，默认展示在图表中心                                                              |           `string`           |                            -                             |
|    color     |                                                                  图表 body 块的主色                                                                   |           `string`           |                       `"#387adf"`                        |
|   bgColor    |                         `type` 为`"ring"`时，为圆环的填充底色，`type` 为`"liquid"`时，为水波的背景色，`type` 为`"arc"`时无效                          |           `string`           | ring: 根据 `color` 的值自动生成; liquid: `"transparent"` |
|  labelColor  |                                                                      本文的颜色                                                                       |           `string`           |                    默认取`color`的值                     |
|  labelSize   |                                                                 文本字体大小，像素值                                                                  |           `number`           |             默认根据容器尺寸自动计算字体大小             |
|  formatter   |                      图表中心默认会显示 `label` 和 `value` 的百分比，如果这不满足你的需求，可以通过这个属性来定制你要显示的内容                       |           `string`           |                            -                             |
|    round     |                                                   是否显示圆角，`type` 为 `'ring` 和 `'arc'` 时有效                                                   |          `boolean`           |                         `false`                          |
|   outline    |                                                 水波图是否显示 outline， `type` 为 `'liquid'` 时有效                                                  |          `boolean`           |                          `true`                          |
|   gradient   | 是否显示渐变色，`type` 为 `'ring` 和 `'arc'` 时有效。可以提供一个起始颜色和终止颜色组成的数组，或设置为 `true`，这样默认会使用 `color` 的值来产生渐变 | `boolean | [string, string]` |                         `false`                          |
| chartBgColor |                                                                   图表容器的背景色                                                                    |           `string`           |                     `"transparent"`                      |

### Methods

|    Name     |                                                               Description                                                                | Parameters |
| :---------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :--------: |
| renderChart | 调用该方法会触发图表重绘，**RatioChart** 内部只监听了`value`属性的变化，如果你动态修改了其它属性的值，可以手动调用这个方法来触发图表重绘 |     -      |

## Example

<!-- <div style="height:20px;"></div>
<p class="codepen" data-height="303" data-theme-id="dark" data-default-tab="js,result" data-user="yshushan" data-slug-hash="dyYmWaX" data-preview="true" style="height: 303px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="ratio-chart">
  <span>See the Pen <a href="https://codepen.io/yshushan/pen/dyYmWaX">
  ratio-chart</a> by Shushan Yang (<a href="https://codepen.io/yshushan">@yshushan</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script> -->

<iframe width="100%" height="300" src="//jsrun.net/dAvKp/embedded/all/light" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
