export default {
  login: {
    url: "/user/login",
    method: "get",
    app: "user",
    text: "用户登录",
  },
  signUp: {
    url: "/user/signUp",
    method: "post",
    app: "user",
    text: "用户注册",
  },
  page: {
    url: "/user/page",
    method: "get",
    app: "user",
    text: "用户分页",
  },
  detail: {
    url: "/user/detail",
    method: "get",
    app: "user",
    text: "用户详情",
  },
  saveList: {
    url: "/user/saveList",
    method: "post",
    app: "user",
    text: "用户编辑",
  },
  delete: {
    url: "/user/delete",
    method: "delete",
    app: "user",
    text: "用户删除",
  },
  export: {
    url: "/user/export",
    method: "get",
    app: "user",
    blob: true,
    text: "用户导出",
  },
};
