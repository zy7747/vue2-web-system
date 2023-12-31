import service from "@/plugin/apis";
import router from "@/router";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { Message } from "element-ui";
import { getMenu, getRoutes } from "@/router/asyncRoutes";

const user = {
  state: {
    token: getToken(), //token
    userInfo: {}, //用户信息
    roles: [], //角色
    menu: [], //菜单
    permission: [], //权限
    asyncRoutes: [], //路由
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      setToken(token);
    },
    SET_USERINFO(state, data) {
      // 找到这个项目用的菜单
      let systemMenu = data.menuList;

      const { menu, permission } = getMenu(systemMenu);
      const asyncRoutes = getRoutes(systemMenu);

      state.userInfo = data.userInfo; //用户信息
      state.roles = data.roles; //角色
      state.menu = menu; //树形菜单
      state.asyncRoutes = asyncRoutes; //动态路由
      state.permission = permission; //动态路由

      localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
      localStorage.setItem("roles", JSON.stringify(data.roles));
      localStorage.setItem("asyncRoutes", JSON.stringify(asyncRoutes));
      localStorage.setItem("menu", JSON.stringify(menu));
      localStorage.setItem("permission", JSON.stringify(permission));
    },
    REMOVE_USERINFO(state) {
      state.userInfo = {};
      state.roles = [];
      state.menu = [];
      state.permission = [];
      state.asyncRoutes = [];

      localStorage.removeItem("asyncRoutes");
      localStorage.removeItem("permission");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("roles");
      localStorage.removeItem("menu");
    },
    REMOVE_TOKEN(state) {
      state.token = "";
      removeToken();
    },
    REMOVE_ASYNC_ROUTERS(state) {
      state.asyncRoutes = [];
    },
  },
  actions: {
    // 登录
    Login({ commit }, loginInfo) {
      return service.user.user
        .login(loginInfo)
        .then((response) => {
          if (response.code === 200) {
            //2.保存TOKEN
            commit("SET_TOKEN", response.data.token);

            return response.data;
          } else {
            Message.error(response.message);
            removeToken();
            return false;
          }
        })
        .catch(() => {
          return false;
        });
    },
    // 登出
    LogOut({ commit }) {
      commit("REMOVE_USERINFO");
      commit("REMOVE_TOKEN");
      commit("REMOVE_ASYNC_ROUTERS");

      router.push("/login");
      Message.success("已退出登录");
    },
    //获取用户信息
    UserInfo({ commit }) {
      return service.user.user
        .userInfo({ loginSystem: "system" })
        .then((response) => {
          if (response.code === 200) {
            //3.存储用户信息
            commit("SET_USERINFO", response.data);

            return response.data;
          } else {
            Message.error(response.message);
            removeToken();
            return false;
          }
        });
    },
  },
};

export default user;
