<!-- 消息通知 notice -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse
      :title="$t('notice.notice')"
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
      <el-tab-pane :label="$t('notice.notice')">
        <Toolbar
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          :imports="{
            url: '/notice/import',
            data: {},
          }"
          :permission="{
            add: ['functional:notice:add'],
            delete: ['functional:notice:delete'],
            imports: ['functional:notice:import'],
            exports: ['functional:notice:export'],
          }"
          :exports="{
            api: $service.functional.notice.export,
            fileName: '消息通知',
            data: {},
          }"
          :hasImport="true"
          @addLine="addLine"
          @deleteLines="deleteLines"
        />
        <CTable
          :permission="{
            edit: ['functional:notice:edit'],
            delete: ['functional:notice:delete'],
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
        <CCard title="消息通知">
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
  name: "Notice",
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
        id: null,
        noticeName: null,
        noticeContent: null,
        pushModule: null,
        type: null,
        isRead: null,
        status: null,
        remark: null,
        receiver: [],
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
          label: this.$t("notice.noticeName"), //消息名称
          prop: "noticeName",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("notice.noticeContent"), //消息内容
          prop: "noticeContent",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("notice.pushModule"), //推送模块
          prop: "pushModule",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("notice.type"), //类型
          prop: "type",
          width: 150,
          sortable: true,
          translation: "notice_type",
        },
        {
          label: this.$t("notice.isRead"), //是否已读
          prop: "isRead",
          width: 150,
          sortable: true,
          translation: "isRead",
        },
        // {
        //   label: this.$t("notice.status"), //状态
        //   prop: "status",
        //   width: 150,
        //   sortable: true,
        //   translation: "notice_status",
        // },
        {
          label: this.$t("notice.receiver"), //接收人
          prop: "receiver",
          width: 150,
          translation: "user",
          sortable: true,
        },
        {
          label: this.$t("notice.creator"), //创建人
          prop: "creator",
          width: 150,
          sortable: true,
          translation: "user",
        },
        {
          label: this.$t("notice.createTime"), //创建时间
          prop: "createTime",
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
      //新增/修改/详情数据
      formData: {
        id: null,
        noticeName: null,
        noticeContent: null,
        pushModule: null,
        type: null,
        isRead: null,
        status: null,
        remark: null,
        receiverList: [],
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
        tenantId: null,
        version: null,
      },
      userList: [],
    };
  },
  created() {
    this.userList = [
      {
        label: "全部",
        value: "1",
        id: "1",
        children: this.getDictData("user"),
      },
    ];
  },
  methods: {
    //1.查询
    query(page, size) {
      return this.$service.functional.notice
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
          this.$service.functional.notice
            .saveList([this.formData])
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
    //删除
    deleteLine(row) {
      this.$service.functional.notice.delete([row]).then((res) => {
        this.search();
      });
    },
    //通过id获取详情
    detail(id) {
      this.$service.functional.notice.detail({ id }).then((res) => {
        this.formData = { ...res.data, receiverList: [res.data.receiver] };
      });
    },
    //批量删除
    deleteLines() {
      this.$modal
        .confirm("是否删除")
        .then(() => {
          this.$service.functional.notice.delete(this.checkList).then((res) => {
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
        noticeName: null,
        noticeContent: null,
        pushModule: null,
        type: null,
        isRead: null,
        status: null,
        remark: null,
        receiverList: [],
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
  },
  computed: {
    //查询表单基础参数
    queryParams() {
      return [
        {
          type: "input",
          label: this.$t("notice.noticeName"), //消息名称
          prop: "noticeName",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: this.$t("notice.type"), //类型
          prop: "type",
          options: this.getDictData("notice_type"),
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: this.$t("notice.isRead"), //是否已读
          prop: "isRead",
          options: this.getDictData("isRead"),
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: this.$t("notice.receiver"), //接收人
          prop: "receiver",
          span: 6,
          options: this.getDictData("user"),
        },
      ];
    },
    //新增表单基础参数
    formParams() {
      return [
        {
          type: "input",
          label: this.$t("notice.noticeName"), //消息名称
          prop: "noticeName",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("notice.pushModule"), //推送模块
          prop: "pushModule",
          span: 6,
          on: {},
        },
        {
          type: "select",
          label: this.$t("notice.type"), //类型
          prop: "type",
          options: this.getDictData("notice_type"),
          span: 6,
          on: {},
        },
        {
          type: "select",
          label: this.$t("notice.isRead"), //是否已读
          prop: "isRead",
          options: this.getDictData("isRead"),
          span: 6,
          on: {},
        },
        {
          type: "selectTree",
          label: this.$t("notice.receiver"), //接收人
          prop: "receiverList",
          options: this.userList,
          attributes: {
            multiple: true,
          },
          span: 24,
          on: {},
        },
        {
          type: "input",
          label: this.$t("notice.noticeContent"), //消息内容
          prop: "noticeContent",
          attributes: {
            type: "textarea",
            autosize: { minRows: 4, maxRows: 4 },
          },
        },
      ];
    },
  },
};
</script>
<style lang="scss" scoped></style>
