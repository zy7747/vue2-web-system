<!-- 用户 -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="'用户信息'" @reset="resetQueryData" @search="search">
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
      <el-tab-pane label="用户管理">
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
      width="1200px"
      :has-check="title !== '详情'"
      @handleConfirm="handleConfirm"
    >
      <template slot="body">
        <CCard title="用户信息">
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
import {
  phoneNumValidate,
  EmailValidate,
  PasswordValidate,
  UserNameValidate,
  IdCardValidate,
  AgeValidate,
} from "@/utils/formValidate";

export default {
  data() {
    return {
      // 弹框标题
      title: "",
      // 多选
      checkList: [],
      //角色列表
      roleList: [],
      // 表列基础参数
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
          label: "头像",
          prop: "avatar",
          width: 150,
          sortable: true,
          type: "picture",
        },
        {
          label: "用户名",
          prop: "user",
          width: 150,
          sortable: true,
        },
        {
          label: "账号",
          prop: "account",
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
          label: "密码",
          prop: "password",
          width: 150,
          sortable: true,
        },

        {
          label: "真实姓名",
          prop: "name",
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
          label: "年龄",
          prop: "age",
          width: 150,
          sortable: true,
        },
        {
          label: "性别",
          prop: "sex",
          width: 150,
          translation: "user_sex",
          sortable: true,
        },
        {
          label: "角色",
          prop: "roles",
          width: 150,
          sortable: true,
        },
        {
          label: "用户类型",
          prop: "userType",
          width: 150,
          translation: "user_type",
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
          translation: "user_status",
          width: 150,
          sortable: true,
        },
        {
          label: "创建时间",
          prop: "createTime",
          width: 200,
          sortable: true,
        },

        {
          label: "操作",
          type: "action",
          fixed: "right",
          width: 160,
        },
      ],
      // 查询数据
      queryData: {
        phone: null,
        email: null,
        account: null,
        password: null,
        user: null,
        name: null,
        idCard: null,
        avatar: null,
        sex: null,
        roles: null,
        userType: null,
        remark: null,
        age: null,
        birthDate: null,
      },
      // 新增/修改/详情数据
      formData: {
        phone: null,
        email: null,
        account: null,
        password: null,
        user: null,
        name: null,
        idCard: null,
        avatar: null,
        sex: null,
        roles: null,
        userType: null,
        remark: null,
        age: null,
        status: null,
        birthDate: null,
      },
      // 查询表单基础参数
      queryParams: [
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
          label: "账号",
          prop: "account",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "用户名",
          prop: "user",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: "真实姓名",
          prop: "name",
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
          type: "select",
          label: "性别",
          prop: "sex",
          span: 6,
          options: this.getDictData("user_sex"),
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: "角色",
          prop: "roles",
          span: 6,
          options: this.roleList,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: "用户类型",
          prop: "userType",
          options: this.getDictData("user_type"),
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "number",
          label: "年龄",
          prop: "age",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: "状态",
          prop: "status",
          options: this.getDictData("user_status"),
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "datePicker",
          label: "出生日期",
          prop: "birthDate",
          span: 6,
          attributes: {
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
          },
          on: {},
        },
      ],
    };
  },
  computed: {
    // 新增表单基础参数
    formParams() {
      return [
        {
          type: "input",
          label: "电话号码",
          prop: "phone",
          span: 6,
          rules: [{ validator: phoneNumValidate, trigger: "blur" }],
          on: {},
        },
        {
          type: "input",
          label: "电子邮箱",
          prop: "email",
          rules: [{ validator: EmailValidate, trigger: "blur" }],
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "账号",
          prop: "account",
          rules: [{ required: true, message: "账号不能为空", trigger: "blur" }],
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "密码",
          prop: "password",
          rules: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            { validator: PasswordValidate, trigger: "blur" },
          ],
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "用户名",
          rules: [
            { required: true, message: "用户名不能为空", trigger: "blur" },
            { validator: UserNameValidate, trigger: "blur" },
          ],
          prop: "user",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: "真实姓名",
          prop: "name",
          span: 6,
          on: {},
        },
        {
          type: "select",
          label: "性别",
          prop: "sex",
          span: 6,
          options: this.getDictData("user_sex"),
          rules: [{ required: true, message: "性别不能为空", trigger: "blur" }],
          on: {},
        },
        {
          type: "input",
          label: "身份证号码",
          prop: "idCard",
          rules: [{ validator: IdCardValidate, trigger: "blur" }],
          span: 6,
          on: {},
        },
        {
          type: "avatarUpload",
          label: "头像",
          prop: "avatar",
          span: 6,
          attributes: {
            uploadData: {
              path: "/资源管理器/用户头像",
              parentId: "1708477176327725057",
            },
          },
          on: {},
        },
        {
          type: "select",
          label: "角色",
          prop: "roles",
          span: 6,
          options: this.roleList,
          rules: [{ required: true, message: "角色不能为空", trigger: "blur" }],
          attributes: {
            multiple: true,
            "collapse-tags": true,
          },
          on: {},
        },
        {
          type: "select",
          label: "用户类型",
          prop: "userType",
          options: this.getDictData("user_type"),
          span: 6,
          on: {},
        },
        {
          type: "select",
          label: "状态",
          prop: "status",
          options: this.getDictData("user_status"),
          span: 6,
          on: {},
        },
        {
          type: "number",
          label: "年龄",
          prop: "age",
          span: 6,
          rules: [{ validator: AgeValidate, trigger: "blur" }],
          on: {},
        },
        {
          type: "datePicker",
          label: "出生日期",
          prop: "birthDate",
          span: 6,
          attributes: {
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
          },
          on: {},
        },
        {
          type: "input",
          label: "备注",
          prop: "remark",
          span: 6,

          on: {},
        },
      ];
    },
  },
  created() {
    this.serviceDict();
  },
  methods: {
    // 1.查询
    query(page, size) {
      return this.$service.baseData.user
        .page({ page, size, ...this.queryData })
        .then((res) => {
          return res.data;
        });
    },
    //通过接口请求的下拉
    serviceDict() {
      //获取角色列表
      this.getServiceData("getRoleList").then((res) => {
        this.roleList = res;
      });
    },
    // 新增
    addLine() {
      this.title = "新增";
      this.$refs.dialog.handleOpen();
      this.resetForm();
    },
    // 编辑
    editLine(row, index) {
      this.title = "编辑";
      this.$refs.dialog.handleOpen();
      this.detail(row.id);
    },
    // 提交
    handleConfirm() {
      // 新增
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.$service.baseData.user.saveList([this.formData]).then((res) => {
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
    // 详情
    detailLine(row, index) {
      this.title = "详情";
      this.$refs.dialog.handleOpen();
      this.detail(row.id);
    },
    // 删除
    deleteLine(row, index) {
      this.$service.baseData.user.delete([row]).then((res) => {
        this.search();
      });
    },
    // 批量删除
    deleteLines() {
      this.$modal
        .confirm("是否删除")
        .then(() => {
          this.$service.baseData.user.delete(this.checkList).then((res) => {
            this.search();
          });
        })
        .catch(() => {});
    },
    // 通过id获取详情
    detail(id) {
      this.$service.baseData.user.detail({ id }).then((res) => {
        this.formData = res.data;
      });
    },
    // 搜索
    search() {
      this.$refs.table.queryTableData();
    },
    // 重置搜索表单数据
    resetQueryData() {
      // 重置表单
      this.$refs.queryForm.reset();
      // 刷新表格
      this.$refs.table.refreshTable();
    },
    // 重置新增修改表单数据
    resetForm() {
      this.$set(this, "formData", {
        phone: null,
        email: null,
        account: null,
        password: null,
        user: null,
        name: null,
        idCard: null,
        avatar: null,
        sex: null,
        roles: null,
        userType: null,
        remark: null,
        age: null,
        status: null,
        birthDate: null,
      });
    },
    // 多选
    selection(list) {
      this.checkList = list;
    },
    // 导出
    exportExcel() {
      this.$service.baseData.user.export().then((res) => {
        this.$download.excel(res, "用户信息.xls");
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
