<!-- 支付功能 pay -->
<template>
  <div>
    <!-- 搜索栏 -->
    <Collapse
      v-if="pageOption.formConfig"
      :title="pageOption.formConfig?.title"
      @reset="resetQueryData"
      @search="search"
    >
      <template slot="content">
        <CForm
          ref="queryForm"
          :form-data="pageOption.formConfig?.queryData"
          :form-params="pageOption.formConfig?.queryParams"
        >
          <template :slot="item.setSlot" v-for="item in formSlot()">
            <slot :name="item.getSlot" />
          </template>
        </CForm>
      </template>
    </Collapse>

    <!-- 表单栏 -->
    <el-tabs
      type="border-card"
      v-model="active"
      v-if="pageOption.tableConfig && pageOption.tableConfig.length > 0"
    >
      <el-tab-pane
        v-for="(tableOption, i) in pageOption.tableConfig"
        :key="i"
        :label="tableOption.title"
        :name="'table' + i"
      >
        <CTable :ref="'table' + i" :tableOption="tableOption">
          <template
            v-for="item in tableSlot()"
            :slot="item"
            slot-scope="{ row, index }"
          >
            <slot :name="item" :row="row" :index="index" />
          </template>
        </CTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "CPage",
  props: {
    pageOption: {
      text: "页面数据",
      type: [Array, Object, Function],
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      active: "table0",
    };
  },
  methods: {
    //form插槽
    formSlot() {
      const arr = [];
      Object.keys(this.$slots).forEach((key) => {
        if (key.indexOf("form_") !== -1) {
          arr.push({ setSlot: key.replace("form_", ""), getSlot: key });
        }
      });
      return arr;
    },
    //table插槽
    tableSlot() {
      const arr = [];
      Object.keys(this.$scopedSlots).forEach((key) => {
        if (
          key.indexOf("table_") !== -1 ||
          key.indexOf("dialog_form_") !== -1 ||
          key.indexOf("dialog_body") !== -1
        ) {
          arr.push(key);
        }
      });

      return arr;
    },
    //搜索
    search() {
      this.$refs[this.active][0].search();
    },
    //重置表单
    resetQueryData() {
      //重置表单
      this.$refs.queryForm.reset();

      this.$refs[this.active][0].resetQueryData();
    },
    //当前表格弹窗
    dialogOpen() {
      this.$refs[this.active][0].dialogOpen();
    },
    //当前表格关闭窗口
    dialogClose() {
      this.$refs[this.active][0].dialogClose();
    },
  },
};
</script>

<style lang="scss" scoped></style>
