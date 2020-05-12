# GridChart

直角坐标系图表, 一般指柱图和线图。

组件内部为柱图和线图的提供了简单的默认配置，你只需要提供较少的配置属性即可实现简单的柱图和线图。

## Usage

全局注册

```js
// main.js
import Vue from 'vue'
import { GridChart } from '@yangss/echarts-vue-components'

Vue.use(GridChart)
```

局部引入

```js
// SFC.vue
import { GridChart } from '@yangss/echarts-vue-components'
export default {
  // ...
  components: {
    GridChart
  }
}
```

简单使用

```html
<template>
  <div>
    <grid-chart type="line" title="苹果一季度手机出货量" :option="option" />
  </div>
</template>

<script>
  import { GridChart } from '@yangss/echarts-vue-components'
  export default {
    components: {
      GridChart
    },
    data() {
      return {
        option: {
          xAxis: {
            data: ['一月', '二月', '三月']
          },
          series: [
            {
              data: [234, 343, 334]
            }
          ]
        }
      }
    }
  }
</script>
```

## API

### Props

|   Name    |                                                     Description                                                      |                     Type                      |             Default              |
| :-------: | :------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------: | :------------------------------: |
|   width   |                                图表容器的宽度, 可以是父容器宽度的百分比或绝对像素值等                                |                   `string`                    |             `"100%"`             |
|  height   |                                图表容器的高度, 可以是父容器高度的百分比或绝对像素值等                                |                   `string`                    |             `"100%"`             |
| adaptive  |                                   当窗口 resize 时, 是否让图表重绘以自适应窗口大小                                   |                   `boolean`                   |             `false`              |
|   type    |    图表类型, 可以是`"line"`(线图)或`"bar"`(柱图), 或者这里不指定, 而通过 `option` 对象来为每个系列单独指定 `type`    |         `"line" | "bar" | undefined`          |                -                 |
|   title   |                                                         标题                                                         |                   `string`                    |                -                 |
|   stack   |                                                   柱图是否堆叠显示                                                   |                   `boolean`                   |             `false`              |
|   round   |                                                   柱图是否显示圆角                                                   |                   `boolean`                   |             `false`              |
|  smooth   |                                                  线图是否为光滑曲线                                                  |                   `boolean`                   |             `false`              |
| gradient  |                         柱图的颜色或线图下方区域的颜色是否渐变, 可以同时指定, 也可以单独指定                         | `boolean | { line?: boolean, bar?: boolean }` |             `false`              |
|   color   |                                                 坐标轴线和文本的颜色                                                 |                   `string`                    |             `"#000"`             |
| labelSize |                                          除标题文本外的文本字体大小，像素值                                          |                   `number`                    | 默认根据容器尺寸自动计算字体大小 |
|  option   |                                     `echarts` 原生的配置对象, 用于更细粒度的配置                                     |                   `Object`                    |                -                 |
|   size    | 同时展示的类目数量。当类目较多无法同时展示所有类目时，可以设置这个属性让类目轴滚动显示。不传值时默认会显示所有类目。 |                   `number`                    |                -                 |
| interval  |                                                 滚动时间间隔, 毫秒数                                                 |                   `number`                    |              `3000`              |
|   auto    |                                                   是否开启自动滚动                                                   |                   `boolean`                   |              `true`              |

### Events

| Name |   Description    |                  Parameters                  |
| :--: | :--------------: | :------------------------------------------: |
| move | 当类目滚动时触发 | 两个参数，分别是当前滚动移入和移出的类目索引 |

### Methods

|    Name     |                                                               Description                                                                | Parameters |
| :---------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :--------: |
| renderChart | 调用该方法会触发图表重绘, `GridChart` 内部只监听了 `option` 属性的变化，如果你动态修改了其它属性的值，可以手动调用这个方法来触发视图更新 |     -      |
|  startMove  |                               手动触发类目轴的滚动，前提是你设置了 `size` 属性，且将 `auto` 设置为`false`                                |     -      |
|  stopMove   |                                                       调用该方法暂停类目轴滚动行为                                                       |     -      |

## 关于 `option` 属性

GridChart 的类目数据和系列数据需要通过 `option` 来提供，`option` 的配置格式与 **echarts** 实例方法 `setOption` 的第一个参数完全相同，实际上，GridChart 在内部会将 `option` 与默认配置合并，然后传递给 `setOption` 方法。

除了 axis 和 series， 通常你不需要对 `option` 做很多配置就能实现简单的线图和柱图，但是如果通过设置 GridChart 提供的便捷属性无法达到你想要的效果，你也可以通过配置 `option` 来实现更细粒度的控制，它比默认配置有更高的优先级。

### 关于 `size`, `interval`, `auto`

提供这三个属性是了方便实现类目轴循环滚动显示的功能。如果设置了 `size` 属性，且 `size` 的值小于类目的个数，将开启滚动显示, 如果 `auto` 设置成了 `false`，则可以通过调用 GridChart 的实例方法 `startMove` 来手动开启滚动:

```html
<template>
  <!-- 图表渲染结束后自动开启滚动，默认每 3s 滚动一个类目 -->
  <grid-chart type="bar" :option="option" :size="6" @move="move" />

  <!-- 通过调用 this.$refs.grid.startMove() 手动开启滚动，滚动间隔为 1s-->
  <grid-chart
    ref="grid"
    type="bar"
    :option="option"
    :size="6"
    :interval="1000"
    :auto="false"
  />
</template>

<script>
  export default {
    //...
    data() {
      return {
        option: {
          xAxis: {
            // 默认 x 轴是类目轴
            // 这里类目个数为10，大于 size , 将会开启滚动显示
            data: [
              '美国',
              '西班牙',
              '英国',
              '俄罗斯',
              '意大利',
              '法国',
              '德国',
              '巴西',
              '土耳其',
              '伊朗'
            ]
          },
          series: [
            {
              data: [140, 27, 23, 22, 21, 18, 17, 16, 13, 10]
            }
          ]
        }
      }
    },
    mouted() {
      // 5s 后开启滚动
      setTimeout(() => this.$refs.grid.startMove(), 5000)
    },

    methods: {
      // 类目轴每移动一次，都会触发 move 事件
      // 处理函数会接收两个参数，分别是当前移入和移出的类目索引
      move(moveInIndex, moveOutIndex) {
        // 在这里可以做一些逻辑处理
        // 例如当所有类目都展示完之后，即最后一个类目移入后停止滚动
        if (moveInIndex === this.option.xAxis.data.length - 1) {
          this.$refs.grid.stopMove()
        }
      }
    }
  }
</script>
```

## Example

<p class="codepen" data-height="400" data-theme-id="dark" data-default-tab="js,result" data-user="yshushan" data-slug-hash="xxwWvea" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="GridChart">
  <span>See the Pen <a href="https://codepen.io/yshushan/pen/xxwWvea">
  GridChart</a> by Shushan Yang (<a href="https://codepen.io/yshushan">@yshushan</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
