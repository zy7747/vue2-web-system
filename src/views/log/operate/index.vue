<!-- 操作日志 operationLog -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse
      :title="$t('operationLog.operationLog')"
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
      <el-tab-pane :label="$t('operationLog.operationLog')">
        <Toolbar
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          :hasImport="true"
          :imports="{
            url: '/operationLog/import',
            data: {},
          }"
          :exports="{
            api: $service.log.operationLog.export,
            fileName: '操作日志',
            data: {},
          }"
          :permission="{
            add: ['log:operationLog:add'],
            delete: ['log:operationLog:delete'],
            imports: ['log:operationLog:import'],
            exports: ['log:operationLog:export'],
          }"
          @addLine="addLine"
          @deleteLines="deleteLines"
        />
        <CTable
          :permission="{
            edit: ['log:operationLog:edit'],
            delete: ['log:operationLog:delete'],
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
        <CCard :title="$t('operationLog.operationLog')">
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
  name: "OperationLog",
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
          label: this.$t("operationLog.title"), //标题
          prop: "title",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.type"), //操作类型
          prop: "type",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: this.$t("operationLog.status"), //状态
          options: this.getDictData("operationLog_status"),
          prop: "status",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.creator"), //创建人
          prop: "creator",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.createTime"), //创建时间
          prop: "createTime",
          span: 6,
          attributes: {},
          on: {},
        },
      ],
      //查询数据
      queryData: {
        id: null,
        title: null,
        module: null,
        content: null,
        type: null,
        operateIp: null,
        operatePlace: null,
        time: null,
        errorMsg: null,
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
          label: this.$t("system.no"), //序号
          type: "index",
          width: 55,
        },
        {
          label: this.$t("operationLog.title"), //标题
          prop: "title",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("operationLog.module"), //操作模块
          prop: "module",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("operationLog.content"), //操作内容
          prop: "content",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("operationLog.type"), //操作类型
          prop: "type",
          width: 150,
          sortable: true,
          translation: "operate_type",
        },
        {
          label: this.$t("operationLog.status"), //状态
          prop: "status",
          width: 150,
          sortable: true,
          translation: "operationLog_status",
        },
        {
          label: this.$t("operationLog.operateIp"), //操作IP
          prop: "operateIp",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("operationLog.operatePlace"), //操作地
          prop: "operatePlace",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("operationLog.time"), //耗时
          prop: "time",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("operationLog.errorMsg"), //错误信息
          prop: "errorMsg",
          width: 150,
          sortable: true,
        },

        {
          label: this.$t("operationLog.creator"), //创建人
          prop: "creator",
          width: 150,
          sortable: true,
          translation: "user",
        },
        {
          label: this.$t("operationLog.createTime"), //创建时间
          prop: "createTime",
          width: 150,
          sortable: true,
        },
      ],
      //表格数据
      tableData: [],
      //新增表单基础参数
      formParams: [
        {
          type: "input",
          label: this.$t("operationLog.id"), //id
          prop: "id",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.title"), //标题
          prop: "title",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.module"), //操作模块
          prop: "module",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.content"), //操作内容
          prop: "content",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.type"), //操作类型
          prop: "type",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.operateIp"), //操作IP
          prop: "operateIp",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.operatePlace"), //操作地
          prop: "operatePlace",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.time"), //耗时
          prop: "time",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.errorMsg"), //错误信息
          prop: "errorMsg",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.status"), //状态
          prop: "status",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.remark"), //备注
          prop: "remark",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.creator"), //创建人
          prop: "creator",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.updater"), //更新人
          prop: "updater",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.createTime"), //创建时间
          prop: "createTime",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.updateTime"), //更新时间
          prop: "updateTime",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.isDeleted"), //是否删除
          prop: "isDeleted",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.tenantId"), //租户id
          prop: "tenantId",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("operationLog.version"), //乐观锁
          prop: "version",
          span: 6,
          on: {},
        },
      ],
      //新增/修改/详情数据
      formData: {
        id: null,
        title: null,
        module: null,
        content: null,
        type: null,
        operateIp: null,
        operatePlace: null,
        time: null,
        errorMsg: null,
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
  methods: {
    //1.查询
    query(page, size) {
      return this.$service.log.operationLog
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
          this.$service.log.operationLog
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
      this.$service.log.operationLog.detail({ id }).then((res) => {
        if (res.code === 200) {
          this.formData = res.data;
        }
      });
    },
    //删除
    deleteLine(row) {
      this.$service.log.operationLog.delete([row]).then((res) => {
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.search();
        }
      });
    },
    //批量删除
    deleteLines() {
      this.$modal.confirm("是否删除").then(() => {
        this.$service.log.operationLog.delete(this.checkList).then((res) => {
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
    resetForm() {
      this.formData = {
        id: null,
        title: null,
        module: null,
        content: null,
        type: null,
        operateIp: null,
        operatePlace: null,
        time: null,
        errorMsg: null,
        status: null,
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
