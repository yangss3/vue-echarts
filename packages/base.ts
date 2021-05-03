import * as echarts from 'echarts'
import { ECharts, EChartsOption } from 'echarts';
import { h, onBeforeUnmount, onMounted, PropType, ref, shallowRef } from 'vue';

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
  // ECharts 标准配置对象
  option: {
    type: Object as PropType<EChartsOption>,
    default: () => ({})
  }
}

export function useChart(props: any) {
  const el = ref<HTMLDivElement>()
  const chart = shallowRef<ECharts>()
  const resize = () => chart.value.resize()
  onMounted(() => {
    chart.value = echarts.init(el.value)
    props.adaptive && window.addEventListener("resize", resize)
  })
  onBeforeUnmount(() => {
    props.adaptive && window.removeEventListener("resize", resize)
  })

  return {
    el,
    chart,
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