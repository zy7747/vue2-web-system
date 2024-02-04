export default {
  props: {
    tableType: {
      text: "数据列表",
      type: [String],
      default: () => {
        return "elTable";
      },
    },
    tableData: {
      text: "数据列表",
      type: [Array, Function],
      default: () => {
        return [];
      },
    },
    tableColumn: {
      text: "列信息",
      type: [Array, Function],
      default: () => {
        return [];
      },
    },
    query: {
      text: "表单请求方法/数据",
      type: [Function],
      default: null,
    },
    hasPagination: {
      text: "是否需要分页",
      type: [Boolean],
      default: () => {
        return true;
      },
    },
  },
  data() {
    return {
      page: 1,
      limit: 20,
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

            if (this.tableType !== "vxeTable") {
              this.$refs.basicTable.$refs.table.bodyWrapper.scrollTop = 0;
            }
          } else {
            this.loading = false;

            if (this.tableType !== "vxeTable") {
              this.$refs.basicTable.$refs.table.bodyWrapper.scrollTop = 0;
            }
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
