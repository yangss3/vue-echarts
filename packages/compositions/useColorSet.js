import { useDefaultColors } from "../index";

export default optionColors => {
  return optionColors || useDefaultColors();
};
