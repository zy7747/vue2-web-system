<!--  -->
<template>
  <div>
    <CPage ref="pageRef" :pageOption="pageOption">
      <template slot="dialog_body">
        <CCard title="用户权限">
          <template slot="body">
            <c-tree
              ref="tree"
              :tree="permissionList"
              :defaultProps="{
                children: 'children',
                label: 'name',
              }"
              filterName="name"
              :default-checked-keys="permissionCheckList"
              node-key="id"
            />
          </template>
        </CCard>
      </template>
    </CPage>
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
      //角色下拉列表
      roleList: [],
      //权限下拉列表
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
      },
      //表格数据
      tableData: [],
    };
  },
  created() {
    this.serviceDict();
  },
  computed: {
    pageOption() {
      const self = this;

      return {
        formConfig: {
          title: self.$t("user.user"),
          queryParams: [
            {
              type: "input",
              label: this.$t("user.phone"), //电话号码
              prop: "phone",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("user.email"), //电子邮箱
              prop: "email",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("user.account"), //账号
              prop: "account",
              span: 6,
            },
            {
              type: "input",
              label: this.$t("user.user"), //用户名
              prop: "user",
              span: 6,
            },
            {
              type: "select",
              label: this.$t("user.userType"), //用户类型
              prop: "userType",
              options: this.getDictData("user_type"),
              span: 6,
            },
            {
              type: "select",
              label: this.$t("user.status"), //状态
              prop: "status",
              options: this.getDictData("user_status"),
              span: 6,
            },
          ],
        },
        tableConfig: [
          {
            title: self.$t("user.user"),
            tableColumn: [
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
            ],
            tools: [
              {
                type: "add",
                permission: ["user:user:add"],
                on: {
                  click() {
                    self.title = "新增";
                    self.dialogType = "add";
                    self.resetForm();
                    self.$refs.pageRef.dialogOpen();
                  },
                },
              },
              {
                type: "remove",
                permission: ["user:user:delete"],
                options: {
                  disabled: self.checkList.length === 0,
                },
                on: {
                  click() {
                    self.$service.user.user
                      .delete(self.checkList)
                      .then((res) => {
                        if (res.code === 200) {
                          self.$message.success("删除成功");
                          self.$refs.pageRef.search();
                        } else {
                          self.$message.warning(res.message);
                        }
                      });
                  },
                },
              },
              {
                type: "import",
                permission: ["user:user:import"],
                options: {
                  api() {
                    return self.$service.user.user.import();
                  },
                },
              },
              {
                type: "export",
                permission: ["user:user:export"],
                options: {
                  api() {
                    return self.$service.user.user.export();
                  },
                  fileName: "地区",
                },
              },
            ],
            actions: [
              {
                type: "edit",
                permission: ["user:user:edit"],
                click({ row, index }) {
                  self.title = "编辑";
                  self.dialogType = "edit";
                  self.detail(row.id);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "detail",
                permission: ["user:user:detail"],
                click({ row, index }) {
                  self.title = "详情";
                  self.dialogType = "detail";
                  self.detail(row.id);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "remove",
                permission: ["user:user:delete"],
                click({ row, index }) {
                  self.$service.user.user.delete([row]).then((res) => {
                    if (res.code === 200) {
                      self.$message.success("删除成功");
                      self.$refs.pageRef.search();
                    }
                  });
                },
              },
            ],
            options: {
              selection(list) {
                self.checkList = list;
              },
            },
            tableData: this.tableData,
            query: (page, size) => {
              return self.$service.user.user
                .page({ page, size, ...self.queryData })
                .then((res) => {
                  return res.data;
                });
            },
            dialogConfig: {
              "has-check": this.dialogType !== "detail",
              formData: this.formData,
              width: "1200px",
              title: this.title,
              handleConfirm() {
                // 新增/修改
                self.$service.user.user
                  .saveList([
                    {
                      ...self.formData,
                      permissions: self.$refs.tree.getCheckedKeys(),
                    },
                  ])
                  .then((res) => {
                    if (res.code === 200) {
                      self.$message.success("提交成功");
                      self.$refs.pageRef.search();
                      self.$refs.pageRef.dialogClose();
                    }
                  });
              },
              formParams: [
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
                  rules: [
                    {
                      required: true,
                      message: "账号不能为空",
                      trigger: "blur",
                    },
                  ],
                  span: 8,
                },
                {
                  type: "input",
                  label: this.$t("user.user"), //用户名
                  prop: "user",
                  rules: [
                    {
                      required: true,
                      message: "用户名不能为空",
                      trigger: "blur",
                    },
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
                    {
                      required: true,
                      message: "密码不能为空",
                      trigger: "blur",
                    },
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
                  rules: [
                    {
                      required: true,
                      message: "状态不能为空",
                      trigger: "blur",
                    },
                  ],
                  options: this.getDictData("user_status"),
                  span: 8,
                },
                {
                  type: "select",
                  label: this.$t("user.roles"), //角色
                  prop: "roles",
                  span: 24,
                  options: this.roleList,
                  rules: [
                    {
                      required: true,
                      message: "角色不能为空",
                      trigger: "blur",
                    },
                  ],
                  attributes: {
                    multiple: true,
                  },
                },
              ],
            },
          },
        ],
      };
    },
  },
  methods: {
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
    //通过接口请求的下拉
    serviceDict() {
      //获取角色列表
      this.getServiceData([{ serviceCode: "getRoleList", params: {} }]).then(
        (res) => {
          this.roleList = res.getRoleList;
        }
      );
    },
    //查询权限
    queryPermission() {
      return this.$service.configuration.permission.list().then((res) => {
        this.permissionList = this.$handleTree(res.data);
      });
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
  },
};
</script>

<style lang="scss" scoped></style>
