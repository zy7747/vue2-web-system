import axios from "axios";
import { Message } from "element-ui";
import { getToken } from "./auth";
// 创建axios实例
const service = axios.create({
  // baseURL: '/devApis',
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 15000, // 请求超时时间
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 如果存在登录用户信息，则将其设置到请求头部
    if (getToken()) {
      config.headers["Authorization"] = `Bearer ${getToken()}`;
      // 获取登录用户信息
      config.headers["userId"] = `${
        JSON.parse(localStorage.getItem("userInfo")).id
      }`;
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
    switch (response.status) {
      case 200:
        return response.data;
      case 400:
        console.log("发出信息有误");
        break;
      case 401:
        //清除token 跳转至登录页
        Message.error("用户没有权限（令牌、用户名、密码错误）");
        break;
      case 403:
        console.log("用户得到授权，但是访问是被禁止的");
        break;
      case 404:
        console.log("访问资源不存在");
        break;
      case 406:
        console.log("请求格式不可得");
        break;
      case 410:
        console.log("请求资源被永久删除，且不会被看到");
        break;
      case 500:
        console.log("服务器发生错误");
        break;
      case 502:
        console.log("网关错误");
        break;
      case 504:
        Message.error("网关超时");
        break;
      default:
        console.log("无此状态码,请检查状态码是否正确");
        break;
    }
  },
  (error) => {
    Message.error("服务器无响应");
    return Promise.reject(error);
  }
);

export default service;
