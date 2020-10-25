import { App } from "vue";
import AdaptiveWrapper from "./adaptive-wrapper";

AdaptiveWrapper.install = (app: App) =>
  app.component(AdaptiveWrapper.name, AdaptiveWrapper);

export default AdaptiveWrapper as typeof AdaptiveWrapper &
  ((app: App, ...option: any[]) => any);
