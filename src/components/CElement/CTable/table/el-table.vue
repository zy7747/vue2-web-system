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
      <el-table
        border
        :stripe="stripe"
        ref="eTable"
        v-bind="$attrs"
        :max-height="maxHeight"
        :min-height="minHeight"
        :data="tableData"
        :style="`width:${width}`"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        @selection-change="handleSelectionChange"
      >
        <template v-for="(column, index) in tableColumn">
          <!-- 序号/多选 -->
          <el-table-column
            v-if="column.type === 'index' || column.type === 'selection'"
            v-bind="{
              ...column,
              align: 'center',
              width: 55,
            }"
            :key="index"
            fixed="left"
          />

          <el-table-column
            v-else-if="column.show == undefined ? true : column.show"
            v-bind="{
              ...column,
              align: column.align ? column.align : 'center',
            }"
            :filters="column.isFilters ? dataFilters(column) : null"
            :filter-method="column.isFilters ? filterHandler : null"
            :show-overflow-tooltip="true"
            :key="index"
          >
            <!-- 动态组件 -->
            <template slot-scope="scope">
              <Operation
                v-if="column.type === 'action'"
                :row="scope.row"
                :rowIndex="scope.$index"
                :prop="column.prop"
                :column="column"
                :actions="actions"
                :isForm="isForm(scope.$index)"
                @editForm="editForm"
                @saveForm="saveForm"
                @cancel="cancel"
                @remove="remove"
              />

              <TableForm
                v-else-if="column.form && isForm(scope.$index)"
                :row="scope.row"
                :rowIndex="scope.$index"
                :prop="column.prop"
                :column="column"
              />

              <slot
                v-else-if="column.type === 'custom' && !isForm(scope.$index)"
                :name="column.componentName"
                :index="scope.$index"
                :row="scope.row"
                :column="column"
              />

              <CSlot
                v-else-if="column.type && !isForm(scope.$index)"
                :row="scope.row"
                :rowIndex="scope.$index"
                :prop="column.prop"
                :column="column"
              />

              <TranslationColumn
                v-else
                :row="scope.row"
                :rowIndex="scope.$index"
                :prop="column.prop"
                :column="column"
              />
            </template>

            <template
              v-if="column.type === 'action' && !column.isDetail"
              slot="header"
            >
              <Column :tableColumn="tableColumn" />
            </template>
          </el-table-column>
        </template>
      </el-table>
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
  name: "STable",
  mixins: [baseParams],
  components: {
    Column,
    CSlot,
    TableForm,
    Operation,
    TranslationColumn,
  },
  mounted() {
    if (this.isRowDrop) {
      this.rowDrop();
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-table__header .el-table__cell {
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

::v-deep .el-table__cell {
  padding: 5px;
}

.dict-tag-list {
  display: flex;
}

::v-deep .el-icon-arrow-down {
  color: #fff !important;
}
</style>
