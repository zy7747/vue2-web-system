<!-- 主框架 -->
<template>
  <div class="app-wrapper">
    <Theme1 v-if="layout.layout === '常规'" />
    <Theme2 v-if="layout.layout === '纵向'" />
    <Theme3 v-if="layout.layout === '横向'" />
  </div>
</template>

<script>
import Theme1 from "./theme/Theme1";
import Theme2 from "./theme/Theme2";
import Theme3 from "./theme/Theme3";

export default {
  name: "Layout",
  components: {
    Theme1,
    Theme2,
    Theme3,
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
