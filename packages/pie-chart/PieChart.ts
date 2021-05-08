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
      type: String as PropType<'pie' | 'angle' | 'ring' | 'angleRing'>,
      default: 'pie'
    },
    // 标题
    title: String,
    // 是否显示border
    bordered: {
      type: Boolean,
      default: false
    },
    // 是否隐藏label
    hideLabel: {
      type: Boolean,
      default: false
    },
    // PieSeriesOption
    series: {
      type: [Object, Array] as PropType<PieSeriesOption | PieSeriesOption[]>,
      default: () => []
    }
  },
  setup(props) {
    const baseOption = computed<EChartsOption>(() => {
      const isRing = props.type === 'ring' || props.type === 'angleRing'
      const isAngle = props.type === 'angle' || props.type === 'angleRing'
      const isAngleRing = props.type === 'angleRing'
      return {
        title: {
          text: props.title
        },
        legend: { show: true },
        tooltip: {
          trigger: 'item'
        },
        series: wrapWithArray(props.series)
          .map((item) => merge({
            type: 'pie',
            roseType: isAngleRing ? 'area' : (isAngle ? 'radius' : false),
            center: ['50%', '50%'],
            radius: isRing ? ['40%', '70%'] : isAngle ? '60%' : '55%',
            itemStyle: props.bordered ? {
              borderRadius: props.type !== 'pie' ? 8 : 0,
              borderWidth: 2,
              borderColor: 'white'
            } : undefined,
            label: {
              show: !props.hideLabel,
              position: props.hideLabel ? 'center' : 'outside'
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