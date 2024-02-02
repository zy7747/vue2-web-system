<!--  -->
<template>
  <div>
    <div v-if="column.formatter">
      {{ column.formatter(row, row[prop], rowIndex) }}
    </div>

    <!-- 值是数组，切需要翻译的 -->
    <div v-else-if="column.isArrayValue" style="dict-tag-list">
      <dict-tag
        v-for="itemValue in row[prop]"
        :key="itemValue"
        :dict="column.translation"
        :value="itemValue"
      />
    </div>

    <!-- 翻译器 -->
    <dict-tag
      v-else-if="column.translation"
      :dict="column.translation"
      :value="row[prop]"
    />

    <span v-else> {{ row[prop] }}</span>
  </div>
</template>

<script>
export default {
  name: "TranslationColumn",
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

<style lang="scss" scoped></style>
