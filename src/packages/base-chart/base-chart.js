import { h } from 'vue'
import echarts from 'echarts'
import { colors } from '@/utils/config'

export default {
  name: 'baseChart',
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

  data() {
    return {
      chart: null
    }
  },

  mounted() {
    this.chart = echarts.init(this.$el)
    this.renderChart()
    this.$watch(
      'option',
      function(val, oldVal) {
        if (this.watchOption) {
          this.renderChart(val != oldVal)
        }
      },
      { deep: true }
    )
    this.adaptive && window.addEventListener('resize', this.chart.resize)
  },

  beforeUnmount() {
    this.adaptive && window.removeEventListener('resize', this.chart.resize)
  },

  methods: {
    renderChart(notMerge = false) {
      this.chart.setOption(
        { color: this.$echartsColorSet || colors, ...this.option },
        notMerge
      )
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
