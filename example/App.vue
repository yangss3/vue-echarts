<template>
  <div style="height: 500px">
    <span @click="fuck">click</span>
    <LineBarChart
      chart-id="mychart1"
      type="line"
      smooth
      rounded
      :show-label="false"
      title="父亲颇为请问"
      :category="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
      :series="[
        {name: 'China', data: [12,33,22,11,24,66,33]},
        {name: 'USA', data: [12,33,22,11,24,66,33].reverse()},
      ]"
    />
  </div>
  <div style="height: 400px">
    <DoubleSidedChart
      chart-id="mychart2"
      theme="light"
      :rounded="true"
      background
      text-color="blue"
      :category="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
      :series="[
        {name: 'China', data: [12,33,22,11,24,66,33]},
        {name: 'USA', data: [12,33,22,11,24,66,33].reverse()},
      ]"
    />
  </div>
  <div style="height: 500px">
    <PieChart
      chart-id="mychart3"
      bordered
      type="pie"
      show-legend
      text-color="orange"
      label-formatter="{b}:{c}"
      :radius="['40%','80%']"
      :border-radius="10"
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
    color="blue"
    :value="0.56"
  />
  <RatioChart
    height="300px"
    :value="50"
    :max="100"
    title="评价总评分数"
    color="teal"
    :gradient="['red', 'orange']"
  />
  <RatioChart
    height="500px"
    type="gauge"
    :value="46"
    :max="100"
    title="评价总评分数"
    color="teal"
    shadow
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
import { defineComponent, onMounted } from 'vue'
import { useInnerChart } from '../packages/index'
export default defineComponent({
  name: 'App',
  setup() {
    const mychart1 = useInnerChart('mychart1')
    const mychart2 = useInnerChart('mychart2')
    // const mychart3 = useInnerChart('mychart3')

    onMounted(() => {
      console.log(mychart1.value?.getOption())
      console.log(mychart2.value?.getOption())
      // console.log(mychart3.value?.getOption())
    })

    return {
      fuck() {
        console.log(mychart1.value)
      }
    }
  }
})
</script>

<style>
#app {
  height: 100vh;
}
</style>