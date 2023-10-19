<!--  -->
<template>
  <!-- 图表 -->
  <div class="picture">
    <el-tabs
      @tab-click="tabClick"
      tab-position="left"
      style="height: 800px; width: 95%"
      v-model="activeName"
    >
      <el-tab-pane label="天气" name="天气">
        <div class="Weather"></div>
      </el-tab-pane>
      <el-tab-pane label="柱状图" name="柱状图">
        <Label title="用户总数" icon="用户" :sum="userTotal">
          <template slot="tag">
            <el-tag type="danger"> 总 </el-tag>
          </template>
        </Label>
        <div class="Bar">
          <Bar ref="Bar1"></Bar>
        </div>
      </el-tab-pane>
      <el-tab-pane label="饼图" name="饼图">
        <div class="Pie">
          <Pie ref="Pie1"></Pie>
        </div>
      </el-tab-pane>
      <el-tab-pane label="圆角环形图" name="圆角环形图">
        <div class="Rounded">
          <Rounded ref="Rounded1"></Rounded>
        </div>
      </el-tab-pane>
      <el-tab-pane label="南丁格尔玫瑰图" name="南丁格尔玫瑰图">
        <div class="Nightingale">
          <Nightingale ref="Nightingale1"></Nightingale>
        </div>
      </el-tab-pane>
      <el-tab-pane label="折线图" name="折线图">
        <div class="Lines">
          <Lines ref="Lines1"></Lines>
        </div>
      </el-tab-pane>
      <el-tab-pane label="雷达图" name="雷达图">
        <div class="Radar">
          <Radar ref="Radar1"></Radar>
        </div>
      </el-tab-pane>
      <el-tab-pane label="仪表盘" name="仪表盘">
        <div class="Gauge">
          <Gauge ref="Gauge1"></Gauge>
        </div>
      </el-tab-pane>
      <el-tab-pane label="日历" name="日历">
        <Calendar></Calendar>
      </el-tab-pane>
      <el-tab-pane label="树形导图" name="树形导图"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  Pie,
  Bar,
  Calendar,
  Lines,
  Radar,
  Gauge,
  Label,
  Rounded,
  Nightingale,
} from "./components/index.js";

export default {
  components: {
    Pie,
    Bar,
    Lines,
    Calendar,
    Radar,
    Gauge,
    Label,
    Rounded,
    Nightingale,
  },
  mounted() {
    this.search();
  },
  data() {
    return {
      queryParams: {
        year: "2023",
      },
      activeName: "柱状图",
      userTotal: 0, //用户总数
      Bar1: {
        title: "用户性别",
        xAxis: [],
        series: [],
      },
      testData: [], // 数据源
    };
  },
  methods: {
    search() {
      this.$service.baseData.statistics.getStatistics().then((res) => {
        //人数统计
        this.userTotal = res.data.userTotal;
        res.data.userSex;
        const Bar1 = {
          title: "用户性别",
          xAxis: [],
          series: [],
        };

        for (const key in res.data.userSex) {
          Bar1.xAxis.push(key);
          Bar1.series.push(res.data.userSex[key]);
          //Pie1.data.push({ value: res.data.userSex[key], name: key });
        }

        this.Bar1 = Bar1;

        this.tabClick();
      });
    },
    tabClick() {
      if (this.activeName === "柱状图") {
        this.$refs.Bar1.createdBar(this.Bar1);
      } else if (this.activeName === "饼图") {
        this.$refs.Pie1.createdPie({
          title: "用户性别",
          data: [
            { value: 100, name: "男" },
            { value: 800, name: "女" },
          ],
        });
      } else if (this.activeName === "圆角环形图") {
        this.$refs.Rounded1.createdRounded({ title: "用户" });
      } else if (this.activeName === "南丁格尔玫瑰图") {
        this.$refs.Nightingale1.createdNightingale({ title: "用户" });
      } else if (this.activeName === "折线图") {
        this.$refs.Lines1.createdLines({ title: "用户" });
      } else if (this.activeName === "雷达图") {
        this.$refs.Radar1.createdRadar({ title: "用户" });
      } else if (this.activeName === "仪表盘") {
        this.$refs.Gauge1.createdGauge({ title: "磁盘使用率" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.picture {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #fff;
  .Bar {
    display: flex;
    flex-wrap: wrap;
  }

  .Pie {
    display: flex;
    flex-wrap: wrap;
  }
  .Lines {
    display: flex;
    flex-wrap: wrap;
  }

  .Radar {
    display: flex;
    flex-wrap: wrap;
  }

  .Gauge {
    display: flex;
    flex-wrap: wrap;
  }

  .Rounded {
    display: flex;
    flex-wrap: wrap;
  }

  .Nightingale {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
