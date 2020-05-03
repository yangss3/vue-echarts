# A few simple chart components based Echarts and Vue
## Usage
### Install
```
npm install echarts-vue-components
```
### Global register for all
```js
import Vue from 'vue'
import echartsComps from 'echarts-vue-components'

Vue.use(echartsComponents)
```

### Local register in a component
```js
import { GridChart, PieChart } from 'echarts-vue-components'

export default {
  components: {
    GridChart,
    PieChart
  }
}

```
### Using in template
```html
<template>
  <div>
    <grid-chart />
    <pie-chart />
  </div>
</template>
```