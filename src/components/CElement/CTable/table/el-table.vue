<!-- 表格 -->
<template>
  <div class="ElTable">
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
        ref="table"
        v-bind="$attrs"
        :max-height="maxHeight"
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
                v-else-if="column.type"
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
import Sortable from "sortablejs";
import Column from "./components/Column";
import CSlot from "./components/CSlot";
import TableForm from "./components/TableForm";
import Operation from "./components/Operation";
import TranslationColumn from "./components/TranslationColumn";

export default {
  mounted() {
    if (this.isRowDrop) {
      this.rowDrop();
    }
  },
  props: {
    maxHeight: {
      text: "最大高度",
      type: [String, Number],
      default: () => {
        return "600px";
      },
    },
    tableData: {
      text: "数据列表",
      type: [Array, Function],
      default: () => {
        return [];
      },
    },
    tableColumn: {
      text: "列信息",
      type: [Array, Function],
      default: () => {
        return [];
      },
    },
    width: {
      text: "table宽度",
      type: [String, Number],
      default: () => {
        return "100%";
      },
    },
    loading: {
      text: "表单加载中...",
      type: [Boolean],
      default: () => {
        return false;
      },
    },
    stripe: {
      text: "stripe",
      type: [Boolean],
      default: true,
    },
    isRowDrop: {
      text: "是否可拖拽行",
      type: [Boolean],
      default: () => {
        return false;
      },
    },
    isFilters: {
      text: "是否需要过滤",
      type: [Boolean],
      default: () => {
        return false;
      },
    },
    actions: {
      text: "操作按钮",
      type: [Array],
      default: () => {
        return [];
      },
    },
  },
  components: {
    Column,
    CSlot,
    Operation,
    TableForm,
    TranslationColumn,
  },
  data() {
    return {
      //当前表单数据
      formData: {},
      //旧表单数据
      oldData: {},
      //编辑的行的下标
      editLineIndex: null,
      isEdit: false,
      isAdd: false,
    };
  },
  computed: {
    //校验规则
    rules() {
      const rules = {};
      this.tableColumn.forEach((item) => {
        if (item.form && item.form.rules) {
          rules[item.prop] = item.form.rules;
        }
      });

      return rules;
    },
  },
  methods: {
    //多选
    handleSelectionChange(val) {
      this.$attrs.options?.selection(val);
    },
    isForm(index) {
      return this.editLineIndex === index;
    },
    //新建表单
    createForm(createData = {}) {
      if (this.tableData.length > 0) {
        if (this.editLineIndex !== null) {
          this.$message.warning("请先保存数据");
        } else {
          this.$emit("createForm");
          this.tableData.unshift(createData);
          this.formData = this.tableData[0];
          this.editLineIndex = 0;
          this.isAdd = true;
        }
      } else {
        this.tableData.unshift(createData);
        this.formData = this.tableData[0];
        this.editLineIndex = 0;
        this.isAdd = true;
      }
    },
    //编辑表单
    editForm({ row, index }) {
      if (this.editLineIndex !== null) {
        this.$message.warning("请先保存数据");
      } else {
        this.formData = row;
        this.oldData = JSON.parse(JSON.stringify(row));
        this.editLineIndex = index;
        this.isEdit = true;
      }
    },
    //取消
    cancel({ row, index }) {
      //如果没保存数据取消删除行
      if (this.isAdd) {
        this.tableData.splice(0, 1);
        this.editLineIndex = null;
        this.isAdd = false;
        this.formData = {};
      } else {
        this.$set(
          this.tableData,
          this.editLineIndex,
          JSON.parse(JSON.stringify(this.oldData))
        );
        this.oldData = {};
        this.editLineIndex = null;
        this.isEdit = false;
        this.formData = {};
      }
    },
    //保存表单
    saveForm({ row, index, save, noLink }) {
      this.$refs.tableForm
        .validate()
        .then(() => {
          if (noLink) {
            this.editLineIndex = null;
            this.isEdit = false;
            this.isAdd = false;
            this.formData = {};
            save({ row, index });
          } else {
            save({ row, index });
          }
        })
        .catch((err) => {
          this.$message.error("校验不通过");
        });
    },
    //删除
    remove({ row, index, remove, noLink }) {
      if (noLink) {
        this.tableData.splice(index, 1);
        remove({ row, index });
      } else {
        remove({ row, index });
      }
    },
    //刷新表单
    refreshForm() {
      this.editLineIndex = null;
      this.isAdd = false;
      this.isEdit = false;
      this.formData = {};
    },
    // 拖拽排序
    rowDrop() {
      const el = this.$refs.table.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];

      Sortable.create(el, {
        onEnd: (evt) => {
          const targetRow = this.tableData.splice(evt.oldIndex, 1)[0];
          this.tableData.splice(evt.newIndex, 0, targetRow);

          for (let index in this.tableData) {
            this.tableData[index].sort = parseInt(index);
          }
        },
      });
    },
    //数据下拉筛选
    dataFilters(column) {
      const filtersData = [];

      this.tableData.forEach((item) => {
        const text = item[column.prop];

        if (text && text !== "" && typeof text === "string") {
          if (column.translation) {
            filtersData.push({
              text: this.getDictLabel(column.translation, text),
              value: text,
            });
          } else {
            filtersData.push({
              text: text,
              value: text,
            });
          }
        }
      });

      return this.$uniqBy(filtersData, "value");
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
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
