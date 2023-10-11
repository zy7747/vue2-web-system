export default {
  props: {
    title: {
      text: "标题名称",
      type: [String],
      default: () => {
        return "提示";
      },
    },
    hasCheck: {
      text: "是否有确认按钮",
      type: [Boolean],
      default: () => {
        return true;
      },
    },
    destroyOnClose: {
      text: "是否缓存",
      type: [Boolean],
      default: () => {
        return false;
      },
    },
    width: {
      text: "宽度",
      type: [String],
      default: () => {
        return "250px";
      },
    },
  },
  data() {
    return {
      visible: false,
    };
  },
};
