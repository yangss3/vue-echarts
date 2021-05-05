module.exports = {
  base: '/vue-echarts/',
  title: 'EChart Vue Component',
  description: 'A few chart components base on Vue 3 and ECharts 5',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/yangss3/vue-echarts' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: "Introduction",
          children: [
            { text: 'Getting Started', link: '/guide/' }
          ]
        },
        {
          text: 'Components',
          children: [
            { text: 'BaseChart', link: '/guide/base-chart'},
            { text: 'LineBarChart', link: '/guide/line-bar-chart' },
            { text: 'PieChart', link: '/guide/pie-chart' },
            { text: 'RatioChart', link: '/guide/ratio-chart' },
            { text: 'DoubleSidedChart', link: '/guide/double-sided-chart' }
          ]
        }
      ]
    }
  }
}