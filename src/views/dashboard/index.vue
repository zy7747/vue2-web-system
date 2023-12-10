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
          <Label title="用户总数" icon="用户" :sum="userTotal">
            <template slot="tag">
              <el-tag type="danger"> 总 </el-tag>
            </template>
          </Label>
        </div>
        <div class="content">
          <Bar ref="Bar1"></Bar>
        </div>
      </el-tab-pane>
      <!-- 饼图组件 -->
      <el-tab-pane label="饼图" name="饼图">
        <div class="content">
          <Pie ref="Pie1"></Pie>
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
      <el-tab-pane label="树形导图" name="树形导图">
        <iframe
          src="https://www.bilibili.com/"
          frameborder="0"
          style="width: 100%; height: 100vh"
        ></iframe>
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
      userTotal: 0, //用户总数
      Bar1: {
        title: "用户性别",
        xAxis: [],
        series: [],
      },
      Pie1: {
        title: "用户性别",
        data: [],
      },
    };
  },
  methods: {
    search() {
      this.$service.baseData.statistics.getStatistics().then((res) => {
        //人数统计
        this.userTotal = res.data.userTotal;

        this.tabClick();
      });
    },
    tabClick() {
      this.$nextTick(() => {
        if (this.activeName === "柱状图") {
          this.$refs.Bar1.createdBar(this.Bar1);
        } else if (this.activeName === "饼图") {
          this.$refs.Pie1.createdPie(this.Pie1);
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
