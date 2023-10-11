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
        />
      </template>
    </Collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryData: {},
    };
  },
  computed: {
    // 新增表单基础参数
    queryParams() {
      return [
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
          type: "datePicker",
          label: "日期",
          prop: "datePicker",
          span: 6,
          attributes: {
            type: "year",
          },
          on: {},
        },
      ];
    },
  },
  methods: {
    search() {},
    resetQueryData() {},
  },
};
</script>

<style lang="scss" scoped></style>
