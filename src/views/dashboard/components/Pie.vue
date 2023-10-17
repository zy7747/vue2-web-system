<!--  -->
<template>
  <div ref="pie" id="pie"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  methods: {
    createdPie({ title, data }) {
      this.$nextTick(() => {
        var myChart = echarts.init(this.$refs.pie);
        myChart.setOption({
          title: {
            text: title,
            left: "center",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: "50%",
              data: data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#pie {
  width: 50%;
  height: 300px;
}
</style>
