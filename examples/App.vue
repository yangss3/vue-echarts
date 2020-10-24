<template>
  <!-- <ratio-chart
    type="liquid"
    width="400px"
    height="400px"
    :value="0.7"
  ></ratio-chart>
  <div style="height:30vh">
    <grid-chart type="line" :option="option"></grid-chart>
  </div> -->
  <base-chart :option="option" adaptive></base-chart>
</template>

<script>
import { defineComponent, ref } from "vue";

import { BaseChart } from "../packages";
export default defineComponent({
  name: "App",
  components: {
    BaseChart
  },
  setup() {
    const option = ref({
      xAxis: {
        data: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ]
      },
      yAxis: {
        name: "销量（万台）"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      series: [
        {
          name: "苹果",
          type: "bar",
          data: [425, 232, 432, 563, 332, 462, 684, 574, 435, 578, 674, 643]
        },
        {
          name: "华为",
          type: "bar",
          data: [445, 332, 462, 463, 432, 422, 584, 474, 405, 599, 774, 743]
        },
        {
          name: "其它",
          type: "bar",
          data: [725, 682, 832, 813, 762, 802, 984, 774, 675, 836, 904, 993]
        }
      ]
    });
    return {
      option
    };
  }
});
</script>

<style>
* {
  margin: 0;
}
#app {
  height: 100vh;
}
</style>
