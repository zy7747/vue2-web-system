import Sortable from "sortablejs";

export default {
  props: {
    maxHeight: {
      text: "最大高度",
      type: [String, Number],
      default: () => {
        return "525px";
      },
    },
    minHeight: {
      text: "最小高度",
      type: [String, Number],
      default: () => {
        return "525px";
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
  data() {
    return {
      //当前表单数据
      formData: {},
      //旧表单数据
      oldData: {},
      //编辑的行的下标
      editLineIndex: null,
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
      this.$emit("handleSelectionChange", val);
    },
    isForm(index) {
      return this.editLineIndex === index;
    },
    //新建表单
    createForm(createData = {}) {
      if (this.tableData.length > 0) {
        if (!this.tableData[0].id || this.editLineIndex !== null) {
          this.$message.warning("请先保存数据");
        } else {
          this.$emit("createForm");
          this.tableData.unshift(createData);
          this.formData = this.tableData[0];
          this.editLineIndex = 0;
        }
      } else {
        this.tableData.unshift(createData);
        this.formData = this.tableData[0];
        this.editLineIndex = 0;
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
      }
    },
    //取消
    cancel({ row, index }) {
      //如果没保存数据取消删除行
      if (!row.id) {
        this.tableData.splice(0, 1);
        this.editLineIndex = null;
        this.formData = {};
      } else {
        this.$set(this.tableData, this.editLineIndex, this.oldData);
        this.editLineIndex = null;
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
        save({ row, index });
      }
    },
    //刷新表单
    refreshForm() {
      this.editLineIndex = null;
      this.formData = {};
    },
    // 拖拽排序
    rowDrop() {
      const el = this.$refs.eTable.$el.querySelectorAll(
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
