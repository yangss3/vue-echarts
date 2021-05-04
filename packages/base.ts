import * as echarts from 'echarts'
import { ECharts, EChartsOption } from 'echarts';
import { h, nextTick, onBeforeUnmount, onMounted, PropType, ref, shallowRef } from 'vue';

export const baseProps = {
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
    type: String as PropType<'light' | 'dark'>,
    default: 'light'
  },
  // ECharts 标准配置对象
  option: {
    type: Object as PropType<EChartsOption>,
    default: () => ({})
  }
}

export function useChart(props: any) {
  const el = ref<HTMLDivElement>()
  const chart = shallowRef<ECharts>()
  const contentWidth = ref(0)

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
        : left
      contentWidth.value = width - leftWidth - rightWidth
    }
  }

  const resize = () => {
    chart.value && chart.value.resize()
    computeWidth()
  }
  onMounted(async () => {
    chart.value = echarts.init(el.value!, props.theme)
    props.adaptive && window.addEventListener("resize", resize)
    await nextTick()
    computeWidth()
  })
  onBeforeUnmount(() => {
    props.adaptive && window.removeEventListener("resize", resize)
  })

  return {
    el,
    chart,
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