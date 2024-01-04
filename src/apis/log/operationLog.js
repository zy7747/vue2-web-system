export default {
  page: {
    url: "/operationLog/page",
    method: "get",
    app: "operationLog",
    text: "操作日志分页",
  },
  list: {
    url: "/operationLog/list",
    method: "get",
    app: "operationLog",
    text: "操作日志列表",
  },
  detail: {
    url: "/operationLog/detail",
    method: "get",
    app: "operationLog",
    text: "操作日志详情",
  },
  saveList: {
    url: "/operationLog/saveList",
    method: "post",
    app: "operationLog",
    text: "操作日志编辑",
  },
  delete: {
    url: "/operationLog/delete",
    method: "delete",
    app: "operationLog",
    text: "操作日志删除",
  },
  export: {
    url: "/operationLog/export",
    method: "get",
    app: "operationLog",
    blob: true,
    text: "操作日志导出",
  },
};
