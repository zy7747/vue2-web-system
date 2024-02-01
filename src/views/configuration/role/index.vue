<!--  -->
<template>
  <div>
    <CPage ref="pageRef" :pageOption="pageOption">
      <template slot="dialog_body">
        <CCard title="角色权限">
          <template slot="body">
            <c-tree
              ref="tree"
              :tree="menuList"
              :defaultProps="defaultProps"
              :filter-node-method="filterNode"
              :default-checked-keys="menuCheckList"
              node-key="id"
            />
          </template>
        </CCard>
      </template>
    </CPage>
  </div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {
      //弹框标题
      title: "",
      //弹框类型
      dialogType: "",
      //多选
      checkList: [],
      //数据
      queryData: {
        roleName: null,
        roleCode: null,
        permission: null,
        status: null,
        sort: null,
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
        tenantId: null,
      },
      //新增/修改/详情数据
      formData: {
        id: null,
        roleName: null,
        roleCode: null,
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
      //菜单树形
      menuList: [],
      menuCheckList: [],
      //过滤字段
      filterText: "",
      //菜单树形显示字段
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    pageOption() {
      const self = this;

      return {
        formConfig: {
          title: self.$t("role.role"),
          queryParams: [
            {
              type: "input",
              label: this.$t("role.roleName"), //角色名称
              prop: "roleName",
              span: 6,
              attributes: {},
              on: {},
            },
            {
              type: "select",
              label: this.$t("role.status"), //状态
              prop: "status",
              options: this.getDictData("role_status"),
              span: 6,
              attributes: {},
              on: {},
            },
          ],
        },
        tableConfig: [
          {
            title: self.$t("role.role"),
            tableColumn: [
              {
                type: "selection",
                width: 55,
              },
              {
                label: this.$t("system.no"), //序号
                type: "index",
                width: 55,
              },
              {
                label: this.$t("role.roleName"), //角色名称
                prop: "roleName",
                width: 200,
                sortable: true,
              },
              {
                label: this.$t("role.roleCode"), //角色编码
                prop: "roleCode",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("role.status"), //状态
                prop: "status",
                translation: "role_status",
                width: 100,
                sortable: true,
              },
              {
                label: this.$t("role.remark"), //备注
                prop: "remark",
                width: 150,
                sortable: true,
              },
              {
                label: this.$t("role.creator"), //创建人
                prop: "creator",
                width: 150,
                sortable: true,
                translation: "user",
              },
              {
                label: this.$t("role.updater"), //更新人
                prop: "updater",
                width: 150,
                sortable: true,
                translation: "user",
              },
              {
                label: this.$t("role.createTime"), //创建时间
                prop: "createTime",
                width: 200,
                sortable: true,
              },
              {
                label: this.$t("role.updateTime"), //更新时间
                prop: "updateTime",
                sortable: true,
                width: 200,
              },
              {
                type: "action",
                fixed: "right",
                "min-width": 150,
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
                      self.$service.configuration.role
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
                    return self.$service.configuration.role.import();
                  },
                },
              },
              {
                type: "export",
                permission: ["user:person:export"],
                options: {
                  api() {
                    return self.$service.configuration.role.export();
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
                  self.$service.configuration.role.delete([row]).then((res) => {
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
              return self.$service.configuration.role
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
                self.$service.configuration.role
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
                  label: this.$t("role.roleName"), //角色名称
                  prop: "roleName",
                  span: 6,
                  rules: [
                    {
                      required: true,
                      message: "角色名称不能为空",
                      trigger: "blur",
                    },
                  ],
                  on: {},
                },
                {
                  type: "input",
                  label: this.$t("role.roleCode"), //角色编码
                  prop: "roleCode",
                  rules: [
                    {
                      required: true,
                      message: "角色编码不能为空",
                      trigger: "blur",
                    },
                  ],
                  span: 6,
                  on: {},
                },
                {
                  type: "select",
                  label: this.$t("role.status"), //状态
                  prop: "status",
                  rules: [
                    {
                      required: true,
                      message: "状态不能为空",
                      trigger: "blur",
                    },
                  ],
                  options: this.getDictData("role_status"),
                  span: 6,
                  on: {},
                },
                {
                  type: "input",
                  label: this.$t("role.remark"), //备注
                  prop: "remark",
                  span: 6,
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
      this.$service.configuration.role.detail({ id }).then((res) => {
        this.formData = res.data;
        this.menuCheckList = res.data.menuList;
        this.queryMenu();
      });
    },
    //重置新增修改表单数据
    resetForm() {
      this.menuCheckList = [];

      this.formData = {
        roleName: null,
        roleCode: null,
        permission: null,
        status: "0",
        sort: null,
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
      };
    },
    //查询菜单
    queryMenu() {
      return this.$service.configuration.menu.list().then((res) => {
        this.menuList = this.$handleTree(res.data);
      });
    },
    //搜索框过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
  },
};
</script>

<style lang="scss" scoped></style>
