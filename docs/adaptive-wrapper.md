# AdaptiveWrapper

自适应屏幕比例 (1920 : 1080) 的包装容器组件。

被该组件包裹的内容将会根据屏幕尺寸进行等比例缩放。 如果图表用于看板展示, 建议使用该组件来包裹你的组件，这样可以在固定的尺寸下开发，而无需考虑最终屏幕的尺寸:

```html
<adaptive-wrapper>
  <grid-chart />
</adaptive-wrapper>
```
