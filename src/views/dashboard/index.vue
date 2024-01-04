<!--  -->
<template>
  <!-- 图表 -->
  <div class="picture">
    <el-tabs
      @tab-click="tabClick"
      tab-position="left"
      style="height: 790px; width: 99%"
      v-model="activeName"
    >
      <!-- 柱状图组件 -->
      <el-tab-pane label="柱状图" name="柱状图">
        <div style="display: flex">
          <Label title="用户总数" icon="用户" :sum="statisticsData.userTotal">
            <template slot="tag">
              <el-tag type="danger"> 总 </el-tag>
            </template>
          </Label>

          <Label title="文件总数" icon="用户" :sum="statisticsData.fileTotal">
            <template slot="tag">
              <el-tag type="danger"> 总 </el-tag>
            </template>
          </Label>

          <Label title="视频总数" icon="用户" :sum="statisticsData.videoTotal">
            <template slot="tag">
              <el-tag type="danger"> 总 </el-tag>
            </template>
          </Label>

          <Label title="人员总数" icon="用户" :sum="statisticsData.personTotal">
            <template slot="tag">
              <el-tag type="danger"> 总 </el-tag>
            </template>
          </Label>
        </div>

        <div class="content">
          <Bar ref="Bar1" :title="'文件类型统计'"></Bar>
          <Bar ref="Bar2" :title="'视频类型统计'"></Bar>
          <Bar ref="Bar3" :title="'用户性别统计'"></Bar>
        </div>
      </el-tab-pane>

      <!-- 饼图组件 -->
      <el-tab-pane label="饼图" name="饼图">
        <div class="content">
          <Pie ref="Pie1"></Pie>
          <Pie ref="Pie2"></Pie>
          <Pie ref="Pie3"></Pie>
        </div>
      </el-tab-pane>

      <!-- 圆角环形图组件 -->
      <el-tab-pane label="折线图" name="折线图">
        <div class="content">
          <Lines ref="Lines1"></Lines>
        </div>
      </el-tab-pane>
      <!-- 雷达图图组件 -->
      <el-tab-pane label="雷达图" name="雷达图">
        <div class="content">
          <Radar ref="Radar1"></Radar>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { Pie, Bar, Lines, Radar, Label } from "./components/index.js";

export default {
  components: {
    Pie,
    Bar,
    Lines,
    Radar,
    Label,
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
      statisticsData: {},
      BarData: {},
      PieData: {},
    };
  },
  methods: {
    search() {
      this.$service.baseData.statistics.getStatistics().then((res) => {
        this.formatData(res.data);
        this.tabClick();
      });
    },
    formatData(data) {
      function Bar(params, title) {
        const barData = {
          title: title,
          xAxis: [],
          series: [],
        };

        for (const key in params) {
          barData.xAxis.push(key);
          barData.series.push(params[key]);
        }

        return barData;
      }

      function Pie(params, title) {
        const pieData = {
          title: title,
          data: [],
        };

        for (const key in params) {
          pieData.data.push({ name: key, value: params[key] });
        }

        return pieData;
      }
      //统计数据
      this.statisticsData = data;

      //柱状图数据
      this.BarData.Bar1 = Bar(data.fileType, "文件类型统计");
      this.BarData.Bar2 = Bar(data.videoType, "视频类型统计");
      this.BarData.Bar3 = Bar(data.sex, "用户性别统计");
      //饼图数据
      this.PieData.Pie1 = Pie(data.fileType, "文件类型统计");
      this.PieData.Pie2 = Pie(data.videoType, "视频类型统计");
      this.PieData.Pie3 = Pie(data.sex, "用户性别统计");
    },
    tabClick() {
      this.$nextTick(() => {
        if (this.activeName === "柱状图") {
          for (const key in this.BarData) {
            this.$refs[key].createdBar(this.BarData[key]);
          }
        } else if (this.activeName === "饼图") {
          for (const key in this.PieData) {
            this.$refs[key].createdPie(this.PieData[key]);
          }
        } else if (this.activeName === "折线图") {
          this.$refs.Lines1.createdLines({ title: "用户" });
        } else if (this.activeName === "雷达图") {
          this.$refs.Radar1.createdRadar({ title: "用户" });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.picture {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  .content {
    display: flex;
    width: 100%;
    height: 700px;
    flex-wrap: wrap;
    overflow-y: auto;
  }
}
</style>
