<!-- 权限 permission -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse
      :title="$t('permission.permission')"
      @reset="resetQueryData"
      @search="search"
    >
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
      <el-tab-pane :label="$t('permission.permission')">
        <Toolbar
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          :hasImport="true"
          :imports="{
            url: '/permission/import',
            data: {},
          }"
          :exports="{
            api: $service.configuration.permission.export,
            fileName: '权限',
            data: {},
          }"
          :permission="{
            add: ['configuration:permission:add'],
            delete: ['configuration:permission:delete'],
            imports: ['configuration:permission:import'],
            exports: ['configuration:permission:export'],
          }"
          @addLine="addLine"
          @deleteLines="deleteLines"
        />
        <CTable
          :permission="{
            edit: ['configuration:permission:edit'],
            delete: ['configuration:permission:delete'],
          }"
          row-key="id"
          ref="table"
          :query="query"
          :table-data="tableData"
          :table-column="tableColumn"
          @editLine="editLine"
          @detailLine="detailLine"
          @deleteLine="deleteLine"
          @handleSelectionChange="selection"
        >
          <template slot="action" slot-scope="{ scope }">
            <c-button
              v-if="scope.row.type !== 'data'"
              class="btn"
              :text="$t('system.add')"
              type="text"
              icon="el-icon-plus"
              v-hasPermission="['configuration:permission:add']"
              @click="addLine(scope.row, scope.$index)"
            />
          </template>
        </CTable>
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
        <CCard :title="$t('permission.permission')">
          <template slot="body">
            <CForm
              ref="form"
              :disabled="dialogType === 'detail'"
              :form-data="formData"
              :form-params="formParams"
            />
          </template>
        </CCard>
      </template>
    </CDialog>
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
      //查询表单基础参数
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
      //表列基础参数
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
        },
        {
          label: this.$t("permission.updateTime"), //更新时间
          prop: "updateTime",
          sortable: true,
        },
        {
          label: this.$t("system.action"), //操作
          type: "action",
          fixed: "right",
          width: 200,
        },
      ],
      //表格数据
      tableData: [],
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
    };
  },
  computed: {
    //新增表单基础参数
    formParams() {
      return [
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
      ];
    },
  },
  methods: {
    //1.查询
    query(page, size) {
      return this.$service.configuration.permission
        .page({ page, size, ...this.queryData })
        .then((res) => {
          return res.data;
        });
    },
    //新增
    addLine(row = {}) {
      this.title = "新增";
      this.dialogType = "add";
      this.resetForm(row);
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
      // 新增/修改
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.$service.configuration.permission
            .saveList([this.formData])
            .then((res) => {
              if (res.code === 200) {
                this.$message.success("提交成功");
                this.search();
                this.$refs.dialog.handleClose();
              }
            });
        }
      });
    },
    //通过id获取详情
    detail(id) {
      this.$service.configuration.permission.detail({ id }).then((res) => {
        if (res.code === 200) {
          this.formData = res.data;
        }
      });
    },
    //删除
    deleteLine(row) {
      this.$service.configuration.permission.delete([row]).then((res) => {
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.search();
        }
      });
    },
    //批量删除
    deleteLines() {
      this.$modal.confirm("是否删除").then(() => {
        this.$service.configuration.permission
          .delete(this.checkList)
          .then((res) => {
            if (res.code === 200) {
              this.$message.success("删除成功");
              this.search();
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
    //多选
    selection(list) {
      this.checkList = list;
    },
  },
};
</script>
<style lang="scss" scoped></style>
