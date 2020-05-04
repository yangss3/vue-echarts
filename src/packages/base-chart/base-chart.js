import echarts from 'echarts'
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
      function() {
        this.renderChart()
      },
      { deep: true }
    )
    this.adaptive && window.addEventListener('resize', this.chart.resize)
  },

  beforeDestroy() {
    this.adaptive && window.removeEventListener('resize', this.chart.resize)
  },

  methods: {
    renderChart() {
      this.chart.setOption({ color: this.$echartsColorSet, ...this.option }, true)
    }
  },

  render(h) {
    return h('div', {
      style: {
        width: this.width,
        height: this.height
      }
    })
  }
}
