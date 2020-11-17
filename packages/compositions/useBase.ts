import echarts, { ECharts } from "echarts";
import { h, onBeforeUnmount, onMounted, Ref, ref, shallowRef } from "vue";

export default (props: Record<string, any>) => {
  const el = ref<HTMLDivElement>() as Ref<HTMLDivElement>;

  const chart = shallowRef<ECharts>() as Ref<ECharts>;

  const titleFontSize = ref(18);
  const contentFontSize = ref(15);

  function initState() {
    const _titleFontSize = Math.floor(
      Math.min(el.value.clientWidth, el.value.clientHeight) / 25
    );
    if (_titleFontSize > 35) titleFontSize.value = 35;
    else if (_titleFontSize < 15) titleFontSize.value = 15;
    else titleFontSize.value = _titleFontSize;

    const _contentFontSize = Math.floor(titleFontSize.value * 0.55);
    contentFontSize.value = _contentFontSize < 12 ? 12 : _contentFontSize;
  }

  onMounted(() => {
    chart.value = echarts.init(el.value);
    if (props.adaptive) {
      window.addEventListener("resize", () => chart.value.resize());
    }
    initState();
  });

  onBeforeUnmount(() => {
    if (props.adaptive) {
      window.removeEventListener("resize", () => chart.value.resize());
    }
  });

  return {
    chart,
    titleFontSize,
    contentFontSize,
    renderFn() {
      return h("div", {
        ref: el,
        style: {
          width: props.width,
          height: props.height
        }
      });
    }
  };
};
