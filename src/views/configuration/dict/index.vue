<!-- 字典 dict -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="$t('dict.dict')" @reset="resetQueryData" @search="search">
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
      <el-tab-pane :label="$t('dict.dict')">
        <Toolbar
          :hasImport="true"
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          :imports="{
            url: '/dict/import',
            data: {},
          }"
          :permission="{
            add: ['configuration:dict:add'],
            delete: ['configuration:dict:delete'],
            imports: ['configuration:dict:import'],
            exports: ['configuration:dict:export'],
          }"
          :exports="{
            api: $service.configuration.dict.export,
            fileName: '字典',
            data: {},
          }"
          @addLine="addLine"
          @deleteLines="deleteLines"
        />
        <CTable
          ref="table"
          :permission="{
            edit: ['configuration:dict:edit'],
            delete: ['configuration:dict:delete'],
          }"
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
      width="1400px"
      :has-check="dialogType !== 'detail'"
      @handleConfirm="handleConfirm"
    >
      <template slot="body">
        <Collapse :title="$t('dict.dict')" :isSearch="false">
          <template slot="content">
            <CForm ref="form" :form-data="formData" :form-params="formParams" />
          </template>
        </Collapse>
        <div style="margin-top: 5px; width: 100%"></div>
        <CCard title="字典集" v-if="dialogType !== 'add'">
          <template slot="body">
            <Toolbar
              :has-check="dialogType !== 'detail'"
              :delete-btn="{
                disabled: dictSubList.length === 0,
              }"
              @addLine="addDictList"
              @deleteLines="deleteDictLists"
            />
            <CTable
              ref="dictSubList"
              row-key="id"
              isRowDrop
              isEditTable
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
  name: "Dict",
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
          label: this.$t("dict.dictName"), //字典名称
          prop: "dictName",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("dict.dictCode"), //字典编码
          prop: "dictCode",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          label: this.$t("dict.status"), //状态
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
          label: this.$t("system.no"), //序号
          type: "index",
          width: 55,
        },
        {
          label: this.$t("dict.dictName"), //字典名称
          prop: "dictName",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("dict.dictCode"), //字典编码
          prop: "dictCode",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("dict.dictType"), //字典类型
          prop: "dictType",
          translation: "dict_type",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("dict.status"), //状态
          prop: "status",
          width: 150,
          translation: "dict_status",
          sortable: true,
        },
        {
          label: this.$t("dict.creator"), //创建人
          prop: "creator",
          width: 150,
          sortable: true,
          translation: "user",
        },
        {
          label: this.$t("dict.updater"), //更新人
          prop: "updater",
          width: 150,
          sortable: true,
          translation: "user",
        },
        {
          label: this.$t("dict.createTime"), //创建时间
          prop: "createTime",
          sortable: true,
        },
        {
          label: this.$t("dict.updateTime"), //更新时间
          prop: "updateTime",
          sortable: true,
        },
        {
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
        value: "",
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
        value: "",
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
          label: this.$t("dict.dictName"), //字典名称
          prop: "dictName",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("dict.dictCode"), //字典编码
          prop: "dictCode",
          span: 6,
          on: {},
        },
        {
          type: "select",
          label: this.$t("dict.dictType"), //字典类型
          prop: "dictType",
          span: 6,
          options: that.getDictData("dict_type"),
          on: {},
        },
        {
          type: "select",
          label: this.$t("dict.status"), //状态
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
          label: this.$t("system.no"), //序号
          type: "index",
          width: 55,
        },
        {
          label: this.$t("system.drop to sort"), //名
          type: "sort",
          width: 100,
        },
        {
          label: this.$t("dict.label"), //名
          prop: "label",
          type: "input",
          rules: [
            { required: true, message: "标签名不能为空", trigger: "blur" },
          ],
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("dict.value"), //值
          prop: "value",
          type: "input",
          rules: [{ required: true, message: "值不能为空", trigger: "blur" }],
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("dict.color"), //自定义颜色
          prop: "color",
          type: "select",
          translation: "dict_color",
          options: that.getDictData("dict_color"),
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("dict.sort"), //排序
          prop: "sort",
          type: "number",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("dict.status"), //状态
          prop: "status",
          type: "select",
          translation: "dict_status",
          options: that.getDictData("dict_status"),
          rules: [{ required: true, message: "状态不能为空", trigger: "blur" }],
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("dict.css"), //自定义CSS样式
          prop: "css",
          width: 150,
          type: "input",
          sortable: true,
        },
        {
          label: this.$t("dict.createTime"), //创建时间
          prop: "createTime",
          width: 150,
          sortable: true,
        },
        {
          type: "action",
          fixed: "right",
          width: 160,
          show: that.dialogType !== "detail" ? true : "hidden",
        },
      ];
    },
  },
  methods: {
    //1.查询
    query(page, size) {
      return this.$service.configuration.dict
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
      // 新增
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.$service.configuration.dict
            .saveList([this.formData])
            .then((res) => {
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
    //删除
    deleteLine(row, index) {
      this.$service.configuration.dict.delete([row]).then((res) => {
        this.search();
      });
    },
    //详情
    detail(id) {
      //通过id获取详情
      this.$service.configuration.dict.detail({ id }).then((res) => {
        this.formData = res.data;
        this.dictListDetail(id);
      });
    },
    dictListDetail(id) {
      //获取子集列表
      this.$service.configuration.dict
        .dictSubList({ parentId: id })
        .then((res) => {
          //获取数据
          this.dictSubListData = res.data;
          //刷新表单
          this.$refs.dictSubList.refreshForm();
        });
    },
    //批量删除
    deleteLines() {
      this.$modal.confirm("是否删除").then(() => {
        this.$service.configuration.dict.delete(this.checkList).then((res) => {
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
        value: "",
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
    //新增字典集
    addDictList() {
      this.$refs.dictSubList.createForm({ status: "0" });
    },
    //保存字典集
    saveDictList(row, index) {
      //数据处理
      const data = {
        ...row,
        parentId: this.formData.id,
      };

      this.$service.configuration.dict.saveList([data]).then((res) => {
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
      this.$service.configuration.dict.delete(this.dictSubList).then((res) => {
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
      this.$service.configuration.dict.delete([row]).then((res) => {
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
