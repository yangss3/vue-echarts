import "echarts-liquidfill";
import chartMixin from "../utils/mixins/chartMixin";
import merge from "lodash/merge";
import { multiply } from "../utils/helper";
import Color from "color";

export default {
  name: "ratioChart",
  mixins: [chartMixin],
  props: {
    type: {
      type: String,
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
    value: [String, Number],
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
      type: [Boolean, Array],
      default: false
    }
  },

  watch: {
    value() {
      this.renderChart();
    }
  },

  methods: {
    createOption() {
      const value = Number.parseFloat(this.value);
      let series = [],
        polarConfig = {},
        text = "";

      if (this.label && !Number.isNaN(value)) {
        text = `${this.label}\n${multiply(value, 100)}%`;
      } else if (this.label) {
        text = this.label;
      } else if (!Number.isNaN(value)) {
        text = `${multiply(value, 100)}%`;
      } else {
        text = "";
      }

      if (this.type === "ring" || this.type === "arc") {
        polarConfig = {
          title: {
            text: this.formatter || text,
            top: "middle",
            left: "center",
            textStyle: {
              color: this.labelColor || this.color,
              fontSize: this.labelSize || this.titleFontSize * 1.5,
              lineHeight: this.labelSize * 1.3 || this.titleFontSize * 2
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
        if (Array.isArray(this.gradient)) {
          color = {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: this.gradient[0] // 0% 处的颜色
              },
              {
                offset: 1,
                color: this.gradient[1] // 100% 处的颜色
              }
            ]
          };
        } else if (this.gradient) {
          color = {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: this.color // 0% 处的颜色
              },
              {
                offset: 1,
                color: Color(this.color)
                  .fade(0.5)
                  .toString() // 100% 处的颜色
              }
            ]
          };
        } else {
          color = this.color;
        }

        const innerRing = [
          {
            type: "bar",
            hoverAnimation: false,
            coordinateSystem: "polar",
            roundCap: this.round,
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
            roundCap: this.round,
            barGap: "-100%",
            data: [1],
            itemStyle: {
              color:
                this.bgColor !== "transparent"
                  ? this.bgColor
                  : Color(this.color)
                      .fade(0.8)
                      .toString()
            },
            z: 1
          }
        ];

        if (this.type === "arc") {
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
                    color: Array.isArray(this.gradient)
                      ? this.gradient[0]
                      : this.color
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
      } else if (this.type === "liquid") {
        const step = Number((value / 5).toFixed(1));

        series = [
          {
            type: "liquidFill",
            center: ["50%", "50%"],
            radius: "80%",
            color: [this.color],
            label: {
              formatter: this.formatter || text,
              fontSize: this.labelSize || this.titleFontSize * 1.5,
              color: this.labelColor || this.color,
              lineHeight: this.labelSize * 1.3 || this.titleFontSize * 2
            },
            backgroundStyle: {
              color: this.bgColor
            },
            outline: {
              show: this.outline,
              borderDistance: this.contentFontSize / 3,
              itemStyle: {
                color: "none",
                borderColor: Color(this.color)
                  .darken(0.1)
                  .toString(),
                borderWidth: this.contentFontSize / 3
              }
            },
            data: [value, value - step, value - step * 2]
          }
        ];
      }

      const defaultConfig = {
        backgroundColor: this.chartBgColor,
        ...polarConfig,
        series
      };

      return merge(defaultConfig, this.option);
    }
  }
};
