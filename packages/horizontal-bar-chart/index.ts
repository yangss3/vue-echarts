import { App } from "vue";
import HorizontalBarChart from "./horizontal-bar-chart";

HorizontalBarChart.install = (app: App) =>
  app.component(HorizontalBarChart.name, HorizontalBarChart);

export default HorizontalBarChart as typeof HorizontalBarChart &
  ((app: App, ...option: any[]) => any);
