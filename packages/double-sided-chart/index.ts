import { App } from "vue";
import DoubleSidedChart from "./DoubleSidedChart";

DoubleSidedChart.install = (app: App) =>
  app.component(DoubleSidedChart.name, DoubleSidedChart);

export default DoubleSidedChart as typeof DoubleSidedChart &
  ((app: App, ...option: any[]) => any);
