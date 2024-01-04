<!-- 菜单 menu -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="$t('menu.menu')" @reset="resetQueryData" @search="search">
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
      <el-tab-pane :label="$t('menu.menu')">
        <Toolbar
          :hasImport="true"
          :delete-btn="{
            disabled: checkList.length === 0,
          }"
          :imports="{
            url: '/menu/import',
            data: {},
          }"
          :exports="{
            api: $service.configuration.menu.export,
            fileName: '菜单',
            data: {},
          }"
          :permission="{
            add: ['configuration:menu:add'],
            delete: ['configuration:menu:delete'],
            imports: ['configuration:menu:import'],
            exports: ['configuration:menu:export'],
          }"
          @addLine="addLine"
          @deleteLines="deleteLines"
        />

        <!-- :tree-config="{
            transform: true,
            rowField: 'id',
            parentField: 'parentId',
          }" -->
        <CTable
          ref="table"
          lazy
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'id' }"
          :load="load"
          :permission="{
            edit: ['configuration:menu:edit'],
            delete: ['configuration:menu:delete'],
          }"
          :query="query"
          :table-data="tableData"
          :table-column="tableColumn"
          :cell-class-name="tableRowClassName"
          @editLine="editLine"
          @detailLine="detailLine"
          @deleteLine="deleteLine"
          @handleSelectionChange="selection"
        >
          <template slot="action" slot-scope="{ scope }">
            <c-button
              v-if="scope.row.type !== 'button'"
              class="btn"
              :text="$t('system.add')"
              type="text"
              icon="el-icon-plus"
              v-hasPermission="['configuration:menu:add']"
              @click="addLine(scope.row, scope.$index)"
            />
          </template>

          <template slot="icon" slot-scope="{ scope }">
            <div style="font-size: 30px">
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
      width="1200px"
      :has-check="dialogType !== 'detail'"
      @handleConfirm="handleConfirm"
    >
      <template slot="body">
        <CCard :title="$t('menu.menu')">
          <template slot="body">
            <CForm
              ref="form"
              :disabled="dialogType === 'detail'"
              :form-data="formData"
              :form-params="formParams"
            >
              <template slot="icon">
                <IconSelect v-model="formData.icon" />
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
  name: "Menu",
  data() {
    return {
      //弹框标题
      title: "",
      //弹框类型
      dialogType: "",
      //多选
      checkList: [],
      //树形列表
      menuList: [],
      menuTree: [],
      //查询表单基础参数
      queryParams: [
        {
          type: "input",
          label: this.$t("menu.title"), //菜单名
          prop: "title",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: this.$t("menu.type"), //类型
          prop: "type",
          options: this.getDictData("menu_type"),
          span: 6,
          attributes: {},
          on: {},
        },
        {
          label: this.$t("menu.status"), //状态
          prop: "status",
          type: "select",
          options: this.getDictData("menu_status"),
          span: 6,
          attributes: {},
          on: {},
        },
      ],
      //表格数据
      tableData: [],
      //表列基础参数
      tableColumn: [
        {
          type: "selection",
          width: 55,
        },
        {
          label: this.$t("system.show"),
          prop: "show",
          fixed: "left",
        },
        {
          label: this.$t("menu.sort"), //排序
          prop: "sort",
          width: 100,
          sortable: true,
        },
        {
          type: "custom",
          label: this.$t("menu.icon"), //图标
          prop: "icon",
          componentName: "icon",
          width: 120,
          sortable: true,
        },
        {
          label: this.$t("menu.title"), //菜单名
          prop: "title",
          width: 120,
          sortable: true,
        },
        {
          label: this.$t("menu.type"), //类型
          prop: "type",
          width: 120,
          translation: "menu_type",
          sortable: true,
        },
        {
          label: this.$t("menu.name"), //组件名
          prop: "name",
          width: 150,
          sortable: true,
        },
        {
          label: this.$t("menu.path"), //路由路径
          prop: "path",
          width: 200,
          sortable: true,
        },
        {
          label: this.$t("menu.component"), //组件
          prop: "component",
          width: 280,
          sortable: true,
        },
        {
          label: this.$t("menu.permission"), //权限标识
          prop: "permission",
          width: 280,
          sortable: true,
        },
        {
          label: this.$t("menu.visible"), //是否可见
          prop: "visible",
          width: 150,
          sortable: true,
          translation: "isNo",
        },
        {
          label: this.$t("menu.keepAlive"), //是否缓存
          prop: "keepAlive",
          width: 150,
          sortable: true,
          translation: "isNo",
        },
        {
          label: this.$t("menu.alwaysShow"), //是否总是显示
          prop: "alwaysShow",
          width: 150,
          sortable: true,
          translation: "isNo",
        },
        {
          label: this.$t("menu.status"), //状态
          prop: "status",
          width: 150,
          sortable: true,
          translation: "menu_status",
        },
        {
          type: "action",
          fixed: "right",
          width: 250,
        },
      ],
      //数据
      queryData: {
        id: null,
        parentId: null,
        title: null,
        name: null,
        path: null,
        type: null,
        component: null,
        permission: null,
        level: null,
        sort: null,
        visible: null,
        keepAlive: null,
        alwaysShow: null,
        icon: null,
        description: null,
        meta: null,
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
        name: null,
        title: null,
        path: null,
        type: 0,
        component: null,
        permission: null,
        level: null,
        sort: null,
        visible: null,
        keepAlive: null,
        alwaysShow: null,
        icon: null,
        description: null,
        meta: null,
        status: null,
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
        isDeleted: null,
      },
    };
  },
  computed: {
    //新增表单基础参数
    formParams() {
      return [
        {
          type: "radio",
          label: this.$t("menu.type"), //类型
          prop: "type",
          span: 24,
          options: this.getDictData("menu_type"),
          attributes: {},
          on: {
            change() {},
          },
        },
        {
          type: "selectTree",
          label: this.$t("menu.parentId"), //父节点id
          prop: "parentId",
          span: 24,
          options: this.menuTree,
          show: this.formData.type !== "system",
          attributes: {
            label: "title",
            id: "id",
          },
          on: {},
        },
        {
          type: "custom",
          label: this.$t("menu.icon"), //图标
          prop: "icon",
          show: this.formData.type !== "button",
          componentName: "icon",
          span: 12,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("menu.title"), //菜单名
          prop: "title",
          rules: [{ required: true, message: "名称不能为空", trigger: "blur" }],
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("menu.path"), //路由路径
          prop: "path",
          show: this.formData.type !== "button",
          span: 6,
          rules: [
            { required: true, message: "路由路径不能为空", trigger: "blur" },
          ],
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("menu.name"), //组件名
          prop: "name",
          show: this.formData.type === "menu",
          span: 6,
          rules: [
            { required: true, message: "组件名不能为空", trigger: "blur" },
          ],
          attributes: {},
          on: {},
        },
        {
          type: "input",
          label: this.$t("menu.component"), //组件
          prop: "component",
          span: 6,
          show: this.formData.type === "menu",
          rules: [
            { required: true, message: "组件路径不能为空", trigger: "blur" },
          ],
          attributes: {},
          on: {},
        },
        {
          type: "number",
          label: this.$t("menu.sort"), //排序
          prop: "sort",
          span: 6,
          attributes: {},
          on: {},
        },

        {
          type: "input",
          label: this.$t("menu.permission"), //权限标识
          prop: "permission",
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "radio",
          label: this.$t("menu.status"), //状态
          prop: "status",
          options: this.getDictData("menu_status"),
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "radio",
          label: this.$t("menu.visible"), //是否可见,
          prop: "visible",
          show: this.formData.type !== "button",
          options: this.getDictData("isNo"),
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "radio",
          label: this.$t("menu.keepAlive"), //是否缓存
          prop: "keepAlive",
          show: this.formData.type === "menu",
          options: this.getDictData("isNo"),
          span: 6,
          attributes: {},
          on: {},
        },
        {
          type: "radio",
          label: this.$t("menu.alwaysShow"), //是否总是显示
          prop: "alwaysShow",
          show: this.formData.type === "menu",
          options: this.getDictData("isNo"),
          span: 6,
          attributes: {},
          on: {},
        },
      ];
    },
  },
  methods: {
    selected(name) {
      this.formData.icon = name;
    },
    //1.查询
    query(page, size) {
      return this.$service.configuration.menu
        .list(this.queryData)
        .then((res) => {
          const menu = res.data;

          menu.sort((a, b) => a.sort - b.sort);

          this.menuTree = this.$handleTree(menu);
          this.tableData = menu.filter((item) => !item.parentId);
          this.menuList = menu;

          // this.tableData = menu;
        });
    },
    //新增
    addLine(row = {}) {
      this.title = "新增";
      this.dialogType = "add";
      this.resetForm(row);
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
          this.$service.configuration.menu
            .saveList([this.formData])
            .then((res) => {
              if (res.code === 200) {
                this.$message.success("提交成功");
                this.$refs.dialog.handleClose();
                this.refreshTree(this.formData.parentId);
              } else {
                this.$message.warning(res.message);
              }
            });
        }
      });
    },
    //删除
    deleteLine(row, index) {
      this.$service.configuration.menu.delete([row]).then((res) => {
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.refreshTree(row.parentId);
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    //通过id获取详情
    detail(id) {
      this.$service.configuration.menu.detail({ id }).then((res) => {
        const data = res.data;
        this.formData = data;
      });
    },
    //批量删除
    deleteLines() {
      this.$modal.confirm("是否删除").then(() => {
        this.$service.configuration.menu.delete(this.checkList).then((res) => {
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
      this.query();
    },
    //重置搜索表单数据
    resetQueryData() {
      //重置表单
      this.$refs.queryForm.reset();
      //刷新表格
      this.query();
    },
    //重置新增修改表单数据
    resetForm(row = {}) {
      let type = "menu";
      if (row.type === "menu") {
        type = "button";
      }

      this.$set(this, "formData", {
        id: null,
        parentId: row.id ? row.id : null,
        name: null,
        title: null,
        path: null,
        type: type,
        component: null,
        permission: null,
        level: null,
        sort: null,
        visible: 1,
        keepAlive: 1,
        alwaysShow: 1,
        icon: null,
        description: null,
        meta: null,
        status: "0",
        remark: null,
        creator: null,
        updater: null,
        createTime: null,
        updateTime: null,
      });
    },
    //多选
    selection(list) {
      this.checkList = list;
    },
    tableRowClassName({ row, column, rowIndex, columnIndex }) {
      if (column.property && column.property != "show") {
        if (row.type === "system") {
          // return "list-system";
        } else if (row.type === "directory") {
          return "list-directory";
        } else if (row.type === "menu") {
          return "list-menu";
        } else {
          return "list-button";
        }
      }
    },
    load(row, treeNode, resolve) {
      resolve(this.menuList.filter((item) => item.parentId == row.id));
    },
    refreshTree(id) {
      this.$service.configuration.menu.list(this.queryData).then((res) => {
        const menu = res.data;

        menu.sort((a, b) => a.sort - b.sort);

        this.$set(
          this.$refs.table.$refs.STable.$refs.eTable.store.states
            .lazyTreeNodeMap,
          id,
          menu.filter((item) => item.parentId == id)
        );
      });
    },
  },
};
</script>

<style lang="scss">
.list-system {
  background-color: #fce4e4 !important;
}

.list-directory {
  background-color: #f0f9eb !important;
}

.list-menu {
  background-color: #f8ecda !important;
}

.list-button {
  background-color: #ecf5ff !important;
}
</style>
