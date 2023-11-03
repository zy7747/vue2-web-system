import Vue from "vue";
import lodash from "lodash";

/**
 * @description: 日期格式化
 * @param {*} time 时间
 * @param {*} pattern 格式
 * @return {*} 格式化日期
 */
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === "string") {
      time = time
        .replace(new RegExp(/-/gm), "/")
        .replace("T", " ")
        .replace(new RegExp(/\.\d{3}/gm), "");
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, rootId, id, parentId, children) {
  id = id || "id";
  parentId = parentId || "parentId";
  children = children || "children";
  rootId = rootId || null;

  //对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data));
  //循环所有项
  const treeData = cloneData.filter((father) => {
    let branchArr = cloneData.filter((child) => {
      //返回每一项的子级数组
      return father[id] === child[parentId];
    });
    branchArr.length > 0 ? (father.children = branchArr) : "";

    //返回第一层
    return father[parentId] === rootId;
  });

  return treeData !== "" ? treeData : data;
}

/**
 * 获取当前时间
 * @param timeStr 时分秒 字符串 格式为 xx:xx:xx
 */
export function getNowDateTime(timeStr) {
  let now = new Date();
  let year = now.getFullYear(); //得到年份
  let month = (now.getMonth() + 1).toString().padStart(2, "0"); //得到月份
  let day = now.getDate().toString().padStart(2, "0"); //得到日期

  if (timeStr != null) {
    return `${year}-${month}-${day} ${timeStr}`;
  }
  let hours = now.getHours().toString().padStart(2, "0"); // 得到小时;
  let minutes = now.getMinutes().toString().padStart(2, "0"); // 得到分钟;
  let seconds = now.getSeconds().toString().padStart(2, "0"); // 得到秒;
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 除法保留两位小数
 *
 * @param {*} divisor 除数
 * @param {*} dividend 被除数
 * @returns
 */
export function divide(divisor, dividend) {
  if (divisor == null || dividend == null || dividend === 0) {
    return null;
  }
  return Math.floor((divisor / dividend) * 100) / 100;
}

/**
 * 生成随机颜色
 *
 * @param {*} num 生成随机颜色数量
 * @returns
 */
export function randomColor(num) {
  let colorList = [];
  for (var i = 0; i < num; i++) {
    var colorStr = Math.floor(Math.random() * 0xffffff).toString(16);
    //如果颜色值是五位，则补零
    if (colorStr.length < 6) {
      colorStr += "0";
    }
    if (colorStr == "005094") {
      i--;
      continue;
    }
    colorList.push("#" + colorStr);
  }

  return colorList;
}

/**
 * 格式化数字显示方式
 * 用法
 * formatNumber(12345.999,'#,##0.00');
 * formatNumber(12345.999,'#,##0.##');
 * formatNumber(123,'000000');
 */
export function formatNumber(value, pattern) {
  if (value == null) return value;
  let strarr = value ? value.toString().split(".") : ["0"];
  let fmtarr = pattern ? pattern.split(".") : [""];
  let retstr = "";
  // 整数部分
  let str = strarr[0];
  let fmt = fmtarr[0];
  let i = str.length - 1;
  let comma = false;
  for (let f = fmt.length - 1; f >= 0; f--) {
    switch (fmt.substr(f, 1)) {
      case "#":
        if (i >= 0) retstr = str.substr(i--, 1) + retstr;
        break;
      case "0":
        if (i >= 0) retstr = str.substr(i--, 1) + retstr;
        else retstr = "0" + retstr;
        break;
      case ",":
        comma = true;
        retstr = "," + retstr;
        break;
    }
  }

  if (i >= 0) {
    if (comma) {
      let l = str.length;
      for (; i >= 0; i--) {
        retstr = str.substr(i, 1) + retstr;
        if (i > 0 && (l - i) % 3 == 0) retstr = "," + retstr;
      }
    } else retstr = str.substr(0, i + 1) + retstr;
  }
  retstr = retstr + ".";
  // 处理小数部分
  str = strarr.length > 1 ? strarr[1] : "";
  fmt = fmtarr.length > 1 ? fmtarr[1] : "";
  i = 0;
  for (let f = 0; f < fmt.length; f++) {
    switch (fmt.substr(f, 1)) {
      case "#":
        if (i < str.length) retstr += str.substr(i++, 1);
        break;
      case "0":
        if (i < str.length) retstr += str.substr(i++, 1);
        else retstr += "0";
        break;
    }
  }
  return retstr.replace(/^,+/, "").replace(/\.$/, "");
}

/**
 * @description: 数组对象根据某个字段去重
 * @param {*} arr 数组
 * @param {*} key 字段key
 * @return {*} 去重后数组
 */
export function uniqBy(arr, key) {
  return lodash.uniqBy(arr, key);
}

/**
 * @description: 递归平铺树形结构的函数
 * @param {*} tree 树形
 * @return {*} 平铺后的数据
 */
export function flattenTree(tree) {
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

Vue.prototype.$handleTree = handleTree;
Vue.prototype.$parseTime = parseTime;
Vue.prototype.$formatNumber = formatNumber;
Vue.prototype.$divide = divide;
Vue.prototype.$getNowDateTime = getNowDateTime;
Vue.prototype.$randomColor = randomColor;
Vue.prototype.$uniqBy = uniqBy;
