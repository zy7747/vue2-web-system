<!-- 主题 纵向 -->
<template>
  <div>
    <el-container>
      <el-aside>
        <div class="logo">
          <logo />
        </div>
        <sidebar />
      </el-aside>
      <el-container>
        <el-header>
          <header-line />
        </el-header>
        <el-main>
          <navbar />
          <app-main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, HeaderLine, Logo } from '../components'

export default {
  components: {
    Logo,
    Navbar,
    Sidebar,
    AppMain,
    HeaderLine
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: var(--headerHeight);
  background-color: var(--logoColor);
}

.el-header {
  background-color: pink;
  height: var(--headerHeight) !important;
}

.el-aside {
  background-color: var(--logoColor);
  height: calc(100vh);
}

.el-main {
  padding-top: 0;
  background-color: #eae9f3;
  height: calc(100vh - 50px);
}
</style>
