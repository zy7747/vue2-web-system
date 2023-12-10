<!-- Button  -->
<template>
  <div class="CButton">
    <el-button
      :style="`color:${color}`"
      :size="size"
      v-bind="$attrs"
      v-on="$listeners"
      v-hasPermission="hasPermission"
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
