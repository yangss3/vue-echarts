import echarts from 'echarts'
export default {
  props: {
    height: {
      type: String,
      default: '100%',
    },
    width: {
      type: String,
      default: '100%',
    },
    adaptive: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '#000',
    },
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      chart: null,
      titleFontSize: 18,
      contentFontSize: 15,
      showTitle: true,
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el)

    this.initState()

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
      this.chart.setOption(this.createOption(), true)
    },
    initState() {
      const titleFontSize = Math.floor(
        Math.min(this.$el.clientWidth, this.$el.clientHeight) / 30
      )

      if (titleFontSize > 32) this.titleFontSize = 32
      else if (titleFontSize < 15) this.titleFontSize = 15
      else this.titleFontSize = titleFontSize

      const contentFontSize = Math.floor(this.titleFontSize * 0.6)
      this.contentFontSize = contentFontSize < 12 ? 12 : contentFontSize

      // console.log(this.titleFontSize, this.contentFontSize)
    },
  },
  render(h) {
    return h('div', {
      style: {
        width: this.width,
        height: this.height,
      },
    })
  },
}
