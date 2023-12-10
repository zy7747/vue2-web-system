import service from "@/plugin/apis";

//获取用户列表
export function getUserList(params) {
  return service.user.user.list(params).then((res) => {
    return res.data.map((item) => {
      return { ...item, label: item.user, value: item.id };
    });
  });
}
