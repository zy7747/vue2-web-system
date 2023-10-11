export default {
  data() {
    return {
      form: {
        layout: "常规",
        theme: "",
      },
      options: {
        layout: [
          { label: "常规", value: "常规" },
          { label: "纵向", value: "纵向" },
          { label: "横向", value: "横向" },
        ],
        theme: [{ label: "粉色年华", value: "粉色年华" }],
      },
    };
  },
};
