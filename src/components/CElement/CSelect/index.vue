<!-- 下拉框组件 -->
<template>
  <div>
    <el-select
      ref="CSelect"
      v-model="selectValue"
      v-bind="$attrs"
      :filterable="filterable"
      :disabled="disabled"
      :clearable="clearable"
      :placeholder="placeholder"
      :size="size"
      :style="`width:${width};min-width:${minWidth};`"
      v-on="{
        ...$listeners,
        change: onChange,
      }"
    >
      <vxe-list auto-resize :data="options" :scroll-y="{ enabled: true }">
        <template #default="{ items }">
          <template v-for="item in items">
            <el-option
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </template>
        </template>
      </vxe-list>
    </el-select>
  </div>
</template>

<script>
import baseParams from "./mixins/index";
import lodash from "lodash";

export default {
  name: "CSelect",
  mixins: [baseParams],
  data() {
    return {
      selectValue: this.value,
    };
  },
  watch: {
    value(value) {
      if (Array.isArray(value)) {
        this.selectValue = value;
        //this.selectValue = value.join(",");
      } else {
        this.selectValue = value;
      }
    },
    selectValue(value) {
      this.$emit("input", value);
    },
  },
  methods: {
    //下拉框change事件返回值和下拉框 传入的数据
    onChange(value) {
      //找到label 和 value
      const data = lodash.find(this.options, (item) => item.value === value);
      this.$emit("change", value, data, this.options);
    },
  },
};
</script>

<style lang="scss"></style>
