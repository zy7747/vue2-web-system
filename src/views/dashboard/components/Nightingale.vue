<!--
 * @Author: Zy
 * @Date: 2023-10-16 10:32:08
 * @LastEditTime: 2023-10-20 16:38:39
 * @Description: 简介
-->
<!--  -->
<template>
  <div ref="nightingale" id="nightingale"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {};
  },
  methods: {
    createdNightingale({ title, data, series }) {
      var myChart = echarts.init(this.$refs.nightingale);
      myChart.setOption({
        legend: {
          top: "bottom",
        },
        title: {
          text: title,
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
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
#nightingale {
  width: 100%;
  height: 500px;
}
</style>
