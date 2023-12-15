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

//2.批量获取需要的下拉
export function getServiceData(serviceCodeList) {
  const list = [];

  //接口放入
  serviceCodeList.forEach((item) => {
    list.push(exportedFunctions[item.serviceCode](item.params));
  });
  //循环接口
  return Promise.all(list).then((res) => {
    const maps = {};
    serviceCodeList.forEach((item, index) => {
      maps[item.serviceCode] = res[index];
    });
    return maps;
  });
}

//1.获取字典列表
export function getDictData(dictCode) {
  //获取字典
  const dict = store.getters.dict[dictCode] ? store.getters.dict[dictCode] : [];

  return dict;
}

//获取tag翻译
export function getDictTag(dictCode, value) {
  //获取字典
  const dict = store.getters.dict[dictCode] ? store.getters.dict[dictCode] : [];
  //找到label 和 value
  if (value === null) {
    value = "";
  }

  const data = lodash.find(dict, (item) => item.value === value);

  return [data];
}

//获取翻译后裔label
export function getDictLabel(dictCode, value) {
  if (Array.isArray(dictCode)) {
    const data = lodash.find(dictCode, (item) => item.value === value);
    return data.label;
  }
  //获取字典
  const dict = store.getters.dict[dictCode] ? store.getters.dict[dictCode] : [];
  //找到label 和 value
  if (value === null) {
    value = "";
  }

  const data = lodash.find(dict, (item) => item.value === value);

  return data.label;
}

Vue.prototype.getDictData = getDictData;
Vue.prototype.getDictLabel = getDictLabel;
Vue.prototype.getDictTag = getDictTag;
Vue.prototype.getServiceData = getServiceData;
