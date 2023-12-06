<!-- 支付功能 pay -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="'支付功能'" @reset="resetQueryData" @search="search">
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
      <el-tab-pane label="支付功能">
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
        <CCard title="支付功能">
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
          label: "id",
          prop: "id",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "订单ID",
          prop: "orderId",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "支付功能",
          prop: "payment",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "支付方式",
          prop: "payWay",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "支付银行卡/支付宝/微信号",
          prop: "cardNum",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "支付用户",
          prop: "payUser",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "支付金额",
          prop: "payNum",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "支付时间",
          prop: "payTime",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "货币",
          prop: "currency",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "状态",
          prop: "status",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "备注",
          prop: "remark",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "创建人",
          prop: "creator",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "更新人",
          prop: "updater",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "创建时间",
          prop: "createTime",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "更新时间",
          prop: "updateTime",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "是否删除",
          prop: "isDeleted",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "租户id",
          prop: "tenantId",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "乐观锁",
          prop: "version",
          span: 6,
          attributes: {},
          on: {},
        },
      ],
      //数据
      queryData: {
        id: null,
        orderId: null,
        payment: null,
        payWay: null,
        cardNum: null,
        payUser: null,
        payNum: null,
        payTime: null,
        currency: null,
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
          label: "id",
          prop: "id",
          width: 150,
          sortable: true,
        },
        {
          label: "订单ID",
          prop: "orderId",
          width: 150,
          sortable: true,
        },
        {
          label: "支付功能",
          prop: "payment",
          width: 150,
          sortable: true,
        },
        {
          label: "支付方式",
          prop: "payWay",
          width: 150,
          sortable: true,
        },
        {
          label: "支付银行卡/支付宝/微信号",
          prop: "cardNum",
          width: 150,
          sortable: true,
        },
        {
          label: "支付用户",
          prop: "payUser",
          width: 150,
          sortable: true,
        },
        {
          label: "支付金额",
          prop: "payNum",
          width: 150,
          sortable: true,
        },
        {
          label: "支付时间",
          prop: "payTime",
          width: 150,
          sortable: true,
        },
        {
          label: "货币",
          prop: "currency",
          width: 150,
          sortable: true,
        },
        {
          label: "状态",
          prop: "status",
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
          label: "是否删除",
          prop: "isDeleted",
          width: 150,
          sortable: true,
        },
        {
          label: "租户id",
          prop: "tenantId",
          width: 150,
          sortable: true,
        },
        {
          label: "乐观锁",
          prop: "version",
          width: 150,
          sortable: true,
        },
        {
          label: "操作",
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
          label: "id",
          prop: "id",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "订单ID",
          prop: "orderId",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "支付功能",
          prop: "payment",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "支付方式",
          prop: "payWay",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "支付银行卡/支付宝/微信号",
          prop: "cardNum",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "支付用户",
          prop: "payUser",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "支付金额",
          prop: "payNum",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "支付时间",
          prop: "payTime",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "货币",
          prop: "currency",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "状态",
          prop: "status",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "备注",
          prop: "remark",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "创建人",
          prop: "creator",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "更新人",
          prop: "updater",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "创建时间",
          prop: "createTime",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "更新时间",
          prop: "updateTime",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "是否删除",
          prop: "isDeleted",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "租户id",
          prop: "tenantId",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "乐观锁",
          prop: "version",
          span: 6,
          on: {},
        },
      ],
      //新增/修改/详情数据
      formData: {
        id: null,
        orderId: null,
        payment: null,
        payWay: null,
        cardNum: null,
        payUser: null,
        payNum: null,
        payTime: null,
        currency: null,
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
      return this.$service.functional.pay
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
          this.$service.functional.pay.saveList([this.formData]).then((res) => {
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
      this.$service.functional.pay.delete([row]).then((res) => {
        this.search();
      });
    },
    //通过id获取详情
    detail(id) {
      this.$service.functional.pay.detail({ id }).then((res) => {
        this.formData = res.data;
      });
    },
    //批量删除
    deleteLines() {
      this.$modal
        .confirm("是否删除")
        .then(() => {
          this.$service.functional.pay.delete(this.checkList).then((res) => {
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
        orderId: null,
        payment: null,
        payWay: null,
        cardNum: null,
        payUser: null,
        payNum: null,
        payTime: null,
        currency: null,
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
      this.$service.functional.pay.export().then((res) => {
        this.$download.excel(res, "支付功能.xls");
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
