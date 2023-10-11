export default {
  props: {
    formData: {
      text: "表单基础数据",
      type: [Object],
      default: () => {
        return {};
      },
    },
    formParams: {
      text: "表单基础信息",
      type: [Array],
      default: () => {
        return [];
      },
    },
    labelPosition: {
      text: "表单对齐方式",
      type: [String],
      default: () => {
        return "top";
      },
    },
  },
  computed: {
    //校验规则
    rules() {
      const rules = {};
      this.formParams.forEach((item) => {
        if (item.rules) {
          rules[item.prop] = item.rules;
        }
      });
      return rules;
    },
  },
};
