<!--  -->
<template>
  <div>
    <Toolbar v-if="tableOption.tools" :tools="tableOption.tools" />

    <BTable ref="table" v-bind="tableOption">
      <template
        v-for="item in tableSlot()"
        :slot="item.setSlot"
        slot-scope="{ row, index }"
      >
        <slot :name="item.getSlot" :row="row" :index="index" />
      </template>
    </BTable>

    <!-- 新增/编辑/详情弹框 -->
    <CDialog
      v-if="tableOption.dialogConfig"
      ref="dialog"
      @handleConfirm="tableOption.dialogConfig?.handleConfirm()"
      v-bind="tableOption?.dialogConfig"
    >
      <template slot="body">
        <CCard :title="tableOption.dialogConfig?.title">
          <template slot="body">
            <CForm
              ref="form"
              :disabled="!tableOption.dialogConfig?.['has-check']"
              :form-data="tableOption.dialogConfig?.formData"
              :form-params="tableOption.dialogConfig?.formParams"
            >
              <template :slot="item.setSlot" v-for="item in dialogForm()">
                <slot :name="item.getSlot" />
              </template>
            </CForm>
          </template>
        </CCard>

        <template v-for="item in dialogBody()">
          <div style="margin-top: 5px; width: 100%"></div>
          <slot :name="item.getSlot" />
        </template>
      </template>
    </CDialog>
  </div>
</template>

<script>
import BTable from "./table";

export default {
  name: "CTable",
  components: {
    BTable,
  },
  props: {
    tableOption: {
      text: "表格配置",
      type: [Array, Object, Function],
      default: () => {
        return {};
      },
    },
  },
  methods: {
    //新增行
    createForm(createData) {
      this.$refs.table.createForm(createData);
    },
    //table插槽
    tableSlot() {
      const arr = [];
      Object.keys(this.$scopedSlots).forEach((key) => {
        if (key.indexOf("table_") !== -1) {
          arr.push({ setSlot: key.replace("table_", ""), getSlot: key });
        }
      });

      return arr;
    },
    dialogForm() {
      const arr = [];
      Object.keys(this.$scopedSlots).forEach((key) => {
        if (key.indexOf("dialog_form_") !== -1) {
          arr.push({ setSlot: key.replace("dialog_form_", ""), getSlot: key });
        }
      });
      return arr;
    },
    dialogBody() {
      const arr = [];

      Object.keys(this.$scopedSlots).forEach((key) => {
        if (key.indexOf("dialog_body") !== -1) {
          arr.push({ setSlot: "dialog_body", getSlot: key });
        }
      });

      return arr;
    },
    dialogOpen() {
      this.$refs.dialog.handleOpen();
    },
    dialogClose() {
      this.$refs.dialog.handleClose();
    },
    //搜索
    search() {
      this.$refs.table.refreshTable();
    },
    //重置table表单数据
    refreshForm() {
      this.$refs.table.refreshForm();
    },
    //重置搜索表单数据
    resetQueryData() {
      //刷新表格
      this.$refs.table.refreshTable();
    },
  },
};
</script>

<style lang="scss" scoped></style>
