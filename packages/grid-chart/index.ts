import { App } from 'vue'
import GridChart from "./grid-chart";

GridChart.install = (app: App) => app.component(GridChart.name, GridChart);

export default GridChart as (typeof GridChart) & ((app: App, ...option: any[]) => any)
