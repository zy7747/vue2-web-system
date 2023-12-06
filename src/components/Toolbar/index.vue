<!-- 编辑栏 -->
<template>
  <div>
    <div class="header">
      <div class="left">
        <div class="button">
          <c-button
            v-if="isAdd"
            type="primary"
            class="btn"
            :text="$t('system.add')"
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
            :text="$t('system.deleteMore')"
            plain
            v-bind="deleteBtn"
            @click="deleteLines"
          />

          <el-upload
            :action="baseUrl + imports.url"
            :data="imports.data"
            :show-file-list="false"
            :headers="headers"
          >
            <c-button
              v-if="hasImport"
              type="info"
              plain
              class="btn"
              icon="el-icon-upload2"
              :text="$t('system.import')"
              :loading="importLoading"
            />
          </el-upload>

          <c-button
            v-if="isExport"
            type="warning"
            icon="el-icon-download"
            class="btn"
            plain
            text="导出"
            :text="$t('system.export')"
            @click="exportExcel"
            :loading="exportLoading"
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
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      importLoading: false,
      exportLoading: false,
      baseUrl: process.env.VUE_APP_BASE_API, // 请求地址
      headers: { Authorization: "Bearer " + getToken() },
    };
  },
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
    isExport: {
      text: "是否需要导出按钮",
      type: [Boolean],
      default: () => {
        return true;
      },
    },
    hasImport: {
      text: "是否需要导入按钮",
      type: [Boolean],
      default: () => {
        return false;
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
    imports: {
      text: "导入参数",
      type: [Object],
      default: () => {
        return {
          url: "",
          data: {},
        };
      },
    },
    exports: {
      text: "导出参数",
      type: [Object],
      default: () => {
        return {
          url: "",
          name: null,
          data: {},
        };
      },
    },
  },
  methods: {
    //新增
    addLine() {
      this.$emit("addLine");
    },
    //删除
    deleteLines() {
      this.$emit("deleteLines");
    },
    //导出
    exportExcel() {
      this.$emit("exportExcel");
    },
    //导入
    importExcel() {
      this.$emit("importExcel");
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
