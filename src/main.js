import { colors } from '@/utils/config'
import AdaptiveWrapper from './packages/adaptive-wrapper'
import BaseChart from './packages/base-chart'
import GridChart from './packages/grid-chart'
import PieChart from './packages/pie-chart'
import RatioChart from './packages/ratio-chart'
import HorizontalBarChart from './packages/horizontal-bar-chart'

const components = [
  AdaptiveWrapper,
  BaseChart,
  GridChart,
  PieChart,
  RatioChart,
  HorizontalBarChart
]

const install = (Vue, option = { colors }) => {
  Vue.prototype.$echartsColorSet = option.colors
  components.forEach(comp => Vue.use(comp))
}

if (window !== undefined && window.Vue) {
  Vue.use(install)
}

export default install
export {
  AdaptiveWrapper,
  BaseChart,
  GridChart,
  PieChart,
  RatioChart,
  HorizontalBarChart
}
