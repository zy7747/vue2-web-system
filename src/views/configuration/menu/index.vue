<!--  -->
<template>
  <div>
    <CPage ref="pageRef" :pageOption="pageOption">
      <template slot="dialog_form_icon">
        <IconSelect :loadIconList="['menuIcon']" v-model="formData.icon" />
      </template>

      <template slot="table_icon" slot-scope="{ row, index }">
        <svg-icon
          style="font-size: 30px"
          :icon-class="row.icon ? row.icon : ''"
          class="icon"
        />
      </template>
    </CPage>

    <CDialog ref="configRef" width="1500px" @handleConfirm="handleConfirm">
      <template slot="body">
        <PageConfig :menuTree="menuTree" ref="pageConfig" />
      </template>
    </CDialog>
  </div>
</template>

<script>
import PageConfig from "./components/PageConfig";

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
      //表格数据
      tableData: [],
      menuTree: [],
    };
  },
  components: {
    PageConfig,
  },
  computed: {
    pageOption() {
      const self = this;

      return {
        formConfig: {
          title: self.$t("menu.menu"),
          queryParams: [
            {
              type: "input",
              label: this.$t("menu.title"), //菜单名
              prop: "title",
              span: 6,
            },
            {
              type: "select",
              label: this.$t("menu.type"), //类型
              prop: "type",
              options: this.getDictData("menu_type"),
              span: 6,
            },
            {
              label: this.$t("menu.status"), //状态
              prop: "status",
              type: "select",
              options: this.getDictData("menu_status"),
              span: 6,
            },
          ],
        },
        tableConfig: [
          {
            resizable: true,
            "row-id": "id",
            tableType: "vxeTable",
            "tree-config": {
              transform: true,
              rowField: "id",
              parentField: "parentId",
              iconOpen: "vxe-icon-square-minus-fill",
              iconClose: "vxe-icon-square-plus-fill",
            },
            title: self.$t("menu.menu"),
            tableColumn: [
              {
                type: "selection",
                width: 55,
              },
              {
                label: this.$t("menu.sort"), //排序
                prop: "sort",
                width: 100,
                sortable: true,
                treeNode: true,
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
                width: 150,
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
            tools: [
              {
                type: "add",
                permission: ["configuration:menu:add"],
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
                permission: ["configuration:menu:delete"],
                options: {
                  disabled: self.checkList.length === 0,
                },
                on: {
                  click() {
                    self.$service.configuration.menu
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
                permission: ["configuration:menu:import"],
                options: {
                  api() {
                    return self.$service.configuration.menu.import();
                  },
                },
              },
              {
                type: "export",
                permission: ["configuration:menu:export"],
                options: {
                  api() {
                    return self.$service.configuration.menu.export();
                  },
                  fileName: self.$t("menu.menu"),
                },
              },
            ],
            actions: [
              {
                type: "add",
                permission: ["configuration:menu:add"],
                show({ row, index }) {
                  return row.type !== "button";
                },
                click({ row, index }) {
                  self.title = "新增";
                  self.dialogType = "add";
                  self.resetForm(row);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "config",
                permission: ["configuration:menu:add"],
                text: "配置",
                icon: "el-icon-help",
                show({ row, index }) {
                  return row.type === "menu";
                },
                click({ row, index }) {
                  self.$refs.configRef.handleOpen();
                  self.$nextTick(() => {
                    self.$refs.pageConfig.query(row);
                  });
                },
              },
              {
                type: "edit",
                permission: ["configuration:menu:edit"],
                click({ row, index }) {
                  self.title = "编辑";
                  self.dialogType = "edit";
                  self.detail(row.id);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "detail",
                permission: ["configuration:menu:detail"],
                click({ row, index }) {
                  self.title = "详情";
                  self.dialogType = "detail";
                  self.detail(row.id);
                  self.$refs.pageRef.dialogOpen();
                },
              },
              {
                type: "remove",
                permission: ["configuration:menu:delete"],
                click({ row, index }) {
                  self.$service.configuration.menu.delete([row]).then((res) => {
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
              return self.$service.configuration.menu
                .list(self.queryData)
                .then((res) => {
                  const menu = res.data;

                  menu.sort((a, b) => a.sort - b.sort);

                  self.tableData = menu;
                  self.menuTree = self.$handleTree(menu);
                });
            },
            dialogConfig: {
              "has-check": this.dialogType !== "detail",
              formData: this.formData,
              width: "1200px",
              title: this.$t("menu.menu"),
              handleConfirm() {
                // 新增/修改
                self.$service.configuration.menu
                  .saveList([self.formData])
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
                  type: "radio",
                  label: this.$t("menu.type"), //类型
                  prop: "type",
                  span: 24,
                  options: this.getDictData("menu_type"),
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
                },
                {
                  type: "custom",
                  label: this.$t("menu.icon"), //图标
                  prop: "icon",
                  show: this.formData.type !== "button",
                  componentName: "icon",
                  span: 12,
                },
                {
                  type: "input",
                  label: this.$t("menu.title"), //菜单名
                  prop: "title",
                  rules: [
                    {
                      required: true,
                      message: "名称不能为空",
                      trigger: "blur",
                    },
                  ],
                  span: 6,
                },
                {
                  type: "input",
                  label: this.$t("menu.path"), //路由路径
                  prop: "path",
                  show: this.formData.type !== "button",
                  span: 6,
                  rules: [
                    {
                      required: true,
                      message: "路由路径不能为空",
                      trigger: "blur",
                    },
                  ],
                },
                {
                  type: "input",
                  label: this.$t("menu.name"), //组件名
                  prop: "name",
                  show: this.formData.type === "menu",
                  span: 6,
                  rules: [
                    {
                      required: true,
                      message: "组件名不能为空",
                      trigger: "blur",
                    },
                  ],
                },
                {
                  type: "input",
                  label: this.$t("menu.component"), //组件
                  prop: "component",
                  span: 6,
                  show: this.formData.type === "menu",
                  rules: [
                    {
                      required: true,
                      message: "组件路径不能为空",
                      trigger: "blur",
                    },
                  ],
                },
                {
                  type: "number",
                  label: this.$t("menu.sort"), //排序
                  prop: "sort",
                  span: 6,
                },

                {
                  type: "input",
                  label: this.$t("menu.permission"), //权限标识
                  prop: "permission",
                  span: 6,
                },
                {
                  type: "radio",
                  label: this.$t("menu.status"), //状态
                  prop: "status",
                  options: this.getDictData("menu_status"),
                  span: 6,
                },
                {
                  type: "radio",
                  label: this.$t("menu.visible"), //是否可见,
                  prop: "visible",
                  show: this.formData.type !== "button",
                  options: this.getDictData("isNo"),
                  span: 6,
                },
                {
                  type: "radio",
                  label: this.$t("menu.keepAlive"), //是否缓存
                  prop: "keepAlive",
                  show: this.formData.type === "menu",
                  options: this.getDictData("isNo"),
                  span: 6,
                },
                {
                  type: "radio",
                  label: this.$t("menu.alwaysShow"), //是否总是显示
                  prop: "alwaysShow",
                  show: this.formData.type === "menu",
                  options: this.getDictData("isNo"),
                  span: 6,
                },
              ],
            },
          },
        ],
      };
    },
  },
  methods: {
    handleConfirm() {
      // 新增/修改
      this.$service.configuration.page
        .saveList([this.$refs.pageConfig.getData()])
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("提交成功");
            this.$refs.configRef.handleClose();
          }
        });
    },
    //通过id获取详情
    detail(id) {
      this.$service.configuration.menu.detail({ id }).then((res) => {
        this.formData = res.data;
      });
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
  },
};
</script>

<style lang="scss" scoped></style>
