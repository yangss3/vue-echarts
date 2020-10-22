import AdaptiveWrapper from "./adaptive-wrapper";
import BaseChart from "./base-chart";
import GridChart from "./grid-chart";
import HorizontalBarChart from "./horizontal-bar-chart";
import PieChart from "./pie-chart";
import RatioChart from "./ratio-chart";

function install(app) {
  app
    .use(AdaptiveWrapper)
    .use(BaseChart)
    .use(GridChart)
    .use(HorizontalBarChart)
    .use(PieChart)
    .use(RatioChart);
}

if (window && window.Vue) {
  window.echartComponents = install;
}

export default install;

export {
  AdaptiveWrapper,
  BaseChart,
  GridChart,
  HorizontalBarChart,
  PieChart,
  RatioChart
};
