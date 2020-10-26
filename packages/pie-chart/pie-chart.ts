import merge from "lodash/merge";
import { defineComponent, onMounted, PropType, watch } from "vue";
import { EChartOption, EChartTitleOption } from "echarts";
import useBase from "pkg/compositions/useBase";
import useColorSet from "pkg/compositions/useColorSet";

export default defineComponent({
  name: "pie-chart",
  props: {
    height: {
      type: String,
      default: "100%"
    },
    width: {
      type: String,
      default: "100%"
    },
    adaptive: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "pie" // pie | angle | ring
    },
    title: String,
    titleColor: {
      type: String,
      default: "#000"
    },
    titleSize: Number,
    labelColor: String,
    labelSize: Number,
    data: {
      type: Array as PropType<EChartOption.SeriesPie.DataObject[]>,
      default: () => []
    },
    option: {
      type: Object as PropType<EChartOption>,
      default: () => ({})
    },
    watchOption: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const { chart, renderFn, titleFontSize, contentFontSize } = useBase(props);

    watch(
      () => props.option,
      (val, oldVal) => {
        if (props.watchOption) {
          renderChart(val != oldVal);
        }
      },
      { deep: true }
    );

    watch(
      () => props.data,
      (val, oldVal) => {
        renderChart(val != oldVal);
      },
      { deep: true }
    );

    function renderChart(notMerge = false) {
      chart.value.setOption(createOption(), notMerge);
    }

    const echartsColorSet = useColorSet();

    function createOption() {
      const title = props.option.title as Exclude<
        typeof props.option.title,
        EChartTitleOption[]
      >;
      const showTitle = !!props.title || (!!title && title.show !== false);

      const defaultConfig = {
        color: echartsColorSet,
        title: showTitle
          ? {
              text: props.title,
              left: "center",
              top: props.type === "ring" ? "center" : "9%",
              textStyle: {
                color: props.titleColor,
                fontSize: props.titleSize || titleFontSize.value,
                lineHeight: (props.titleSize || titleFontSize.value) * 1.2
              }
            }
          : undefined,

        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c}<br/>{d}%",
          textStyle: {
            fontSize: contentFontSize.value
          }
        },

        series: [
          {
            type: "pie",
            roseType: props.type === "angle",
            center:
              props.type === "ring"
                ? ["50%", "50%"]
                : showTitle
                ? ["50%", "55%"]
                : ["50%", "50%"],
            radius: props.type === "ring" ? ["45%", "55%"] : "50%",
            label: {
              show: true,
              formatter: "{b}：{c}\n({d}%)",
              fontSize: props.labelSize || contentFontSize.value,
              lineHeight: (props.labelSize || contentFontSize.value) + 3,
              color: props.labelColor || undefined
            },
            labelLine: {
              lineStyle: {
                color: props.labelColor || undefined
              }
            },
            data: props.data
          }
        ]
      };

      return merge(defaultConfig, props.option);
    }

    onMounted(() => {
      renderChart();
    });

    return renderFn;
  }
});
