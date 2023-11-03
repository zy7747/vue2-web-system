export default {
  data() {
    return {
      formData: {
        layout: null,
        theme: null,
      },
      formParams: [
        {
          type: "select",
          label: "布局模式",
          prop: "layout",
          span: 24,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: "主题",
          prop: "theme",
          span: 24,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: "导航栏主题",
          prop: "headerTheme",
          span: 24,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: "侧边栏主题",
          prop: "sidebarTheme",
          span: 24,
          attributes: {},
          on: {},
        },
        {
          type: "select",
          label: "自动锁屏",
          prop: "lock",
          span: 24,
          attributes: {},
          on: {},
        },
        {
          type: "number",
          label: "侧边栏宽度",
          prop: "sidebarWidth",
          span: 24,
          attributes: {},
          on: {},
        },
        {
          type: "switch",
          label: "灰色模式",
          prop: "grey",
          span: 24,
          attributes: {},
          on: {},
        },

        {
          type: "switch",
          label: "logo",
          prop: "logo",
          span: 24,
          attributes: {},
          on: {},
        },
        {
          type: "switch",
          label: "色弱模式",
          prop: "weak",
          span: 24,
          attributes: {},
          on: {},
        },
      ],
    };
  },
};
