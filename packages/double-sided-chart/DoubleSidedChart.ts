import {
  computed,
  defineComponent,
  watch,
  PropType,
  onMounted
} from 'vue'
import { merge } from 'lodash-es'
import { EChartsOption, BarSeriesOption } from 'echarts'
import { baseProps, useChart } from '../base'

export default defineComponent({
  name: 'DoubleSidedChart',
  props: {
    ...baseProps,
    // 标题
    title: String,
    // y轴(类目轴)数据
    category: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    // BarSeriesOption 配置对象
    series: {
      type: Array as PropType<BarSeriesOption[]>,
      default: () => []
    },
    // 左右两边柱条的颜色[leftColor, rightColor]
    colors: {
      type: Array as PropType<string[]>
    },
    // 是否给柱状图添加圆角 stack !== true 时生效
    rounded: {
      type: Boolean,
      default: false
    },
    // 是否显示背景条
    background: {
      type: [Boolean, String] as PropType<boolean | string>,
      default: false
    },
    // bar的宽度
    barWidth: {
      type: Number,
      default: 18
    },
    /*
      width: '40%',
      top: '10%',
      bottom: '10%',
      labelLeft: '51%'
    */
    grid: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const baseOption = computed(() => {
      const grid = merge({
        width: '40%',
        top: '10%',
        bottom: '10%',
        labelLeft: '51%'
      }, props.grid)
      return {
        title: {
          text: props.title,
          textStyle: { color: props.textColor }
        },
        legend: { show: true, textStyle: { color: props.textColor } },
        tooltip: {
          trigger: 'axis'
        },
        grid: [
          {
            width: grid.width,
            left: '6%',
            top: grid.top,
            bottom: grid.bottom
          },
          {
            width: 0,
            left: grid.labelLeft,
            top: grid.top,
            bottom: grid.bottom
          },
          {
            width: grid.width,
            right: '6%',
            top: grid.top,
            bottom: grid.bottom
          }
        ],
        xAxis: [
          { gridIndex: 0, show: false, inverse: true },
          { gridIndex: 1, show: false },
          { gridIndex: 2, show: false }
        ],
        yAxis: [
          { gridIndex: 0, type: 'category', show: false },
          {
            gridIndex: 1,
            type: 'category',
            axisLine: { show: false },
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: props.textColor },
            data: props.category
              .map(value => ({
                value,
                textStyle: { align: 'center' }
              }))
              .reverse()
          },
          { gridIndex: 2, type: 'category', show: false }
        ],
        series: props.series
          .reduce((prev, cur, i) => {
            prev.push(merge({
              type: 'bar',
              xAxisIndex: i === 0 ? 0 : 2,
              yAxisIndex: i === 0 ? 0 : 2,
              barWidth: props.barWidth,
              z: 2,
              label: {
                show: !props.background,
                position: i === 0 ? 'left' : 'right',
                color: props.textColor
              },
              itemStyle: {
                borderRadius: props.rounded ? 50 : 0,
                color: Array.isArray(props.colors) ? props.colors[i] : undefined
              }
            }, { ...cur, data: cur.data?.reverse() }))
            if (props.background) {
              prev.push({
                type: 'bar',
                xAxisIndex: i === 0 ? 0 : 2,
                yAxisIndex: i === 0 ? 0 : 2,
                barWidth: props.barWidth,
                barGap: '-100%',
                z: -1,
                label: {
                  show: true,
                  position: i === 0 ? 'left' : 'right',
                  formatter: ({ dataIndex }: { dataIndex: number }) =>
                    cur.data![dataIndex],
                  color: props.textColor
                },
                itemStyle: {
                  color: props.background === true
                    ? 'rgba(0, 0, 0, 0.1)'
                    : props.background,
                  borderRadius: props.rounded ? 50 : 0
                },
                data: Array(cur.data!.length).fill(Math.max(...cur.data as number[]) * 1.06)
              })
            }
            return prev
          }, [] as any)
      } as EChartsOption
    })

    const { chart, render } = useChart(props)
    onMounted(() => renderChart())
    watch(baseOption, renderChart)
    function renderChart () {
      chart.value && chart.value.setOption(baseOption.value, true)
    }
    return render
  }
})
