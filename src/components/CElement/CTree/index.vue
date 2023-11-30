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
      check-strictly
      @check-change="checkChange"
      @check="check"
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
  },
  data() {
    return {
      filterText: "",
      checkNodeStatus: false,
    };
  },
  methods: {
    //搜索框过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
    checkChange(data, check) {
      this.checkNodeStatus = check;
      // 父节点操作
      if (data.parentId !== null) {
        if (check === true) {
          // 如果选中，设置父节点为选中
          this.$refs.elTree.setChecked(data.parentId, true);
        } else {
          // 如果取消选中，检查父节点是否该取消选中（可能仍有子节点为选中状态）
          var parentNode = this.$refs.elTree.getNode(data.parentId);
          var parentHasCheckedChild = false;

          for (
            var i = 0, parentChildLen = parentNode.childNodes.length;
            i < parentChildLen;
            i++
          ) {
            if (parentNode.childNodes[i].checked === true) {
              parentHasCheckedChild = true;
              break;
            }
          }

          if (!parentHasCheckedChild)
            this.$refs.elTree.setChecked(data.parentId, false);
        }
      }

      // 子节点操作，如果取消选中，取消子节点选中
      if (data.children != null && check === false) {
        data.children.forEach((item, index) => {
          var childNode = this.$refs.elTree.getNode(data.children[index].id);
          if (childNode.checked === true) {
            this.$refs.elTree.setChecked(childNode.data.id, false);
          }
        });
      }
    },
    check(data) {
      // 全选子节点操作，当选择中子节点切子节点有children
      if (data.children != null && this.checkNodeStatus === true) {
        data.children.forEach((item, index) => {
          this.$refs.elTree.setChecked(item.id, true);

          if (item.children) {
            this.check(item);
          }
        });
      }
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
