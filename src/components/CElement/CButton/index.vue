<!-- Button  -->
<template>
  <div class="CButton">
    <el-button
      v-audio="'button2'"
      :style="`color:${color}`"
      :size="size"
      v-bind="$attrs"
      v-on="$listeners"
    >
      {{ text }}
    </el-button>
  </div>
</template>

<script>
import baseParams from "./mixins/index";

export default {
  name: "CButton",
  mixins: [baseParams],
};
</script>

<style lang="scss" scoped>
.el-button {
  display: flex;
}
</style>
