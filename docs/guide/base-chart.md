# BaseChart

当需要完全自定义图表内容时 可以使用这个组件。

## API

|    Name     |                      Description                       |   Type    | Default  |
| :---------: | :----------------------------------------------------: | :-------: | :------: |
|   width   | 图表容器的宽度，可以是绝对像素值或父元素宽度的百分比 | string  | `'100%'` |
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



BaseChart 内部监听了 `option` 的变动，当更改 `option` 后，会自动触发视图更新。

