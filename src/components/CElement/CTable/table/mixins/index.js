export default {
  props: {
    maxHeight: {
      text: "最大高度",
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
      type: [String],
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
    isEditTable: {
      text: "可编辑的表单",
      type: [Boolean],
      default: () => {
        return false;
      },
    },
    isEditLine: {
      text: "编辑行按钮",
      type: [Boolean],
      default: true,
    },
    isDetailLine: {
      text: "详情行按钮",
      type: [Boolean],
      default: true,
    },
    isDeleteLine: {
      text: "删除行按钮",
      type: [Boolean],
      default: true,
    },
    isRowDrop: {
      text: "是否可以拖拽行",
      type: [Boolean],
      default: () => {
        return false;
      },
    },
  },
};
