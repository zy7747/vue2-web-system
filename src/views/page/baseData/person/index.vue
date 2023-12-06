<!-- 个人信息 person -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="'个人信息'" @reset="resetQueryData" @search="search">
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
      <el-tab-pane label="个人信息">
        <Toolbar
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          :imports="{
            url: '/person/import',
            data: {},
          }"
          :hasImport="true"
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
        <CCard title="个人信息">
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
          label: "用户id",
          prop: "userId",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "照片",
          prop: "photo",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "姓名",
          prop: "name",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "性别",
          prop: "sex",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "职业",
          prop: "profession",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "国家",
          prop: "nation",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "籍贯",
          prop: "origin",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "住址",
          prop: "address",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "最高学历",
          prop: "degree",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "身高",
          prop: "height",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "体重",
          prop: "weight",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "爱好",
          prop: "hobby",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "年龄",
          prop: "age",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "身份证号码",
          prop: "idCard",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "电话号码",
          prop: "phone",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "电子邮箱",
          prop: "email",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "出生日期",
          prop: "birthDate",
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
        userId: null,
        photo: null,
        name: null,
        sex: null,
        profession: null,
        nation: null,
        origin: null,
        address: null,
        degree: null,
        height: null,
        weight: null,
        hobby: null,
        age: null,
        idCard: null,
        phone: null,
        email: null,
        birthDate: null,
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
          label: "用户id",
          prop: "userId",
          width: 150,
          sortable: true,
        },
        {
          label: "照片",
          prop: "photo",
          width: 150,
          sortable: true,
        },
        {
          label: "姓名",
          prop: "name",
          width: 150,
          sortable: true,
        },
        {
          label: "性别",
          prop: "sex",
          width: 150,
          sortable: true,
        },
        {
          label: "职业",
          prop: "profession",
          width: 150,
          sortable: true,
        },
        {
          label: "国家",
          prop: "nation",
          width: 150,
          sortable: true,
        },
        {
          label: "籍贯",
          prop: "origin",
          width: 150,
          sortable: true,
        },
        {
          label: "住址",
          prop: "address",
          width: 150,
          sortable: true,
        },
        {
          label: "最高学历",
          prop: "degree",
          width: 150,
          sortable: true,
        },
        {
          label: "身高",
          prop: "height",
          width: 150,
          sortable: true,
        },
        {
          label: "体重",
          prop: "weight",
          width: 150,
          sortable: true,
        },
        {
          label: "爱好",
          prop: "hobby",
          width: 150,
          sortable: true,
        },
        {
          label: "年龄",
          prop: "age",
          width: 150,
          sortable: true,
        },
        {
          label: "身份证号码",
          prop: "idCard",
          width: 150,
          sortable: true,
        },
        {
          label: "电话号码",
          prop: "phone",
          width: 150,
          sortable: true,
        },
        {
          label: "电子邮箱",
          prop: "email",
          width: 150,
          sortable: true,
        },
        {
          label: "出生日期",
          prop: "birthDate",
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
          label: "用户id",
          prop: "userId",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "照片",
          prop: "photo",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "姓名",
          prop: "name",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "性别",
          prop: "sex",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "职业",
          prop: "profession",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "国家",
          prop: "nation",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "籍贯",
          prop: "origin",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "住址",
          prop: "address",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "最高学历",
          prop: "degree",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "身高",
          prop: "height",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "体重",
          prop: "weight",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "爱好",
          prop: "hobby",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "年龄",
          prop: "age",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "身份证号码",
          prop: "idCard",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "电话号码",
          prop: "phone",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "电子邮箱",
          prop: "email",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "出生日期",
          prop: "birthDate",
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
        userId: null,
        photo: null,
        name: null,
        sex: null,
        profession: null,
        nation: null,
        origin: null,
        address: null,
        degree: null,
        height: null,
        weight: null,
        hobby: null,
        age: null,
        idCard: null,
        phone: null,
        email: null,
        birthDate: null,
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
      return this.$service.baseData.person
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
          this.$service.baseData.person
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
      this.$service.baseData.person.delete([row]).then((res) => {
        this.search();
      });
    },
    //通过id获取详情
    detail(id) {
      this.$service.baseData.person.detail({ id }).then((res) => {
        this.formData = res.data;
      });
    },
    //批量删除
    deleteLines() {
      this.$modal
        .confirm("是否删除")
        .then(() => {
          this.$service.baseData.person.delete(this.checkList).then((res) => {
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
        userId: null,
        photo: null,
        name: null,
        sex: null,
        profession: null,
        nation: null,
        origin: null,
        address: null,
        degree: null,
        height: null,
        weight: null,
        hobby: null,
        age: null,
        idCard: null,
        phone: null,
        email: null,
        birthDate: null,
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
      this.$service.baseData.person.export().then((res) => {
        this.$download.excel(res, "个人信息.xls");
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
