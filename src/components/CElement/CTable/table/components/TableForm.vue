<!--  -->
<template>
  <el-form-item :prop="prop">
    <!-- 输入框 -->
    <c-input
      v-if="column.form.type === 'input'"
      v-bind="column.form"
      v-model="row[prop]"
      v-on="column.on"
    />

    <!-- 数字 -->
    <c-number
      v-else-if="column.form.type === 'number'"
      v-bind="column.form"
      v-model="row[prop]"
      v-on="column.on"
    />

    <c-select
      v-else-if="column.form.type === 'select'"
      v-bind="column.form"
      v-model="row[prop]"
      :options="column.form.options"
      v-on="column.on"
    />

    <!-- 自定义编辑框 -->
    <slot
      v-else-if="column.form.type === 'custom'"
      :name="column.componentName"
    />
  </el-form-item>
</template>

<script>
export default {
  name: "TableForm",
  props: {
    row: {
      text: "行信息",
      type: [Object],
      default: () => {
        return {};
      },
    },
    rowIndex: {
      text: "行下标",
      type: [Number],
    },
    prop: {
      text: "字段",
      type: [String],
    },
    column: {
      text: "列信息",
      type: [Object],
    },
  },
};
</script>

<style lang="scss"></style>
