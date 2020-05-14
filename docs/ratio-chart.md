# RatioChart

这个组件用于需要展示百分比的需求, 提供了 圆环(ring), 圆弧(arc)和水波(liquid) 三种类型的图表

## API

## Props

|     Name     |                                               Description                                                |            Type             |                      Default                       |
| :----------: | :------------------------------------------------------------------------------------------------------: | :-------------------------: | :------------------------------------------------: |
|    width     |                          图表容器的宽度, 可以是父容器宽度的百分比或绝对像素值等                          |          `string`           |                      `"100%"`                      |
|    height    |                          图表容器的高度, 可以是父容器高度的百分比或绝对像素值等                          |          `string`           |                      `"100%"`                      |
|   adaptive   |                             当窗口 resize 时, 是否让图表重绘以自适应窗口大小                             |          `boolean`          |                      `false`                       |
|     type     |                           类型, 内置提供"ring", "arc", "liquid"三种简单的类型                            | `"ring" | "arc" | "liquid"` |                      `"ring"`                      |
|    value     |                          0 到 1 之间的数值, 默认会以百分比的形式展示在图表中心                           |          `number`           |                         -                          |
|    label     |                                       描述文本, 默认展示在图表中心                                       |          `string`           |                         -                          |
|    color     |                                             图表 body 的主色                                             |          `string`           |                    `"#387adf"`                     |
|   bgColor    |   `type` 为`"ring"`时, 为圆环的填充底色, `type` 为`"liquid"`时, 为水波的背景色, `type` 为`"arc"`时无效   |          `string`           | ring: 根据 color 自动生成; liquid: `"transparent"` |
|  labelColor  |                                                本文的颜色                                                |          `string`           |                      `"#000"`                      |
|  labelSize   |                                           文本字体大小, 像素值                                           |          `number`           |   一般无需提供,默认根据容器尺寸自动计算字体大小    |
|  formatter   | 图表中心默认会显示 `label` 和 `value` 的百分比,如果这不满足你的需求,可以通过这个属性来定制你要显示的内容 |          `string`           |                         -                          |
| chartBgColor |                                             图表容器的背景色                                             |          `string`           |                  `"transparent"`                   |
