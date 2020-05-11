# GridChart

直角坐标系图表, 一般指柱图和线图
| props | description | type | default |
| :-------: | :------------------------------------------------------------------------------------------------------------: | :-------------------------------------------: | :------------------------------: |
| width | 图表容器的宽度, 可以是父容器宽度的百分比或绝对像素值等 | `string` | `"100%"` |
| height | 图表容器的高度, 可以是父容器高度的百分比或绝对像素值等 | `string` | `"100%"` |
| adaptive | 当窗口 resize 时, 是否让图表重绘以自适应窗口大小 | `boolean` | `false` |
| type | 图表类型, 可以是`"line"`(线图)或`"bar"`(柱图), 或者这里不指定, 而通过 `option` 对象来为每个系列单独指定 `type` | `"line" | "bar" | undefined` | - |
| title | 标题 | `string` | - |
| stack | 柱图是否堆叠显示 | `boolean` | `false` |
| round | 柱图是否显示圆角 | `boolean` | `false` |
| smooth | 线图是否为光滑曲线 | `boolean` | `false` |
| gradient | 柱图的颜色或线图下方区域的颜色是否渐变, 可以同时指定, 也可以单独指定 | `boolean | { line?: boolean, bar?: boolean }` | `false` |
| color | 坐标轴线和文本的颜色 | `string` | `"#000"` |
| labelSize | 除标题文本外的文本字体大小，像素值 | `number` | 默认根据容器尺寸自动计算字体大小 |
| option | `echarts` 原生的配置对象, 用于更细粒度的配置 | `Object` | - |
| size | 同时展示的类目数量, 当类目较多,无法同时展示所有类目时，可以设置这个属性来滚动显示 | `number` | - |
|interval| 滚动时间间隔, 毫秒数 | `number` | `3000` |
| auto | 是否开启自动滚动 | `boolean` | `true`|

```html
<template>
  <div>
    <grid-chart />
    <pie-chart />
  </div>
</template>
```
