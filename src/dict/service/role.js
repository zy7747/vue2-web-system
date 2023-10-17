import service from "@/plugin/apis";

//获取角色列表
export function getRoleList(params) {
  return service.baseData.role.list(params).then((res) => {
    return res.data.map((item) => {
      return { ...item, label: item.roleName, value: item.id };
    });
  });
}
