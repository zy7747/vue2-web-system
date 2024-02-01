import service from "@/plugin/apis";

//获取用户列表
export function getDictList(params) {
  return service.configuration.dict.list(params).then((res) => {
    console.log(100, res);
    return res.data.map((item) => {
      return { ...item, label: item.dictName, value: item.id };
    });
  });
}
