export default {
  page: {
    url: "/person/page",
    method: "get",
    app: "person",
    text: "个人信息分页",
  },
  list: {
    url: "/person/list",
    method: "get",
    app: "person",
    text: "个人信息列表",
  },
  detail: {
    url: "/person/detail",
    method: "get",
    app: "person",
    text: "个人信息详情",
  },
  saveList: {
    url: "/person/saveList",
    method: "post",
    app: "person",
    text: "个人信息编辑",
  },
  delete: {
    url: "/person/delete",
    method: "delete",
    app: "person",
    text: "个人信息删除",
  },
  export: {
    url: "/person/export",
    method: "get",
    app: "person",
    blob: true,
    text: "个人信息导出",
  },
};
