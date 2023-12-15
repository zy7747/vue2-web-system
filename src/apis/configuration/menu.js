export default {
  page: {
    url: "/menu/page",
    method: "get",
    app: "menu",
    text: "菜单分页",
  },
  list: {
    url: "/menu/list",
    method: "get",
    app: "menu",
    text: "获取所有菜单",
  },
  detail: {
    url: "/menu/detail",
    method: "get",
    app: "menu",
    text: "菜单详情",
  },
  saveList: {
    url: "/menu/saveList",
    method: "post",
    app: "menu",
    text: "菜单编辑",
  },
  delete: {
    url: "/menu/delete",
    method: "delete",
    app: "menu",
    text: "菜单删除",
  },
  export: {
    url: "/menu/export",
    method: "get",
    app: "menu",
    blob: true,
    text: "菜单导出",
  },
};
