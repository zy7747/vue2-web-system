<!-- 用户 user -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="$t('user.user')" @reset="resetQueryData" @search="search">
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
      <el-tab-pane :label="$t('user.user')">
        <Toolbar
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          :imports="{
            url: '/user/import',
            data: {},
          }"
          :exports="{
            api: $service.user.user.export,
            fileName: '用户',
            data: {},
          }"
          :permission="{
            add: ['user:user:add'],
            delete: ['user:user:delete'],
            imports: ['user:user:import'],
            exports: ['user:user:export'],
          }"
          :hasImport="true"
          @addLine="addLine"
          @deleteLines="deleteLines"
        />
        <CTable
          :permission="{
            edit: ['user:user:edit'],
            delete: ['user:user:delete'],
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
        <CCard :title="$t('user.user')">
          <template slot="body">
            <CForm
              ref="form"
              :disabled="dialogType === 'detail'"
              :form-data="formData"
              :form-params="formParams"
            />
          </template>
        </CCard>

        <CCard title="用户权限">
          <template slot="body">
            <c-tree
              ref="tree"
              :tree="permissionList"
              :defaultProps="{
                children: 'children',
                label: 'name',
              }"
              :filter-node-method="filterNode"
              :default-checked-keys="permissionCheckList"
              node-key="id"
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
} from "@/utils/formValidate";

