# AdaptiveWrapper

自适应屏幕比例 (1920 : 1080) 的包装容器组件。

被该组件包裹的内容将会根据屏幕尺寸进行等比例缩放。 如果图表用于看板展示, 建议使用该组件来包裹你的组件，这样可以在固定的尺寸下开发，而无需考虑最终屏幕的尺寸:

```html
<adaptive-wrapper>
  <grid-chart />
</adaptive-wrapper>
```

## Example

<div style="height:20px;"></div>
<p class="codepen" data-height="501" data-theme-id="dark" data-default-tab="js,result" data-user="yshushan" data-slug-hash="WNQYwxL" style="height: 301px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Toggle Tooltip">
  <span>See the Pen <a href="https://codepen.io/yshushan/pen/WNQYwxL">
  Toggle Tooltip</a> by Shushan Yang (<a href="https://codepen.io/yshushan">@yshushan</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
