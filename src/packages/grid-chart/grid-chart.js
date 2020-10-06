import chartMixin from '@/utils/mixins/chartMixin'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import Color from 'color'
import { wrapWithArray } from '@/utils/helper'

export default {
  name: 'gridChart',
  mixins: [chartMixin],
  props: {
    type: String, // 'line' | 'bar'
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

    watchOption: {
      type: Boolean,
      default: true
    },

    // 同时展示的类目数，当类目总数超过这个值时，类目会滚动显示
    // 不传值时，默认同时展示所有类目
    size: Number,
    // 类目滚动时间间隔，毫秒
    interval: {
      type: Number,
      default: 3000
    },
    // 是否开启自动滚动
    auto: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      categoryAxis: 'xAxis',
      chartOption: {},
      moveable: false,
      timer: null,
      ctgMap: new Map()
    }
  },

  computed: {
    labelFontSize() {
      return this.labelSize || this.contentFontSize
    }
  },

  watch: {
    option: {
      handler(val, oldVal) {
        if (this.watchOption) {
          this.renderChart(val != oldVal)
        }
      },
      deep: true
    }
  },

  beforeUnmount() {
    this.timer && clearInterval(this.timer)
  },

  methods: {
    renderChart(noMerge = false) {
      this.timer && clearInterval(this.timer)
      this.ctgMap.clear()

      this.chartOption = cloneDeep(this.option)
      this.chartOption.xAxis = wrapWithArray(this.chartOption.xAxis)
      this.chartOption.yAxis = wrapWithArray(this.chartOption.yAxis)
      this.chartOption.series = wrapWithArray(this.chartOption.series)

      this.categoryAxis = this.chartOption.yAxis.some(y => y.type === 'category')
        ? 'yAxis'
        : 'xAxis'

      const ctgArr = this.chartOption[this.categoryAxis][0].data
      this.moveable = this.size && this.size < ctgArr.length
      if (this.moveable) {
        ctgArr.forEach((ctg, i) => this.ctgMap.set(ctg, i))

        const initData = item => (item.__dataPool = item.data.splice(this.size))

        this.chartOption.series.forEach(initData)
        this.chartOption[this.categoryAxis].forEach(initData)

        noMerge = true
        this.auto && this.startMove()
      }

      this.chart.setOption(this.createOption(), noMerge)
    },

    startMove() {
      if (this.moveable) this.timer = setInterval(this.move, this.interval)
    },

    stopMove() {
      clearInterval(this.timer)
    },

    move() {
      const mvAxis = (item, i) => {
        const moveIn = item.__dataPool.shift()
        item.data.push(moveIn)
        const moveOut = item.data.shift()
        item.__dataPool.push(moveOut)

        if (i === 0) {
          this.$emit('move', this.ctgMap.get(moveIn), this.ctgMap.get(moveOut))
        }
      }

      const mvSeries = item => {
        item.data.push(item.__dataPool.shift())
        item.__dataPool.push(item.data.shift())
      }

      this.chartOption[this.categoryAxis].forEach(mvAxis)
      this.chartOption.series.forEach(mvSeries)
      this.chart.setOption(this.createOption(), true)
    },

    createOption() {
      const { title, xAxis, yAxis, series } = this.chartOption

      const showTitle =
        (this.title && (!title || title.show !== false)) ||
        (title && title.show !== false)

      const defaultConfig = {
        grid: {
          top: '18%',
          right: yAxis.length > 1 ? '5.5%' : '6%',
          bottom: '5%',
          left: '6%',
          containLabel: true
        },

        title: {
          left: '3%',
          top: '5%',
          text: this.title,
          textStyle: {
            fontSize: this.titleFontSize,
            color: this.color
          }
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
              this.axisConfig('x', i, this.categoryAxis === 'xAxis')
            )
          : [this.axisConfig('x', 0)],

        yAxis: yAxis.length
          ? yAxis.map((item, i) =>
              this.axisConfig('y', i, this.categoryAxis === 'yAxis')
            )
          : [this.axisConfig('y', 0)],

        series: ['line', 'bar'].includes(this.type)
          ? series.map((item, i) => this.itemConfig(this.type, i))
          : series.map((item, i) => this.itemConfig(item.type, i))
      }

      return merge(defaultConfig, this.chartOption)
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
                    .fade(0.7)
                    .toString() // 0% 处的颜色
                },
                {
                  offset: 0.6,
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
                    .lighten(0.35)
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
              barBorderRadius: this.round && !this.stack ? [100, 100, 0, 0] : 0
            }
          }
    }
  }
}