export default {
  name: "User",
  data() {
    return {
      // 弹框标题
      title: "",
      //弹框类型
      dialogType: "",
      // 多选
      checkList: [],
      //角色列表
      roleList: [],
      //权限列表
      permissionList: [],
      //权限选中列表
      permissionCheckList: [],
      // 查询数据
      queryData: {
        id: null,
        uid: null,
        phone: null,
        email: null,
        account: null,
        password: null,
        user: null,
        avatar: null,
        userType: null,
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
      // 新增/修改/详情数据
      formData: {
        id: null,
        uid: null,
        phone: null,
        email: null,
        account: null,
        password: null,
        user: null,
        avatar: null,
        userType: null,
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
  computed: {
    // 查询表单基础参数
    queryParams() {
      return [
        {
          type: "input",
          label: this.$t("user.phone"), //电话号码
          prop: "phone",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("user.email"), //电子邮箱
          prop: "email",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("user.account"), //账号
          prop: "account",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("user.user"), //用户名
          prop: "user",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: this.$t("user.userType"), //用户类型
          prop: "userType",
          options: this.getDictData("user_type"),
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: this.$t("user.status"), //状态
          prop: "status",
          options: this.getDictData("user_status"),
          span: 6,
          attributes: {},
          on: {},
        },
      ];
    },
    // 新增表单基础参数
    formParams() {
      return [
        {
          type: "avatarUpload",
          label: this.$t("user.avatar"), //头像
          prop: "avatar",
          span: 8,
          attributes: {
            uploadData: {
              parentId: "1738503824435138562",
            },
          },
        },
        {
          type: "input",
          label: this.$t("user.phone"), //电话号码
          prop: "phone",
          span: 8,
          rules: [{ validator: phoneNumValidate, trigger: "blur" }],
        },
        {
          type: "input",
          label: this.$t("user.email"), //电子邮箱
          prop: "email",
          rules: [{ validator: EmailValidate, trigger: "blur" }],
          span: 8,
        },
        {
          type: "input",
          label: this.$t("user.account"), //账号
          prop: "account",
          rules: [{ required: true, message: "账号不能为空", trigger: "blur" }],
          span: 8,
        },
        {
          type: "input",
          label: this.$t("user.user"), //用户名
          prop: "user",
          rules: [
            { required: true, message: "用户名不能为空", trigger: "blur" },
            { validator: UserNameValidate, trigger: "blur" },
          ],
          span: 8,
        },
        {
          type: "input",
          label: this.$t("user.password"), //密码
          prop: "password",
          attributes: {
            type: "password",
            showPassword: true,
          },
          rules: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            { validator: PasswordValidate, trigger: "blur" },
          ],
          span: 8,
        },
        {
          type: "select",
          label: this.$t("user.userType"), //用户类型
          prop: "userType",
          options: this.getDictData("user_type"),
          span: 8,
        },
        {
          type: "select",
          label: this.$t("user.status"), //状态
          prop: "status",
          rules: [{ required: true, message: "状态不能为空", trigger: "blur" }],
          options: this.getDictData("user_status"),
          span: 8,
        },
        {
          type: "select",
          label: this.$t("user.roles"), //角色
          prop: "roles",
          span: 24,
          options: this.roleList,
          //rules: [{ required: true, message: "角色不能为空", trigger: "blur" }],
          attributes: {
            multiple: true,
          },
        },
      ];
    },
    // 表列基础参数
    tableColumn() {
      return [
        {
          type: "selection",
        },
        {
          label: this.$t("system.no"), //序号
          type: "index",
        },
        {
          label: this.$t("user.avatar"), //头像
          prop: "avatar",
          width: 100,
          sortable: true,
          type: "picture",
        },
        {
          label: this.$t("user.user"), //用户名
          prop: "user",
          width: 150,
          sortable: true,
          isFilters: true,
        },
        {
          label: this.$t("user.account"), //账号
          prop: "account",
          width: 150,
          sortable: true,
          isFilters: true,
        },
        {
          label: this.$t("user.phone"), //电话号码
          prop: "phone",
          width: 150,
          sortable: true,
          isFilters: true,
        },
        {
          label: this.$t("user.email"), //电子邮箱
          prop: "email",
          width: 150,
          sortable: true,
          isFilters: true,
        },
        {
          label: this.$t("user.roles"), //角色
          prop: "roles",
          width: 120,
          sortable: true,
          translation: this.roleList,
          isArrayValue: true,
        },
        {
          label: this.$t("user.userType"), //用户类型
          prop: "userType",
          width: 150,
          translation: "user_type",
          sortable: true,
          isFilters: true,
        },
        {
          label: this.$t("user.status"), //状态
          prop: "status",
          translation: "user_status",
          width: 120,
          sortable: true,
          isFilters: true,
        },
        {
          label: this.$t("user.createTime"), //创建时间
          prop: "createTime",
          width: 200,
          sortable: true,
        },
        {
          label: this.$t("user.updateTime"), //更新时间
          prop: "updateTime",
          width: 200,
          sortable: true,
        },
        {
          type: "action",
          fixed: "right",
          "min-width": 150,
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
      return this.$service.user.user
        .page({ page, size, ...this.queryData })
        .then((res) => {
          return res.data;
        });
    },
    //查询权限
    queryPermission() {
      return this.$service.configuration.permission.list().then((res) => {
        this.permissionList = this.$handleTree(res.data);
      });
    },
    //通过接口请求的下拉
    serviceDict() {
      //获取角色列表
      this.getServiceData([{ serviceCode: "getRoleList", params: {} }]).then(
        (res) => {
          this.roleList = res.getRoleList;
        }
      );
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
    // 提交
    handleConfirm() {
      // 新增
      this.$refs.form.validate().then((valid) => {
        const permissions = this.$refs.tree.getCheckedKeys();

        if (valid) {
          this.$service.user.user
            .saveList([
              {
                ...this.formData,
                permissions,
              },
            ])
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
    // 删除
    deleteLine(row, index) {
      this.$service.user.user.delete([row]).then((res) => {
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.search();
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    // 批量删除
    deleteLines() {
      this.$modal.confirm("是否删除").then(() => {
        this.$service.user.user.delete(this.checkList).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.search();
          } else {
            this.$message.warning(res.message);
          }
        });
      });
    },
    // 通过id获取详情
    detail(id) {
      this.$service.user.user.detail({ id }).then((res) => {
        if (res.code === 200) {
          this.formData = res.data;
          this.permissionCheckList = res.data.permissions;
          this.queryPermission();
        } else {
          this.$message.warning(res.message);
        }
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
      this.permissionCheckList = [];

      this.$set(this, "formData", {
        id: null,
        uid: null,
        phone: null,
        email: null,
        account: null,
        password: null,
        user: null,
        avatar: null,
        userType: null,
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
    //搜索框过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
  },
};
</script>

<style lang="scss" scoped></style>
