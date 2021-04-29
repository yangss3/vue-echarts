import { App } from "vue";
import PieChart from "./PieChart";

PieChart.install = (app: App) => app.component(PieChart.name, PieChart);

export default PieChart as typeof PieChart &
  ((app: App, ...option: any[]) => any);
