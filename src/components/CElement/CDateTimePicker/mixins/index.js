export default {
  props: {
    value: {
      text: "数据对象",
      type: [String, Number, Array, Date],
      default: () => {
        return "";
      },
    },
    width: {
      type: [String],
      default: "100%",
    },
    minWidth: {
      type: [String],
      default: "90px",
    },
    clearable: {
      text: "可清除",
      type: [Boolean],
      default: () => {
        return true;
      },
    },
    size: {
      text: "日期组件大小",
      type: [String],
      default: () => {
        return "small";
      },
    },
    disabled: {
      text: "禁用",
      type: [Boolean, Function],
      default: () => {
        return false;
      },
    },
    type: {
      text: "日期选择器类型",
      type: [String],
      default: () => {
        return "date";
      },
    },
    format: {
      text: "日期格式",
      type: [String],
      default: () => {
        return "yyyy-MM-dd HH:mm:ss";
      },
    },
    valueFormat: {
      text: "日期格式",
      type: [String],
      default: () => {
        return "yyyy-MM-dd HH:mm:ss";
      },
    },
    placeholder: {
      text: "提示语句",
      type: [String],
      default: () => {
        return "请选择时间";
      },
    },
  },
};
