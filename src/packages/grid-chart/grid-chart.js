import chartMixin from '@/utils/mixins/chartMixin'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import Color from 'color'
import { wrapWithArray } from '@/utils/helper'

export default {
  name: 'gridChart',
  mixins: [chartMixin],
  props: {
    type: String, // 'line' | 'bar' | undefined
    // 标题
    title: String,
    // 是否将柱状图堆叠
    stack: {
      type: Boolean,
      default: false
    },

    // 是否给柱状图添加圆角 stack !== true 时生效
    round: {
      type: Boolean,
      default: false
    },

    // 是否为光滑曲线
    smooth: {
      type: Boolean,
      default: false
    },

    // 是否渐变色
    // 可以是布尔值同时指定 line 和 bar 是否渐变，
    // 或者通过对象的形式分别指定 {bar: false, line: true}
    gradient: {
      type: [Boolean, Object],
      default: false
    },

    // 轴线，字体的颜色
    color: {
      type: String,
      default: '#000'
    },
    // axis label, tooltip text, legend text 字体大小
    labelSize: Number,

    option: {
      type: Object,
      default: () => ({})
    },

    size: Number,
    interval: Number,
    auto: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      ctgQueue: [],
      ctgPool: [],
      timer: null
    }
  },

  computed: {
    labelFontSize() {
      return this.labelSize || this.contentFontSize
    },
    categoryAxis() {
      const yAxis = this.option.yAxis
      return (Array.isArray(yAxis) &&
        yAxis.some(item => item.name === 'category')) ||
        (yAxis && yAxis.name === 'category')
        ? 'y'
        : 'x'
    }
  },

  watch: {
    option: {
      handler(val, oldVal) {
        this.renderChart(val != oldVal)
      },
      deep: true
    }
  },

  methods: {
    renderChart(noMerge) {
      const chartOption = cloneDeep(this.option)
      chartOption.xAxis = wrapWithArray(chartOption.xAxis)
      chartOption.yAxis = wrapWithArray(chartOption.yAxis)
      chartOption.series = wrapWithArray(chartOption.series)

      const format = (data, size) =>
        data.map(item => ({
          ...item,
          data: item.data.slice(0, size),
          __dataPool: item.data.slice(size)
        }))

      if (this.size) {
        const ctgLen = chartOption.series[0].data.legend
        if (ctgLen > this.size) {
          this.chart.setOption(
            this.createOption({
              ...chartOption,
              xAxis:
                this.categoryAxis === 'x'
                  ? format(chartOption.xAxis)
                  : chartOption.xAxis,
              yAxis:
                this.categoryAxis === 'y'
                  ? format(chartOption.yAxis)
                  : chartOption.yAxis,
              series: format(chartOption.series)
            }),
            true
          )
          if (this.auto) this.timer = setInterval(this.startMove, this.interval)
        } else {
          this.chart.setOption(this.createOption(chartOption), noMerge)
        }
      } else {
        this.chart.setOption(this.createOption(chartOption), noMerge)
      }
    },

    startMove() {},

    stopMove() {},

    createOption(option) {
      const { title, xAxis, yAxis, series } = option

      const twoAxis = Array.isArray(yAxis) && yAxis.length > 1
      const showTitle =
        (this.title && (!title || title.show !== false)) ||
        (title && title.show !== false)
      // const categoryAxis =
      //   (Array.isArray(yAxis) && yAxis.some(item => item.name === 'category')) ||
      //     yAxis.name === 'category'
      //     ? 'y'
      //     : 'x'

      const defaultConfig = {
        title: {
          left: '3%',
          top: '5%',
          text: this.title,
          textStyle: {
            fontSize: this.titleFontSize,
            color: this.color
          }
        },

        grid: {
          top: '20%',
          right: twoAxis ? '5.5%' : '6%',
          bottom: '5%',
          left: '6%',
          containLabel: true
        },

        legend: {
          right: showTitle ? '4%' : 'center',
          width: showTitle ? '50%' : '80%',
          top: '5%',
          textStyle: {
            fontSize: this.labelFontSize,
            color: this.color
          },
          itemWidth: this.labelFontSize * 1.5,
          itemHeight: this.labelFontSize,
          itemGap: 12
        },

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: this.type === 'line' ? 'line' : 'shadow'
          },
          textStyle: {
            fontSize: this.labelFontSize
          }
        },

        xAxis: xAxis.length
          ? xAxis.map((item, i) =>
              this.axisConfig('x', i, this.categoryAxis === 'x')
            )
          : [this.axisConfig('x', 0)],

        yAxis: yAxis.length
          ? yAxis.map((item, i) =>
              this.axisConfig('y', i, this.categoryAxis === 'y')
            )
          : [this.axisConfig('y', 0)],

        series: ['line', 'bar'].includes(this.type)
          ? series.map((item, i) => this.itemConfig(this.type, i))
          : series.map((item, i) => this.itemConfig(item.type, i))
      }

      return merge(defaultConfig, option)
    },

    axisConfig(type, index, isCategoryAxis) {
      const position = {
        x: { first: 'bottom', second: 'top' },
        y: { first: 'left', second: 'right' }
      }
      return {
        type: isCategoryAxis ? 'category' : 'value',
        position: index === 0 ? position[type].first : position[type].second,
        boundaryGap: isCategoryAxis ? this.type !== 'line' : undefined,
        nameTextStyle: {
          color: this.color,
          fontSize: this.labelFontSize
        },
        axisLine: {
          lineStyle: {
            color: Color(this.color)
              .fade(0.5)
              .toString()
          }
        },
        splitLine: {
          show: !isCategoryAxis && index === 0,
          lineStyle: {
            color: Color(this.color)
              .fade(0.95)
              .toString()
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: this.color,
          fontSize: this.labelFontSize,
          margin: type === 'x' ? 12 : 8
        }
      }
    },

    itemConfig(type, index) {
      const color = this.$echartsColorSet[index % this.$echartsColorSet.length]
      const gradientColor = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops:
          type === 'line'
            ? [
                {
                  offset: 0,
                  color: Color(color)
                    .fade(0.5)
                    .toString() // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: Color(color)
                    .fade(1)
                    .toString() // 100% 处的颜色
                }
              ]
            : [
                {
                  offset: 1,
                  color: color // 0% 处的颜色
                },
                {
                  offset: 0,
                  color: Color(color)
                    .lighten(0.5)
                    .toString() // 100% 处的颜色
                }
              ]
      }

      const lineGradient = this.gradient === true || this.gradient.line === true
      const barGradient = this.gradient === true || this.gradient.bar === true

      return type === 'line'
        ? {
            type: 'line',
            smooth: this.smooth,
            symbol: 'circle',
            symbolSize: this.labelFontSize,
            itemStyle: {
              color: color
            },
            areaStyle: {
              color: lineGradient ? gradientColor : 'transparent'
            }
          }
        : {
            type: 'bar',
            stack: this.stack,
            label: {
              show: this.stack,
              position: 'inside',
              color: this.color,
              fontSize: this.labelFontSize * 0.8
            },
            itemStyle: {
              color: barGradient ? gradientColor : color,
              barBorderRadius: this.round && !this.stack ? [50, 50, 0, 0] : 0
            }
          }
    }
  }
}
