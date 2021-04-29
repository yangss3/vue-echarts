import {
  computed,
  defineComponent,
  onBeforeUnmount,
  watch,
  PropType,
  onMounted,
  ref,
  h
} from "vue";
import { cloneDeep, merge } from "lodash-es";
import * as echarts from 'echarts'
import { ECharts, EChartsOption, LineSeriesOption, BarSeriesOption } from 'echarts'
import { wrapWithArray } from "../utils/helper"

type SeriesOption = LineSeriesOption | BarSeriesOption

export default defineComponent({
  name: 'LineBarChart',
  props: {
    height: {
      type: [String, Number] as PropType<string | number>,
      default: "100%"
    },
    width: {
      type: [String, Number] as PropType<string | number>,
      default: "100%"
    },
    adaptive: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String as PropType<'dark' | 'light'>,
      default: 'light'
    },
    type: {
      type: String as PropType<"line" | "bar">,
      default: 'line'
    },
    // 标题
    title: String,
    // x轴数据
    xAxisData: {
      type: Array as PropType<number[]>,
      default: () => []
    },
    // y轴名字
    yAxisName: String,
    // 系列数据，接受标准的lineSeries和barSeries配置
    series: {
      type: [Object, Array] as PropType<SeriesOption | SeriesOption[]>,
      default: () => []
    },
    // 是否堆叠显示
    stack: {
      type: Boolean,
      default: false
    },
    // 是否给柱状图添加圆角 stack !== true 时生效
    rounded: {
      type: Boolean,
      default: false
    },
    // 是否为光滑曲线
    smooth: {
      type: [Boolean, Number] as PropType<boolean | number>,
      default: false
    },
    // gradient: {
    //   type: [Boolean, Object] as PropType<boolean | { line: boolean; bar: boolean }>,
    //   default: false
    // },
    // 是否显示toolbox
    showToolbox: {
      type: Boolean,
      default: false
    },
    // ECharts 标准配置对象
    option: {
      type: Object as PropType<EChartsOption>,
      default: () => ({})
    }
  },
  setup(props) {

    const baseOption = computed<EChartsOption>(() => {
      const isBar = props.type === 'bar'
      // const barGradient = props.gradient && (props.gradient === true || props.gradient.bar === true)
      // const lineGradient = props.gradient && (props.gradient === true || props.gradient.line === true)

      return {
        title: {
          text: props.title
        },
        legend: { show: true },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: props.showToolbox,
          feature: {
            dataZoom: {},
            magicType: {type: ['line', 'bar', 'stack']},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: isBar,
          data: props.xAxisData,
        },
        yAxis: [{
          type: 'value',
          name: props.yAxisName
        }],
        series: wrapWithArray(props.series)
          .map((item) => merge({
            type: props.type,
            stack: props.stack ? 'stack': undefined,
            smooth: props.smooth && !isBar ? props.smooth : undefined,
            itemStyle: (isBar && !props.stack)
              ? { borderRadius: props.rounded ? [100,100,0,0] : 0 }
              : undefined
          }, item))
      }
    })

    const el = ref<HTMLDivElement>()
    let chart: ECharts
    const resize = () => chart.resize()
    onMounted(() => {
      chart = echarts.init(el.value, props.theme)
      props.adaptive && window.addEventListener("resize", resize)
      renderChart()

    })
    onBeforeUnmount(() => {
      props.adaptive && window.removeEventListener("resize", resize)
    })
    watch(baseOption, renderChart)

    function renderChart() {
      const propOption = cloneDeep(props.option)
      propOption.yAxis = wrapWithArray(propOption.yAxis)
      propOption.series = wrapWithArray(propOption.series)
      chart && chart.setOption(merge(baseOption.value, propOption), true)
    }

    return () => h(
      'div',
      {
        ref: el,
        style: {
          width: typeof props.width === 'number'
            ? `${props.width}px`
            : props.width,
          height: typeof props.height === 'number'
            ? `${props.height}px`
            : props.height
        }
      }
    )
  }
})