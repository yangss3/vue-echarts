import { useDefaultColors } from "../index";

export default function useColorSet(optionColors?: string[]): string[] {
  return optionColors || useDefaultColors();
}
