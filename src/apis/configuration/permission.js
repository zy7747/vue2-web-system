export default {
  page: {
    url: "/permission/page",
    method: "get",
    app: "permission",
    text: "权限分页",
  },
  list: {
    url: "/permission/list",
    method: "get",
    app: "permission",
    text: "权限列表",
  },
  detail: {
    url: "/permission/detail",
    method: "get",
    app: "permission",
    text: "权限详情",
  },
  saveList: {
    url: "/permission/saveList",
    method: "post",
    app: "permission",
    text: "权限编辑",
  },
  delete: {
    url: "/permission/delete",
    method: "delete",
    app: "permission",
    text: "权限删除",
  },
  export: {
    url: "/permission/export",
    method: "get",
    app: "permission",
    blob: true,
    text: "权限导出",
  },
};
