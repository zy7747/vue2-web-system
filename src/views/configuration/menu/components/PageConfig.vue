<!--  -->
<template>
  <div class="pageConfig">
    <div>
      <CForm ref="queryForm" :form-data="pageData" :form-params="form" />
    </div>

    <el-tabs v-model="active" type="border-card" class="">
      <el-tab-pane label="查询条件" name="查询条件">
        <CTable ref="queryParams" :tableOption="queryOption" />
      </el-tab-pane>

      <el-tab-pane label="表格" name="表格">
        <CTable ref="tableColumn" :tableOption="tableOption" />
      </el-tab-pane>

      <el-tab-pane label="编辑/详情" name="编辑/详情">
        <CTable ref="formParams" :tableOption="formOption" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  created() {
    this.serviceDict();
  },
  props: {
    menuTree: {
      text: "菜单列表",
      type: [Array],
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      //查询数据
      pageData: {
        id: null,
        menuId: null,
        title: null,
        api: null,
        permission: null,
        status: null,
      },
      active: "查询条件",
      title: "",
      queryParams: [],
      tableColumn: [],
      formParams: [],
      dictList: [],
    };
  },
  computed: {
    form() {
      return [
        {
          label: this.$t("page.menuId"), //页面id
          prop: "menuId",
          span: 12,
          type: "selectTree",
          disable: true,
          options: this.menuTree,
          attributes: {
            label: "title",
            id: "id",
            disabled: true,
          },
        },
        {
          type: "input",
          label: "标题", //标题
          prop: "title",
          span: 6,
        },
        {
          type: "input",
          label: "接口", //接口
          prop: "api",
          span: 6,
        },
        {
          type: "input",
          label: "权限", //权限
          prop: "permission",
          span: 6,
        },
        {
          type: "select",
          label: this.$t("page.status"), //状态
          prop: "status",
          options: this.getDictData("is_active"),
          span: 6,
        },
      ];
    },
    queryOption() {
      const self = this;
      return {
        isRowDrop: true,
        "row-key": "prop",
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
          {
            label: "字段名",
            prop: "label",
            form: {
              type: "input",
              rules: [
                {
                  required: true,
                  message: "字段名不能为空",
                  trigger: "blur",
                },
              ],
            },
            width: 150,
            sortable: true,
          },
          {
            label: "字段值",
            prop: "prop",
            form: {
              type: "input",
              rules: [
                {
                  required: true,
                  message: "字段值不能为空",
                  trigger: "blur",
                },
              ],
            },
            width: 150,
            sortable: true,
          },
          {
            label: "字段类型",
            prop: "type",
            translation: self.getDictData("form_type"),
            form: {
              type: "select",
              options: self.getDictData("form_type"),
            },
            width: 150,
            sortable: true,
          },
          {
            label: "是否需要过滤",
            prop: "isFilters",
            form: {
              type: "select",
              options: self.getDictData("isNo"),
            },
            width: 150,
            sortable: true,
          },
          {
            label: "排序",
            prop: "sort",
            form: {
              type: "number",
            },
            width: 150,
            sortable: true,
          },
          {
            label: "占位",
            prop: "span",
            form: {
              type: "number",
              max: 24,
            },
            width: 150,
            sortable: true,
          },
          {
            label: "字典",
            prop: "dict",
            form: {
              type: "select",
              options: self.dictList,
            },
            width: 150,
            sortable: true,
          },
          {
            label: "状态",
            prop: "status",
            form: {
              type: "select",
              options: self.getDictData("is_active"),
            },
            translation: "is_active",
            width: 150,
            sortable: true,
          },
          {
            type: "action",
            fixed: "right",
            width: 160,
          },
        ],
        tools: [
          {
            type: "add",
            on: {
              click() {
                self.$refs.queryParams.createForm({
                  status: "1",
                  span: 6,
                });
              },
            },
          },
        ],
        actions: [
          {
            type: "actions",
            action: {
              noLink: true,
              save({ row, index }) {},
              remove({ row, index }) {},
            },
          },
        ],
        tableData: this.queryParams,
      };
    },
    tableOption() {
      const self = this;
      return {
        isRowDrop: true,
        "row-key": "prop",
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
          {
            label: this.$t("system.drop to sort"), //名
            type: "sort",
            width: 100,
          },
          {
            label: "字段名",
            prop: "label",
            form: {
              type: "input",
              rules: [
                {
                  required: true,
                  message: "字段名不能为空",
                  trigger: "blur",
                },
              ],
            },
            width: 150,
            sortable: true,
          },
          {
            label: "字段值",
            prop: "prop",
            form: {
              type: "input",
              rules: [
                {
                  required: true,
                  message: "字段值不能为空",
                  trigger: "blur",
                },
              ],
            },
            width: 150,
            sortable: true,
          },
          {
            label: "表格栏位类型",
            prop: "type",
            form: {
              type: "select",
              options: self.getDictData("table_type"),
            },
            width: 150,
            sortable: true,
          },
          {
            label: "是否需要过滤",
            prop: "isFilters",
            form: {
              type: "select",
              options: self.getDictData("isNo"),
            },
            width: 150,
            sortable: true,
          },
          {
            label: "排序",
            prop: "sort",
            form: {
              type: "number",
            },
            width: 150,
            sortable: true,
          },
          {
            label: "宽度",
            prop: "width",
            form: {
              type: "input",
            },
            width: 150,
            sortable: true,
          },
          {
            label: "字典",
            prop: "dict",
            form: {
              type: "select",
              options: self.dictList,
            },
            width: 150,
            sortable: true,
          },
          {
            label: "状态",
            prop: "status",
            form: {
              type: "select",
              options: self.getDictData("is_active"),
            },
            translation: "is_active",
            width: 150,
            sortable: true,
          },
          {
            type: "action",
            fixed: "right",
            width: 160,
          },
        ],
        tools: [
          {
            type: "add",
            on: {
              click() {
                self.$refs.tableColumn.createForm({
                  status: "1",
                  isFilters: 1,
                  width: 150,
                });
              },
            },
          },
        ],
        actions: [
          {
            type: "actions",
            action: {
              noLink: true,
              save({ row, index }) {},
              remove({ row, index }) {},
            },
          },
        ],
        tableData: this.tableColumn,
      };
    },
    formOption() {
      const self = this;
      return {
        isRowDrop: true,
        "row-key": "prop",
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
          {
            label: "字段名",
            prop: "label",
            form: {
              type: "input",
              rules: [
                {
                  required: true,
                  message: "字段名不能为空",
                  trigger: "blur",
                },
              ],
            },
            width: 150,
            sortable: true,
          },
          {
            label: "字段值",
            prop: "prop",
            form: {
              type: "input",
              rules: [
                {
                  required: true,
                  message: "字段值不能为空",
                  trigger: "blur",
                },
              ],
            },
            width: 150,
            sortable: true,
          },
          {
            label: "字段类型",
            prop: "type",
            form: {
              type: "select",
              options: self.getDictData("form_type"),
            },
            width: 150,
            sortable: true,
          },
          {
            label: "是否需要过滤",
            prop: "isFilters",
            form: {
              type: "select",
              options: self.getDictData("isNo"),
            },
            width: 150,
            sortable: true,
          },
          {
            label: "排序",
            prop: "sort",
            form: {
              type: "number",
            },
            width: 150,
            sortable: true,
          },
          {
            label: "占位",
            prop: "span",
            form: {
              type: "number",
              max: 24,
            },
            width: 150,
            sortable: true,
          },
          {
            label: "字典",
            prop: "dict",
            form: {
              type: "select",
              options: self.dictList,
            },
            width: 150,
            sortable: true,
          },
          {
            label: "状态",
            prop: "status",
            form: {
              type: "select",
              options: self.getDictData("is_active"),
            },
            translation: "is_active",
            width: 150,
            sortable: true,
          },
          {
            type: "action",
            fixed: "right",
            width: 160,
          },
        ],
        tools: [
          {
            type: "add",
            on: {
              click() {
                self.$refs.formParams.createForm({
                  status: "1",
                  isFilters: 1,
                  span: 6,
                });
              },
            },
          },
        ],
        actions: [
          {
            type: "actions",
            action: {
              noLink: true,
              save({ row, index }) {},
              remove({ row, index }) {},
            },
          },
        ],
        tableData: this.formParams,
      };
    },
  },
  methods: {
    query(row) {
      this.$service.configuration.page.list({ menuId: row.id }).then((res) => {
        if (res.data.length > 0) {
          this.pageData = res.data[0];
          const { queryParams, tableColumn, formParams } = JSON.parse(
            res.data[0].content
          );
          this.queryParams = queryParams;
          this.tableColumn = tableColumn;
          this.formParams = formParams;
        } else {
          this.pageData.menuId = row.id;
        }
      });
    },
    getData() {
      return {
        ...this.pageData,
        content: JSON.stringify({
          queryParams: this.queryParams,
          tableColumn: this.tableColumn,
          formParams: this.formParams,
        }),
      };
    },
    //通过接口请求的下拉
    serviceDict() {
      //获取字典列表
      this.getServiceData([{ serviceCode: "getDictList", params: {} }]).then(
        (res) => {
          this.dictList = res.getDictList;
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.pageConfig {
  width: 100%;
}
</style>
