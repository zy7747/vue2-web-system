<!--  -->
<template>
  <div class="treeSelect">
    <treeselect
      ref="CTreeSelect"
      appendToBody
      z-index="9999"
      :filterable="filterable"
      :disabled="disabled"
      :clearable="clearable"
      :placeholder="placeholder"
      v-model="selectValue"
      :options="options"
      :max-height="200"
      noResultsText=""
      :style="`width:${width};min-width:${minWidth};`"
      v-bind="$attrs"
      :normalizer="(node) => normalizer(node, $attrs.id, $attrs.label)"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import baseParams from "./mixins";

export default {
  name: "CTreeSelect",
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
::v-deep .vue-treeselect__control {
  line-height: 32px !important;
  height: 32px !important;
  overflow: hidden;
}

::v-deep .vue-treeselect__input {
  height: 32px !important;
}

.treeSelect {
  padding-top: 4px;
  height: 40px;
  width: 100%;
  overflow: hidden;
}
</style>
