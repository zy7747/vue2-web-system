<!-- 主框架 -->
<template>
  <div class="app-wrapper">
    <Theme1 v-if="layout.layout === '常规'" />
  </div>
</template>

<script>
import Theme1 from "./theme/Theme1";

export default {
  name: "Layout",
  components: {
    Theme1,
  },
  created() {
    console.log("加载样式");
  },
  computed: {
    layout() {
      return this.$store.state.config.layout;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  background-color: #eaeaed;
}
</style>
