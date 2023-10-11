<!--  -->
<template>
  <div>
    <treeselect
      ref="CTreeSelect"
      :filterable="filterable"
      :disabled="disabled"
      :clearable="clearable"
      :placeholder="placeholder"
      :size="size"
      v-model="selectValue"
      :options="options"
      :max-height="200"
      class="custom-treeselect"
      :style="`width:${width};min-width:${minWidth};`"
      v-bind="$attrs"
      :normalizer="(node) => normalizer(node, $attrs.id, $attrs.label)"
      v-on="{
        ...$listeners,
      }"
    />
  </div>
</template>

<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import baseParams from "./mixins";
import lodash from "lodash";

export default {
  name: "CTreeSelect",
  // register the component
  components: { Treeselect },
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
      //   const data = lodash.find(this.options, (item) => item.value === value);
      //   this.$emit("change", value, data, this.options);
    },
    normalizer(node, id = "id", label = "label") {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node[id],
        label: node[label],
        children: node.children,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
// ::v-deep .vue-treeselect__control {
//   height: 34px !important;
// }

// ::v-deep .el-form-item__content {
//   line-height: 34px !important;
// }
</style>
