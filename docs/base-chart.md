# BaseChart

如果你熟悉 echarts 的配置, 且需要对图表的配置进行完全控制, 可以使用这个组件。

## API

### Props

|  props   |                      description                       |   type    | default  |
| :------: | :----------------------------------------------------: | :-------: | :------: |
|  width   | 图表容器的宽度, 可以是父容器宽度的百分比或绝对像素值等 | `string`  | `"100%"` |
|  height  | 图表容器的高度, 可以是父容器高度的百分比或绝对像素值等 | `string`  | `"100%"` |
| adaptive |    当窗口 resize 时, 是否让图表重绘以自适应窗口大小    | `boolean` | `false`  |
|  option  |  图表的配置对象, 与 `echarts` 原生的配置对象完全一致   | `Object`  |    -     |

## Usage

```html
<template>
  <base-chart ref="myChart" :option="option" adaptive />
</template>

<script>
  import { BaseChart } from '@yangss/echarts-vue-components';
  export default {
    components: { BaseChart },
    data() {
      return {
        option: {
          // configuration
        },
      };
    },
  };
</script>
```

BaseChart 只对原生的 echarts 实例进行了浅封装, 组件实例的 `chart` 属性暴露了当前图表的 echarts 实例对象。上面的示例中, 你可以通过 `this.$refs.myChart.chart` 来访问 [echarts 实例对象上的所有 API](https://www.echartsjs.com/zh/api.html#echartsInstance)

BaseChart 内部监听了 `option` 的变动，当更改 `option` 后，会自动触发视图更新。

这里的更改包含两种情况：

- 更改 `option` 的属性

```js
this.option.title = {
  /*  */
};
```

这种情况，会与之前的 option 进行合并来更新视图，这相当于 `this.$refs.myChart.chart.setOption(this.option, false)`

- 使用新对象替换 `option`

```js
this.option = {
  title: {
    // ...
  },
  // ...
};
```

这种情况，不会与之前的 option 合并，这相当于 `this.$refs.myChart.chart.setOption(this.option, true)`
