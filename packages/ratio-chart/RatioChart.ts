import {
  computed,
  defineComponent,
  watch,
  PropType,
  onMounted
} from "vue";
import 'echarts-liquidfill'
import { merge } from "lodash-es"
// import { EChartsOption } from 'echarts'
import { multiply } from "../utils/helper"
import { baseProps, useChart } from '../base'
import Color from 'color'

interface TextStyle {
  labelSize?: number
  labelOffset?: number | string
  valueSize?: number
  valueOffset?: number | string
  color?: string
}

export default defineComponent({
  name: 'RatioChart',
  props: {
    ...baseProps,
    type: {
      type: String as PropType<'ring' | 'gauge' | 'liquid'>,
      default: 'ring'
    },
    // 标题
    title: String,
    radius: {
      type: [String, Number] as PropType<'string' | 'number'>,
      default: '75%'
    },
    value: {
      type: Number,
      default: 0
    },
    // 最大值 type === 'ring' | 'gauge'
    max: {
      type: Number,
      default: 1,
    },
    /** 文本的样式 type === 'ring' | 'gauge'
    * {
    *   valueSize?: 30,
    *   labelSize?: 18,
    *   labelOffset?: number | string
    *   valueOffset?: number | string
    *   color?: props.color
    * }
    */
    textStyle: {
      type: Object as PropType<TextStyle>,
      default: () => ({})
    },
    // item的宽度 type === 'ring' | 'gauge'
    itemWidth: {
      type: Number,
      default: 20,
    },
    // item的颜色
    color: String,
    // 背景色
    bgColor: String,
    // item是否显示阴影 type === 'ring' | 'gauge'
    shadow: {
      type: Boolean,
      default: false
    },
    gradient: {
      type: Array as PropType<string[]>
    },
    // liquidFill 配置对象
    // https://github.com/ecomfe/echarts-liquidfill#readme
    liquid: {
      type: Object,
      default: () => ({})
    },
    // gauge 配置对象
    // https://echarts.apache.org/zh/option.html#series-gauge.type
    gauge: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const baseOption = computed(() => {
      const textStyle = merge({
        valueSize: 30,
        labelSize: 18,
        valueOffset: props.type === 'ring' ? 16 : '60%',
        labelOffset: props.type === 'ring' ? -16 : '80%',
        color: props.color
      }, props.textStyle)
      return {
        series: [
          // https://github.com/ecomfe/echarts-liquidfill#readme
          props.type === 'liquid'
          ? merge({
            type: 'liquidFill',
            name: props.title,
            radius: props.radius,
            color: [props.color],
            data: [
              props.value,
              props.value - props.value / 5,
              props.value - props.value * 2 / 5
            ],
            outline: {
              itemStyle: {
                borderColor: props.color
              }
            },
            label: {
              color: props.color,
              formatter: props.title
                ? (p: any) => `${p.seriesName}\n${multiply(p.value, 100)}%`
                : undefined
            },
            backgroundStyle: {
              color: props.bgColor || '#E3F7FF'
            }
          }, props.liquid)
          // https://echarts.apache.org/zh/option.html#series-gauge.type
          : props.type === 'gauge'
            ? merge({
              type: 'gauge',
              radius: props.radius,
              max: props.max,
              pointer: {
                itemStyle: {
                  color: props.color
                }
              },
              anchor: {
                show: true,
                showAbove: true,
                size: props.itemWidth + 2,
                itemStyle: {
                    borderWidth: props.itemWidth / 2,
                    borderColor: props.color
                }
              },
              axisLabel: {
                distance: props.itemWidth + 8,
                color: textStyle.color,
                fontSize: textStyle.labelSize
              },
              splitLine: {
                length: props.itemWidth / 2,
                distance: props.itemWidth / 2,
                lineStyle: {
                  width: 2,
                  color: textStyle.color
                }
              },
              axisTick: { show: false },
              axisLine: {
                roundCap: true,
                lineStyle: {
                  width: props.itemWidth,
                  color: [
                    [
                      1,
                      props.bgColor
                        ? props.bgColor
                        : props.color
                          ? Color(props.color).alpha(0.15).toString()
                          : '#E6EBF8'
                    ]
                  ]
                }
              },
              progress: {
                show: true,
                roundCap: true,
                width: props.itemWidth,
                itemStyle: {
                  color: props.gradient && props.gradient.length === 2
                    ? {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x1: 0,
                      y1: 1,
                      colorStops: [
                        { offset: 0, color: props.gradient[0] },
                        { offset: 1, color: props.gradient[1] }
                      ]
                    }
                    : props.color,
                  shadowColor: Color(props.color).alpha(0.8).toString(),
                  shadowBlur: props.shadow ? 10 : 0
                },
              },
              data: [{ value: props.value, name: props.title }],
              title: {
                show: !!props.title,
                fontSize: textStyle.labelSize,
                color: textStyle.color,
                offsetCenter: [0, textStyle.labelOffset]
              },
              detail: {
                valueAnimation: true,
                offsetCenter: [0, textStyle.valueOffset],
                fontSize: textStyle.valueSize,
                color: textStyle.color,
              }
            }, props.gauge)
            // props.type === 'ring'
            : {
              type: 'gauge',
              radius: props.radius,
              startAngle: 90,
              endAngle: -270,
              max: props.max,
              pointer: { show: false },
              axisLabel: { show: false},
              splitLine: { show: false },
              axisTick: { show: false },
              axisLine: {
                lineStyle: {
                  width: props.itemWidth,
                  color: [
                    [
                      1,
                      props.bgColor
                        ? props.bgColor
                        : props.color
                          ? Color(props.color).alpha(0.15).toString()
                          : '#E6EBF8'
                    ]
                  ]
                }
              },
              progress: {
                show: true,
                roundCap: true,
                width: props.itemWidth,
                itemStyle: {
                  color: props.gradient && props.gradient.length === 2
                    ? {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x1: 0,
                      y1: 1,
                      colorStops: [
                        { offset: 0, color: props.gradient[0] },
                        { offset: 1, color: props.gradient[1] }
                      ]
                    }
                    : props.color,
                  shadowColor: Color(props.color).alpha(0.8).toString(),
                  shadowBlur: props.shadow ? 10 : 0
                },
              },
              data: [{ value: props.value, name: props.title }],
              title: {
                show: !!props.title,
                fontSize: textStyle.labelSize,
                color: textStyle.color,
                offsetCenter: [0, textStyle.labelOffset]
              },
              detail: {
                valueAnimation: true,
                offsetCenter: props.title ? [0, textStyle.valueOffset] : [0, 0],
                fontSize: textStyle.valueSize,
                color: textStyle.color,
              }
            }
        ]
      }
    })

    const { chart, render } = useChart(props)
    onMounted(() => renderChart())
    watch(baseOption, renderChart)
    function renderChart() {
      chart.value && chart.value.setOption(baseOption.value, true)
    }
    return render
  }
})