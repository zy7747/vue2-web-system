import axios from "axios";
import modal from "@/plugin/modal";
import { getToken } from "./auth";
import store from "@/store/index";
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // timeout: 15000, // 请求超时时间
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 如果存在登录用户信息，则将其设置到请求头部
    if (getToken()) {
      config.headers["Authorization"] = getToken();
    }

    if (store.getters.userInfo.id) {
      config.headers["UserId"] = store.getters.userId;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response拦截器
service.interceptors.response.use(
  async (response) => {
    if (response.data.code !== 200) {
      modal.notifyWarning(response.data.message);
    }
    switch (response.status) {
      case 200:
        return response.data;
      case 400:
        modal.notifyWarning("发出信息有误");
        break;
      case 401:
        modal.notifyError("用户没有权限（令牌、用户名、密码错误）");
        break;
      case 403:
        modal.notifyWarning("用户得到授权，但是访问是被禁止的");
        break;
      case 404:
        modal.notifyWarning("访问资源不存在");
        break;
      case 406:
        modal.notifyWarning("请求格式不可得");
        break;
      case 410:
        modal.notifyWarning("请求资源被永久删除，且不会被看到");
        break;
      case 500:
        modal.notifyWarning("服务器发生错误");
        break;
      case 502:
        modal.notifyWarning("网关错误");
        break;
      case 504:
        modal.notifyError("网关超时");
        break;
      default:
        modal.notifyError("无此状态码,请检查状态码是否正确");
        break;
    }
  },
  (error) => {
    modal.notifyError("服务器无响应");
    return Promise.reject(error);
  }
);

export default service;
