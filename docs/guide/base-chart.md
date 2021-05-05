# BaseChart

当需要完全定制图表的内容，或需要对配置项进行完全控制时, 可以使用这个组件。

## API

|    Name     |                      Description                       |   Type    | Default  |
| :---------: | :----------------------------------------------------: | :-------: | :------: |
|    width  | 图表容器的宽度，可以是绝对像素值或父元素宽度的百分比 | string  | `'100%'` |
|   height  | 图表容器的高度，可以是绝对像素值或父元素高度的百分比 | string  | `'100%'` |
|   theme   | 图表主题，可选 'light' 或 'dark'，默认 'light' | 'light' \| 'dark'  | `'light'` |
|  adaptive | 当窗口 resize 时，是否让图表重绘以自适应窗口大小，默认自适应 | boolean | `true` |
|   option  | ECharts 原生的配置对象 [EChartsOption](https://echarts.apache.org/zh/option.html)  | EChartsOption |    -     |



## Usage

```html
<template>
  <base-chart :heigh="500" :option="option" />
</template>

<script>
  import { BaseChart } from '@yangss/vue-echarts'
  export default {
    components: { BaseChart },
    setup() {
      return {
        option: {
          // EchartsOption
        }
      }
    }
  }
</script>
```

<!-- **BaseChart** 只对原生的 ECharts 实例进行了浅封装, 组件实例的 `chart` 属性代理了当前图表的 **echarts** 实例对象。上面的示例中, 你可以通过 `this.$refs.myChart.chart` 来访问 [echarts 实例对象上的所有 API](https://www.echartsjs.com/zh/api.html#echartsInstance) -->

**BaseChart** 内部监听了 `option` 的变动，当更改 `option` 后，会自动触发视图更新。

<!-- 这里的更改包含两种情况：

- 更改 `option` 的属性

```js
this.option.title = {
  /*  */
}
```

这种情况，会与之前的 option 进行合并来更新视图，这相当于 `this.$refs.myChart.chart.setOption(this.option, false)`

- 使用新对象替换 `option`

```js
this.option = {
  title: {
    // ...
  }
  // ...
}
```

这种情况，新的 option 不会与之前的 option 合并，这相当于 `this.$refs.myChart.chart.setOption(this.option, true)` -->
