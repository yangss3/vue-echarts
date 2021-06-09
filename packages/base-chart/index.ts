import { App } from 'vue'
import BaseChart from './BaseChart'

BaseChart.install = (app: App) => app.component(BaseChart.name, BaseChart)

export default BaseChart
