<!-- 定时任务 job -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="$t('job.job')" @reset="resetQueryData" @search="search">
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
      <el-tab-pane :label="$t('job.job')">
        <Toolbar
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          :hasImport="true"
          :imports="{
            url: '/job/import',
            data: {},
          }"
          :exports="{
            api: $service.system.job.export,
            fileName: '定时任务',
            data: {},
          }"
          :permission="{
            add: ['system:job:add'],
            delete: ['system:job:delete'],
            imports: ['system:job:import'],
            exports: ['system:job:export'],
          }"
          @addLine="addLine"
          @deleteLines="deleteLines"
        />
        <CTable
          :permission="{
            edit: ['system:job:edit'],
            delete: ['system:job:delete'],
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
        <CCard :title="$t('job.job')">
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
  name: "Job",
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
          label: this.$t("job.jobName"), //任务名称
          prop: "jobName",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("job.jobCode"), //任务编码
          prop: "jobCode",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("job.status"), //状态
          prop: "status",
          span: 6,
          attributes: {},
          on: {},
        },
      ],
      //查询数据
      queryData: {
        id: null,
        jobName: null,
        jobCode: null,
        startTime: null,
        executeCount: null,
        executeInterval: null,
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
        },
        {
          label: this.$t("system.no"), //序号
          type: "index",
        },
        {
          label: this.$t("job.jobName"), //任务名称
          prop: "jobName",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("job.jobCode"), //任务编码
          prop: "jobCode",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("job.startTime"), //开始时间
          prop: "startTime",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("job.executeCount"), //执行次数
          prop: "executeCount",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("job.executeInterval"), //执行间隔
          prop: "executeInterval",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("job.status"), //状态
          prop: "status",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("job.creator"), //创建人
          prop: "creator",
          width: 150,
          sortable: true,
          translation: "user",
        },
        {
          label: this.$t("job.updater"), //更新人
          prop: "updater",
          width: 150,
          sortable: true,
          translation: "updater",
        },
        {
          label: this.$t("job.createTime"), //创建时间
          prop: "createTime",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("job.updateTime"), //更新时间
          prop: "updateTime",
          width: 150,
          sortable: true,
        },
        {
          type: "action",
          fixed: "right",
          width: 150,
        },
      ],
      //表格数据
      tableData: [],
      //新增表单基础参数
      formParams: [
        {
          type: "input",
          label: "任务名称",
          prop: "jobName",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "任务编码",
          prop: "jobCode",
          span: 6,
          on: {},
        },
        {
          type: "datePicker",
          label: "开始时间",
          prop: "startTime",
          attributes: {
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
          },
          span: 6,
          on: {},
        },
        {
          type: "number",
          label: "执行次数",
          prop: "executeCount",
          span: 6,
          on: {},
        },
        {
          type: "number",
          label: "执行间隔",
          prop: "executeInterval",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "备注",
          prop: "remark",
          span: 12,
          on: {},
        },
        {
          type: "select",
          label: "状态",
          prop: "status",
          attributes: {
            // disabled: true,
          },
          span: 6,
          options: this.getDictData("job_status"),
          on: {},
        },
      ],
      //新增/修改/详情数据
      formData: {
        id: null,
        jobName: null,
        startTime: null,
        executeCount: null,
        executeInterval: null,
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
      return this.$service.system.job
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
          this.$service.system.job.saveList([this.formData]).then((res) => {
            if (res.code === 200) {
              this.$message.success("提交成功");
              this.search();
              this.$refs.dialog.handleClose();
              this.$refs.table.doLayout();
            } else {
              this.$message.warning(res.message);
            }
          });
        }
      });
    },
    //删除
    deleteLine(row, index) {
      this.$service.system.job.delete([row]).then((res) => {
        this.search();
      });
    },
    //通过id获取详情
    detail(id) {
      this.$service.system.job.detail({ id }).then((res) => {
        this.formData = res.data;
      });
    },
    //批量删除
    deleteLines() {
      this.$modal
        .confirm("是否删除")
        .then(() => {
          this.$service.system.job.delete(this.checkList).then((res) => {
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
        jobName: null,
        startTime: null,
        executeCount: null,
        executeInterval: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
        tenantId: null,
        version: null,
      });
    },
    //多选
    selection(list) {
      this.checkList = list;
    },
    changeTaskStatus(row) {
      console.log(row);
    },
  },
};
</script>
<style lang="scss" scoped></style>
