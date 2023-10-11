<!-- 主题 横向 -->
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
      <el-main>
        <navbar />
        <app-main />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { Navbar, AppMain, HeaderLine, Logo } from '../components'

export default {
  components: {
    Logo,
    Navbar,
    AppMain,
    HeaderLine
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 200px;
  height: var(--headerHeight);
  background-color: var(--logoColor);
}

.header {
  height: var(--headerHeight);
  display: flex;
  justify-content: space-between;
}

.el-header {
  padding: 0;
  background-color: var(--logoColor);
  height: var(--headerHeight) !important;
}

.el-aside {
  background-color: #d3dce6;
  height: calc(100vh - 50px);
}

.el-main {
  padding-top: 0;
  background-color: #e9eef3;
  height: calc(100vh - 50px);
}
</style>
