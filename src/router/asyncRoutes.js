import { handleTree } from "@/utils/formatData";

//获取路由
export function getRoutes(routes) {
  let myRoute = [];

  routes.forEach((item) => {
    if (item.type === "menu") {
      myRoute.push({
        id: item.id,
        parentId: item.parentId,
        name: item.name,
        component: () => import(`@/views${item.component}`),
        path: item.path,
        meta: { title: item.title, keepAlive: item.keepAlive, icon: item.icon },
      });
    }
  });

  const route = [
    {
      path: "/",
      name: "views",
      component: () => import("@/views/index"),
      children: myRoute,
    },
    { path: "*", redirect: "/404" },
  ];

  return route;
}

//获取菜单
export function getMenu(data) {
  const menu = [];
  const permission = [];

  data.forEach((item) => {
    if (
      (item.type === "directory" || item.type === "menu") &&
      item.status === "0"
    ) {
      menu.push({
        ...item,
        meta: {
          title: item.title,
          alwaysShow: item.alwaysShow,
          visible: item.visible,
          icon: item.icon,
        },
      });
    } else if (item.type === "button" && item.status === "0") {
      //按钮
      if (item.permission) {
        permission.push(item.permission);
      }
    }
  });

  menu.sort((a, b) => a.sort - b.sort);

  const menuList = handleTree(menu, "1714885491456413697");

  return { menu: menuList, permission };
}
