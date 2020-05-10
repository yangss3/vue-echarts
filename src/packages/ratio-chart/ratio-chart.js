import 'echarts-liquidfill'
import chartMixin from '@/utils/mixins/chartMixin'
import merge from 'lodash/merge'
import multiply from 'lodash/multiply'
import Color from 'color'

export default {
  name: 'ratioChart',
  mixins: [chartMixin],
  props: {
    type: {
      type: String,
      default: 'ring' // liquid | arc | ring
    },

    color: {
      type: String,
      default: '#387adf'
    },

    bgColor: {
      type: String,
      default: 'transparent'
    },

    label: String,
    value: [String, Number],
    formatter: String,
    labelSize: Number,
    labelColor: String,
    chartBgColor: {
      type: String,
      default: 'transparent'
    }
  },

  methods: {
    createOption() {
      const value = Number.parseFloat(this.value)
      const series = []
      if (this.type === 'ring' || this.type === 'arc') {
        const innerRing = {
          type: 'pie',
          hoverAnimation: false,
          center: ['50%', '50%'],
          radius: ['65%', '80%'],
          label: {
            show: false
          },
          data: [
            {
              value: value,
              label: {
                show: true,
                position: 'center',
                formatter:
                  this.formatter || (this.label ? `${this.label}\n{d}%` : '{d}%'),
                lineHeight: this.labelSize * 1.3 || this.titleFontSize * 2,
                fontSize: this.labelSize || this.titleFontSize * 1.5,
                fontWeight: 'bold',
                color: this.labelColor || this.color
              },
              itemStyle: {
                color: this.color
              }
            },
            {
              value: 1 - value,
              itemStyle: {
                color:
                  this.type === 'arc'
                    ? 'transparent'
                    : this.bgColor !== 'transparent'
                    ? this.bgColor
                    : Color(this.color)
                        .fade(0.8)
                        .toString()
              }
            }
          ]
        }
        if (this.type === 'arc') {
          const outerRing = {
            type: 'pie',
            hoverAnimation: false,
            center: ['50%', '50%'],
            radius: ['81%', '82%'],
            label: {
              show: false
            },
            data: [
              {
                value: 1,
                itemStyle: {
                  color: this.color
                }
              }
            ]
          }
          series.push(innerRing, outerRing)
        } else {
          series.push(innerRing)
        }
      } else if (this.type === 'liquid') {
        const step = Number((value / 5).toFixed(1))

        series.push({
          type: 'liquidFill',
          center: ['50%', '50%'],
          radius: '80%',
          color: [this.color],
          label: {
            formatter:
              this.formatter ||
              (() =>
                this.label
                  ? `${this.label}\n${multiply(value, 100)}%`
                  : `${multiply(value, 100)}%`),
            fontSize: this.labelSize || this.titleFontSize * 1.5,
            color: this.labelColor || this.color,
            lineHeight: this.labelSize * 1.3 || this.titleFontSize * 2
          },
          backgroundStyle: {
            color: this.bgColor
          },
          outline: {
            show: true,
            borderDistance: this.contentFontSize / 2,
            itemStyle: {
              color: 'none',
              borderColor: Color(this.color)
                .darken(0.1)
                .toString(),
              borderWidth: this.contentFontSize / 2
            }
          },
          data: [value, value - step, value - step * 2]
        })
      }

      const defaultConfig = {
        backgroundColor: this.chartBgColor,
        series
      }

      return merge(defaultConfig, this.option)
    }
  }
}
