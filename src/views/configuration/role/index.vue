<!-- 系统角色 system_role -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="$t('role.role')" @reset="resetQueryData" @search="search">
      <template slot="content">
        <CForm
          ref="queryForm"
          :form-data="queryData"
          :form-params="queryParams"
        />
      </template>
    </Collapse>

    <!-- 表单栏 -->
    <el-tabs type="border-card">
      <el-tab-pane :label="$t('role.role')">
        <Toolbar
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          :hasImport="true"
          :imports="{
            url: '/role/import',
            data: {},
          }"
          :exports="{
            api: $service.configuration.role.export,
            fileName: '角色',
            data: {},
          }"
          :permission="{
            add: ['configuration:role:add'],
            delete: ['configuration:role:delete'],
            imports: ['configuration:role:import'],
            exports: ['configuration:role:export'],
          }"
          @addLine="addLine"
          @deleteLines="deleteLines"
        />
        <CTable
          :permission="{
            edit: ['configuration:role:edit'],
            delete: ['configuration:role:delete'],
          }"
          ref="table"
          :query="query"
          :table-column="tableColumn"
          @editLine="editLine"
          @detailLine="detailLine"
          @deleteLine="deleteLine"
          @handleSelectionChange="selection"
        />
      </el-tab-pane>
    </el-tabs>

    <!-- 新增/编辑/详情弹框 -->
    <CDialog
      ref="dialog"
      :title="title"
      width="800px"
      :has-check="dialogType !== 'detail'"
      @handleConfirm="handleConfirm"
    >
      <template slot="body">
        <CCard :title="$t('role.role')">
          <template slot="body">
            <CForm
              ref="form"
              :disabled="dialogType === 'detail'"
              :form-data="formData"
              :form-params="formParams"
            />
          </template>
        </CCard>

        <div style="margin-top: 10px; width: 100%"></div>

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
    </CDialog>
  </div>
</template>
<script>
export default {
  name: "Role",
  data() {
    return {
      //弹框标题
      title: "",
      //多选
      checkList: [],
      //弹框类型
      dialogType: "",
      //查询表单基础参数
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
      //表列基础参数
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
      //新增表单基础参数
      formParams: [
        {
          type: "input",
          label: this.$t("role.roleName"), //角色名称
          prop: "roleName",
          span: 6,
          rules: [
            { required: true, message: "角色名称不能为空", trigger: "blur" },
          ],
          on: {},
        },
        {
          type: "input",
          label: this.$t("role.roleCode"), //角色编码
          prop: "roleCode",
          rules: [
            { required: true, message: "角色编码不能为空", trigger: "blur" },
          ],
          span: 6,
          on: {},
        },
        {
          type: "select",
          label: this.$t("role.status"), //状态
          prop: "status",
          rules: [{ required: true, message: "状态不能为空", trigger: "blur" }],
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
    };
  },
  methods: {
    //1.查询
    query(page, size) {
      return this.$service.configuration.role
        .page({ page, size, ...this.queryData })
        .then((res) => {
          return res.data;
        });
    },
    //新增
    addLine() {
      this.title = "新增";
      this.dialogType = "add";
      this.resetForm();
      this.queryMenu();
      this.$refs.dialog.handleOpen();
    },
    //编辑
    editLine(row, index) {
      this.title = "编辑";
      this.dialogType = "edit";
      this.detail(row.id);
      this.$refs.dialog.handleOpen();
    },
    //详情
    detailLine(row, index) {
      this.title = "详情";
      this.dialogType = "detail";
      this.detail(row.id);
      this.$refs.dialog.handleOpen();
    },
    //提交
    handleConfirm() {
      const menuList = this.$refs.tree.getCheckedKeys();
      // 新增
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.$service.configuration.role
            .saveList([{ ...this.formData, menuList }])
            .then((res) => {
              if (res.code === 200) {
                this.$message.success("提交成功");
                this.search();
                this.$refs.dialog.handleClose();
              } else {
                this.$message.warning(res.message);
              }
            });
        }
      });
    },
    //通过id获取详情
    detail(id) {
      this.$service.configuration.role.detail({ id }).then((res) => {
        this.formData = res.data;
        this.menuCheckList = res.data.menuList;
        this.queryMenu();
      });
    },
    //删除
    deleteLine(row, index) {
      this.$service.configuration.role.delete([row]).then((res) => {
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.search();
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    //批量删除
    deleteLines() {
      this.$modal.confirm("是否删除").then(() => {
        this.$service.configuration.role.delete(this.checkList).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.search();
          } else {
            this.$message.warning(res.message);
          }
        });
      });
    },
    //搜索
    search() {
      this.$refs.table.queryTableData();
    },
    //重置搜索表单数据
    resetQueryData() {
      //重置表单
      this.$refs.queryForm.reset();
      //刷新表格
      this.$refs.table.refreshTable();
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
    //多选
    selection(list) {
      this.checkList = list;
    },
    //搜索框过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
    //查询菜单
    queryMenu() {
      return this.$service.configuration.menu.list().then((res) => {
        this.menuList = this.$handleTree(res.data);
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
