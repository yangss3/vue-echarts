import { App } from 'vue'
import BaseChart from "./base-chart";

BaseChart.install = (app: App) => app.component(BaseChart.name, BaseChart)

export default BaseChart as (typeof BaseChart) & ((app: App, ...option: any[]) => any)