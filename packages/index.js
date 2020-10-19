import AdaptiveWrapper from "./adaptive-wrapper";
import BaseChart from "./base-chart";
import GridChart from "./grid-chart";
import HorizontalBarChart from "./horizontal-bar-chart";
import PieChart from "./pie-chart";
import RatioChart from "./ratio-chart";

const comps = [
  AdaptiveWrapper,
  BaseChart,
  GridChart,
  HorizontalBarChart,
  PieChart,
  RatioChart
];

function install(vueApp) {
  comps.forEach(vueApp.use);
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
