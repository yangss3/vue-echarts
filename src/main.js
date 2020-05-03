import { colors } from '@/utils/config'
import AdaptiveWrapper from './packages/adaptive-wrapper'
import GridChart from './packages/grid-chart'
import PieChart from './packages/pie-chart'
import RatioChart from './packages/ratio-chart'
import HorizontalBarChart from './packages/horizontal-bar-chart'

const comps = [AdaptiveWrapper, GridChart, PieChart, RatioChart, HorizontalBarChart]

const install = (Vue, option = { colors }) => {
  Vue.prototype.$echartsColorSet = option.colors
  comps.forEach((comp) => Vue.use(comp))
}

if (window !== undefined && window.Vue) {
  Vue.use(install)
}

export default install
export { AdaptiveWrapper, GridChart, PieChart, RatioChart, HorizontalBarChart }
