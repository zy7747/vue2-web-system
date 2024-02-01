<template>
  <div>
    <el-dialog
      v-dragDialog
      :title="title"
      :visible.sync="visible"
      :width="width"
      :modal="false"
      v-bind="$attrs"
      v-on="$listeners"
      :close-on-click-modal="false"
      :destroy-on-close="destroyOnClose"
      style="z-index: 99"
    >
      <div class="body">
        <slot name="body" />
      </div>

      <span slot="footer" class="dialog-footer">
        <c-button
          v-if="hasCheck"
          text="确定"
          icon="el-icon-circle-check"
          type="primary"
          @click="handleConfirm()"
        />
        <c-button
          text="取消"
          style="margin-left: 5px"
          icon="el-icon-circle-close"
          @click="handleClose()"
        />
      </span>
    </el-dialog>
  </div>
</template>

<script>
import baseParams from "./mixins/index";

export default {
  mixins: [baseParams],
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    handleOpen() {
      this.visible = true;
    },
    handleConfirm() {
      this.$emit("handleConfirm");
    },
    handleClose() {
      this.$emit("handleClose");
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  border-radius: 15px;
}

::v-deep .el-dialog__title {
  padding-left: 10px;
  line-height: 24px;
  font-size: 18px;
  color: #282f37;
  border-left: 3px solid #3478f5;
}

::v-deep .el-dialog__header {
  font-weight: 700;
  border-bottom: 1px solid #e3e3e3;
}

::v-deep .el-dialog__body {
  padding: 5px !important;
  background-color: #f6f7f9;
}

::v-deep .el-dialog__footer {
  justify-content: center;
  display: flex;
  align-content: center;
  border-top: 1px solid #e3e3e3;
  height: 50px;
  .dialog-footer {
    display: flex;
  }
}

::v-deep .el-overlay {
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.body {
  max-height: 65vh;
  overflow: auto;
}
</style>
