import { App } from "vue";
import RatioChart from "./RatioChart"

RatioChart.install = (app: App) => app.component(RatioChart.name, RatioChart);

export default RatioChart as typeof RatioChart &
  ((app: App, ...option: any[]) => any);
