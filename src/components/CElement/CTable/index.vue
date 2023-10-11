<!--  -->
<template>
  <div class="CTable">
    <!-- 基础表单 -->
    <STable
      ref="STable"
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
        slot-scope="{ scope }"
      >
        <slot :name="item.componentName" :scope="scope" />
      </template>

      <!-- 自定义按钮 -->
      <template slot="action" slot-scope="{ scope }">
        <slot name="action" :scope="scope" />
      </template>
    </STable>
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
import STable from "./table/index.vue";
import baseParams from "./mixins/index";

export default {
  name: "CTable",
  components: {
    STable,
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
      this.queryTableData(page, limit);
    },
    //3.请求表单数据
    queryTableData(page = 1, size = 10) {
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
      this.$refs.STable.createForm(createData);
    },
    //保存行
    saveForm() {
      this.$emit("saveForm", row, index, item);
    },
    refreshForm() {
      this.$refs.STable.refreshForm();
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
