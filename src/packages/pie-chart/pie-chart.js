import chartMixin from '@/utils/mixins/chartMixin'
import merge from 'lodash/merge'

export default {
  name: 'pieChart',
  mixins: [chartMixin],
  props: {
    type: {
      type: String,
      default: 'pie' // pie | angle | ring
    },
    title: String,
    titleColor: {
      type: String,
      default: '#000'
    },
    titleSize: Number,
    labelColor: String,
    labelSize: Number,
    data: {
      type: Array,
      default: () => []
    },
    option: {
      type: Object,
      default: () => ({})
    },
    watchOption: {
      type: Boolean,
      default: true
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
    },
    data: {
      handler(val, oldVal) {
        this.renderChart(val != oldVal)
      },
      deep: true
    }
  },

  methods: {
    createOption() {
      const { title } = this.option
      const showTitle = this.title || (title && title.show !== false)

      const defaultConfig = {
        color: this.$echartsColorSet,
        title: showTitle
          ? {
              text: this.title,
              left: 'center',
              top: this.type === 'ring' ? 'center' : '9%',
              textStyle: {
                color: this.titleColor,
                fontSize: this.titleSize || this.titleFontSize,
                lineHeight: (this.titleSize || this.titleFontSize) * 1.2
              }
            }
          : undefined,

        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}<br/>{d}%',
          textStyle: {
            fontSize: this.contentFontSize
          }
        },

        series: [
          {
            type: 'pie',
            roseType: this.type === 'angle',
            center:
              this.type === 'ring'
                ? ['50%', '50%']
                : showTitle
                ? ['50%', '55%']
                : ['50%', '50%'],
            radius: this.type === 'ring' ? ['45%', '55%'] : '50%',
            label: {
              show: true,
              formatter: '{b}：{c}\n({d}%)',
              fontSize: this.labelSize || this.contentFontSize,
              lineHeight: (this.labelSize || this.contentFontSize) + 3,
              color: this.labelColor || undefined
            },
            labelLine: {
              lineStyle: {
                color: this.labelColor || undefined
              }
            },
            data: this.data
          }
        ]
      }

      return merge(defaultConfig, this.option)
    }
  }
}
