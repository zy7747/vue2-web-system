<!--  -->
<template>
  <div>
    <div class="action">
      <template v-for="item in actions">
        <c-button
          v-if="item.type === 'add'"
          class="btn"
          type="text"
          :text="$t('system.add')"
          v-hasPermission="item.permission"
          icon="el-icon-plus"
          v-bind="item.option"
          :show="item.show ? item.show({ row, index: rowIndex }) : true"
          @click="item.click({ row, index: rowIndex })"
        />

        <c-button
          v-else-if="item.type === 'edit'"
          class="btn"
          type="text"
          :text="$t('system.edit')"
          v-hasPermission="item.permission"
          icon="el-icon-edit-outline"
          v-bind="item.option"
          :show="item.show ? item.show({ row, index: rowIndex }) : true"
          @click="item.click({ row, index: rowIndex })"
        />

        <c-button
          v-else-if="item.type === 'detail'"
          class="btn"
          :text="$t('system.detail')"
          type="text"
          color="orange"
          icon="el-icon-tickets"
          v-bind="item.option"
          :show="item.show ? item.show({ row, index: rowIndex }) : true"
          @click="item.click({ row, index: rowIndex })"
        />

        <el-popconfirm
          v-else-if="item.type === 'remove'"
          confirm-button-text="好的"
          cancel-button-text="不用了"
          icon="el-icon-info"
          icon-color="red"
          title="是否需要删除该行"
          @confirm="item.click({ row, index: rowIndex })"
        >
          <c-button
            slot="reference"
            :text="$t('system.delete')"
            color="red"
            type="text"
            icon="el-icon-delete"
            v-hasPermission="item.permission"
            v-bind="item.option"
            :show="item.show ? item.show({ row, index: rowIndex }) : true"
          />
        </el-popconfirm>

        <Actions
          v-else-if="item.type === 'actions'"
          :permission="item.permission"
          :isForm="isForm"
          :action="item.action"
          @editForm="editForm"
          @saveForm="saveForm"
          @remove="remove"
          @cancel="cancel"
        />

        <c-button
          v-else
          :icon="item.icon"
          class="btn"
          type="text"
          :text="item.text"
          v-bind="item.option"
          :show="item.show ? item.show({ row, index: rowIndex }) : true"
          @click="item.click({ row, index: rowIndex })"
          v-hasPermission="item.permission"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Actions from "./Actions";

export default {
  components: {
    Actions,
  },
  props: {
    row: {
      text: "行信息",
      type: [Object],
      default: () => {
        return {};
      },
    },
    formData: {
      text: "表单数据",
      type: [Object],
      default: () => {
        return {};
      },
    },
    rowIndex: {
      text: "行下标",
      type: [Number],
    },
    isForm: {
      text: "是否是表单",
      type: [Boolean],
      default: () => {
        return false;
      },
    },
    actions: {
      text: "操作栏",
      type: [Array],
      default: () => {
        return [];
      },
    },
  },
  methods: {
    //编辑表单
    editForm() {
      this.$emit("editForm", { row: this.row, index: this.rowIndex });
    },
    //保存表单
    saveForm({ save, noLink }) {
      this.$emit("saveForm", {
        row: this.row,
        index: this.rowIndex,
        save,
        noLink,
      });
    },
    //删除行
    remove({ remove, noLink }) {
      this.$emit("remove", {
        row: this.row,
        index: this.rowIndex,
        remove,
        noLink,
      });
    },
    //取消
    cancel() {
      this.$emit("cancel", { row: this.row, index: this.rowIndex });
    },
  },
};
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
