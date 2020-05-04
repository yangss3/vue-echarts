import chartMixin from '@/utils/mixins/chartMixin'
import merge from 'lodash/merge'
import Color from 'color'

export default {
  name: 'gridChart',
  mixins: [chartMixin],
  props: {
    type: String, // line | bar | mix

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
      default: true
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
    }
  },

  methods: {
    createOption() {
      const { title, xAxis, yAxis, series } = this.option

      const twoAxis = Array.isArray(yAxis) && yAxis.length > 1
      const showTitle = title && title.show !== false

      const defaultConfig = {
        title: {
          left: '3%',
          top: '5%',
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
            fontSize: this.contentFontSize,
            color: this.color
          }
        },

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: this.type === 'line' ? 'line' : 'shadow'
          },
          textStyle: {
            fontSize: this.contentFontSize
          }
        },

        xAxis: Array.isArray(xAxis)
          ? xAxis.map((item, i) => this.axisConfig('x', i))
          : axisConfig('x', 0),

        yAxis: Array.isArray(yAxis)
          ? yAxis.map((item, i) => this.axisConfig('y', i))
          : axisConfig('y', 0),

        series: ['line', 'bar'].includes(this.type)
          ? series.map((item, i) => this.itemConfig(this.type, i))
          : series.map((item, i) => this.itemConfig(item.type, i))
      }

      return merge(defaultConfig, this.option)
    },

    axisConfig(type, index) {
      const position = {
        x: { first: 'bottom', second: 'top' },
        y: { first: 'left', second: 'right' }
      }
      const isXAxis = type === 'x'
      return {
        type: isXAxis ? 'category' : 'value',
        position: index === 0 ? position[type].first : position[type].second,
        boundaryGap: isXAxis ? this.type !== 'line' : undefined,
        nameTextStyle: {
          color: this.color,
          fontSize: this.contentFontSize
        },
        axisLine: {
          lineStyle: {
            color: Color(this.color)
              .fade(0.5)
              .toString()
          }
        },
        splitLine: {
          show: type === 'y' && index === 0,
          lineStyle: {
            color: Color(this.color)
              .fade(0.95)
              .toString()
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: this.color,
          fontSize: this.contentFontSize,
          margin: isXAxis ? 12 : 8
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
            symbolSize: this.contentFontSize,
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
              fontSize: this.contentFontSize * 0.8
            },
            itemStyle: {
              color: barGradient ? gradientColor : color,
              barBorderRadius: this.round && !this.stack ? [50, 50, 0, 0] : 0
            }
          }
    }
  }
}
