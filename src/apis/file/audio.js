export default {
  page: {
    url: "/audio/page",
    method: "get",
    app: "audio",
    text: "音频分页",
  },
  list: {
    url: "/audio/list",
    method: "get",
    app: "audio",
    text: "音频列表",
  },
  detail: {
    url: "/audio/detail",
    method: "get",
    app: "audio",
    text: "音频详情",
  },
  saveList: {
    url: "/audio/saveList",
    method: "post",
    app: "audio",
    text: "音频编辑",
  },
  delete: {
    url: "/audio/delete",
    method: "delete",
    app: "audio",
    text: "音频删除",
  },
  export: {
    url: "/audio/export",
    method: "get",
    app: "audio",
    blob: true,
    text: "音频导出",
  },
};
