<!-- 输入框组件 -->
<template>
  <div>
    <el-input
      class="CInput"
      ref="CInput"
      v-audio="'input'"
      v-model="inputValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :size="size"
      v-bind="$attrs"
      v-on="$listeners"
      :clearable="clearable"
      :style="`width:${width};min-width:${minWidth};`"
    />
  </div>
</template>

<script>
import baseParams from "./mixins/index";

export default {
  mixins: [baseParams],
  data() {
    return {
      inputValue: this.value,
    };
  },
  watch: {
    value(val) {
      this.inputValue = val;
    },
    inputValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss"></style>
