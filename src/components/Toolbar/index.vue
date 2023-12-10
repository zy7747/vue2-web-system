<!-- 编辑栏 -->
<template>
  <div>
    <div class="header">
      <div class="left">
        <div class="button">
          <!-- 新增 -->
          <c-button
            v-if="hasAdd"
            type="primary"
            class="btn"
            :text="$t('system.add')"
            plain
            v-bind="addBtn"
            icon="el-icon-plus"
            @click="addLine"
            v-hasPermission="permission.add"
          />
          <!-- 批量删除 -->
          <c-button
            v-if="hasDelete"
            type="danger"
            icon="el-icon-delete"
            class="btn"
            :text="$t('system.deleteMore')"
            plain
            v-bind="deleteBtn"
            @click="deleteLines"
            v-hasPermission="permission.delete"
          />
          <!-- 导入 -->
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
              v-hasPermission="permission.imports"
            />
          </el-upload>
          <!-- 导出 -->
          <c-button
            v-if="hasExport"
            type="warning"
            icon="el-icon-download"
            class="btn"
            plain
            :text="$t('system.export')"
            @click="exportExcel"
            :loading="exportLoading"
            v-hasPermission="permission.exports"
          />
        </div>
      </div>
      <div class="right"></div>
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
    hasAdd: {
      text: "是否需要新增按钮",
      type: [Boolean],
      default: () => {
        return true;
      },
    },
    hasDelete: {
      text: "是否需要批量删除按钮",
      type: [Boolean],
      default: () => {
        return true;
      },
    },
    hasExport: {
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
    addBtn: {
      text: "新增按钮权限/禁用状态",
      type: [Object],
      default: () => {
        return {};
      },
    },
    deleteBtn: {
      text: "删除按钮权限/禁用状态",
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
          api: () => {},
          fileName: null,
          data: {},
        };
      },
    },
    permission: {
      text: "按钮权限配置",
      type: [Object],
      default: () => {
        return {
          add: [],
          delete: [],
          imports: [],
          exports: [],
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
      //Loading...
      this.exportLoading = true;
      this.exports
        .api()
        .then((res) => {
          this.$download.excel(res, this.exports.fileName + "xlsx");
          //Loading...
          this.exportLoading = false;
          this.$message.success("导出成功");
        })
        .catch(() => {
          //Loading...
          this.exportLoading = false;
          this.$message.error("导出失败");
        });
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
  .button {
    display: flex;
  }
}
</style>
