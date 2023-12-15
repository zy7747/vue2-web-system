<!-- 个人信息 person -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse
      :title="$t('person.person')"
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
      <el-tab-pane :label="$t('person.person')">
        <Toolbar
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          :imports="{
            url: '/person/import',
            data: {},
          }"
          :permission="{
            add: ['user:person:add'],
            delete: ['user:person:delete'],
            imports: ['user:person:import'],
            exports: ['user:person:export'],
          }"
          :exports="{
            api: $service.user.person.export,
            fileName: '个人信息',
            data: {},
          }"
          :hasImport="true"
          @addLine="addLine"
          @deleteLines="deleteLines"
        />
        <CTable
          :permission="{
            edit: ['user:person:edit'],
            delete: ['user:person:delete'],
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
        <CCard :title="$t('person.person')">
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
import {
  IdCardValidate,
  phoneNumValidate,
  EmailValidate,
} from "@/utils/formValidate";

export default {
  name: "Person",
  data() {
    return {
      //弹框标题
      title: "",
      //弹框类型
      dialogType: "",
      //多选
      checkList: [],
      //查询表单基础参数
      queryParams: [
        {
          type: "input",
          label: this.$t("person.name"), //姓名
          prop: "name",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: this.$t("person.sex"), //性别
          prop: "sex",
          options: this.getDictData("user_sex"),
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.profession"), //职业
          prop: "profession",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.nation"), //国家
          prop: "nation",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.origin"), //籍贯
          prop: "origin",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.address"), //住址
          prop: "address",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.degree"), //最高学历
          prop: "degree",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.height"), //身高
          prop: "height",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.weight"), //体重
          prop: "weight",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.age"), //年龄
          prop: "age",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.idCard"), //身份证号码
          prop: "idCard",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.phone"), //电话号码
          prop: "phone",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.email"), //电子邮箱
          prop: "email",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "datePicker",
          label: this.$t("person.birthDate"), //出生日期
          prop: "birthDate",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: this.$t("person.status"), //状态
          prop: "status",
          span: 6,
          attributes: {},
          on: {},
        },
      ],
      //查询数据
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
          label: this.$t("system.no"), //序号
          type: "index",
          width: 55,
        },
        // {
        //   label: this.$t("person.userId"), //用户id
        //   prop: "userId",
        //   width: 150,
        //   sortable: true,
        // },
        {
          label: this.$t("person.photo"), //照片
          prop: "photo",
          width: 150,
          sortable: true,
          type: "picture",
        },
        {
          label: this.$t("person.name"), //姓名
          prop: "name",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.sex"), //性别
          prop: "sex",
          translation: "user_sex",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.profession"), //职业
          prop: "profession",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.nation"), //国家
          prop: "nation",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.origin"), //籍贯
          prop: "origin",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.address"), //住址
          prop: "address",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.degree"), //最高学历
          prop: "degree",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.height"), //身高
          prop: "height",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.weight"), //体重
          prop: "weight",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.hobby"), //爱好
          prop: "hobby",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.age"), //年龄
          prop: "age",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.idCard"), //身份证号码
          prop: "idCard",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.phone"), //电话号码
          prop: "phone",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.email"), //电子邮箱
          prop: "email",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.birthDate"), //出生日期
          prop: "birthDate",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.status"), //状态
          prop: "status",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.remark"), //备注
          prop: "remark",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.creator"), //创建人
          prop: "creator",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.updater"), //更新人
          prop: "updater",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.createTime"), //创建时间
          prop: "createTime",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("person.updateTime"), //更新时间
          prop: "updateTime",
          width: 150,
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
      //新增表单基础参数
      formParams: [
        // {
        //   type: "input",
        //   label: this.$t("person.userId"), //用户id
        //   prop: "userId",
        //   span: 6,
        //   on: {},
        // },
        {
          type: "avatarUpload",
          label: this.$t("person.photo"), //照片
          prop: "photo",
          span: 6,
          attributes: {
            uploadData: {
              path: "/资源管理器/个人头像",
              parentId: "1708477176327725057",
            },
          },
        },
        {
          type: "input",
          label: this.$t("person.name"), //姓名
          prop: "name",
          span: 6,
          on: {},
        },
        {
          type: "select",
          label: this.$t("person.sex"), //性别
          prop: "sex",
          options: this.getDictData("user_sex"),
          span: 6,
          on: {},
        },
        {
          type: "number",
          label: this.$t("person.age"), //年龄
          prop: "age",
          span: 6,
          on: {},
        },
        {
          type: "number",
          label: this.$t("person.height") + "(cm)", //身高
          prop: "height",
          span: 6,
          on: {},
        },
        {
          type: "number",
          label: this.$t("person.weight") + "(kg)", //体重
          prop: "weight",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.profession"), //职业
          prop: "profession",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.degree"), //最高学历
          prop: "degree",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.phone"), //电话号码
          rules: [{ validator: phoneNumValidate, trigger: "blur" }],
          prop: "phone",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.email"), //电子邮箱
          prop: "email",
          rules: [{ validator: EmailValidate, trigger: "blur" }],
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.idCard"), //身份证号码
          prop: "idCard",
          rules: [{ validator: IdCardValidate, trigger: "blur" }],
          span: 6,
          on: {},
        },
        {
          type: "datePicker",
          label: this.$t("person.birthDate"), //出生日期
          prop: "birthDate",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.nation"), //国家
          prop: "nation",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.origin"), //籍贯
          prop: "origin",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.address"), //住址
          prop: "address",
          span: 6,
          on: {},
        },
        {
          type: "select",
          label: this.$t("person.status"), //状态
          prop: "status",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.hobby"), //爱好
          prop: "hobby",
          span: 6,
          on: {},
        },
        {
          type: "input",
          label: this.$t("person.remark"), //备注
          prop: "remark",
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
      return this.$service.user.person
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
          this.$service.user.person.saveList([this.formData]).then((res) => {
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
      this.$service.user.person.delete([row]).then((res) => {
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.search();
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    //批量删除
    deleteLines() {
      this.$modal.confirm("是否删除").then(() => {
        this.$service.user.person.delete(this.checkList).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.search();
          } else {
            this.$message.warning(res.message);
          }
        });
      });
    },
    //通过id获取详情
    detail(id) {
      this.$service.user.person.detail({ id }).then((res) => {
        if (res.code === 200) {
          this.formData = res.data;
        } else {
          this.$message.warning(res.message);
        }
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
  },
};
</script>
<style lang="scss" scoped></style>
