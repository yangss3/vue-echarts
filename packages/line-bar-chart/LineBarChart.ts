import {
  computed,
  defineComponent,
  watch,
  PropType,
  onMounted,
} from "vue";
import { cloneDeep, merge } from "lodash-es";
import { EChartsOption, LineSeriesOption, BarSeriesOption } from 'echarts'
import { wrapWithArray } from "../utils/helper"
import { baseProps, useChart } from '../base'

type SeriesOption = LineSeriesOption | BarSeriesOption

export default defineComponent({
  name: 'LineBarChart',
  props: {
    ...baseProps,
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
    // 是否显示toolbox
    showToolbox: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {

    const baseOption = computed<EChartsOption>(() => {
      const isBar = props.type === 'bar'

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

    const { chart, render } = useChart(props)
    onMounted(() => renderChart())
    watch(baseOption, renderChart)
    function renderChart() {
      const propOption = cloneDeep(props.option)
      propOption.yAxis = wrapWithArray(propOption.yAxis)
      propOption.series = wrapWithArray(propOption.series)
      chart.value && chart.value.setOption(merge(baseOption.value, propOption), true)
    }
    return render
  }
})