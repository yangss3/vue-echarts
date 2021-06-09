import {
  computed,
  defineComponent,
  watch,
  PropType,
  onMounted
} from 'vue'
import { cloneDeep, merge } from 'lodash-es'
import { EChartsOption, LineSeriesOption, BarSeriesOption } from 'echarts'
import { wrapWithArray } from '../utils/helper'
import { baseProps, useChart } from '../base'

type SeriesOption = LineSeriesOption | BarSeriesOption

export default defineComponent({
  name: 'LineBarChart',
  props: {
    ...baseProps,
    // 类型
    type: {
      type: String as PropType<'line' | 'vertical-bar' | 'horizontal-bar'>
    },
    // 标题
    title: String,
    // 类目轴数据
    category: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    // 数值轴名字
    valueAxisName: String,
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
    // type !== 'line'
    rounded: {
      type: Boolean,
      default: false
    },
    // 是否为光滑曲线
    // type === 'line'
    smooth: {
      type: [Boolean, Number] as PropType<boolean | number>,
      default: false
    },
    // 是否显示toolbox
    // type !== 'horizontal-bar'
    showToolbox: {
      type: Boolean,
      default: false
    },
    // bar 的宽度
    barWidth: {
      type: [Number, String] as PropType<number | string>
    },
    // 是否显示label
    showLabel: {
      type: Boolean,
      default: false
    },
    // 是否显示背景条
    // type === 'horizontal-bar'
    showBackground: {
      type: Boolean,
      default: false
    },
    // 显示background时，类目label距离包装容器顶部的距离
    // type === 'horizontal-bar'
    labelTop: {
      type: [String, Number] as PropType<string | number>,
      default: '25%'
    }
  },
  setup (props) {
    const { chart, render, contentWidth } = useChart(props)
    const baseOption = computed<EChartsOption>(() => {
      const seriesArray = wrapWithArray(props.series)
      const hasBar = seriesArray.some(s => s.type === 'bar') || props.type === 'vertical-bar' || props.type === 'horizontal-bar'
      const isHorizontal = props.type === 'horizontal-bar'
      const xAxisNum = Array.isArray(props.option.xAxis)
        ? props.option.xAxis.length
        : 1
      const yAxisNum = Array.isArray(props.option.yAxis)
        ? props.option.yAxis.length
        : 1

      return {
        title: {
          text: props.title,
          textStyle: { color: props.textColor }
        },
        legend: { show: true, textStyle: { color: props.textColor } },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: props.showToolbox && !isHorizontal,
          feature: {
            dataZoom: {},
            magicType: { type: ['line', 'bar', 'stack'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: isHorizontal
          ? [{
              show: !props.showLabel,
              type: 'value',
              name: props.valueAxisName,
              nameTextStyle: { color: props.textColor },
              axisLabel: { color: props.textColor }
            }]
          : xAxisNum === 1
            ? [{
                type: 'category',
                boundaryGap: hasBar,
                data: props.category,
                nameTextStyle: { color: props.textColor },
                axisLabel: { color: props.textColor }
              }]
            : [
                {
                  type: 'category',
                  boundaryGap: hasBar,
                  data: props.category,
                  nameTextStyle: { color: props.textColor },
                  axisLabel: { color: props.textColor }
                },
                {
                  nameTextStyle: { color: props.textColor },
                  axisLabel: { color: props.textColor }
                }
              ],
        yAxis: isHorizontal
          ? [{
              type: 'category',
              data: [...props.category].reverse(),
              nameTextStyle: { color: props.textColor },
              axisLabel: { color: props.textColor }
            }]
          : yAxisNum === 1
            ? [{
                type: 'value',
                name: props.valueAxisName,
                nameTextStyle: { color: props.textColor },
                axisLabel: { color: props.textColor }
              }]
            : [
                {
                  type: 'value',
                  name: props.valueAxisName,
                  nameTextStyle: { color: props.textColor },
                  axisLabel: { color: props.textColor }
                },
                {
                  nameTextStyle: { color: props.textColor },
                  axisLabel: { color: props.textColor }
                }
              ],
        series: seriesArray
          .map((item) => {
            const isBar = item.type === 'bar' || props.type === 'vertical-bar' || props.type === 'horizontal-bar'
            return merge({
              type: isBar ? 'bar' : 'line',
              stack: props.stack ? 'stack' : undefined,
              label: {
                show: props.showLabel,
                color: props.textColor,
                position: props.stack
                  ? 'inside'
                  : isHorizontal
                    ? props.showBackground
                      ? [contentWidth.value + 5, props.labelTop]
                      : 'right'
                    : 'top'
              },
              barWidth: props.barWidth,
              smooth: props.smooth && !isBar ? props.smooth : undefined,
              itemStyle: {
                borderRadius: isBar && !props.stack && props.rounded
                  ? isHorizontal
                    ? [0, 100, 100, 0]
                    : [100, 100, 0, 0]
                  : 0
              },
              showBackground: isHorizontal && props.showBackground,
              backgroundStyle: {
                borderRadius: !props.stack && props.rounded ? [0, 100, 100, 0] : 0
              }
            }, {
              ...item,
              data: (isHorizontal ? cloneDeep(item.data)?.reverse() : item.data) as any
            })
          })
      }
    })

    onMounted(() => renderChart())
    watch(baseOption, renderChart)
    function renderChart () {
      const propOption = cloneDeep(props.option)
      propOption.xAxis = wrapWithArray(propOption.xAxis)
      propOption.yAxis = wrapWithArray(propOption.yAxis)
      propOption.series = wrapWithArray(propOption.series)
      chart.value && chart.value.setOption(merge(baseOption.value, propOption), true)
    }
    return render
  }
})
