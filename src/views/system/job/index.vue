<!-- 定时任务 job -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="'定时任务'" @reset="resetQueryData" @search="search">
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
      <el-tab-pane label="定时任务">
        <Toolbar
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          @addLine="addLine"
          @deleteLines="deleteLines"
          @exportExcel="exportExcel"
        />
        <CTable
          ref="table"
          is-edit-line
          is-detail-line
          is-delete-line
          :query="query"
          :table-column="tableColumn"
          @editLine="editLine"
          @detailLine="detailLine"
          @deleteLine="deleteLine"
          @handleSelectionChange="selection"
        >
          <template slot="action" slot-scope="{ scope }">
            <c-button
              v-if="scope.row.status === 'run'"
              class="btn"
              text="暂停"
              type="text"
              icon="el-icon-video-pause"
              @click="changeTaskStatus(scope.row)"
            />
            <c-button
              v-if="scope.row.status === 'paused'"
              class="btn"
              text="恢复"
              type="text"
              icon="el-icon-refresh"
              @click="changeTaskStatus(scope.row)"
            />
            <c-button
              v-if="scope.row.status === 'unStarted'"
              class="btn"
              text="运行"
              type="text"
              icon="el-icon-video-play"
              @click="changeTaskStatus(scope.row)"
            />
            <c-button
              v-if="scope.row.status === 'over'"
              class="btn"
              text="重启"
              type="text"
              icon="el-icon-refresh-right"
              @click="changeTaskStatus(scope.row)"
            />
          </template>
        </CTable>
      </el-tab-pane>
    </el-tabs>
    <!-- 新增/编辑/详情弹框 -->
    <CDialog
      ref="dialog"
      :title="title"
      width="1200px"
      :has-check="title !== '详情'"
      @handleConfirm="handleConfirm"
    >
      <template slot="body">
        <CCard title="定时任务">
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
          label: "任务名称",
          prop: "jobName",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "任务编码",
          prop: "jobCode",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "datePicker",
          label: "开始时间",
          prop: "startTime",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: "状态",
          prop: "status",
          span: 6,
          attributes: {},
          options: this.getDictData("job_status"),
          on: {},
        },
      ],
      //数据
      queryData: {
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
      //表列基础参数
      tableColumn: [
        {
          type: "selection",
          width: 55,
        },
        {
          label: "序号",
          type: "index",
          width: 55,
        },
        {
          label: "任务名称",
          prop: "jobName",
          width: 150,
          sortable: true,
        },
        {
          label: "任务编码",
          prop: "jobCode",
          width: 150,
          sortable: true,
        },
        {
          label: "开始时间",
          prop: "startTime",
          width: 150,
          sortable: true,
        },
        {
          label: "剩余执行次数",
          prop: "executeCount",
          width: 150,
          sortable: true,
        },
        {
          label: "执行间隔",
          prop: "executeInterval",
          width: 150,
          sortable: true,
        },
        {
          label: "状态",
          prop: "status",
          translation: "job_status",
          width: 150,
          sortable: true,
        },
        {
          label: "备注",
          prop: "remark",
          width: 150,
          sortable: true,
        },
        {
          label: "创建人",
          prop: "creator",
          width: 150,
          sortable: true,
        },
        {
          label: "更新人",
          prop: "updater",
          width: 150,
          sortable: true,
        },
        {
          label: "创建时间",
          prop: "createTime",
          width: 150,
          sortable: true,
        },
        {
          label: "更新时间",
          prop: "updateTime",
          width: 150,
          sortable: true,
        },
        {
          label: "操作",
          type: "action",
          fixed: "right",
          width: 220,
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
          this.$service.system.job.saveList([this.formData]).then((res) => {
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
    //导出
    exportExcel() {
      this.$service.system.job.export().then((res) => {
        this.$download.excel(res, "定时任务.xls");
      });
    },
    changeTaskStatus(row) {
      console.log(row);
    },
  },
};
</script>
<style lang="scss" scoped></style>
