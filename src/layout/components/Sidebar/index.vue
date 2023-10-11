<template>
  <div class="menu">
    <draggable-resizable
      drag-handle=".drag"
      :x="15"
      :y="15"
      style="width: 100%"
    >
      <div class="content">
        <div class="isCollapse drag">
          <svg-icon
            icon-class="目录"
            class="icon show-box"
            @click="widthChange"
          />
        </div>
        <el-menu
          class="el-menu-vertical"
          popper-class="menu"
          background-color="#3b4255"
          text-color="#ece5d8"
          :default-active="activeMenu"
          :collapse="isCollapse"
          :unique-opened="true"
          :collapse-transition="true"
          mode="vertical"
        >
          <sidebar-item
            v-for="route in routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </div>
    </draggable-resizable>
  </div>
</template>

<script>
import sidebarItem from "./sidebarItem";

export default {
  components: { sidebarItem },
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;

      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    routes() {
      return this.$store.getters.menu;
    },
  },
  methods: {
    widthChange() {
      this.isCollapse = !this.isCollapse;
      this.$emit("widthChange", this.isCollapse);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-menu {
  border: 0;
}
::v-deep .el-menu-item.is-active {
  display: flex;
  align-items: center;
  background-color: #ece5d8 !important;
  color: #3b4255;
  font-weight: 550;
  border-left: 5px solid #0ece4b;
}

::v-deep .el-submenu__title {
  font-weight: 700;
  color: #fafafa;
  overflow: hidden;
}

.el-menu-vertical:not(.el-menu--collapse) {
  overflow: hidden;
  width: 200px;
  min-height: 400px;
}

.isCollapse {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  padding-top: 15px;
  background-color: #3b4255;
  .show-box {
    font-size: 40px;
    cursor: pointer;
  }
}

::v-deep .el-icon-arrow-down {
  color: #fafafa;
  font-weight: 700;
}

::v-deep .el-icon-arrow-right:before {
  display: none;
}

.menu {
  height: 100%;
  position: absolute;
  z-index: 999999;
}

.content {
  overflow: hidden;
  border-radius: 30px;
  width: 100%;
  z-index: 5;
}
</style>
