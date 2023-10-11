import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const constantRouterMap = [
  { path: "/", redirect: "/dashboard" },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/system/login/index"),
    meta: { title: "登录" },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/system/404/index"),
    meta: { title: "404页面" },
  },
];

const router = new VueRouter({
  routes: constantRouterMap,
});

export default router;
