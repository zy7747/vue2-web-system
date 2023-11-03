<!--  -->
<template>
  <div>
    <el-drawer
      title="主题配置"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
      size="25%"
    >
      <div class="body">
        <div class="content">
          <CForm
            label-width="80px"
            label-position="left"
            :form-data="formData"
            :form-params="formParams"
          />
        </div>

        <div class="bottom">
          <el-button type="primary" size="small" @click="save">
            保存配置
          </el-button>
          <el-button size="small" @click="restore"> 还原默认 </el-button>
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
    };
  },
  created() {
    this.formData = this.$store.getters.layout;
  },
  methods: {
    handleOpen() {
      this.drawer = true;
    },
    handleClose(done) {
      done();
    },
    save() {
      localStorage.setItem("layoutConfig", JSON.stringify(this.formData));
      this.drawer = false;
    },
    restore() {
      this.$store.commit("removeLayoutConfig");
      this.formData = this.$store.getters.layout;
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
  .content {
    padding: 15px;
    width: 100%;
    height: calc(100% - 100px);
    overflow-y: auto;
  }
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
</style>
