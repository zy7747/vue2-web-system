export default {
  props: {
    value: {
      text: "数据对象",
      type: [Number],
      default: null,
    },
    width: {
      type: [String],
      default: "100%",
    },
    minWidth: {
      type: [String],
      default: "90px",
    },
    size: {
      text: "输入框大小",
      type: [String],
      default: () => {
        return "small";
      },
    },
    clearable: {
      text: "可清除",
      type: [Boolean],
      default: () => {
        return true;
      },
    },
    disabled: {
      text: "禁用",
      type: [Boolean, Function],
      default: () => {
        return false;
      },
    },
  },
};
