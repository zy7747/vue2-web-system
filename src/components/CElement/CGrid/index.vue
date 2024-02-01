<!-- 操作日志 operationLog -->
<template>
  <div>
    <CPage ref="pageRef" :pageOption="pageOption"> </CPage>
  </div>
</template>

<script>
export default {
  name: "CGrid",
  props: {
    gridOption: {
      text: "页面数据",
      type: [Array, Object, Function],
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      //弹框标题
      title: "",
      //弹框类型
      dialogType: "",
      //多选
      checkList: [],
      //查询数据
      queryData: {},
      //新增/修改/详情数据
      formData: {},
      //表格数据
      tableData: [],
    };
  },
  computed: {
    api() {
      let api = this.$service;

      this.gridOption.api.split(".").forEach((item) => {
        api = api[item];
      });

      return api;
    },
    pageOption() {
      const self = this;

      return {
        formConfig: {
          title: this.gridOption.title,
          //查询表单基础参数
          queryParams: this.gridOption.queryParams,
        },
        tableConfig: [
          {
            title: this.gridOption.title,
            tableColumn: this.gridOption.tableColumn,
            tools: [
              {
                type: "add",
                permission: [`${this.gridOption.permission}:add`],
                on: {
                  click() {
                    self.title = "新增";
                    self.dialogType = "add";
                    self.resetForm();
                    self.$refs.pageRef.dialogOpen();
                  },
                },
              },
              {
                type: "remove",
                permission: [`${this.gridOption.permission}:delete`],
                options: {
                  disabled: self.checkList.length === 0,
                },
                on: {
                  click() {
                    self.$modal.confirm("是否删除").then(() => {
                      self.api.delete(self.checkList).then((res) => {
                        if (res.code === 200) {
                          self.$message.success("删除成功");
                          self.$refs.pageRef.search();
                        } else {
                          self.$message.warning(res.message);
                        }
                      });
                    });
                  },
                },
              },
              {
                type: "import",
                permission: [`${this.gridOption.permission}:import`],
                options: {
                  api() {
                    return self.api.import();
                  },
                  success() {
                    self.$refs.pageRef.search();
                  },
                },
              },
              {
                type: "export",
                permission: [`${this.gridOption.permission}:export`],
                options: {
                  api() {
                    return self.api.export();
                  },
                  fileName: self.$t("operationLog.operationLog"),
                },
              },
            ],
            actions: [
              {
                type: "edit",
                permission: [`${this.gridOption.permission}:edit`],
                click({ row, index }) {
                  self.title = "编辑";
                  self.dialogType = "edit";
                  self.detail(row.id);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "detail",
                permission: [`${this.gridOption.permission}:detail`],
                click({ row, index }) {
                  self.title = "详情";
                  self.dialogType = "detail";
                  self.detail(row.id);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "remove",
                permission: [`${this.gridOption.permission}:delete`],
                click({ row, index }) {
                  self.api.delete([row]).then((res) => {
                    if (res.code === 200) {
                      self.$message.success("删除成功");
                      self.$refs.pageRef.search();
                    }
                  });
                },
              },
            ],
            options: {
              selection(list) {
                self.checkList = list;
              },
            },
            tableData: this.tableData,
            query: (page, size) => {
              return self.api
                .page({ page, size, ...self.queryData })
                .then((res) => {
                  return res.data;
                });
            },
            dialogConfig: {
              "has-check": this.dialogType !== "detail",
              formData: this.formData,
              width: "800px",
              title: this.gridOption.title,
              handleConfirm() {
                // 新增/修改
                self.api.saveList([self.formData]).then((res) => {
                  if (res.code === 200) {
                    self.$message.success("提交成功");
                    self.$refs.pageRef.search();
                    self.$refs.pageRef.dialogClose();
                  }
                });
              },
              formParams: this.gridOption.formParams,
            },
          },
        ],
      };
    },
  },
  methods: {
    //通过id获取详情
    detail(id) {
      this.api.detail({ id }).then((res) => {
        if (res.code === 200) {
          this.formData = res.data;
        }
      });
    },
    //重置新增修改表单数据
    resetForm() {
      this.formData = {};
    },
  },
};
</script>

<style lang="scss" scoped></style>
