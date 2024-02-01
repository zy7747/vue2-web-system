<!--  -->
<template>
  <!-- 可编辑状态的按钮 -->
  <div class="action">
    <!-- 编辑 -->
    <c-button
      v-if="!isForm"
      :text="$t('system.edit')"
      class="btn"
      type="text"
      icon="el-icon-edit-outline"
      @click="editForm"
      v-hasPermission="permission.edit"
    />

    <!-- 保存 -->
    <c-button
      v-if="isForm"
      :text="$t('system.save')"
      type="text"
      class="btn"
      icon="el-icon-folder-checked"
      @click="saveForm"
    />

    <!-- 取消 -->
    <c-button
      v-if="isForm"
      :text="$t('system.cancel')"
      type="text"
      class="btn"
      icon="el-icon-close"
      @click="cancel"
    />

    <!-- 删除行 -->
    <el-popconfirm
      v-if="!isForm"
      confirm-button-text="好的"
      cancel-button-text="不用了"
      icon="el-icon-info"
      icon-color="red"
      title="是否需要删除该行"
      @confirm="remove"
    >
      <c-button
        slot="reference"
        :text="$t('system.delete')"
        color="red"
        type="text"
        icon="el-icon-delete"
        v-hasPermission="permission.remove"
      />
    </el-popconfirm>
  </div>
</template>

<script>
export default {
  props: {
    isForm: {
      text: "是否是表单",
      type: [Boolean],
      default: () => {
        return false;
      },
    },
    permission: {
      text: "权限",
      type: [Object],
      default: () => {
        return {
          edit: [],
          remove: [],
        };
      },
    },
    action: {
      text: "操作",
      type: [Object],
      default: () => {
        return {
          save() {},
          remove() {},
        };
      },
    },
  },
  methods: {
    //编辑表单
    editForm() {
      this.$emit("editForm");
    },
    //保存表单
    saveForm() {
      this.$emit("saveForm", {
        save: this.action?.save,
        noLink: this.action?.noLink,
      });
    },
    //删除行
    remove() {
      this.$emit("remove", {
        remove: this.action?.remove,
        noLink: this.action?.noLink,
      });
    },
    //取消
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss" scoped></style>
