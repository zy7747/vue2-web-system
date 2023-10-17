export default {
  page: {
    url: "/job/page",
    method: "get",
    app: "job",
    text: "定时任务分页",
  },
  list: {
    url: "/job/list",
    method: "get",
    app: "job",
    text: "定时任务列表",
  },
  detail: {
    url: "/job/detail",
    method: "get",
    app: "job",
    text: "定时任务详情",
  },
  saveList: {
    url: "/job/saveList",
    method: "post",
    app: "job",
    text: "定时任务编辑",
  },
  changeJobStatus: {
    url: "/job/changeJobStatus",
    method: "post",
    app: "job",
    text: "修改定时器状态",
  },
  delete: {
    url: "/job/delete",
    method: "delete",
    app: "job",
    text: "定时任务删除",
  },
  export: {
    url: "/job/export",
    method: "get",
    app: "job",
    blob: true,
    text: "定时任务导出",
  },
};
