export default {
  page: {
    url: "/page/page",
    method: "get",
    app: "page",
    text: "页面配置分页",
  },
  list: {
    url: "/page/list",
    method: "get",
    app: "page",
    text: "页面配置列表",
  },
  detail: {
    url: "/page/detail",
    method: "get",
    app: "page",
    text: "页面配置详情",
  },
  saveList: {
    url: "/page/saveList",
    method: "post",
    app: "page",
    text: "页面配置编辑",
  },
  delete: {
    url: "/page/delete",
    method: "delete",
    app: "page",
    text: "页面配置删除",
  },
  export: {
    url: "/page/export",
    method: "get",
    app: "page",
    blob: true,
    text: "页面配置导出",
  },
};
