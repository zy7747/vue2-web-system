<!-- switch -->
<template>
  <div>
    <el-switch
      v-model="switchValue"
      active-color="#e9ac3c"
      inactive-color="#455781"
      v-bind="$attrs"
      v-on="$listeners"
    >
    </el-switch>
  </div>
</template>

<script>
import baseParams from "./mixins/index";

export default {
  name: "CSwitch",
  mixins: [baseParams],
  data() {
    return {
      switchValue: this.value,
    };
  },
  watch: {
    value(value) {
      this.selectValue = value;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-switch__core::after {
  background-color: #e4e0d7 !important;
}
</style>
