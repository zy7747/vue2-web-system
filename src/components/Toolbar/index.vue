<!--  -->
<template>
  <div>
    <div class="header">
      <div class="left">
        <div class="button">
          <c-button
            v-if="isAdd"
            type="primary"
            class="btn"
            text="新增"
            plain
            v-bind="addBtn"
            icon="el-icon-plus"
            @click="addLine"
          />
          <c-button
            v-if="isDelete"
            type="danger"
            icon="el-icon-delete"
            class="btn"
            text="删除"
            plain
            v-bind="deleteBtn"
            @click="deleteLines"
          />
          <c-button
            v-if="isExport"
            type="warning"
            icon="el-icon-download"
            class="btn"
            text="导出"
            plain
            @click="exportExcel"
          />
        </div>
      </div>
      <div class="right">
        <div class="title">
          {{ title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      text: "标题",
      type: [String],
      default: () => {
        return "";
      },
    },
    isAdd: {
      text: "是否需要新增按钮",
      type: [Boolean],
      default: () => {
        return true;
      },
    },
    isDelete: {
      text: "是否需要批量删除按钮",
      type: [Boolean],
      default: () => {
        return true;
      },
    },
    deleteBtn: {
      text: "删除按钮权限/禁用状态",
      type: [Object],
      default: () => {
        return {};
      },
    },
    addBtn: {
      text: "新增按钮权限/禁用状态",
      type: [Object],
      default: () => {
        return {};
      },
    },
    isExport: {
      text: "是否需要导出按钮",
      type: [Boolean],
      default: () => {
        return true;
      },
    },
  },
  methods: {
    addLine() {
      this.$emit("addLine");
    },
    deleteLines() {
      this.$emit("deleteLines");
    },
    exportExcel() {
      this.$emit("exportExcel");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  .title {
    font-size: 16px;
    font-weight: 600;
  }

  .button {
    display: flex;
  }
}
</style>
