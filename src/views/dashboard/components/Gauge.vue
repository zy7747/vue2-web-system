<!--  -->
<template>
  <div ref="gauge" id="gauge"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  methods: {
    createdGauge({ title }) {
      this.$nextTick(() => {
        var myChart = echarts.init(this.$refs.gauge);
        myChart.setOption({
          tooltip: {
            formatter: "{a} <br/>{b} : {c}%",
          },
          series: [
            {
              name: "Pressure",
              type: "gauge",
              progress: {
                show: true,
              },
              detail: {
                valueAnimation: true,
                formatter: "{value}",
              },
              data: [
                {
                  value: 50,
                  name: "SCORE",
                },
              ],
            },
          ],
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#gauge {
  width: 50%;
  height: 300px;
}
</style>
