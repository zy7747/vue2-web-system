import service from "@/plugin/apis";

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
    GetDict({ commit }) {
      service.baseData.dict.dictAllList().then((res) => {
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

        commit("SET_DICT", dictList);
      });
    },
  },
};

export default app;
