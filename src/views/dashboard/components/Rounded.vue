<template>
  <div ref="rounded" id="rounded"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {};
  },
  methods: {
    createdRounded({ title, data, series }) {
      var myChart = echarts.init(this.$refs.rounded);
      myChart.setOption({
        tooltip: {
          trigger: "item",
        },
        title: {
          text: title,
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: data,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#rounded {
  width: 50%;
  height: 500px;
}
</style>
