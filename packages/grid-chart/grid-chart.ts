import useBase from "pkg/compositions/useBase";
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  watch,
  PropType,
  onMounted,
  getCurrentInstance
} from "vue";
import cloneDeep from "lodash/cloneDeep";
import merge from "lodash/merge";
import { EChartOption, EChartTitleOption } from "echarts";
import { wrapWithArray } from "pkg/utils/helper";
import Color from "color";
import useColorSet from "pkg/compositions/useColorSet";

type Gradient =
  | boolean
  | {
      line: boolean;
      bar: boolean;
    };
type GridType = "line" | "bar";
type AxisType = "xAxis" | "yAxis";

interface ExternalApi {
  $startMove: () => void;
  $stopMove: () => void;
}

export default defineComponent({
  name: "gridChart",
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
      type: String as PropType<GridType>
    }, // 'line' | 'bar'
    // 标题
    title: String,
    // 是否将柱状图堆叠
    stack: {
      type: Boolean,
      default: false
    },

    // 是否给柱状图添加圆角 stack !== true 时生效
    round: {
      type: Boolean,
      default: false
    },

    // 是否为光滑曲线
    smooth: {
      type: Boolean,
      default: false
    },

    // 是否渐变色
    // 可以是布尔值同时指定 line 和 bar 是否渐变，
    // 或者通过对象的形式分别指定 {bar: false, line: true}
    gradient: {
      type: [Boolean, Object] as PropType<Gradient>,
      default: false
    },

    // 轴线，字体的颜色
    color: {
      type: String,
      default: "#000"
    },
    // axis label, tooltip text, legend text 字体大小
    labelSize: Number,

    option: {
      type: Object as PropType<EChartOption>,
      default: () => ({})
    },

    watchOption: {
      type: Boolean,
      default: true
    },

    // 同时展示的类目数，当类目总数超过这个值时，类目会滚动显示
    // 不传值时，默认同时展示所有类目
    size: Number,
    // 类目滚动时间间隔，毫秒
    interval: {
      type: Number,
      default: 3000
    },
    // 是否开启自动滚动
    auto: {
      type: Boolean,
      default: true
    }
  },
  emits: ["move"],
  setup(props, { emit }) {
    const { chart, titleFontSize, contentFontSize, renderFn } = useBase(props);

    const labelFontSize = computed(
      () => props.labelSize || contentFontSize.value
    );

    watch(
      () => props.option,
      (val, oldVal) => {
        if (props.watchOption) {
          renderChart(val != oldVal);
        }
      },
      { deep: true }
    );

    let timer: number;
    const ctgMap = new Map();
    let chartOption: EChartOption;
    let categoryAxis: AxisType;
    let categoryAxisConfig: EChartOption.XAxis[] | EChartOption.YAxis[];
    let moveable = false;

    function renderChart(notMerge = false) {
      timer && clearInterval(timer);
      ctgMap.clear();

      chartOption = cloneDeep(props.option);
      chartOption.xAxis = wrapWithArray(chartOption.xAxis);
      chartOption.yAxis = wrapWithArray(chartOption.yAxis);
      chartOption.series = wrapWithArray(chartOption.series);

      if (props.type) {
        chartOption.series.forEach(item => {
          item.type = props.type;
        });
      }

      categoryAxis = chartOption.yAxis.some(y => y.type === "category")
        ? "yAxis"
        : "xAxis";

      categoryAxisConfig =
        categoryAxis === "xAxis" ? chartOption.xAxis : chartOption.yAxis;

      const categoryArr = categoryAxisConfig[0].data || [];

      moveable = !!props.size && props.size < categoryArr.length;
      if (moveable) {
        categoryArr.forEach((ctgName, i) => ctgMap.set(ctgName, i));

        const initData = (item: any) => {
          item.__dataPool = item.data.splice(props.size!);
        };

        chartOption.series.forEach(initData);
        categoryAxisConfig.forEach(initData);

        notMerge = true;
        props.auto && startMove();
      }

      chart.value.setOption(createOption(), notMerge);
    }

    function startMove() {
      if (moveable) timer = setInterval(move, props.interval);
    }

    function stopMove() {
      clearInterval(timer);
    }

    function move() {
      const mvAxis = (item: any, i: number) => {
        const moveIn = item.__dataPool.shift();
        item.data.push(moveIn);
        const moveOut = item.data.shift();
        item.__dataPool.push(moveOut);
        if (i === 0) {
          emit("move", ctgMap.get(moveIn), ctgMap.get(moveOut));
        }
      };

      const mvSeries = (item: any) => {
        item.data.push(item.__dataPool.shift());
        item.__dataPool.push(item.data.shift());
      };

      categoryAxisConfig.forEach(mvAxis);
      chartOption.series!.forEach(mvSeries);
      chart.value.setOption(createOption(), true);
    }

    function createOption() {
      const title = chartOption.title as Exclude<
        typeof chartOption.title,
        EChartTitleOption[]
      >;
      const xAxis = chartOption.xAxis as EChartOption.XAxis[];
      const yAxis = chartOption.yAxis as EChartOption.YAxis[];
      const series = chartOption.series as EChartOption.Series[];

      const showTitle = title
        ? !!title.show && !!(title.text || props.title)
        : !!props.title;

      const defaultConfig = {
        grid: {
          top: "18%",
          right: yAxis.length > 1 ? "5.5%" : "6%",
          bottom: "5%",
          left: "6%",
          containLabel: true
        },

        title: {
          left: "3%",
          top: "5%",
          text: props.title,
          textStyle: {
            fontSize: titleFontSize.value,
            color: props.color
          }
        },

        legend: {
          right: showTitle ? "4%" : "center",
          width: showTitle ? "50%" : "80%",
          top: "5%",
          textStyle: {
            fontSize: labelFontSize.value,
            color: props.color
          },
          itemWidth: labelFontSize.value * 1.5,
          itemHeight: labelFontSize.value,
          itemGap: 12
        },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: props.type === "line" ? "line" : "shadow"
          },
          textStyle: {
            fontSize: labelFontSize.value
          }
        },

        xAxis: xAxis.length
          ? xAxis.map((item, i) => axisConfig("x", i, categoryAxis === "xAxis"))
          : [axisConfig("x", 0)],

        yAxis: yAxis.length
          ? yAxis.map((item, i) => axisConfig("y", i, categoryAxis === "yAxis"))
          : [axisConfig("y", 0)],

        series:
          props.type === "line" || props.type === "bar"
            ? series.map((item, i) => itemConfig(props.type!, i))
            : series.map((item, i) => itemConfig(item.type as GridType, i))
      };

      return merge(defaultConfig, chartOption);
    }

    function axisConfig(
      type: "x" | "y",
      index: number,
      isCategoryAxis?: boolean
    ) {
      const position = {
        x: { first: "bottom", second: "top" },
        y: { first: "left", second: "right" }
      };
      return {
        type: isCategoryAxis ? "category" : "value",
        position: index === 0 ? position[type].first : position[type].second,
        boundaryGap: isCategoryAxis
          ? chartOption.series!.some(item => item.type !== "line")
          : undefined,
        nameTextStyle: {
          color: props.color,
          fontSize: labelFontSize.value
        },
        axisLine: {
          lineStyle: {
            color: Color(props.color)
              .fade(0.5)
              .toString()
          }
        },
        splitLine: {
          show: !isCategoryAxis && index === 0,
          lineStyle: {
            color: Color(props.color)
              .fade(0.95)
              .toString()
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: props.color,
          fontSize: labelFontSize.value,
          margin: type === "x" ? 12 : 8
        }
      };
    }

    const echartsColorSet = useColorSet();

    function itemConfig(type: GridType, index: number) {
      const color = echartsColorSet[index % echartsColorSet.length];
      const gradientColor = {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops:
          type === "line"
            ? [
                {
                  offset: 0,
                  color: Color(color)
                    .fade(0.7)
                    .toString() // 0% 处的颜色
                },
                {
                  offset: 0.6,
                  color: Color(color)
                    .fade(1)
                    .toString() // 100% 处的颜色
                }
              ]
            : [
                {
                  offset: 1,
                  color: color // 0% 处的颜色
                },
                {
                  offset: 0,
                  color: Color(color)
                    .lighten(0.35)
                    .toString() // 100% 处的颜色
                }
              ]
      };

      const lineGradient =
        typeof props.gradient === "boolean"
          ? props.gradient
          : props.gradient.line;
      const barGradient =
        typeof props.gradient === "boolean"
          ? props.gradient
          : props.gradient.bar;

      return type === "line"
        ? {
            type: "line",
            smooth: props.smooth,
            symbol: "circle",
            symbolSize: labelFontSize.value / 1.5,
            itemStyle: {
              color: color
            },
            areaStyle: {
              color: lineGradient ? gradientColor : "transparent"
            }
          }
        : {
            type: "bar",
            stack: props.stack,
            label: {
              show: props.stack,
              position: "inside",
              color: props.color,
              fontSize: labelFontSize.value * 0.8
            },
            itemStyle: {
              color: barGradient ? gradientColor : color,
              barBorderRadius:
                props.round && !props.stack ? [100, 100, 0, 0] : 0
            }
          };
    }

    onMounted(() => {
      renderChart();
    });

    onBeforeUnmount(() => {
      timer && clearInterval(timer);
    });

    const instance = getCurrentInstance() as ReturnType<
      typeof getCurrentInstance
    > &
      ExternalApi;
    instance!.$startMove = startMove;
    instance!.$stopMove = stopMove;

    return renderFn;
  }
});
