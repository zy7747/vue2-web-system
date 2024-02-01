<!-- 编辑栏 -->
<template>
  <div>
    <div class="header">
      <div class="left">
        <div class="button">
          <template v-for="item in tools">
            <!-- 新增 -->
            <c-button
              v-if="item.type === 'add'"
              type="primary"
              class="btn"
              icon="el-icon-plus"
              :text="$t('system.add')"
              plain
              v-bind="item.options"
              v-on="item.on"
              v-hasPermission="item.permission"
            />
            <!-- 批量删除 -->
            <c-button
              v-else-if="item.type === 'remove'"
              type="danger"
              icon="el-icon-delete"
              class="btn"
              :text="$t('system.deleteMore')"
              plain
              v-bind="item.options"
              @click="remove(item.on.click)"
              v-hasPermission="item.permission"
            />
            <!-- 导入 -->

            <template v-else-if="item.type === 'import'">
              <input
                v-show="false"
                ref="file"
                type="file"
                name="file"
                @change="UploadFile(item.options)"
              />

              <c-button
                type="info"
                plain
                ref="importBtn"
                class="btn"
                icon="el-icon-upload2"
                v-bind="item.options"
                :text="$t('system.import')"
                @click="importExcel(item.options)"
                v-hasPermission="item.permission"
              />
            </template>

            <!-- 导出 -->
            <c-button
              v-else-if="item.type === 'export'"
              type="warning"
              icon="el-icon-download"
              class="btn"
              plain
              :text="$t('system.export')"
              @click="exportExcel(item.options)"
              v-hasPermission="item.permission"
            />

            <c-button
              v-else
              :icon="item.icon"
              class="btn"
              :text="item.text"
              v-bind="item.options"
              v-on="item.on"
              v-hasPermission="item.permission"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tools: {
      text: "操作按钮",
      type: [Array],
      default: () => {
        return [];
      },
    },
  },
  methods: {
    //导出
    exportExcel(options) {
      options
        .api()
        .then((res) => {
          this.$download.excel(res, options.fileName);

          this.$message.success("导出成功");
        })
        .catch(() => {
          this.$message.error("导出失败");
        });
    },
    remove(remove) {
      this.$modal.confirm("是否删除").then(() => {
        remove();
      });
    },
    importExcel() {
      this.$refs.file[0].click();
    },
    //导入
    UploadFile(options) {
      const files = this.$refs.file[0].files;
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();

        formData.append("file", files[i]);

        options
          .api(formData)
          .then(() => {
            this.$message.success("导入成功");
            options.success();
          })
          .catch(() => {
            this.$message.error("导入失败");
          });
      }
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
