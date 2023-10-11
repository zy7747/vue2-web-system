export default {
  page: {
    url: "/dict/page",
    method: "get",
    app: "dict",
    text: "字典分页",
  },
  dictList: {
    url: "/dict/list",
    method: "get",
    app: "dict",
    text: "字典列表",
  },
  dictSubList: {
    url: "/dict/subList",
    method: "get",
    app: "dict",
    text: "字典子集",
  },
  dictAllList: {
    url: "/dict/dictAllList",
    method: "get",
    app: "dict",
    text: "获取所有字典",
  },
  detail: {
    url: "/dict/detail",
    method: "get",
    app: "dict",
    text: "字典详情",
  },
  saveList: {
    url: "/dict/saveList",
    method: "post",
    app: "dict",
    text: "字典编辑",
  },
  delete: {
    url: "/dict/delete",
    method: "delete",
    app: "dict",
    text: "字典删除",
  },
  export: {
    url: "/dict/export",
    method: "get",
    app: "dict",
    blob: true,
    text: "字典导出",
  },
};
