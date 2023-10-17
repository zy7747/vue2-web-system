<!-- 下拉框组件 -->
<template>
  <div>
    <el-date-picker
      ref="CDatePicker"
      v-model="datePickerValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :size="size"
      :clearable="clearable"
      :format="format"
      :value-format="valueFormat"
      v-bind="$attrs"
      v-on="$listeners"
      :style="`width:${width};min-width:${minWidth};`"
    />
  </div>
</template>

<script>
import baseParams from "./mixins/index";

export default {
  name: "CDatePicker",
  mixins: [baseParams],
  data() {
    return {
      datePickerValue: this.value,
    };
  },
  watch: {
    value(value) {
      this.datePickerValue = value;
    },
  },
  methods: {},
};
</script>

<style lang="scss"></style>
