<!-- 日志 log -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="$t('log.log')" @reset="resetQueryData" @search="search">
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
      <el-tab-pane :label="$t('log.log')">
        <Toolbar
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          :imports="{
            url: '/log/import',
            data: {},
          }"
          :permission="{
            add: ['system:log:add'],
            delete: ['system:log:delete'],
            imports: ['system:log:import'],
            exports: ['system:log:export'],
          }"
          :exports="{
            api: $service.system.log.export,
            fileName: '日志',
            data: {},
          }"
          :hasImport="true"
          @addLine="addLine"
          @deleteLines="deleteLines"
        />
        <CTable
          :permission="{
            edit: ['system:log:edit'],
            delete: ['system:log:delete'],
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
      :has-check="title !== '详情'"
      @handleConfirm="handleConfirm"
    >
      <template slot="body">
        <CCard title="日志">
          <template slot="body">
            <CForm
              ref="form"
              :disabled="title === '详情'"
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
  data() {
    return {
      //弹框标题
      title: "",
      //多选
      checkList: [],
      //查询表单基础参数
      queryParams: [
        {
          type: "input",
          label: this.$t("log.id"), //id
          prop: "id",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.operateModules"), //操作模块
          prop: "operateModules",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.operateContent"), //操作内容
          prop: "operateContent",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.operateType"), //操作类型
          prop: "operateType",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.operatePlace"), //操作地
          prop: "operatePlace",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.remark"), //备注
          prop: "remark",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.time"), //耗时
          prop: "time",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.status"), //状态
          prop: "status",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.creator"), //创建人
          prop: "creator",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.createTime"), //创建时间
          prop: "createTime",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.isDeleted"), //是否删除
          prop: "isDeleted",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.tenantId"), //租户id
          prop: "tenantId",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.version"), //乐观锁
          prop: "version",
          span: 6,
          attributes: {},
          on: {},
        },
      ],
      //数据
      queryData: {
        id: null,
        operateModules: null,
        operateContent: null,
        operateType: null,
        operatePlace: null,
        remark: null,
        time: null,
        status: null,
        creator: null,
        createTime: null,
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
          label: this.$t("system.no"), //序号
          type: "index",
          width: 55,
        },
        {
          label: this.$t("log.id"), //id
          prop: "id",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("log.operateModules"), //操作模块
          prop: "operateModules",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("log.operateContent"), //操作内容
          prop: "operateContent",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("log.operateType"), //操作类型
          prop: "operateType",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("log.operatePlace"), //操作地
          prop: "operatePlace",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("log.remark"), //备注
          prop: "remark",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("log.time"), //耗时
          prop: "time",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("log.status"), //状态
          prop: "status",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("log.creator"), //创建人
          prop: "creator",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("log.createTime"), //创建时间
          prop: "createTime",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("log.isDeleted"), //是否删除
          prop: "isDeleted",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("log.tenantId"), //租户id
          prop: "tenantId",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("log.version"), //乐观锁
          prop: "version",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("system.action"), //操作
          type: "action",
          fixed: "right",
          width: 160,
        },
      ],
      //表格数据
      tableData: [],
      //新增表单基础参数
      formParams: [
        {
          type: "input",
          label: this.$t("log.id"), //id
          prop: "id",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.operateModules"), //操作模块
          prop: "operateModules",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.operateContent"), //操作内容
          prop: "operateContent",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.operateType"), //操作类型
          prop: "operateType",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.operatePlace"), //操作地
          prop: "operatePlace",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.remark"), //备注
          prop: "remark",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.time"), //耗时
          prop: "time",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.status"), //状态
          prop: "status",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.creator"), //创建人
          prop: "creator",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.createTime"), //创建时间
          prop: "createTime",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.isDeleted"), //是否删除
          prop: "isDeleted",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.tenantId"), //租户id
          prop: "tenantId",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("log.version"), //乐观锁
          prop: "version",
          span: 6,
          on: {},
        },
      ],
      //新增/修改/详情数据
      formData: {
        id: null,
        operateModules: null,
        operateContent: null,
        operateType: null,
        operatePlace: null,
        remark: null,
        time: null,
        status: null,
        creator: null,
        createTime: null,
        isDeleted: null,
        tenantId: null,
        version: null,
      },
    };
  },
  methods: {
    //1.查询
    query(page, size) {
      return this.$service.system.log
        .page({ page, size, ...this.queryData })
        .then((res) => {
          return res.data;
        });
    },
    //新增
    addLine() {
      this.title = "新增";
      this.resetForm();
      this.$refs.dialog.handleOpen();
    },
    //编辑
    editLine(row, index) {
      this.title = "编辑";
      this.detail(row.id);
      this.$refs.dialog.handleOpen();
    },
    //详情
    detailLine(row, index) {
      this.title = "详情";
      this.detail(row.id);
      this.$refs.dialog.handleOpen();
    },
    //提交
    handleConfirm() {
      // 新增/修改
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.$service.system.log.saveList([this.formData]).then((res) => {
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
    //删除
    deleteLine(row) {
      this.$service.system.log.delete([row]).then((res) => {
        this.search();
      });
    },
    //通过id获取详情
    detail(id) {
      this.$service.system.log.detail({ id }).then((res) => {
        this.formData = res.data;
      });
    },
    //批量删除
    deleteLines() {
      this.$modal
        .confirm("是否删除")
        .then(() => {
          this.$service.system.log.delete(this.checkList).then((res) => {
            this.search();
          });
        })
        .catch(() => {});
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
      this.$set(this, "formData", {
        id: null,
        operateModules: null,
        operateContent: null,
        operateType: null,
        operatePlace: null,
        remark: null,
        time: null,
        status: null,
        creator: null,
        createTime: null,
        isDeleted: null,
        tenantId: null,
        version: null,
      });
    },
    //多选
    selection(list) {
      this.checkList = list;
    },
  },
};
</script>
<style lang="scss" scoped></style>
