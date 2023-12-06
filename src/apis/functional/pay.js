export default {
  page: {
    url: "/pay/page",
    method: "get",
    app: "pay",
    text: "支付功能分页",
  },
  list: {
    url: "/pay/list",
    method: "get",
    app: "pay",
    text: "支付功能列表",
  },
  detail: {
    url: "/pay/detail",
    method: "get",
    app: "pay",
    text: "支付功能详情",
  },
  saveList: {
    url: "/pay/saveList",
    method: "post",
    app: "pay",
    text: "支付功能编辑",
  },
  delete: {
    url: "/pay/delete",
    method: "delete",
    app: "pay",
    text: "支付功能删除",
  },
  export: {
    url: "/pay/export",
    method: "get",
    app: "pay",
    blob: true,
    text: "支付功能导出",
  },
};
