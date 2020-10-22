import echarts from "echarts";
import {
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef
} from "vue";

export default adaptive => {
  const titleFontSize = ref(18);
  const contentFontSize = ref(15);
  const chart = shallowRef(null);

  const { ctx } = getCurrentInstance();

  function initState() {
    const _titleFontSize = Math.floor(
      Math.min(ctx.$el.clientWidth, ctx.$el.clientHeight) / 25
    );
    if (_titleFontSize > 35) titleFontSize.value = 35;
    else if (_titleFontSize < 15) titleFontSize.value = 15;
    else titleFontSize.value = _titleFontSize;

    const _contentFontSize = Math.floor(titleFontSize.value * 0.55);
    contentFontSize.value = _contentFontSize < 12 ? 12 : _contentFontSize;
  }

  onMounted(() => {
    chart.value = echarts.init(ctx.$el);
    if (adaptive) {
      window.addEventListener("resize", chart.value.resize);
    }
    initState();
  });

  onBeforeUnmount(() => {
    if (adaptive) {
      window.removeEventListener("resize", chart.value.resize);
    }
  });

  return {
    chart,
    titleFontSize,
    contentFontSize
  };
};
