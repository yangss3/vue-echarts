import AdaptiveWrapper from "./adaptive-wrapper";

AdaptiveWrapper.install = Vue =>
  Vue.component(AdaptiveWrapper.name, AdaptiveWrapper);

export default AdaptiveWrapper;
