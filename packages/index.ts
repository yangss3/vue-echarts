import { App, provide, shallowRef } from 'vue'
import BaseChart from './base-chart'
import LineBarChart from './line-bar-chart'
import DoubleSidedChart from './double-sided-chart'
import PieChart from './pie-chart'
import RatioChart from './ratio-chart'
import { ECharts } from 'echarts'
import { apple } from 'color'

export interface Options {
  color?: string[]
}



function install (app: App, option?: Options) {
  app.provide('vue_echarts__color', option?.color)
  app
    .use(BaseChart as any)
    .use(LineBarChart as any)
    .use(DoubleSidedChart as any)
    .use(PieChart as any)
    .use(RatioChart as any)
}

function useInnerChart (chartId: string) {
  const chart = shallowRef<ECharts>()
  provide(`vue_echarts__${chartId}`, chart)
  return chart
}

export default install

export {
  BaseChart,
  LineBarChart,
  DoubleSidedChart,
  PieChart,
  RatioChart,
  useInnerChart
}
