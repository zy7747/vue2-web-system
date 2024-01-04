<!--  -->
<template>
  <section class="app-main">
    <transition name="el-zoom-in-center" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  // background-color: #fff;
  width: 100%;
  height: calc(100% - var(--tagsViewHeight) - 5px);
  border-radius: 15px;
  overflow: hidden;
  overflow-y: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>
