import {
  computed,
  defineComponent,
  watch,
  PropType,
  onMounted
} from "vue";
import { cloneDeep, merge } from "lodash-es"
import { EChartsOption, PieSeriesOption } from 'echarts'
import { wrapWithArray } from "../utils/helper"
import { baseProps, useChart } from '../base'

export default defineComponent({
  name: 'PieChart',
  props: {
    ...baseProps,
    type: {
      type: String as PropType<'pie' | 'angle' | 'ring' | 'angle-ring'>,
      default: 'pie'
    },
    // 标题
    title: String,
    // 是否显示legend
    showLegend: {
      type: Boolean,
      default: false
    },
    // 是否显示border
    bordered: {
      type: Boolean,
      default: false
    },
    borderColor: {
      type: String,
      default: '#fff'
    },
    borderRadius: {
      type: Number,
      default: 8
    },
    // https://echarts.apache.org/zh/option.html#series-pie.label.formatter
    labelFormatter: {
      type: [String, Function] as PropType<string | ((params: any) => string)>,
      default: '{b}'
    },
    // 是否隐藏label
    hideLabel: {
      type: Boolean,
      default: false
    },
    radius: {
      type: [Number, String, Array] as PropType<string | number | (string | number)[]>,
      default: () => ['40%', '60%']
    },
    // PieSeriesOption
    series: {
      type: [Object, Array] as PropType<PieSeriesOption | PieSeriesOption[]>,
      default: () => []
    }
  },
  setup(props) {
    const baseOption = computed<EChartsOption>(() => {
      const isRing = props.type === 'ring' || props.type === 'angle-ring'
      const isAngle = props.type === 'angle' || props.type === 'angle-ring'
      const isAngleRing = props.type === 'angle-ring'
      return {
        title: {
          text: props.title,
          textStyle: { color: props.textColor }
        },
        legend: { show: props.showLegend, textStyle: { color: props.textColor } },
        tooltip: {
          trigger: 'item'
        },
        series: wrapWithArray(props.series)
          .map((item) => merge({
            type: 'pie',
            roseType: isAngleRing ? 'area' : (isAngle ? 'radius' : false),
            center: ['50%', '50%'],
            radius: isRing 
              ? props.radius
              : Array.isArray(props.radius)
                ? props.radius[1]
                : props.radius,
            itemStyle: props.bordered ? {
              borderRadius: props.type !== 'pie' && props.borderRadius,
              borderWidth: 2,
              borderColor: props.borderColor
            } : undefined,
            label: {
              show: !props.hideLabel,
              position: props.hideLabel ? 'center' : 'outside',
              color: props.textColor,
              formatter: props.labelFormatter
            },
            emphasis: props.hideLabel ? {
              label: {
                show: true,
                fontSize: 30,
                fontWeight: 'bold'
              }
            } : undefined

          }, item))
      }
    })

    const { chart, render } = useChart(props)
    onMounted(() => renderChart())
    watch(baseOption, renderChart)
    function renderChart() {
      const propOption = cloneDeep(props.option)
      propOption.series = wrapWithArray(propOption.series)
      chart.value && chart.value.setOption(merge(baseOption.value, propOption), true)
    }
    return render
  }
})