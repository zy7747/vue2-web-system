<!--  -->
<template>
  <div>
    <CPage ref="pageRef" :pageOption="pageOption"> </CPage>
  </div>
</template>

<script>
export default {
  name: "Permission",
  data() {
    return {
      //弹框标题
      title: "",
      //弹框类型
      dialogType: "",
      //多选
      checkList: [],
      //查询数据
      queryData: {
        id: null,
        parentId: null,
        name: null,
        code: null,
        permission: null,
        type: null,
        sort: null,
        visible: null,
        icon: null,
        description: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
        tenantId: null,
        version: null,
      },
      //新增/修改/详情数据
      formData: {
        id: null,
        parentId: null,
        name: null,
        code: null,
        permission: null,
        type: null,
        sort: null,
        visible: null,
        icon: null,
        description: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
        tenantId: null,
        version: null,
      },
      //表格数据
      tableData: [],
    };
  },
  computed: {
    pageOption() {
      const self = this;

      return {
        formConfig: {
          title: self.$t("permission.permission"),
          queryParams: [
            {
              type: "input",
              label: this.$t("permission.name"), //权限名称
              prop: "name",
              span: 6,
              attributes: {},
              on: {},
            },
            {
              type: "input",
              label: this.$t("permission.permission"), //权限
              prop: "permission",
              span: 6,
              attributes: {},
              on: {},
            },
            {
              type: "select",
              label: this.$t("permission.type"), //类型
              prop: "type",
              options: this.getDictData("permission_type"),
              span: 6,
              attributes: {},
              on: {},
            },
            {
              type: "select",
              label: this.$t("permission.status"), //状态
              prop: "status",
              options: this.getDictData("permission_status"),
              span: 6,
              attributes: {},
              on: {},
            },
          ],
        },
        tableConfig: [
          {
            title: self.$t("permission.permission"),
            tableColumn: [
              {
                type: "selection",
                width: 55,
              },
              {
                label: this.$t("permission.name"), //权限名称
                prop: "name",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("permission.permission"), //权限标识
                prop: "permission",
                sortable: true,
                width: 160,
              },
              {
                label: this.$t("permission.type"), //类型
                prop: "type",
                translation: "permission_type",
                width: 120,
                sortable: true,
              },
              {
                label: this.$t("permission.status"), //状态
                prop: "status",
                translation: "permission_status",
                width: 100,
                sortable: true,
              },
              {
                label: this.$t("permission.creator"), //创建人
                prop: "creator",
                width: 100,
                sortable: true,
                translation: "user",
              },
              {
                label: this.$t("permission.updater"), //更新人
                prop: "updater",
                width: 100,
                sortable: true,
                translation: "user",
              },
              {
                label: this.$t("permission.createTime"), //创建时间
                prop: "createTime",
                sortable: true,
                width: 160,
              },
              {
                label: this.$t("permission.updateTime"), //更新时间
                prop: "updateTime",
                sortable: true,
                width: 160,
              },
              {
                label: this.$t("system.action"), //操作
                type: "action",
                fixed: "right",
                width: 200,
              },
            ],
            tools: [
              {
                type: "add",
                permission: ["user:person:add"],
                on: {
                  click() {
                    self.title = "新增";
                    self.dialogType = "add";
                    self.resetForm();
                    self.queryMenu();
                    self.$refs.pageRef.dialogOpen();
                  },
                },
              },
              {
                type: "remove",
                permission: ["user:person:delete"],
                options: {
                  disabled: self.checkList.length === 0,
                },
                on: {
                  click() {
                    self.$modal.confirm("是否删除").then(() => {
                      self.$service.configuration.permission
                        .delete(self.checkList)
                        .then((res) => {
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
                permission: ["user:person:import"],
                options: {
                  api() {
                    return self.$service.configuration.permission.import();
                  },
                },
              },
              {
                type: "export",
                permission: ["user:person:export"],
                options: {
                  api() {
                    return self.$service.configuration.permission.export();
                  },
                  fileName: "地区",
                },
              },
            ],
            actions: [
              {
                type: "edit",
                permission: [],
                click({ row, index }) {
                  self.title = "编辑";
                  self.dialogType = "edit";
                  self.detail(row.id);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "detail",
                permission: [],
                click({ row, index }) {
                  self.title = "详情";
                  self.dialogType = "detail";
                  self.detail(row.id);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "remove",
                permission: [],
                click({ row, index }) {
                  self.$service.configuration.permission
                    .delete([row])
                    .then((res) => {
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
              return self.$service.configuration.permission
                .page({ page, size, ...self.queryData })
                .then((res) => {
                  return res.data;
                });
            },
            dialogConfig: {
              "has-check": this.dialogType !== "detail",
              formData: this.formData,
              width: "1200px",
              title: this.$t("menu.menu"),
              handleConfirm() {
                // 新增/修改
                self.$service.configuration.permission
                  .saveList([self.formData])
                  .then((res) => {
                    if (res.code === 200) {
                      self.$message.success("提交成功");
                      self.$refs.pageRef.search();
                      self.$refs.pageRef.dialogClose();
                    }
                  });
              },
              formParams: [
                {
                  type: "input",
                  label: this.$t("permission.name"), //权限名称
                  prop: "name",
                  span: 12,
                  on: {},
                },
                {
                  type: "input",
                  label: this.$t("permission.permission"), //权限标识
                  prop: "permission",
                  span: 12,
                  on: {},
                },
                {
                  type: "select",
                  label: this.$t("permission.type"), //类型
                  options: this.getDictData("permission_type"),
                  prop: "type",
                  span: 12,
                  on: {},
                },
                {
                  type: "select",
                  label: this.$t("permission.status"), //状态
                  options: this.getDictData("permission_status"),
                  prop: "status",
                  span: 12,
                  on: {},
                },
              ],
            },
          },
        ],
      };
    },
  },
  methods: {
    //通过id获取详情
    detail(id) {
      this.$service.configuration.permission.detail({ id }).then((res) => {
        if (res.code === 200) {
          this.formData = res.data;
        }
      });
    },
    //重置新增修改表单数据
    resetForm(row = {}) {
      this.formData = {
        id: null,
        parentId: row.id ? row.id : null,
        name: null,
        code: null,
        permission: null,
        type: null,
        sort: null,
        visible: null,
        icon: null,
        description: null,
        status: "0",
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
        tenantId: null,
        version: null,
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
