import { App } from "vue";
import BaseChart from "./base-chart";
import LineBarChart from './line-bar-chart'
import DoubleSidedChart from "./double-sided-chart";
import PieChart from "./pie-chart";
import RatioChart from "./ratio-chart";

function install(app: App) {
  app
    .use(BaseChart as any)
    .use(LineBarChart as any)
    .use(DoubleSidedChart as any)
    .use(PieChart as any)
    .use(RatioChart as any);
}

declare namespace window {
  const Vue: any;
  function VueECharts(app: App, ...option: any[]): any;
}

if (window && window.Vue) {
  window.VueECharts = install;
}

export default install;

export {
  BaseChart,
  LineBarChart,
  DoubleSidedChart,
  PieChart,
  RatioChart
};
