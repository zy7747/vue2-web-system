import Vue from "vue";
import service from "@/utils/request";
import lodash from "lodash";

// 创建axios实例
const apis = require.context("@/apis", true, /[A-Za-z0-9-_,\s]+\.js$/i);

var nodes = {};

// 1.循环获取Api
apis.keys().forEach((path) => {
  let api = apis(path);

  if (api) {
    api = api.default;
  }

  getFileName(path, api);
});

// 2. 路径处理
function getFileName(path, api) {
  // 1.分割
  const pathArr = path.split("/");
  // 2.删除 .
  pathArr.shift();
  // 3.深层递归合并组成树型
  lodash.merge(nodes, nodeTree(pathArr, 0, api));
}

// 3.节点递归
function nodeTree(list, i, api) {
  if (list.length > i) {
    const item = list[i];
    if (item.indexOf(".js") !== -1) {
      // Api封装
      const fileName = item.replace(".js", "");
      const obj = {};
      for (const key in api) {
        obj[key] = (data) => serve(config(api[key]), data);
      }
      return {
        [fileName]: obj,
      };
    } else {
      // 结果封装
      const obj = {};
      obj[item] = nodeTree(list, ++i, api);
      return obj;
    }
  }
}

// 4.api配置
function config(api = {}) {
  const config = {};

  config.method = api.method || "post";

  config.url = api.url || "";

  if (api.blob) {
    config.responseType = "blob";
  }

  if (api.responseType) {
    config.responseType = api.responseType;
  }

  if (api.baseURL) {
    config.baseURL = api.baseURL;
  }

  if (api.headers) {
    config.headers = api.headers;
  }

  return config;
}

// 5.请求封装
const serve = (config, data) => {
  if (config.method === "GET" || config.method === "get") {
    return service({ ...config, params: data });
  } else {
    return service({ ...config, data: data });
  }
};

Vue.prototype.$service = nodes;

export default nodes;
