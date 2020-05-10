# BaseChart

|  props   |                      description                       |   type    | default  |
| :------: | :----------------------------------------------------: | :-------: | :------: |
|  width   | 图表容器的宽度, 可以是父容器宽度的百分比或绝对像素值等 | `string`  | `"100%"` |
|  height  | 图表容器的高度, 可以是父容器高度的百分比或绝对像素值等 | `string`  | `"100%"` |
| adaptive |    当窗口 resize 时, 是否让图表重绘以自适应窗口大小    | `boolean` | `false`  |
|  option  |  图表的配置对象, 与 `echarts` 原生的配置对象完全一致   | `Object`  |    -     |

基础图表组件, 如果你熟悉 echarts 的配置, 且需要对 echarts 特性的完全掌控, 可以使用这个组件, 该组件只对原生的 echarts 实例进行了浅封装, 组件实例的 `chart` 属性暴露了当前图表的 echarts 实例对象, 例如:

```js
// A component using BaseChart as child
{
  template: `<div>
    <BaseChart ref="myChart" :option="option" />
  </div>`,

  data() {
    return {
      option: {
        // ...
        // config object
      }
    }
  },
  // ...
}
```

这里, 你可以通过 `this.$refs.myChart.chart` 来访问 [echarts 实例对象上的所有 API](https://www.echartsjs.com/zh/api.html#echartsInstance)
