<!-- 测试 -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse :title="'折叠板'" @reset="resetQueryData" @search="search">
      <template slot="content">
        <CForm
          ref="queryForm"
          :form-data="queryData"
          :form-params="queryParams"
        >
          <template slot="custom">
            <span>{{ "我是自定义组件" }}</span>
          </template>
        </CForm>
      </template>
    </Collapse>
    <!-- 表单栏 -->
    <el-tabs type="border-card">
      <el-tab-pane label="多页签">
        <CTable
          ref="table"
          is-edit-line
          is-detail-line
          is-delete-line
          :table-column="tableColumn"
          @handleSelectionChange="selection"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryData: {},
      // 新增表单基础参数
      queryParams: [
        {
          type: "input",
          label: "输入框",
          prop: "input",
          span: 6,
          on: {},
        },
        {
          type: "select",
          label: "下拉框",
          prop: "select",
          span: 6,
          options: this.getDictData("user_sex"),
          on: {},
        },
        {
          type: "selectTree",
          label: "树形下拉框",
          prop: "selectTree",
          span: 6,
          on: {},
        },
        {
          type: "number",
          label: "数字",
          prop: "number",
          span: 6,
          on: {},
        },
        {
          type: "timePicker",
          label: "时间",
          prop: "timePicker",
          span: 6,
          attributes: {
            type: "year",
          },
          on: {},
        },
        {
          type: "datePicker",
          label: "日期",
          prop: "datePicker",
          span: 6,
          attributes: {
            type: "year",
          },
          on: {},
        },
        {
          type: "dateTimePicker",
          label: "日期范围",
          prop: "dateTimePicker",
          span: 12,
          attributes: {
            type: "year",
          },
          on: {},
        },
        {
          type: "checkbox",
          label: "多选",
          prop: "checkbox",
          options: this.getDictData("user_sex"),
          span: 6,
          on: {},
        },
        {
          type: "radio",
          label: "单选",
          prop: "radio",
          options: this.getDictData("user_sex"),
          span: 6,
          on: {},
        },
        {
          type: "switch",
          label: "开关",
          prop: "switch",
          span: 6,
          attributes: {
            "active-text": "开",
            "inactive-text": "关",
          },
          on: {},
        },
        {
          type: "colorPicker",
          label: "颜色选择器",
          prop: "colorPicker",
          span: 6,
          on: {},
        },
        {
          type: "custom",
          label: "自定义插槽",
          prop: "custom",
          componentName: "custom",
          span: 6,
          on: {},
        },
        // {
        //   type: "avatarUpload",
        //   label: "图片上传",
        //   prop: "avatarUpload",
        //   span: 6,
        //   on: {},
        // },
      ],
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
          label: "文字",
          prop: "text",
          sortable: true,
        },
        {
          label: "标签",
          prop: "label",
          width: 150,
          sortable: true,
        },
        {
          label: "开关",
          prop: "open",
          width: 150,
          sortable: true,
        },
        {
          label: "图片",
          prop: "avatar",
          width: 150,
          sortable: true,
          type: "picture",
        },
        {
          label: "操作",
          type: "action",
          fixed: "right",
          width: 160,
        },
      ],
      checkList: [],
    };
  },
  computed: {},
  methods: {
    search() {},
    resetQueryData() {},
    // 多选
    selection(list) {
      this.checkList = list;
    },
  },
};
</script>

<style lang="scss" scoped></style>
