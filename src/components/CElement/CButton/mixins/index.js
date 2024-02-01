export default {
  props: {
    text: {
      text: "按钮名称",
      type: [String],
      default: () => {
        return "";
      },
    },
    hasPermission: {
      text: "权限列表",
      type: [Array],
      default: () => {
        return [];
      },
    },
    size: {
      text: "按钮大小",
      type: [String],
      default: () => {
        return "mini";
      },
    },
    show: {
      text: "是否显示",
      type: [Boolean, Function],
      default: () => {
        return true;
      },
    },
    color: {
      text: "按钮颜色",
      type: [String],
      default: () => {
        return "";
      },
    },
  },
};
