# echarts-vue-components

几个简单的基于 Vue 的 ECharts 组件。 [https://yangss3.github.io/echarts-vue-components](https://yangss3.github.io/echarts-vue-components)

## Install

**echarts-vue-components** 将 **echarts** 作为外部依赖, 需要同时引入 **echarts**.

### NPM

```bash
npm install echarts @yangss/echarts-vue-components
```

### 通过 CDN 引入

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/4.7.0/echarts.min.js"></script>
<script src="https://unpkg.com/@yangss/echarts-vue-components/lib/echarts-vue-components.min.js"></script>
```

## Usage

### 全局注册

```js
import Vue from 'vue'
import echartsComps from '@yangss/echarts-vue-components'

Vue.use(echartsComponents)
```

### 局部引入

```js
import { BaseChart, GridChart } from '@yangss/echarts-vue-components'

export default {
  components: {
    BaseChart,
    GridChart
  }
}
```
