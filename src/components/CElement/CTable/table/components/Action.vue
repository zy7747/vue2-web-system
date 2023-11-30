<!--  -->
<template>
  <div>
    <span class="table-header-icon">
      <el-popover
        placement="top"
        width="80"
        :offset="18"
        trigger="click"
        :visible-arrow="false"
      >
        <i slot="reference" class="el-icon-s-tools" />
        <div class="checkbox-group">
          <el-checkbox @change="handleCheckAllChange"> 全选 </el-checkbox>
          <CCheckbox
            v-model="checkTableColumnList"
            :options="tableColumnCheck"
          />

          <div>保存·重置</div>
        </div>
      </el-popover>
    </span>
    <span> {{ "操作" }}</span>
  </div>
</template>

<script>
export default {
  props: {
    tableColumn: {
      text: "表单列",
      type: [Array],
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      //操作台
      checkTableColumnList: [],
    };
  },
  computed: {
    tableColumnCheck() {
      return this.tableColumn.map((item) => {
        if (item.type === "index") {
          return { ...item, prop: "index", value: "index" };
        }
        if (item.type === "selection") {
          return {
            ...item,
            prop: "selection",
            value: "selection",
            label: "多选框",
          };
        } else {
          return { ...item, value: item.prop };
        }
      });
    },
  },
  methods: {
    //多选操作台
    handleCheckAllChange(value) {
      if (value) {
        this.$set(
          this,
          "checkTableColumnList",
          this.tableColumnCheck.map((item) => item.prop)
        );
      } else {
        this.$set(this, "checkTableColumnList", []);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-header-icon:hover {
  cursor: pointer;
}

.checkbox-group {
  height: 250px;
  overflow-y: auto;
}
</style>
