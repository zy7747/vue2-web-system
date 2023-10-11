<!-- 下拉框组件 -->
<template>
  <div>
    <el-input-number
      ref="CNumber"
      v-model="numValue"
      label="描述文字"
      :disabled="disabled"
      v-bind="$attrs"
      :size="size"
      :clearable="clearable"
      :style="`width:${width};min-width:${minWidth};`"
      v-on="$listeners"
      controls-position="right"
    />
  </div>
</template>

<script>
import baseParams from "./mixins/index";

export default {
  mixins: [baseParams],
  data() {
    return {
      numValue: this.value,
    };
  },
  watch: {
    value(val) {
      this.numValue = val;
    },
    numValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss"></style>
