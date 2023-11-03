const getters = {
  token: (state) => state.user.token, //token
  userInfo: (state) => state.user.userInfo, //用户信息
  roles: (state) => state.user.roles, //角色
  menu: (state) => state.user.menu, //树形菜单
  permission: (state) => state.user.permission, //权限
  routes: (state) => state.user.asyncRoutes, //动态路由
  dict: (state) => state.app.dict, //字典
  layout: (state) => state.config.layout, //布局
  visitedViews: (state) => state.tagsView.visitedViews, //动态页签
  cachedViews: (state) => state.tagsView.cachedViews,
};
export default getters;
