export default {
  page: {
    url: "/area/page",
    method: "get",
    app: "area",
    text: "地区分页",
  },
  list: {
    url: "/area/list",
    method: "get",
    app: "area",
    text: "地区列表",
  },
  detail: {
    url: "/area/detail",
    method: "get",
    app: "area",
    text: "地区详情",
  },
  saveList: {
    url: "/area/saveList",
    method: "post",
    app: "area",
    text: "地区编辑",
  },
  delete: {
    url: "/area/delete",
    method: "delete",
    app: "area",
    text: "地区删除",
  },
  export: {
    url: "/area/export",
    method: "get",
    app: "area",
    blob: true,
    text: "地区导出",
  },
};
