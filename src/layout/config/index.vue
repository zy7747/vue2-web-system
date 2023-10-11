<!--  -->
<template>
  <div>
    <el-drawer
      title="主题配置"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :width="400"
    >
      <div class="body">
        <div class="layout">
          <div>
            <span>布局</span>
            <el-tooltip
              class="item"
              effect="light"
              :open-delay="300"
              content="布局方式"
              placement="top-start"
            >
              <i class="el-icon-question" />
            </el-tooltip>
          </div>

          <c-select v-model="form.layout" :options="getDictData('layout')" />
        </div>
        <div class="layout">
          <div>
            <span>主题 </span>
            <el-tooltip
              class="item"
              effect="light"
              :open-delay="300"
              content="主题风格"
              placement="top-start"
            >
              <i class="el-icon-question" />
            </el-tooltip>
          </div>

          <c-select v-model="form.theme" :options="getDictData('theme')" />
        </div>

        <div class="layout">
          <div>
            <span style="margin-right: 10px">标签栏</span>
            <el-tooltip
              class="item"
              effect="light"
              :open-delay="300"
              content="标签栏显示与隐藏"
              placement="top-start"
            >
              <i class="el-icon-question" />
            </el-tooltip>
          </div>

          <el-switch
            v-model="form.nav"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </div>

        <div class="bottom">
          <el-button type="primary" size="small" @click="save"
            >保存配置</el-button
          >
          <el-button size="small" @click="restore">还原默认</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import config from "./mixins/index";

export default {
  mixins: [config],
  data() {
    return {
      drawer: false,
      direction: "rtl",
    };
  },
  created() {
    this.form = this.$store.getters.layout;
  },
  methods: {
    handleOpen() {
      this.drawer = true;
    },
    handleClose(done) {
      done();
    },
    save() {
      localStorage.setItem("layoutConfig", JSON.stringify(this.form));
      this.drawer = false;
    },
    restore() {
      this.$store.commit("removeLayoutConfig");
      this.form = this.$store.getters.layout;
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 16px;
  .bottom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    height: 100px;
    width: 100%;
    border-top: 1px solid #e4e7ed;
    bottom: 0;
  }
}
.layout {
  font-size: 14px;
  margin: 5px 0;
  padding: 0 15px;
  width: 100%;
  display: flex;
  align-items: center;
}
</style>
