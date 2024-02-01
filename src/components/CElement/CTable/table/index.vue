<!--  -->
<template>
  <div class="CTable">
    <!-- 基础表单 -->
    <vxeTable
      v-if="tableType === 'vxeTable'"
      ref="basicTable"
      :table-data="cTableData"
      :table-column="tableColumn"
      v-bind="$attrs"
      :loading="loading"
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
  components: {
    elTable,
    vxeTable,
  },
  mixins: [baseParams],
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      loading: false,
      cTableData: this.tableData,
    };
  },
  watch: {
    tableData(val) {
      this.cTableData = val;
    },
  },
  created() {
    // 判断是不是请求，是的话进来会加载一次
    if (this.query) {
      this.queryTableData();
    }
  },
  methods: {
    //1.刷新表单时候重置页数和条数
    refreshTable(page = 1, total = 0) {
      this.page = page;
      this.total = total;
      this.queryTableData();
    },
    //2.修改分页数据时候触发
    pagination({ page, limit }) {
      this.page = page;
      this.limit = limit;
      this.queryTableData(page, limit);
    },
    //3.请求表单数据
    queryTableData(page = this.page, size = this.limit) {
      this.loading = true;

      this.query(page, size)
        .then((data) => {
          if (data) {
            //条数
            this.total = data?.total;
            //修改数据
            this.cTableData = data?.list;
            //请求结束
            this.loading = false;
          } else {
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
          this.total = 0;
          this.cTableData = [];
        });
    },
    //新增行
    createForm(createData) {
      this.$refs.basicTable.createForm(createData);
    },
    //重置table表单数据
    refreshForm() {
      this.$refs.basicTable.refreshForm();
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
