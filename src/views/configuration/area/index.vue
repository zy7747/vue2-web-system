<!-- 地区 area -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="'地区'" @reset="resetQueryData" @search="search">
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
      <el-tab-pane label="地区">
        <Toolbar
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          :exports="{
            api: $service.configuration.area.export,
            fileName: '地区',
            data: {},
          }"
          @addLine="addLine"
          @deleteLines="deleteLines"
        />
        <CTable
          :lazy="true"
          ref="table"
          row-key="id"
          :stripe="false"
          :table-column="tableColumn"
          :tree-props="{ children: 'children', hasChildren: 'id' }"
          :table-data="tableData"
          :load="load"
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
        <CCard title="地区">
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
  created() {
    this.query();
  },
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
          label: "父节点id",
          prop: "parentId",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "名称",
          prop: "areaName",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "地址",
          prop: "address",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "别称",
          prop: "otherName",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "区域类型",
          prop: "type",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "区域编码",
          prop: "code",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "坐标",
          prop: "axis",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "面积",
          prop: "acreage",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "人口",
          prop: "population",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "气候",
          prop: "climate",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "首都",
          prop: "capital",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "排序",
          prop: "sort",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "层级",
          prop: "level",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "地区图标",
          prop: "icon",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "描述",
          prop: "description",
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
        parentId: null,
        areaName: null,
        address: null,
        otherName: null,
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
          width: 55,
        },
        {
          label: "展开",
          prop: "show",
          fixed: "left",
        },
        // {
        //   label: "id",
        //   prop: "id",
        //   width: 150,
        //   sortable: true,
        // },
        // {
        //   label: "父节点id",
        //   prop: "parentId",
        //   width: 150,
        //   sortable: true,
        // },
        {
          label: "名称",
          prop: "areaName",
          width: 150,
          sortable: true,
        },
        {
          label: "地址",
          prop: "address",
          width: 250,
          sortable: true,
        },
        {
          label: "坐标",
          prop: "axis",
          width: 300,
          sortable: true,
        },
        {
          label: "别称",
          prop: "otherName",
          width: 150,
          sortable: true,
        },
        {
          label: "区域类型",
          prop: "type",
          width: 150,
          sortable: true,
        },
        {
          label: "区域编码",
          prop: "code",
          width: 150,
          sortable: true,
        },

        {
          label: "面积",
          prop: "acreage",
          width: 150,
          sortable: true,
        },
        {
          label: "人口",
          prop: "population",
          width: 150,
          sortable: true,
        },
        {
          label: "气候",
          prop: "climate",
          width: 150,
          sortable: true,
        },
        {
          label: "首都",
          prop: "capital",
          width: 150,
          sortable: true,
        },
        {
          label: "排序",
          prop: "sort",
          width: 150,
          sortable: true,
        },
        {
          label: "层级",
          prop: "level",
          width: 150,
          sortable: true,
        },
        {
          label: "地区图标",
          prop: "icon",
          width: 150,
          sortable: true,
        },
        {
          label: "描述",
          prop: "description",
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
          label: "父节点id",
          prop: "parentId",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "名称",
          prop: "areaName",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "地址",
          prop: "address",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "别称",
          prop: "otherName",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "区域类型",
          prop: "type",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "区域编码",
          prop: "code",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "坐标",
          prop: "axis",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "面积",
          prop: "acreage",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "人口",
          prop: "population",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "气候",
          prop: "climate",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "首都",
          prop: "capital",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "排序",
          prop: "sort",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "层级",
          prop: "level",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "地区图标",
          prop: "icon",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "描述",
          prop: "description",
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
        parentId: null,
        areaName: null,
        address: null,
        otherName: null,
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
        .list({ page, size, ...this.queryData })
        .then((res) => {
          const areaList = res.data;

          this.tableData = [
            {
              id: "0",
              parentId: null,
              areaName: "中国",
              address: "中国",
              type: "国家",
            },
          ];

          this.treeList = areaList;
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
          this.$service.configuration.area
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
    deleteLine(row, index) {
      this.$service.configuration.area.delete([row]).then((res) => {
        this.search();
      });
    },
    //通过id获取详情
    detail(id) {
      this.$service.configuration.area.detail({ id }).then((res) => {
        this.formData = res.data;
      });
    },
    //批量删除
    deleteLines() {
      this.$modal
        .confirm("是否删除")
        .then(() => {
          this.$service.configuration.area
            .delete(this.checkList)
            .then((res) => {
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
        parentId: null,
        areaName: null,
        address: null,
        otherName: null,
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
      });
    },
    //多选
    selection(list) {
      this.checkList = list;
    },
    load(tree, treeNode, resolve) {
      resolve(this.treeList.filter((item) => item.parentId == tree.id));
    },
  },
};
</script>
<style lang="scss" scoped></style>
