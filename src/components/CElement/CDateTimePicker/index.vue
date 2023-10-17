<!--  -->
<template>
  <div>
    <el-date-picker
      v-model="dateTimePickerValue"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :size="size"
      :clearable="clearable"
      v-bind="$attrs"
      v-on="$listeners"
      :style="`width:${width};min-width:${minWidth};`"
    >
    </el-date-picker>
  </div>
</template>

<script>
import baseParams from "./mixins/index";

export default {
  name: "CDateTimePicker",
  mixins: [baseParams],
  data() {
    return {
      dateTimePickerValue: this.value,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  watch: {
    value(value) {
      this.dateTimePickerValue = value;
    },
    selectValue(value) {
      this.$emit("input", value);
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
