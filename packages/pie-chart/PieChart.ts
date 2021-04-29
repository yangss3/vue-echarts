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
import { ECharts, EChartsOption, PieSeriesOption } from 'echarts'
import { wrapWithArray } from "../utils/helper"


export default defineComponent({
  name: 'PieChart',
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
    type: {
      type: String as PropType<'pie' | 'angle' | 'ring' | 'angleRing'>,
      default: 'pie'
    },
    bordered: {
      type: Boolean,
      default: false
    },

    // 标题
    title: String,
    hideLabel: {
      type: Boolean,
      default: false
    },
    // PieSeriesOption
    series: {
      type: [Object, Array] as PropType<PieSeriesOption | PieSeriesOption[]>,
      default: () => []
    },

    // ECharts 标准配置对象
    option: {
      type: Object as PropType<EChartsOption>,
      default: () => ({})
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

    const el = ref<HTMLDivElement>()
    let chart: ECharts
    const resize = () => chart.resize()
    onMounted(() => {
      chart = echarts.init(el.value)
      props.adaptive && window.addEventListener("resize", resize)
      renderChart()
    })
    onBeforeUnmount(() => {
      props.adaptive && window.removeEventListener("resize", resize)
    })
    watch(baseOption, renderChart)

    function renderChart() {
      const propOption = cloneDeep(props.option)
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