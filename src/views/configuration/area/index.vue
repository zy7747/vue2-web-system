<!-- 地区 area -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="$t('area.area')" @reset="resetQueryData" @search="search">
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
      <el-tab-pane :label="$t('area.area')">
        <Toolbar
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          :hasImport="true"
          :imports="{
            url: '/area/import',
            data: {},
          }"
          :exports="{
            api: $service.configuration.area.export,
            fileName: '地区',
            data: {},
          }"
          :permission="{
            add: ['configuration:area:add'],
            delete: ['configuration:area:delete'],
            imports: ['configuration:area:import'],
            exports: ['configuration:area:export'],
          }"
          @addLine="addLine"
          @deleteLines="deleteLines"
        />
        <CTable
          :permission="{
            edit: ['configuration:area:edit'],
            delete: ['configuration:area:delete'],
          }"
          ref="table"
          lazy
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'id' }"
          :load="load"
          :query="query"
          :table-data="tableData"
          :table-column="tableColumn"
          @editLine="editLine"
          @detailLine="detailLine"
          @deleteLine="deleteLine"
          @handleSelectionChange="selection"
        >
          <template slot="icon" slot-scope="{ scope }">
            <div style="width: 100px; font-size: 30px">
              <svg-icon
                :icon-class="scope.row.icon ? scope.row.icon : ''"
                class="icon"
              />
            </div>
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
        <CCard :title="$t('area.area')">
          <template slot="body">
            <CForm
              ref="form"
              :disabled="dialogType === 'detail'"
              :form-data="formData"
              :form-params="formParams"
            >
              <template slot="icon">
                <IconSelect
                  :loadIconList="['flagIcon']"
                  v-model="formData.icon"
                />
              </template>
            </CForm>
          </template>
        </CCard>
      </template>
    </CDialog>
  </div>
</template>
<script>
export default {
  name: "Area",
  data() {
    return {
      //弹框标题
      title: "",
      //弹框类型
      dialogType: "",
      //多选
      checkList: [],
      areaList: [],
      areaTree: [],
      //查询表单基础参数
      queryParams: [
        {
          type: "input",
          label: this.$t("area.name"), //名称
          prop: "name",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.cname"), //中文名称
          prop: "cname",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.fullName"), //全称
          prop: "fullName",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.fullCname"), //中文全称
          prop: "fullCname",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.otherName"), //别称
          prop: "otherName",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.address"), //地址
          prop: "address",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.type"), //区域类型
          prop: "type",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.code"), //区域编码
          prop: "code",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.axis"), //坐标
          prop: "axis",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.acreage"), //面积
          prop: "acreage",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.population"), //人口
          prop: "population",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.climate"), //气候
          prop: "climate",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.capital"), //首都
          prop: "capital",
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
        cname: null,
        fullName: null,
        fullCname: null,
        otherName: null,
        address: null,
        type: null,
        code: null,
        axis: null,
        acreage: null,
        population: null,
        climate: null,
        capital: null,
        sort: null,
        level: null,
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
        },
        {
          label: this.$t("system.no"), //序号
          type: "index",
        },
        {
          label: this.$t("system.show"),
          prop: "show",
          fixed: "left",
        },
        // {
        //   label: this.$t("area.id"), //id
        //   prop: "id",
        //   width: 150,
        //   sortable: true,
        // },
        // {
        //   label: this.$t("area.parentId"), //父节点id
        //   prop: "parentId",
        //   width: 150,
        //   sortable: true,
        // },
        {
          label: this.$t("area.icon"), //地区图标
          prop: "icon",
          width: 150,
          sortable: true,
          type: "custom",
          componentName: "icon",
        },
        {
          label: this.$t("area.name"), //名称
          prop: "name",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("area.cname"), //中文名称
          prop: "cname",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("area.fullName"), //全称
          prop: "fullName",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("area.fullCname"), //中文全称
          prop: "fullCname",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("area.otherName"), //别称
          prop: "otherName",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("area.address"), //地址
          prop: "address",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("area.type"), //区域类型
          prop: "type",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("area.code"), //区域编码
          prop: "code",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("area.axis"), //坐标
          prop: "axis",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("area.acreage"), //面积
          prop: "acreage",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("area.population"), //人口
          prop: "population",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("area.climate"), //气候
          prop: "climate",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("area.capital"), //首都
          prop: "capital",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("area.sort"), //排序
          prop: "sort",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("area.level"), //层级
          prop: "level",
          width: 150,
          sortable: true,
        },

        {
          label: this.$t("area.description"), //描述
          prop: "description",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("area.status"), //状态
          prop: "status",
          width: 150,
          sortable: true,
        },
        {
          type: "action",
          fixed: "right",
          width: 200,
        },
      ],
      //表格数据
      tableData: [],
      //新增表单基础参数
      formParams: [
        {
          type: "custom",
          label: this.$t("area.icon"), //地区图标
          prop: "icon",
          componentName: "icon",
          span: 12,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.id"), //id
          prop: "id",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.parentId"), //父节点id
          prop: "parentId",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.name"), //名称
          prop: "name",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.cname"), //中文名称
          prop: "cname",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.fullName"), //全称
          prop: "fullName",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.fullCname"), //中文全称
          prop: "fullCname",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.otherName"), //别称
          prop: "otherName",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.address"), //地址
          prop: "address",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.type"), //区域类型
          prop: "type",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.code"), //区域编码
          prop: "code",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.axis"), //坐标
          prop: "axis",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.acreage"), //面积
          prop: "acreage",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.population"), //人口
          prop: "population",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.climate"), //气候
          prop: "climate",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.capital"), //首都
          prop: "capital",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.sort"), //排序
          prop: "sort",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.level"), //层级
          prop: "level",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.description"), //描述
          prop: "description",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.status"), //状态
          prop: "status",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("area.remark"), //备注
          prop: "remark",
          span: 6,
          on: {},
        },
      ],
      //新增/修改/详情数据
      formData: {
        id: null,
        parentId: null,
        name: null,
        cname: null,
        fullName: null,
        fullCname: null,
        otherName: null,
        address: null,
        type: null,
        code: null,
        axis: null,
        acreage: null,
        population: null,
        climate: null,
        capital: null,
        sort: null,
        level: null,
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
  methods: {
    //1.查询
    query(page, size) {
      return this.$service.configuration.area
        .list(this.queryData)
        .then((res) => {
          const area = res.data;

          this.areaTree = this.$handleTree(area);
          this.tableData = area.filter((item) => !item.parentId);
          this.areaList = area;
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
          this.$service.configuration.area
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
      this.$service.configuration.area.detail({ id }).then((res) => {
        if (res.code === 200) {
          this.formData = res.data;
        }
      });
    },
    //删除
    deleteLine(row) {
      this.$service.configuration.area.delete([row]).then((res) => {
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.search();
        }
      });
    },
    //批量删除
    deleteLines() {
      this.$modal.confirm("是否删除").then(() => {
        this.$service.configuration.area.delete(this.checkList).then((res) => {
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
        parentId: null,
        name: null,
        cname: null,
        fullName: null,
        fullCname: null,
        otherName: null,
        address: null,
        type: null,
        code: null,
        axis: null,
        acreage: null,
        population: null,
        climate: null,
        capital: null,
        sort: null,
        level: null,
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
      };
    },
    //多选
    selection(list) {
      this.checkList = list;
    },
    load(row, treeNode, resolve) {
      resolve(this.areaList.filter((item) => item.parentId == row.id));
    },
  },
};
</script>
<style lang="scss" scoped></style>
