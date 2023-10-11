export default {
  page: {
    url: "/file/page",
    method: "get",
    app: "file",
    text: "文件分页",
  },
  list: {
    url: "/file/list",
    method: "get",
    app: "file",
    text: "所有文件列表",
  },
  fileList: {
    url: "/file/fileList",
    method: "get",
    app: "file",
    text: "文件内容列表",
  },
  getFileParent: {
    url: "/file/getFileParent",
    method: "get",
    app: "file",
    text: "寻找父级",
  },
  detail: {
    url: "/file/detail",
    method: "get",
    app: "file",
    text: "文件详情",
  },
  saveList: {
    url: "/file/saveList",
    method: "post",
    app: "file",
    text: "文件编辑",
  },
  createFolder: {
    url: "/file/createFolder",
    method: "post",
    app: "file",
    text: "文件夹新建",
  },
  delete: {
    url: "/file/delete",
    method: "delete",
    app: "file",
    text: "文件删除",
  },
  export: {
    url: "/file/export",
    method: "get",
    app: "file",
    blob: true,
    text: "文件导出",
  },
};
