<!-- 下拉框组件 -->
<template>
  <div>
    <el-input
      class="CInput"
      ref="CInput"
      v-model="inputValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :size="size"
      v-bind="$attrs"
      :clearable="clearable"
      :style="`width:${width};min-width:${minWidth};`"
      v-on="$listeners"
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

<style lang="scss">
// .CInput {
//   input {
//     background-color: #3a4684;
//     color: #fff;
//     font-weight: 550;
//     border: 0;
//   }

//   input::placeholder {
//     color: #e1e0e0;
//     font-weight: 400;
//     opacity: 0.8;
//   }
// }
</style>
