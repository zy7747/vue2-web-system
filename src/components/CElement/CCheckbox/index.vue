<!-- 下拉框组件 -->
<template>
  <div>
    <el-checkbox-group v-model="checkedValue" v-bind="$attrs" v-on="$listeners">
      <el-checkbox
        v-for="(item, index) in options"
        :key="index"
        :label="item.value"
        >{{ item.label }}</el-checkbox
      >
    </el-checkbox-group>
  </div>
</template>

<script>
import baseParams from "./mixins/index";

export default {
  name: "CCheckbox",
  mixins: [baseParams],
  data() {
    return {
      checkedValue: this.value,
    };
  },
  watch: {
    value(val) {
      this.checkedValue = val;
    },
    checkedValue(value) {
      this.$emit("change", value);
    },
  },
};
</script>

<style lang="scss"></style>
