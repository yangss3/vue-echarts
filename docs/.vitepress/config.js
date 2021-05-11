module.exports = {
  base: '/vue-echarts/',
  title: 'Vue ECharts',
  description: 'A few ECharts components for VueJS',
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
            { text: 'PieChart', link: '/guide/pie-chart' },
            { text: 'LineBarChart', link: '/guide/line-bar-chart' },
            { text: 'DoubleSidedChart', link: '/guide/double-sided-chart' },
            { text: 'RatioChart', link: '/guide/ratio-chart' },
            { text: 'BaseChart', link: '/guide/base-chart'},
          ]
        }
      ]
    }
  }
}