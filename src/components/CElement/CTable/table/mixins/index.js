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
      text: "是否可编辑的表单",
      type: [Boolean],
      default: () => {
        return false;
      },
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
    hasEditLine: {
      text: "是否有编辑行按钮",
      type: [Boolean],
      default: true,
    },
    hasDetailLine: {
      text: "是否有详情行按钮",
      type: [Boolean],
      default: true,
    },
    hasDeleteLine: {
      text: "是否有删除行按钮",
      type: [Boolean],
      default: true,
    },
    permission: {
      text: "按钮权限配置",
      type: [Object],
      default: () => {
        return {
          edit: [],
          delete: [],
        };
      },
    },
  },
};
