import * as echarts from 'echarts'
import { ECharts, EChartsOption } from 'echarts'
import { h, inject, nextTick, onBeforeUnmount, onMounted, PropType, ref, Ref, shallowRef } from 'vue'

export const baseProps = {
  height: {
    type: [String, Number] as PropType<string | number>,
    default: '100%'
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '100%'
  },
  adaptive: {
    type: Boolean,
    default: true
  },
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light'
  },
  // 全局文本字体颜色
  textColor: {
    type: String,
    default: '#333'
  },
  // ECharts 标准配置对象
  option: {
    type: Object as PropType<EChartsOption>,
    default: () => ({})
  },
  // chart的id，唯一，当需要在父组件中获取当前组件的 echart 实例对象时，请设置这个属性
  chartId: {
    type: String
  }
}

export function useChart (props: any) {
  const el = ref<HTMLDivElement>()
  const chart = shallowRef<ECharts>()
  const contentWidth = ref(0)
  const color = inject('vue_echarts__color') as string[] | undefined
  const injectChart = props.chartId ? inject(`vue_echarts__${props.chartId}`, null) as Ref<any> | null : undefined

  const computeWidth = () => {
    const width = chart.value?.getWidth() as number
    const grid = chart.value?.getOption().grid as any
    if (grid) {
      const { left, right } = grid[0]
      const leftWidth = typeof left === 'string'
        ? width * Number.parseFloat(left) / 100
        : left
      const rightWidth = typeof right === 'string'
        ? width * Number.parseFloat(right) / 100
        : right
      contentWidth.value = width - leftWidth - rightWidth
    }
  }

  const resize = () => {
    chart.value && chart.value.resize()
    computeWidth()
  }
  onMounted(async () => {
    chart.value = echarts.init(el.value!, props.theme)
    if (injectChart) {
      injectChart.value = chart.value
    }
    props.adaptive && window.addEventListener('resize', resize)
    await nextTick()
    computeWidth()
  })
  onBeforeUnmount(() => {
    props.adaptive && window.removeEventListener('resize', resize)
  })

  return {
    el,
    chart,
    color,
    contentWidth,
    render: () => h(
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
}
