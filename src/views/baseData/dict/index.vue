<!-- 字典 dict -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="'字典'" @reset="resetQueryData" @search="search">
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
      <el-tab-pane label="字典">
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
        />
      </el-tab-pane>
    </el-tabs>
    <!-- 新增/编辑/详情弹框 -->
    <CDialog
      ref="dialog"
      :title="title"
      width="1500px"
      :has-check="title !== '详情'"
      @handleConfirm="handleConfirm"
    >
      <template slot="body">
        <CCard title="字典">
          <template slot="body">
            <CForm ref="form" :form-data="formData" :form-params="formParams" />
          </template>
        </CCard>
        <div style="margin-top: 10px; width: 100%"></div>
        <CCard title="字典集" v-if="title !== '新增'">
          <template slot="body">
            <Toolbar
              v-if="title !== '详情'"
              :isExport="false"
              :delete-btn="{
                disabled: dictSubList.length === 0,
              }"
              @addLine="addDictList"
              @deleteLines="deleteDictLists"
            />
            <CTable
              ref="dictSubList"
              isEditTable
              is-edit-line
              is-delete-line
              @saveForm="saveDictList"
              @deleteLine="deleteDictList"
              :table-data="dictSubListData"
              :table-column="dictListColumn"
              @handleSelectionChange="selectionDictList"
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
          label: "字典名称",
          prop: "dictName",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "字典编码",
          prop: "dictCode",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          label: "状态",
          prop: "status",
          type: "select",
          options: this.getDictData("dict_status"),
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
          label: "序号",
          type: "index",
          width: 55,
        },
        {
          label: "字典名称",
          prop: "dictName",
          width: 150,
          sortable: true,
        },
        {
          label: "字典编码",
          prop: "dictCode",
          sortable: true,
        },
        {
          label: "字典类型",
          prop: "dictType",
          translation: "dict_type",
          sortable: true,
        },
        {
          label: "状态",
          prop: "status",
          width: 150,
          translation: "dict_status",
          sortable: true,
        },
        {
          label: "创建时间",
          prop: "createTime",
          sortable: true,
        },
        {
          label: "更新时间",
          prop: "updateTime",
          sortable: true,
        },
        {
          label: "创建人",
          prop: "creator",
          sortable: true,
        },
        {
          label: "更新人",
          prop: "creator",
          sortable: true,
        },
        {
          label: "操作",
          type: "action",
          fixed: "right",
          width: 160,
        },
      ],
      //数据
      queryData: {
        id: null,
        parentId: null,
        dictName: null,
        dictCode: null,
        dictType: null,
        label: null,
        value: null,
        color: null,
        css: null,
        sort: null,
        params: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
      },
      //新增/修改/详情数据
      formData: {
        id: null,
        parentId: null,
        dictName: null,
        dictCode: null,
        dictType: null,
        label: null,
        value: null,
        color: null,
        css: null,
        sort: null,
        params: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
      },
      //字典集列表数据
      dictSubListData: [],
      //多选字典集数据
      dictSubList: [],
    };
  },
  computed: {
    //新增表单基础参数
    formParams() {
      const that = this;
      return [
        {
          type: "input",
          label: "字典名称",
          prop: "dictName",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "字典编码",
          prop: "dictCode",
          span: 6,
          on: {},
        },
        {
          type: "select",
          label: "字典类型",
          prop: "dictType",
          span: 6,
          options: that.getDictData("dict_type"),
          on: {},
        },
        {
          type: "select",
          label: "状态",
          prop: "status",
          options: that.getDictData("dict_status"),
          span: 6,
          on: {},
        },
      ];
    },
    //字典集列表参数
    dictListColumn() {
      const that = this;
      return [
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
          label: "标签名",
          prop: "label",
          type: "input",
          rules: [
            { required: true, message: "标签名不能为空", trigger: "blur" },
          ],
          width: 150,
          sortable: true,
        },
        {
          label: "值",
          prop: "value",
          type: "input",
          rules: [{ required: true, message: "值不能为空", trigger: "blur" }],
          width: 150,
          sortable: true,
        },
        {
          label: "自定义颜色",
          prop: "color",
          type: "select",
          translation: "dict_color",
          options: that.getDictData("dict_color"),
          width: 150,
          sortable: true,
        },
        {
          label: "排序",
          prop: "sort",
          type: "number",
          width: 150,
          sortable: true,
        },
        {
          label: "状态",
          prop: "status",
          type: "select",
          translation: "dict_status",
          options: that.getDictData("dict_status"),
          rules: [{ required: true, message: "状态不能为空", trigger: "blur" }],
          width: 150,
          sortable: true,
        },
        {
          label: "自定义CSS样式",
          prop: "css",
          type: "input",
          sortable: true,
        },
        {
          label: "创建时间",
          prop: "createTime",
          sortable: true,
        },
        {
          label: "操作",
          type: "action",
          fixed: "right",
          width: 160,
          isDetail: that.title === "详情",
        },
      ];
    },
  },
  methods: {
    //1.查询
    query(page, size) {
      return this.$service.baseData.dict
        .page({ page, size, ...this.queryData })
        .then((res) => {
          return res.data;
        });
    },
    //新增
    addLine() {
      this.title = "新增";
      this.$refs.dialog.handleOpen();
      this.resetForm();
    },
    //编辑
    editLine(row, index) {
      this.title = "编辑";
      this.$refs.dialog.handleOpen();
      this.detail(row.id);
    },
    //提交
    handleConfirm() {
      // 新增
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.$service.baseData.dict.saveList([this.formData]).then((res) => {
            if (res.code === 200) {
              this.$message.success("提交成功");
              this.search();
              this.$refs.dialog.handleClose();
              //修改完字典重新获取
              this.$store.dispatch("GetDict");
            } else {
              this.$message.warning(res.message);
            }
          });
        }
      });
    },
    //详情
    detailLine(row, index) {
      this.title = "详情";
      this.$refs.dialog.handleOpen();
      this.detail(row.id);
    },
    //删除
    deleteLine(row, index) {
      this.$service.baseData.dict.delete([row]).then((res) => {
        this.search();
      });
    },
    //详情
    detail(id) {
      //通过id获取详情
      this.$service.baseData.dict.detail({ id }).then((res) => {
        this.formData = res.data;
        this.dictListDetail(id);
      });
    },
    dictListDetail(id) {
      //获取子集列表
      this.$service.baseData.dict.dictSubList({ parentId: id }).then((res) => {
        //获取数据
        this.dictSubListData = res.data;
        //刷新表单
        this.$refs.dictSubList.refreshForm();
      });
    },
    //批量删除
    deleteLines() {
      this.$modal
        .confirm("是否删除")
        .then(() => {
          this.$service.baseData.dict.delete(this.checkList).then((res) => {
            this.search();
          });
        })
        .catch(() => {});
    },
    //搜索
    search() {
      this.$refs.table.refreshTable();
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
        parentId: null,
        dictName: null,
        dictCode: null,
        dictType: "string",
        label: null,
        value: null,
        color: null,
        css: null,
        sort: null,
        params: null,
        status: "0",
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
      };
    },
    //多选
    selection(list) {
      this.checkList = list;
    },
    //导出
    exportExcel() {
      this.$service.baseData.dict.export().then((res) => {
        this.$download.excel(res, "字典.xls");
      });
    },
    //新增字典集
    addDictList() {
      this.$refs.dictSubList.createForm({ status: "0" });
    },
    //保存字典集
    saveDictList(row, index) {
      //数据处理
      const data = { ...row, parentId: this.formData.id };
      this.$service.baseData.dict.saveList([data]).then((res) => {
        if (res.code === 200) {
          this.$message.success("提交成功");
          this.dictListDetail(this.formData.id);
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    //批量删除字典集
    deleteDictLists() {
      this.$service.baseData.dict.delete(this.dictSubList).then((res) => {
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.dictListDetail(this.formData.id);
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    //删除字典集
    deleteDictList(row, index) {
      this.$service.baseData.dict.delete([row]).then((res) => {
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.dictListDetail(this.formData.id);
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    //多选字典集
    selectionDictList(list) {
      this.dictSubList = list;
    },
  },
};
</script>
<style lang="scss" scoped></style>
