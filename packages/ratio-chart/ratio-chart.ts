import "echarts-liquidfill";
import { multiply } from "pkg/utils/helper";
import useBase from "pkg/compositions/useBase";
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  PropType,
  watch
} from "vue";
import Color from "color";
import merge from "lodash/merge";

interface ExternalApi {
  $renderChart: () => void;
}

export default defineComponent({
  name: "ratio-chart",
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
      type: String as PropType<"liquid" | "arc" | "ring">,
      default: "ring" // liquid | arc | ring
    },
    color: {
      type: String,
      default: "#387adf"
    },

    bgColor: {
      type: String,
      default: "transparent"
    },
    label: String,
    value: {
      type: [String, Number],
      required: true
    },
    formatter: String,
    labelSize: Number,
    labelColor: String,
    chartBgColor: {
      type: String,
      default: "transparent"
    },
    outline: {
      type: Boolean,
      default: true
    },
    round: {
      type: Boolean,
      default: false
    },
    gradient: {
      type: [Boolean, Array] as PropType<boolean | [string, string]>,
      default: false
    }
  },
  setup(props) {
    const { chart, renderFn, titleFontSize, contentFontSize } = useBase(props);

    function renderChart(notMerge = false) {
      chart.value.setOption(createOption());
    }

    function createOption() {
      const value =
        typeof props.value === "number"
          ? props.value
          : Number.parseFloat(props.value);
      let series: any[] = [],
        polarConfig = {},
        text = "";

      if (props.label && !Number.isNaN(value)) {
        text = `${props.label}\n${multiply(value, 100)}%`;
      } else if (props.label) {
        text = props.label;
      } else if (!Number.isNaN(value)) {
        text = `${multiply(value, 100)}%`;
      } else {
        text = "";
      }

      if (props.type === "ring" || props.type === "arc") {
        polarConfig = {
          title: {
            text: props.formatter || text,
            top: "middle",
            left: "center",
            textStyle: {
              color: props.labelColor || props.color,
              fontSize: props.labelSize || titleFontSize.value * 1.5,
              lineHeight: props.labelSize
                ? props.labelSize * 1.3
                : titleFontSize.value * 2
            }
          },
          polar: {
            center: ["50%", "50%"],
            radius: ["65%", "80%"]
          },
          radiusAxis: {
            type: "category",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          angleAxis: {
            max: 1,
            clockwise: true,
            // 隐藏刻度线
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        };

        let color;
        if (Array.isArray(props.gradient)) {
          color = {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: props.gradient[0] // 0% 处的颜色
              },
              {
                offset: 1,
                color: props.gradient[1] // 100% 处的颜色
              }
            ]
          };
        } else if (props.gradient) {
          color = {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: props.color // 0% 处的颜色
              },
              {
                offset: 1,
                color: Color(props.color)
                  .fade(0.5)
                  .toString() // 100% 处的颜色
              }
            ]
          };
        } else {
          color = props.color;
        }

        const innerRing = [
          {
            type: "bar",
            hoverAnimation: false,
            coordinateSystem: "polar",
            roundCap: props.round,
            barGap: "-100%",
            data: [value],
            itemStyle: {
              color
            },
            z: 2
          },
          {
            type: "bar",
            hoverAnimation: false,
            coordinateSystem: "polar",
            roundCap: props.round,
            barGap: "-100%",
            data: [1],
            itemStyle: {
              color:
                props.bgColor !== "transparent"
                  ? props.bgColor
                  : Color(props.color)
                      .fade(0.8)
                      .toString()
            },
            z: 1
          }
        ];

        if (props.type === "arc") {
          const outerRing = [
            {
              type: "pie",
              hoverAnimation: false,
              center: ["50%", "50%"],
              radius: ["82%", "83%"],
              label: {
                show: false
              },
              data: [
                {
                  value: 1,
                  itemStyle: {
                    color: Array.isArray(props.gradient)
                      ? props.gradient[0]
                      : props.color
                  }
                }
              ]
            }
          ];
          innerRing.pop();
          series = [...innerRing, ...outerRing];
        } else {
          series = [...innerRing];
        }
      } else if (props.type === "liquid") {
        const step = Number((value / 5).toFixed(1));

        series = [
          {
            type: "liquidFill",
            center: ["50%", "50%"],
            radius: "80%",
            color: [props.color],
            label: {
              formatter: props.formatter || text,
              fontSize: props.labelSize || titleFontSize.value * 1.5,
              color: props.labelColor || props.color,
              lineHeight: props.labelSize
                ? props.labelSize * 1.3
                : titleFontSize.value * 2
            },
            backgroundStyle: {
              color: props.bgColor
            },
            outline: {
              show: props.outline,
              borderDistance: contentFontSize.value / 3,
              itemStyle: {
                color: "none",
                borderColor: Color(props.color)
                  .darken(0.1)
                  .toString(),
                borderWidth: contentFontSize.value / 3
              }
            },
            data: [value, value - step, value - step * 2]
          }
        ];
      }

      const defaultConfig = {
        backgroundColor: props.chartBgColor,
        ...polarConfig,
        series
      };

      return merge(defaultConfig);
    }

    watch(
      () => props.value,
      () => renderChart()
    );

    onMounted(() => {
      renderChart();
    });

    const instance = getCurrentInstance() as ReturnType<
      typeof getCurrentInstance
    > &
      ExternalApi;

    instance.$renderChart = renderChart;

    return renderFn;
  }
});
