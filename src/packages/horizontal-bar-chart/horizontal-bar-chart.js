import chartMixin from '@/utils/mixins/chartMixin'
import Color from 'color'

export default {
  name: 'horizontalBarChart',
  mixins: [chartMixin],
  props: {
    // 单向|双向
    type: {
      type: String,
      default: 'one-way' // one-way | two-way
    },

    // 标题
    title: String,
    // 标题字体大小
    titleSize: Number,
    // 标题颜色
    titleColor: String,
    // 类目数组
    category: {
      type: Array,
      required: true
    },

    // 系列数据数组
    series: {
      type: Array,
      required: true
    },

    // 是否堆叠 仅 type === one-way 时生效
    stack: {
      type: Boolean,
      default: false
    },

    // 是否圆角
    round: {
      type: Boolean,
      default: true
    },

    // 是否显示背景边框效果
    border: {
      type: Boolean,
      default: false
    },

    // 是否显示背景色，可以设置背景颜色
    background: {
      type: [Boolean, String],
      default: true
    },

    // 是否显示渐变色效果
    gradient: {
      type: Boolean,
      default: false
    },

    // 字体的颜色
    color: {
      type: String,
      default: '#000'
    },

    // label, legend 字体大小
    labelSize: Number,

    // type === two-way 时，调整中间 label 距离容器左边位置
    // 可以是的百分比或绝对像素值
    labelLeft: {
      type: [String, Number],
      default: '46%'
    },

    // type === two-way 时，调整左右两边 grid 的宽度
    // 可以是相对于容器宽度的百分比或绝对像素值
    gridWidth: {
      type: [String, Number],
      default: '37%'
    },

    gridTop: {
      type: [String, Number],
      default: '12%'
    }
  },

  methods: {
    createOption() {
      const showTitle = !!this.title
      const showLegend = this.series.some(item => !!item.name)
      const labelSize = this.labelSize || this.contentFontSize
      const itemColor = (color, index) => {
        color = color || this.$echartsColorSet[index % this.$echartsColorSet.length]
        return this.gradient
          ? {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: color // 0% 处的颜色
              },
              {
                offset: 1,
                color: Color(color)
                  .lighten(0.2)
                  .toString() // 100% 处的颜色
              }
            ]
          }
          : color
      }

      const backgroundConfig = (color, index) => {
        color = color || this.$echartsColorSet[index % this.$echartsColorSet.length]

        return {
          showBackground: this.background || this.border,
          backgroundStyle: {
            color: !this.background
              ? 'transparent'
              : typeof this.background === 'string'
                ? this.background
                : Color(color)
                  .fade(0.8)
                  .toString(),
            borderColor: Color(color)
              .lighten(0.1)
              .toString(),
            borderWidth: this.border ? 1 : 0,
            barBorderRadius: this.round ? 50 : 0
          }
        }
      }

      let grid, xAxis, yAxis, series
      if (this.type === 'two-way') {
        const gridCommon = {
          top: (showTitle || showLegend) ? this.gridTop : '5%',
          bottom: '4%',
          containLabel: true
        }
        grid = [
          {
            width: this.gridWidth,
            left: '5%',
            ...gridCommon
          },
          {
            width: '0%',
            left: this.labelLeft,
            ...gridCommon
          },
          {
            width: this.gridWidth,
            right: '5%',
            ...gridCommon
          }
        ]

        const xAxisCommon = {
          show: false,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          position: 'top',
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
        xAxis = [
          {
            gridIndex: 0,

            inverse: true,
            ...xAxisCommon
          },
          { gridIndex: 1, ...xAxisCommon },
          { gridIndex: 2, ...xAxisCommon }
        ]

        const yAxisCommon = {
          axisLine: { show: false },
          splitLine: { show: false },
          axisTick: { show: false }
        }
        yAxis = [
          {
            gridIndex: 0,
            type: 'category',
            axisLabel: { show: false },
            ...yAxisCommon
          },
          {
            gridIndex: 1,
            type: 'category',
            axisLabel: {
              show: true,
              color: this.color,
              fontSize: labelSize
            },
            ...yAxisCommon,
            data: this.category.map(value => ({
              value,
              textStyle: {
                align: 'center'
              }
            }))
          },
          {
            gridIndex: 2,
            type: 'category',
            axisLabel: { show: false },
            ...yAxisCommon
          }
        ]

        series = this.series.slice(0, 2).map((item, i) => {
          return {
            type: 'bar',
            name: item.name,
            xAxisIndex: i === 1 ? 2 : 0,
            yAxisIndex: i === 1 ? 2 : 0,
            label: {
              show: true,
              position: i === 0 ? 'left' : 'right',
              color: this.color,
              fontSize: labelSize * 0.9
            },
            itemStyle: {
              color: itemColor(item.color, i),
              barBorderRadius: this.round ? 50 : 0
            },
            ...backgroundConfig(item.color, i),
            data: item.data
          }
        })
      } else {
        grid = [
          {
            top: showTitle || showLegend ? '10%' : '5%',
            right: '6%',
            bottom: '2%',
            left: '4%',
            containLabel: true
          }
        ]

        xAxis = [{ show: false }]

        yAxis = [
          {
            type: 'category',
            data: this.category,
            axisLine: { show: false },
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
              color: this.color,
              fontSize: labelSize,
              margin: 12
            }
          }
        ]

        series = this.series.map((item, i) => ({
          type: 'bar',
          name: item.name,
          stack: this.stack,
          label: {
            show: true,
            position: this.stack ? 'insideRight' : 'right',
            color: this.color,
            fontSize: labelSize * 0.9
          },
          itemStyle: {
            color: itemColor(item.color, i),
            barBorderRadius: this.round && !this.stack ? 50 : 0
          },
          ...backgroundConfig(item.color, i),
          data: item.data
        }))
      }

      return {
        title: {
          show: showTitle,
          text: this.title,
          left: '3%',
          top: '3.5%',
          textStyle: {
            fontSize: this.titleSize || this.titleFontSize,
            color: this.titleColor || this.color
          }
        },
        legend: {
          show: showLegend,
          right: showTitle ? '5%' : 'center',
          top: '3.5%',
          textStyle: {
            fontSize: labelSize,
            color: this.color
          },
          itemWidth: labelSize * 1.5,
          itemHeight: labelSize,
          itemGap: 12
        },
        grid,
        xAxis,
        yAxis,
        series
      }
    }
  }
}
