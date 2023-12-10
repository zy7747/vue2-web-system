export default {
  page: {
    url: "/log/page",
    method: "get",
    app: "log",
    text: "日志分页",
  },
  list: {
    url: "/log/list",
    method: "get",
    app: "log",
    text: "日志列表",
  },
  detail: {
    url: "/log/detail",
    method: "get",
    app: "log",
    text: "日志详情",
  },
  saveList: {
    url: "/log/saveList",
    method: "post",
    app: "log",
    text: "日志编辑",
  },
  delete: {
    url: "/log/delete",
    method: "delete",
    app: "log",
    text: "日志删除",
  },
  export: {
    url: "/log/export",
    method: "get",
    app: "log",
    blob: true,
    text: "日志导出",
  },
};
