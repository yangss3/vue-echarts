<template>
  <div style="height: 500px">
    <LineBarChart
      theme="light"
      type="horizontal-bar"
      smooth
      rounded
      show-label
      show-background
      title="父亲颇为请问"
      :category="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
      y-name="电量"
      :series="[
        {name: 'China', data: [12,33,22,11,24,66,33]},
        {name: 'USA', data: [12,33,22,11,24,66,33].reverse()},
      ]"
    />
  </div>
  <div style="height: 400px">
    <DoubleSidedChart
      theme="light"
      :rounded="true"
      background
      :category="['Mon1111', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
      :series="[
        {name: 'China', data: [12,33,22,11,24,66,33], itemStyle: {color: 'teal'}},
        {name: 'USA', data: [12,33,22,11,24,66,33].reverse(), itemStyle: {color: 'yellow'}},
      ]"
    />
  </div>
  <div style="height: 500px">
    <PieChart
      bordered
      type="ring"
      hide-label
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
  <RatioChart
    height="500px"
    type="liquid"
    color="teal"
    :value="0.56"
  />
  <RatioChart
    height="300px"
    :value="50"
    :max="100"
    title="评价总评分数"
    color="blue"
  />
  <RatioChart
    height="500px"
    type="gauge"
    :value="46"
    :max="100"
    title="评价总评分数"
    color="red"
  />
  <div style="height: 500px">
    <BaseChart
      :option="{
      series: [{
        type: 'gauge',
        progress: {
            show: true,
            width: 18
        },
        axisLine: {
            lineStyle: {
                width: 18
            }
        },
        axisTick: {
            show: false
        },
        splitLine: {
            length: 15,
            lineStyle: {
                width: 2,
                color: '#999'
            }
        },
        axisLabel: {
            distance: 25,
            color: '#999',
            fontSize: 20
        },
        anchor: {
            show: true,
            showAbove: true,
            size: 25,
            itemStyle: {
                borderWidth: 10
            }
        },
        title: {
            show: false
        },
        detail: {
            valueAnimation: true,
            fontSize: 80,
            offsetCenter: [0, '70%']
        },
        data: [{
            value: 70
        }]
    }]
    }"
  />
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style>
#app {
  height: 100vh;
}
</style>