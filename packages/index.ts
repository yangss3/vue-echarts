import { App } from "vue";
import BaseChart from "./base-chart";
import LineBarChart from './line-bar-chart'
import DoubleSidedChart from "./double-sided-chart";
import PieChart from "./pie-chart";
import RatioChart from "./ratio-chart";

function install(app: App) {
  app
    .use(BaseChart)
    .use(LineBarChart)
    .use(DoubleSidedChart)
    .use(PieChart)
    .use(RatioChart);
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
