<!--  -->
<template>
  <div ref="bar" id="bar"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {};
  },
  methods: {
    createdBar({ title, xAxis, series }) {
      var myChart = echarts.init(this.$refs.bar);
      myChart.setOption({
        title: {
          text: title,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            data: xAxis,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "60%",
            data: series,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#bar {
  width: 50%;
  height: 250px;
}
</style>
