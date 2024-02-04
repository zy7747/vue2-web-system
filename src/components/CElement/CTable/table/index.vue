<!--  -->
<template>
  <div class="CTable">
    <!-- 基础表单 -->
    <vxeTable
      v-if="tableType === 'vxeTable'"
      ref="basicTable"
      :table-data="cTableData"
      :table-column="tableColumn"
      :loading="loading"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- 自定义组件 -->
      <template
        v-for="item in tableColumn"
        :slot="item.componentName"
        slot-scope="{ row, index, column }"
      >
        <slot :name="item.componentName" :row="row" :index="index" />
      </template>
    </vxeTable>

    <elTable
      v-else
      ref="basicTable"
      :table-data="cTableData"
      :table-column="tableColumn"
      :loading="loading"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template
        v-for="item in tableColumn"
        :slot="item.componentName"
        slot-scope="{ row, index, column }"
      >
        <slot :name="item.componentName" :row="row" :index="index" />
      </template>
    </elTable>

    <!-- 分页 -->
    <div class="pagination">
      <pagination
        v-if="hasPagination && total > 0"
        :total="total"
        :page.sync="page"
        :limit.sync="limit"
        @pagination="pagination"
      />
    </div>
  </div>
</template>

<script>
import elTable from "./el-table";
import vxeTable from "./vxe-table";
import baseParams from "./mixins/base";

export default {
  name: "BTable",
  mixins: [baseParams],
  components: {
    elTable,
    vxeTable,
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

::v-deep .pagination-container {
  padding: 10px 16px !important;
}
</style>
