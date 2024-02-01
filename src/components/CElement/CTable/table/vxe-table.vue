<!-- 表格 -->
<template>
  <div class="STable">
    <!-- 表格 -->
    <el-form
      ref="tableForm"
      :model="formData"
      :rules="rules"
      :validate-on-rule-change="false"
    >
      <vxe-table
        border
        align="center"
        size="small"
        stripe
        ref="eTable"
        v-bind="$attrs"
        :max-height="maxHeight"
        :data="tableData"
        :loading="loading"
        :loading-config="{
          icon: 'vxe-icon-indicator roll',
          text: '正在拼命加载中...',
        }"
        :scroll-y="{ enabled: true }"
        :column-config="{ resizable: true }"
        @selection-change="handleSelectionChange"
      >
        <template v-for="(column, index) in tableColumn">
          <!-- 序号/多选 -->
          <vxe-column
            v-if="column.type === 'index'"
            v-bind="{
              ...column,
              width: 100,
              type: 'seq',
              field: column.prop,
              title: column.label,
            }"
            :key="index"
            fixed="left"
            tree-node
          />

          <vxe-column
            v-else-if="column.type === 'selection'"
            v-bind="{
              ...column,
              width: 55,
              type: 'checkbox',
            }"
            :key="index"
            fixed="left"
          />

          <vxe-column
            v-else-if="column.type === 'show'"
            v-bind="{
              ...column,
              width: 55,
              field: column.prop,
              title: column.label,
            }"
            tree-node
            :key="index"
            fixed="left"
          />

          <!-- 其他 -->
          <vxe-column
            v-else-if="column.show == undefined ? true : column.show"
            v-bind="{
              ...column,
              align: column.align ? column.align : 'center',
              field: column.prop,
              title: column.label,
            }"
            :show-header-overflow="true"
            :show-overflow="true"
            :filters="column.isFilters ? dataFilters(column) : null"
            :filter-method="column.isFilters ? filterHandler : null"
            :key="index"
          >
            <template #default="{ row, rowIndex }">
              <!-- 操作栏 -->
              <Operation
                v-if="column.type === 'action'"
                :row="row"
                :rowIndex="rowIndex"
                :prop="column.prop"
                :column="column"
                :actions="actions"
                :isForm="isForm(rowIndex)"
                @editForm="editForm"
                @saveForm="saveForm"
                @cancel="cancel"
                @remove="remove"
              />

              <!-- 表单插槽 -->
              <TableForm
                v-else-if="column.form && isForm(rowIndex)"
                :row="row"
                :rowIndex="rowIndex"
                :prop="column.prop"
                :column="column"
              />

              <!-- 自定义组件 -->
              <slot
                v-else-if="column.type === 'custom' && !isForm(rowIndex)"
                :name="column.componentName"
                :index="rowIndex"
                :row="row"
                :column="column"
              />

              <!-- 其他插槽组件 -->
              <CSlot
                v-else-if="column.type && !isForm(rowIndex)"
                :row="row"
                :rowIndex="rowIndex"
                :prop="column.prop"
                :column="column"
              />

              <!-- 翻译栏 -->
              <TranslationColumn
                v-else
                :row="row"
                :rowIndex="rowIndex"
                :prop="column.prop"
                :column="column"
              />
            </template>

            <template
              v-if="column.type === 'action' && !column.isDetail"
              #header
            >
              <Column :tableColumn="tableColumn" />
            </template>
          </vxe-column>
        </template>
      </vxe-table>
    </el-form>
  </div>
</template>

<script>
import baseParams from "./mixins/index";
import Column from "./components/Column";
import CSlot from "./components/CSlot";
import TableForm from "./components/TableForm";
import Operation from "./components/Operation";
import TranslationColumn from "./components/TranslationColumn";

export default {
  name: "VxeTable",
  mixins: [baseParams],
  components: {
    Column,
    CSlot,
    Operation,
    TableForm,
    TranslationColumn,
  },
};
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .vxe-header--column {
  padding: 2px 0;
  color: aliceblue;
  background-color: #1683bd !important;
}

::v-deep .el-form-item.is-required::before {
  content: "*" !important;
  color: red;
  margin-right: 7px;
}

::v-deep .el-form-item {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 0;
}

.el-form-item.is-error {
  margin-bottom: 20px;
}

.link {
  color: #45b3ee;
  font-weight: 550;
  width: 100%;
}
.link:hover {
  color: #196a96;
  text-decoration: underline;
}

.dict-tag-list {
  display: flex;
}
</style>
