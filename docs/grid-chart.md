# GridChart

直角坐标系图表, 组件内部为柱图和线图的提供了一些默认配置，你只需要提供较少的配置即可实现简单的柱图和线图。

## API

### Props

|    Name     |                                                     Description                                                      |                     Type                      |             Default              |
| :---------: | :------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------: | :------------------------------: |
|    width    |                                图表容器的宽度, 可以是父容器宽度的百分比或绝对像素值等                                |                   `string`                    |             `"100%"`             |
|   height    |                                图表容器的高度, 可以是父容器高度的百分比或绝对像素值等                                |                   `string`                    |             `"100%"`             |
|  adaptive   |                                   当窗口 resize 时, 是否让图表重绘以自适应窗口大小                                   |                   `boolean`                   |             `false`              |
|    type     |    图表类型, 可以是`"line"`(线图)或`"bar"`(柱图), 或者这里不指定, 而通过 `option` 对象来为每个系列单独指定 `type`    |         `"line" | "bar" | undefined`          |                -                 |
|    title    |                                                         标题                                                         |                   `string`                    |                -                 |
|    stack    |                                                   柱图是否堆叠显示                                                   |                   `boolean`                   |             `false`              |
|    round    |                                                   柱图是否显示圆角                                                   |                   `boolean`                   |             `false`              |
|   smooth    |                                                  线图是否为光滑曲线                                                  |                   `boolean`                   |             `false`              |
|  gradient   |                         柱图的颜色或线图下方区域的颜色是否渐变, 可以同时指定, 也可以单独指定                         | `boolean | { line?: boolean, bar?: boolean }` |             `false`              |
|    color    |                                                 坐标轴线和文本的颜色                                                 |                   `string`                    |             `"#000"`             |
|  labelSize  |                                          除标题文本外的文本字体大小，像素值                                          |                   `number`                    | 默认根据容器尺寸自动计算字体大小 |
|   option    |                                     `echarts` 原生的配置对象, 用于更细粒度的配置                                     |                   `Object`                    |                -                 |
| watchOption |                                          是否监听 `option` 的变动，默认开启                                          |                   `boolean`                   |              `true`              |
|    size     | 同时展示的类目数量。当类目较多无法同时展示所有类目时，可以设置这个属性让类目轴滚动显示。不传值时默认会显示所有类目。 |                   `number`                    |                -                 |
|  interval   |                                                 滚动时间间隔, 毫秒数                                                 |                   `number`                    |              `3000`              |
|    auto     |                                                   是否开启自动滚动                                                   |                   `boolean`                   |              `true`              |

::: tip 关于 option

**GridChart** 的类目数据(axis)和系列数据(series)需要通过 `option` 来提供，`option` 的配置格式与 **echarts** 实例方法 `setOption` 的第一个参数完全相同，实际上，**GridChart** 在内部会将 `option` 与默认配置合并，然后传递给 `setOption` 方法。

除了 axis 和 series， 通常你不需要对 `option` 做很多配置就能实现简单的线图和柱图，但是如果设置 **GridChart** 提供的便捷属性无法达到你想要的效果，你也可以通过配置 `option` 来实现更细粒度的控制，它比默认的配置有更高的优先级。
:::

### Events

| Name  |   Description    |                Parameters                |
| :---: | :--------------: | :--------------------------------------: |
| move  | 当类目滚动时触发 | 两个参数，分别是当前移入和移出的类目索引 |

### Methods

|    Name     |                                                                                       Description                                                                                       |                       Parameters                        |
| :---------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------: |
| renderChart | 调用该方法会触发图表重绘, **GridChart** 内部只默认监听了 `option` 属性的变化，如果你将 `watchOption` 属性设置为了 `false`，或动态修改了其它属性的值，可以手动调用这个方法来触发视图更新 | noMerge: `boolean` 是否合并 option， 默认为 false，合并 |
|  startMove  |                                                       手动触发类目轴的滚动，前提是你设置了 `size` 属性，且将 `auto` 设置为`false`                                                       |                            -                            |
|  stopMove   |                                                                              调用该方法暂停类目轴滚动行为                                                                               |                            -                            |

::: tip 类目轴滚动显示
当类目较多，无法同时展示所有类目时，可能有需要让类目循环滚动展示的需求。 **GridChart** 提供了 `size`, `auto`, `interval` 三个属性，可以快速实现类目轴循环滚动展示的效果。如果设置了 `size` 属性，且 `size` 的值小于类目的个数，将开启滚动显示, 如果 `auto` 设置成了 `false`，则可以通过调用 **GridChart** 的实例方法 `startMove` 来手动开启滚动。默认每 3s 滚动一个类目，你也可以设置 `interval` 来修改滚动时间间隔。每次滚动都会触发 `move` 事件，事件监听器会接收当前移入和移出的类目索引作为参数，你可以在这里添加一些逻辑处理，例如当所有类目都展示完之后，即最后一个类目移入后调用实例方法 `stopMove` 来停止滚动。具体请看下面的例子。
:::

## Example

<div style="height:20px;"></div>
<p class="codepen" data-height="389" data-theme-id="dark" data-default-tab="js,result" data-user="yshushan" data-slug-hash="xxwWvea" data-preview="true" style="height: 389px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="GridChart">
  <span>See the Pen <a href="https://codepen.io/yshushan/pen/xxwWvea">
  GridChart</a> by Shushan Yang (<a href="https://codepen.io/yshushan">@yshushan</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
