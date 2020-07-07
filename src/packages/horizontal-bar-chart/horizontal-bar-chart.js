import chartMixin from '@/utils/mixins/chartMixin'
import Color from 'color'

export default {
  name: 'horizontalBarChart',
  mixins: [chartMixin],
  props: {
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
      type: [Object, Array],
      required: true
    },

    // 是否圆角
    round: {
      type: Boolean,
      default: true
    },

    // 字体的颜色
    color: {
      type: String,
      default: '#000'
    },

    // label, legend 字体大小
    labelSize: Number,

    // 两个系列数据对比时，调整中间 label 距离容器左边位置
    // 可以是的百分比或绝对像素值
    labelLeft: {
      type: [String, Number],
      default: '46%'
    },

    // 两个系列数据对比时，调整左右两边 grid 的宽度
    // 可以是相对于容器宽度的百分比或绝对像素值
    gridWidth: {
      type: [String, Number],
      default: '37%'
    },

    gridTop: {
      type: [String, Number]
    },

    gridBottom: {
      type: [String, Number],
      default: '-1.5%'
    },

    // 图表容器背景色
    backgroundColor: {
      type: String,
      default: 'transparent'
    },

    // 柱条的宽度
    barWidth: {
      type: [String, Number]
    }
  },

  watch: {
    series: {
      handler(val, oldVal) {
        this.renderChart(val != oldVal)
      },
      deep: true
    }
  },

  methods: {
    createOption() {
      let tempSeries
      if (!Array.isArray(this.series)) {
        tempSeries = [this.series]
      } else {
        tempSeries = this.series
      }

      const showTitle = !!this.title
      const showLegend = tempSeries.some(item => !!item.name)
      const labelSize = this.labelSize || this.contentFontSize

      const itemColor = (color, index) => {
        color || this.$echartsColorSet[index % this.$echartsColorSet.length]
        if (Array.isArray(color) && color.length > 1) {
          return {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: color[0] // 0% 处的颜色
              },
              {
                offset: 1,
                color: color[1] // 100% 处的颜色
              }
            ]
          }
        } else {
          return Array.isArray(color) ? color[0] : color
        }
      }

      const itemBgColor = (item, index) => {
        let bgColor
        if (item.bgColor) {
          bgColor = item.bgColor
        } else if (typeof item.color === 'string') {
          bgColor = Color(item.color)
            .fade(0.8)
            .toString()
        } else {
          bgColor = Color(this.$echartsColorSet[index])
            .fade(0.8)
            .toString()
        }

        return bgColor
      }

      let grid,
        xAxis,
        yAxis,
        series = []

      if (tempSeries.length > 1) {
        const gridCommon = {
          top:
            showTitle || showLegend ? this.gridTop || '12%' : this.gridTop || '5%',
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

        const yAxisCommon = {
          axisLine: { show: false },
          splitLine: { show: false },
          axisTick: { show: false }
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
            data: this.category
              .map(value => ({
                value,
                textStyle: {
                  align: 'center'
                }
              }))
              .reverse()
          },
          {
            gridIndex: 2,
            type: 'category',
            axisLabel: { show: false },
            ...yAxisCommon
          }
        ]

        tempSeries.slice(0, 2).forEach((item, i) => {
          const seriesData = item.data.reverse()
          series.push(
            {
              type: 'bar',
              name: item.name,
              barWidth: this.barWidth,
              barMaxWidth: !this.barWidth ? 25 : undefined,
              zlevel: 1,
              xAxisIndex: i === 1 ? 2 : 0,
              yAxisIndex: i === 1 ? 2 : 0,
              label: {
                show: false,
                position: i === 0 ? 'left' : 'right',
                color: this.color,
                fontSize: labelSize * 0.9
              },
              itemStyle: {
                color: itemColor(item.color, i),
                barBorderRadius: this.round ? 50 : 0
              },
              data: seriesData
            },
            {
              type: 'bar',
              barWidth: this.barWidth,
              barMaxWidth: !this.barWidth ? 25 : undefined,
              barGap: '-100%',
              xAxisIndex: i === 1 ? 2 : 0,
              yAxisIndex: i === 1 ? 2 : 0,
              label: {
                show: true,
                position: i === 0 ? 'left' : 'right',
                color: this.color,
                fontSize: labelSize * 0.9,
                formatter: ({ dataIndex }) => seriesData[dataIndex]
              },
              itemStyle: {
                color: itemBgColor(item, i),
                barBorderRadius: this.round ? 50 : 0
              },
              data: Array(seriesData.length).fill(
                item.maxValue || Math.max(...seriesData) * 1.06
              )
            }
          )
        })
      } else {
        grid = [
          {
            top:
              showTitle || showLegend ? this.gridTop || '12%' : this.gridTop || '5%',
            bottom: this.gridBottom,
            right: '8%',
            left: '4%',
            containLabel: true
          }
        ]

        xAxis = [{ show: false }]

        yAxis = [
          {
            type: 'category',
            data: this.category.reverse(),
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

        const seriesData = tempSeries[0].data.reverse()

        series.push(
          {
            type: 'bar',
            name: tempSeries[0].name,
            zlevel: 1,
            barWidth: this.barWidth,
            barMaxWidth: !this.barWidth ? 25 : undefined,
            label: {
              show: false
            },
            itemStyle: {
              color: itemColor(tempSeries[0].color, 0),
              barBorderRadius: this.round ? 50 : 0
            },
            data: seriesData
          },
          {
            type: 'bar',
            barWidth: this.barWidth,
            barMaxWidth: !this.barWidth ? 25 : undefined,
            barGap: '-100%',
            label: {
              show: true,
              position: 'right',
              color: this.color,
              fontSize: labelSize * 0.9,
              formatter: ({ dataIndex }) => seriesData[dataIndex]
            },
            itemStyle: {
              color: itemBgColor(tempSeries[0], 0),
              barBorderRadius: this.round ? 50 : 0
            },
            data: Array(seriesData.length).fill(
              tempSeries[0].maxValue || Math.max(...seriesData) * 1.06
            )
          }
        )
      }

      return {
        backgroundColor: this.backgroundColor,
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
