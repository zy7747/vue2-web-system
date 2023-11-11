<!-- 系统角色 system_role -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="'系统角色'" @reset="resetQueryData" @search="search">
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
      <el-tab-pane label="系统角色">
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
      width="1000px"
      :has-check="title !== '详情'"
      @handleConfirm="handleConfirm"
    >
      <template slot="body">
        <CCard title="系统角色">
          <template slot="body">
            <CForm
              ref="form"
              :disabled="title === '详情'"
              :form-data="formData"
              :form-params="formParams"
            />
          </template>
        </CCard>

        <div style="margin-top: 10px; width: 100%"></div>

        <CCard title="角色权限">
          <template slot="body">
            <c-input placeholder="输入关键字进行过滤" v-model="filterText" />
            <el-tree
              :data="menuList"
              :props="defaultProps"
              :filter-node-method="filterNode"
              show-checkbox
              :default-checked-keys="menuCheckList"
              check-strictly
              @check-change="checkChange"
              node-key="id"
              ref="tree"
            >
            </el-tree>
          </template>
        </CCard>
      </template>
    </CDialog>
  </div>
</template>
<script>
export default {
  name: "role",
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
          label: "角色名称",
          prop: "roleName",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: "状态",
          prop: "status",
          options: this.getDictData("role_status"),
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
          label: "角色名称",
          prop: "roleName",
          width: 200,
          sortable: true,
        },
        {
          label: "角色编码",
          prop: "roleCode",
          width: 200,
          sortable: true,
        },
        {
          label: "状态",
          prop: "status",
          translation: "role_status",
          width: 200,
          sortable: true,
        },
        {
          label: "备注",
          prop: "remark",
          sortable: true,
        },
        {
          label: "创建时间",
          prop: "createTime",
          width: 500,
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
        roleName: null,
        roleCode: null,
        permission: null,
        status: null,
        sort: null,
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
        tenantId: null,
      },
      //新增/修改/详情数据
      formData: {
        roleName: null,
        roleCode: null,
        permission: null,
        status: null,
        sort: null,
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
      },
      //菜单树形
      menuList: [],
      menuCheckList: [],
      //过滤字段
      filterText: "",
      //菜单树形显示字段
      defaultProps: {
        children: "children",
        label: "title",
      },
      //新增表单基础参数
      formParams: [
        {
          type: "input",
          label: "角色名称",
          prop: "roleName",
          span: 6,
          rules: [
            { required: true, message: "角色名称不能为空", trigger: "blur" },
          ],
          on: {},
        },
        {
          type: "input",
          label: "角色编码",
          prop: "roleCode",
          rules: [
            { required: true, message: "角色编码不能为空", trigger: "blur" },
          ],
          span: 6,
          on: {},
        },
        {
          type: "select",
          label: "状态",
          prop: "status",
          rules: [{ required: true, message: "状态不能为空", trigger: "blur" }],
          options: this.getDictData("role_status"),
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
      ],
    };
  },
  methods: {
    //1.查询
    query(page, size) {
      return this.$service.baseData.role
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
      this.queryMenu();
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
          this.$service.baseData.role
            .saveList([
              { ...this.formData, menuList: this.$refs.tree.getCheckedKeys() },
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
    //详情
    detailLine(row, index) {
      this.title = "详情";
      this.$refs.dialog.handleOpen();
      this.detail(row.id);
    },
    //删除
    deleteLine(row, index) {
      this.$service.baseData.role.delete([row]).then((res) => {
        this.search();
      });
    },
    //通过id获取详情
    detail(id) {
      this.$service.baseData.role.detail({ id }).then((res) => {
        this.formData = res.data;
        this.menuCheckList = res.data.menuList;
        this.queryMenu();
      });
    },
    //批量删除
    deleteLines() {
      this.$modal
        .confirm("是否删除")
        .then(() => {
          this.$service.baseData.role.delete(this.checkList).then((res) => {
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
      this.menuCheckList = [];

      this.formData = {
        roleName: null,
        roleCode: null,
        permission: null,
        status: "0",
        sort: null,
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
      };
    },
    //多选
    selection(list) {
      this.checkList = list;
    },
    //导出
    exportExcel() {
      this.$service.baseData.role.export().then((res) => {
        this.$download.excel(res, "角色.xlsx");
      });
    },
    //搜索框过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
    //查询菜单
    queryMenu() {
      return this.$service.baseData.menu.list().then((res) => {
        this.menuList = this.$handleTree(res.data);
      });
    },
    checkChange(data, check) {
      // 父节点操作
      if (data.parentId !== null) {
        if (check === true) {
          // 如果选中，设置父节点为选中
          this.$refs.tree.setChecked(data.parentId, true);
        } else {
          // 如果取消选中，检查父节点是否该取消选中（可能仍有子节点为选中状态）
          var parentNode = this.$refs.tree.getNode(data.parentId);
          var parentHasCheckedChild = false;
          for (
            var i = 0, parentChildLen = parentNode.childNodes.length;
            i < parentChildLen;
            i++
          ) {
            if (parentNode.childNodes[i].checked === true) {
              parentHasCheckedChild = true;
              break;
            }
          }
          if (!parentHasCheckedChild)
            this.$refs.tree.setChecked(data.parentId, false);
        }
      }
      // 子节点操作，如果取消选中，取消子节点选中
      if (data.children != null && check === false) {
        for (var j = 0, len = data.children.length; j < len; j++) {
          var childNode = this.$refs.tree.getNode(data.children[j].id);
          if (childNode.checked === true) {
            this.$refs.tree.setChecked(childNode.data.id, false);
          }
        }
      }
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
};
</script>
<style lang="scss" scoped></style>
