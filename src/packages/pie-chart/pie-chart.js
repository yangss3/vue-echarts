import chartMixin from '@/utils/mixins/chartMixin'
import merge from 'lodash/merge'

export default {
  name: 'pieChart',
  mixins: [chartMixin],
  props: {
    type: {
      type: String,
      default: 'pie', // pie | angle | ring
    },
    option: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    createOption() {
      const { title } = this.option
      const showTitle = title && title.show !== false

      const defaultConfig = {
        color: this.$echartsColorSet,
        title: showTitle
          ? {
              left: 'center',
              top: this.type === 'ring' ? 'center' : '9%',
              textStyle: {
                color: this.color,
                fontSize: this.titleFontSize,
                lineHeight: this.titleFontSize * 1.2,
              },
            }
          : undefined,

        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}<br/>{d}%',
          textStyle: {
            fontSize: this.contentFontSize,
          },
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
              fontSize: this.contentFontSize,
              lineHeight: this.contentFontSize + 3,
            },
          },
        ],
      }

      return merge(defaultConfig, this.option)
    },
  },
}
