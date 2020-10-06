import { h } from 'vue'
import echarts from 'echarts'
import { colors } from '@/utils/config'

export default {
  props: {
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    },
    adaptive: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      chart: null,
      titleFontSize: 18,
      contentFontSize: 15
    }
  },

  mounted() {
    this.chart = echarts.init(this.$el)

    this.initState()

    this.$echartsColorSet =
      (this.option && this.option.color) || this.$echartsColorSet || colors

    this.renderChart()

    this.adaptive && window.addEventListener('resize', this.chart.resize)
  },

  beforeUnmount() {
    this.adaptive && window.removeEventListener('resize', this.chart.resize)
  },

  methods: {
    renderChart(notMerge = false) {
      this.chart.setOption(this.createOption(), notMerge)
    },

    initState() {
      const titleFontSize = Math.floor(
        Math.min(this.$el.clientWidth, this.$el.clientHeight) / 25
      )

      if (titleFontSize > 35) this.titleFontSize = 35
      else if (titleFontSize < 15) this.titleFontSize = 15
      else this.titleFontSize = titleFontSize

      const contentFontSize = Math.floor(this.titleFontSize * 0.55)
      this.contentFontSize = contentFontSize < 12 ? 12 : contentFontSize
    }
  },

  render() {
    return h('div', {
      style: {
        width: this.width,
        height: this.height
      }
    })
  }
}
