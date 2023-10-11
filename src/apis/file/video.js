export default {
  page: {
    url: "/video/page",
    method: "get",
    app: "video",
    text: "视频分页",
  },
  list: {
    url: "/video/list",
    method: "get",
    app: "video",
    text: "视频列表",
  },
  detail: {
    url: "/video/detail",
    method: "get",
    app: "video",
    text: "视频详情",
  },
  saveList: {
    url: "/video/saveList",
    method: "post",
    app: "video",
    text: "视频编辑",
  },
  delete: {
    url: "/video/delete",
    method: "delete",
    app: "video",
    text: "视频删除",
  },
  export: {
    url: "/video/export",
    method: "get",
    app: "video",
    blob: true,
    text: "视频导出",
  },
};
