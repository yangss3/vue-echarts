<template>
  <div style="height: 500px">
    <LineBarChart
      theme="light"
      type="bar"
      rounded
      stack
      gradient
      title="父亲颇为请问"
      :x-axis-data="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
      y-axis-name="电量"
      :series="[
        {name: 'China', data: [12,33,22,11,24,66,33]},
        {name: 'USA', data: [12,33,22,11,24,66,33].reverse()},
      ]"
      :option="{}"
    />
  </div>
  <div style="height: 500px">
    <PieChart
      :bordered="true"
      type="ring"
      :series="{
        data: [
          {value: 1048, name: '搜索引擎'},
          {value: 735, name: '直接访问'},
          {value: 580, name: '邮件营销'},
          {value: 484, name: '联盟广告'},
          {value: 300, name: '视频广告'}
        ]
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LineBarChart from '../packages/line-bar-chart'
import PieChart from '../packages/pie-chart'

export default defineComponent({
  name: 'App',
  components: {
    LineBarChart,
    PieChart
  },
  setup() {

  }
})
</script>

<style>
#app {
  height: 100vh;
}
</style>