import service from "@/plugin/apis";
import { getUserList } from "@/dict/service/user";

const app = {
  state: {
    dict: {},
  },
  mutations: {
    SET_DICT(state, dict) {
      state.dict = dict;
    },
  },
  actions: {
    //字典类型处理
    async GetDict({ commit }) {
      //其他需要缓存的字典
      const userList = await getUserList();
      //缓存所有字典
      const dictList = await service.configuration.dict
        .dictAllList()
        .then((res) => {
          let dictList = res.data;

          for (const key in dictList) {
            dictList[key] = dictList[key].map((item) => {
              //字典类型转换
              if (item.dictType) {
                if (item.dictType === "string") {
                  return {
                    ...item,
                    value: item.value ? item.value.toString() : "",
                  };
                } else if (item.dictType === "number") {
                  return { ...item, value: Number(item.value) };
                }
              } else {
                return {
                  ...item,
                  dictType: "string",
                  value: item.value ? item.value.toString() : "",
                };
              }
            });
          }

          return dictList;
        });
      //字典拼接
      dictList.user = userList;

      commit("SET_DICT", dictList);
    },
  },
};

export default app;
