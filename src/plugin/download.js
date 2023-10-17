//下载封装
import Vue from "vue";

const download = {
  // 下载 Excel 方法
  excel(data, fileName) {
    this.download(data, fileName, "application/vnd.ms-excel");
  },

  // 下载 Zip 方法
  zip(data, fileName) {
    this.download(data, fileName, "application/zip");
  },

  // 下载 Html 方法
  html(data, fileName) {
    this.download(data, fileName, "text/html");
  },

  // 下载 Markdown 方法
  markdown(data, fileName) {
    this.download(data, fileName, "text/markdown");
  },

  // 下载 pdf 方法
  pdf(data, fileName) {
    this.download(data, fileName, "application/pdf");
  },

  download(data, fileName, mineType) {
    // 创建 blob
    let blob = new Blob([data], { type: mineType });
    // 创建 href 超链接，点击进行下载
    window.URL = window.URL || window.webkitURL;
    let href = URL.createObjectURL(blob);
    let downA = document.createElement("a");
    downA.href = href;
    downA.download = fileName;
    downA.click();
    // 销毁超连接
    window.URL.revokeObjectURL(href);
  },
};

Vue.prototype.$download = download;

export default download;
