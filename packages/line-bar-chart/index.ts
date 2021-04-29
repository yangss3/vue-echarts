import { App } from 'vue'
import LineBarChart from './LineBarChart'

LineBarChart.install = (app: App) => app.component(LineBarChart.name, LineBarChart);

export default LineBarChart as (typeof LineBarChart) & ((app: App, ...option: any[]) => any)
