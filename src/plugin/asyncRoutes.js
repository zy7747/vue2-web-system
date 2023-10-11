//生成树形
function buildMenuTree(flatMenu, parentId = null, path = "") {
  const menuItems = flatMenu
    .filter((item) => item.parentId === parentId)
    .map((item) => {
      const menuItem = { ...item };
      const menuPath = path === "" ? item.path : `${path}/${item.path}`;
      menuItem.path = menuPath;
      menuItem.children = buildMenuTree(flatMenu, item.id, menuPath);
      return menuItem;
    });

  return menuItems;
}

//平铺树形
function flattenTree(tree, parentId = null) {
  const flattenData = [];

  for (const node of tree) {
    const { id, children } = node;
    // 拷贝节点信息到平铺结构
    flattenData.push(node);

    // 递归处理子节点
    if (children && children.length) {
      flattenData.push(...flattenTree(children, id));
    }
  }

  return flattenData;
}

//获取路由
export function getRoutes(routes) {
  let myRoute = [];

  const router = buildMenuTree(routes);

  flattenTree(router).forEach((item) => {
    if (item.type === "menu") {
      myRoute.push({
        id: item.id,
        parentId: item.parentId,
        name: item.name,
        component: () => import(`@/views${item.component}`),
        path: item.path,
        meta: { title: item.title, keepAlive: item.keepAlive },
      });
    }
  });

  const route = [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/home/index"),
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
    if (item.type === "directory") {
      //目录
      menu.push({
        ...item,
        meta: {
          title: item.title,
          alwaysShow: item.alwaysShow,
          visible: item.visible,
          icon: item.icon,
        },
      });
    } else if (item.type === "menu") {
      //菜单
      menu.push({
        ...item,
        meta: {
          title: item.title,
          alwaysShow: item.alwaysShow,
          visible: item.visible,
          icon: item.icon,
        },
      });
    } else if (item.type === "button") {
      //按钮
      if (item.permission) {
        permission.push(item.permission);
      }
    }
  });

  menu.sort((a, b) => a.sort - b.sort);

  const menuTree = buildMenuTree(menu);

  return { menu: menuTree, permission };
}
