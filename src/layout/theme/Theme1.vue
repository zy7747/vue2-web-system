<!-- 主题 常规 -->
<template>
  <div>
    <el-container>
      <el-header>
        <div class="header">
          <div class="logo">
            <logo />
          </div>
          <header-line />
        </div>
      </el-header>

      <el-container class="body">
        <sidebar @widthChange="widthChange" />
        <div class="showBox" :style="`width:${width}px`"></div>
        <el-main>
          <tagsView />
          <appMain />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Sidebar, HeaderLine, Logo, AppMain, TagsView } from "../components";

export default {
  data() {
    return {
      width: 250,
    };
  },
  methods: {
    widthChange(value) {
      if (value) {
        this.width = 80;
      } else {
        this.width = 250;
      }
    },
  },
  components: {
    Sidebar,
    HeaderLine,
    Logo,
    AppMain,
    TagsView,
  },
};
</script>

<style lang="scss" scoped>
.logo {
  padding-left: 20px;
  height: var(--headerHeight);
}

.header {
  height: var(--headerHeight);
  display: flex;
  background-position: center, top right, bottom left;
  background-repeat: no-repeat;
  justify-content: space-between;
}

.el-header {
  border-radius: 30px;
  overflow: hidden;
  margin: 5px 5px 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  padding: 0;
  background: var(--headerBackground);
  height: var(--headerHeight) !important;
}

.body {
  position: relative;
  height: calc(100vh - var(--headerHeight) - 5px);
  .showBox {
    height: 100%;
    transition: width 0.5s ease;
  }

  .el-main {
    width: 100%;
    height: 100%;
    padding: 15px;
  }
}
</style>
