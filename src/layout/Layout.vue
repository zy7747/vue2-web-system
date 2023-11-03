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

  computed: {
    layout() {
      //return this.$store.state.config.layout;
      return { layout: "常规" };
    },
  },
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  background-color: #eaeaed;
}
</style>
