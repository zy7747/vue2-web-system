<!--  -->
<template>
  <div>
    <c-input
      v-if="hasFilter"
      placeholder="输入关键字进行过滤"
      v-model="filterText"
      style="margin-bottom: 15px"
    />
    <el-tree
      ref="elTree"
      v-bind="$attrs"
      v-on="$listeners"
      :data="tree"
      :props="defaultProps"
      :filter-node-method="filterNode"
      show-checkbox
    />
  </div>
</template>

<script>
export default {
  props: {
    hasFilter: {
      text: "是否要过滤输入框",
      type: [Boolean],
      default: true,
    },
    defaultProps: {
      text: "基础参数",
      type: [Object],
      default: () => {
        return {
          children: "children",
          label: "title",
        };
      },
    },
    tree: {
      text: "树行数据",
      type: [Array],
      default: () => {
        return [];
      },
    },
    filterName: {
      text: "过滤字段",
      type: [String],
      default: () => {
        return null;
      },
    },
  },
  data() {
    return {
      filterText: "",
    };
  },
  methods: {
    //搜索框过滤
    filterNode(value, data) {
      if (!value) return true;
      return data[this.filterName]?.indexOf(value) !== -1;
    },
    getCheckedKeys() {
      return this.$refs.elTree.getCheckedKeys();
    },
  },
  watch: {
    filterText(val) {
      this.$refs.elTree.filter(val);
    },
  },
};
</script>

<style lang="scss" scoped></style>
