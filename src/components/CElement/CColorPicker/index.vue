<!--  -->
<template>
  <div>
    <el-color-picker
      v-model="colorValue"
      :size="size"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import baseParams from "./mixins/index";

export default {
  name: "CColorPicker",
  mixins: [baseParams],
  data() {
    return {
      colorValue: this.value,
    };
  },
  watch: {
    value(val) {
      this.colorValue = val;
    },
  },
};
</script>

<style lang="scss" scoped></style>
