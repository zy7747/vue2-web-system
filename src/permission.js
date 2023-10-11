import router from "@/router";
import store from "@/store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "./utils/auth";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  const token = getToken(); //token
  const url = to.path; //跳转路径
  const whiteList = ["/login", "/register", "/404", "/500"]; //白名单

  // 1. 已登录 去登录页 -> 跳转首页
  if (token && url === "/login") {
    next({ path: "/" });
    NProgress.done();
  }

  // 2. 已登录 不是登录页 -> 放行
  if (token && url !== "/login") {
    const hasRoles = store.getters.roles && store.getters.roles.length > 0;
    if (!hasRoles) {
      try {
        //字典获取
        store.dispatch("GetDict");
        //重新获取基础数据
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        await store.dispatch("Login", { ...userInfo, loginType: "account" });
        // 动态添加路由
        router.addRoutes(store.getters.asyncRoutes);
        // hack方法 确保addRoutes已完成
        next({ ...to, replace: true });
        NProgress.done();
      } catch (error) {
        Message.error(error || "Has Error");
        next(`/login?redirect=${url}`);
        NProgress.done();
      }
    } else {
      next();
      NProgress.done();
    }
  }

  // 3. 未登录 在白名单 -> 放行
  if (!token && whiteList.indexOf(url) !== -1) {
    next();
    NProgress.done();
  }

  // 4. 未登录 不在白名单 -> 登录页
  if (!token && whiteList.indexOf(url) === -1) {
    next(`/login?redirect=${url}`);
    NProgress.done();
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

export default router;
