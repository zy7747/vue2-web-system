import Vue from "vue";
import store from "@/store";
import lodash from "lodash";

const context = require.context(
  "@/dict/service",
  true,
  /[A-Za-z0-9-_,\s]+\.js$/i
);

// 获取文件夹中所有导出的函数
const exportedFunctions = context.keys().reduce((acc, fileName) => {
  const exports = context(fileName);
  const moduleExport = Object.keys(exports).reduce((moduleAcc, exportName) => {
    if (typeof exports[exportName] === "function") {
      return {
        ...moduleAcc,
        [exportName]: exports[exportName],
      };
    }
    return moduleAcc;
  }, {});

  return {
    ...acc,
    ...moduleExport,
  };
}, {});

export function getServiceData(serviceCode, params) {
  return exportedFunctions[serviceCode](params).then((res) => {
    return res;
  });
}

//1.只有一个参数获取字典列表 2.第二个参数获取翻译
export function getDictData(dictCode) {
  //获取字典
  const dict = store.getters.dict[dictCode] ? store.getters.dict[dictCode] : [];

  return dict;
}

export function getDictLabel(dictCode, value) {
  //获取字典
  const dict = store.getters.dict[dictCode] ? store.getters.dict[dictCode] : [];
  //找到label 和 value
  if (value === null) {
    value = "";
  }

  const data = lodash.find(dict, (item) => item.value === value);

  return [data];
}

Vue.prototype.getDictData = getDictData;
Vue.prototype.getDictLabel = getDictLabel;
Vue.prototype.getServiceData = getServiceData;
