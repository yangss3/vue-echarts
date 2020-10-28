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
  <!-- <base-chart :option="option" adaptive></base-chart> -->
  <!-- <grid-chart ref="gridInstance" :option="option"  :size="11" round adaptive :gradient="{line: true}" :interval="1000" @move="move"></grid-chart> -->
  <!-- <adaptive-wrapper>
    <horizontal-bar-chart v-bind="horizontalBar"></horizontal-bar-chart>
  </adaptive-wrapper> -->

  <!-- <pie-chart v-bind="pie"></pie-chart> -->
  <!-- <pie-chart v-bind="pie2"></pie-chart>
  <pie-chart v-bind="pie3"></pie-chart> -->
  <ratio-chart v-bind="ring"></ratio-chart>
  <ratio-chart v-bind="arc"></ratio-chart>
  <ratio-chart v-bind="liquid"></ratio-chart>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";

import {
  BaseChart,
  GridChart,
  HorizontalBarChart,
  AdaptiveWrapper,
  PieChart,
  RatioChart
} from "../packages";
export default defineComponent({
  name: "App",
  components: {
    BaseChart,
    GridChart,
    HorizontalBarChart,
    AdaptiveWrapper,
    PieChart,
    RatioChart
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
          data: [
            725,
            682,
            832,
            813,
            762,
            802,
            984,
            774,
            675,
            836,
            904,
            993
          ].sort((a, b) => (Math.random() * a > Math.random() * b ? 1 : -1))
        },
        {
          name: "其它2",
          type: "bar",
          data: [
            725,
            682,
            832,
            813,
            762,
            802,
            984,
            774,
            675,
            836,
            904,
            993
          ].sort((a, b) => (Math.random() * a > Math.random() * b ? 1 : -1))
        },
        {
          name: "其它3",
          type: "bar",
          data: [
            725,
            682,
            832,
            813,
            762,
            802,
            984,
            774,
            675,
            836,
            904,
            993
          ].sort((a, b) => (Math.random() * a > Math.random() * b ? 1 : -1))
        }
      ]
    });
    const horizontalBar = ref({
      // width: "700px",
      // height: "350px",
      // adaptive: true,
      title: "Comparison of monthly active users of social media",
      barWidth: 15,
      labelLeft: "290px",
      // gridTop: 35
      // titleSize: 20,
      // titleColor: 'indigo',
      // color: 'red',
      // fontSize: 23,
      // round: false,
      // backgroundColor: '#ccc',
      category: [
        "YouTube",
        "Facebook",
        "Instagram",
        "Twitter",
        "Snapchat",
        "Wechat",
        "TikTok",
        "Bilibili"
      ],
      series: [
        {
          name: "04/2020",
          data: [3637, 4323, 2823, 2778, 1981, 3423, 3923, 1672],
          color: "purple"
        },
        {
          name: "05/2020",
          data: [3537, 4423, 3123, 2578, 1781, 3523, 4123, 1972],
          color: ["red", "orange"]
        }
      ]
    });

    const gridInstance = ref();

    const pie = ref({
      width: "400px",
      height: "400px",
      // adaptive: true,
      type: "ring",
      title: "2020年第一季度\n手机厂商出货量",
      labelColor: "indigo",
      data: [
        { name: "苹果", value: 7223 },
        { name: "华为", value: 8189 },
        { name: "三星", value: 9243 },
        { name: "小米", value: 5468 },
        { name: "其它", value: 8171 }
      ]
    });
    const ring = ref({
      width: "200px",
      height: "200px",
      type: "ring",
      value: 0.25,
      color: "gray",
      round: true
    });
    const arc = ref({
      width: "200px",
      height: "200px",
      type: "arc",
      label: "完成率",
      value: 0.4,
      color: "orange"
    });
    const liquid = ref({
      width: "200px",
      height: "200px",
      type: "liquid",
      formatter: "完成数量(个)\n 378",
      labelSize: 18,
      value: 0.436
    });
    return {
      option,
      horizontalBar,
      pie,
      ring,
      arc,
      liquid
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
