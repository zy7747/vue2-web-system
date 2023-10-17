<!--  -->
<template>
  <div>
    <el-time-picker
      v-model="timePickerValue"
      :size="size"
      :clearable="clearable"
      v-bind="$attrs"
      v-on="$listeners"
      :style="`width:${width};min-width:${minWidth};`"
    >
    </el-time-picker>
  </div>
</template>

<script>
import baseParams from "./mixins/index";

export default {
  name: "CTimePicker",
  mixins: [baseParams],
  data() {
    return {
      timePickerValue: this.value,
    };
  },
  watch: {
    value(value) {
      this.timePickerValue = value;
    },
    selectValue(value) {
      this.$emit("input", value);
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
