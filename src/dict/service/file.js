import service from "@/plugin/apis";

//获取用户列表
export function getFileList(params) {
  return service.file.file.list(params).then((res) => {
    return res.data.map((item) => {
      return { ...item, label: item.filePath, value: item.id };
    });
  });
}
