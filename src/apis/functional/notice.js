export default {
  page: {
    url: "/notice/page",
    method: "get",
    app: "notice",
    text: "消息通知分页",
  },
  list: {
    url: "/notice/list",
    method: "get",
    app: "notice",
    text: "消息通知列表",
  },
  detail: {
    url: "/notice/detail",
    method: "get",
    app: "notice",
    text: "消息通知详情",
  },
  saveList: {
    url: "/notice/saveList",
    method: "post",
    app: "notice",
    text: "消息通知编辑",
  },
  delete: {
    url: "/notice/delete",
    method: "delete",
    app: "notice",
    text: "消息通知删除",
  },
  export: {
    url: "/notice/export",
    method: "get",
    app: "notice",
    blob: true,
    text: "消息通知导出",
  },
};
