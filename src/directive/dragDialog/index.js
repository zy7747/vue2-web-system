//element弹窗拖拽
export default {
  bind(el, binding, vnode) {
    let dialogHeaderEl = el.querySelector(".el-dialog__header");
    let dialogEl = el.querySelector(".el-dialog");

    dialogHeaderEl.style.cssText += ";cursor:move;";
    dialogEl.style.cssText += ";top:0px;";

    dialogHeaderEl.onmousedown = (e) => {
      let offsetLeft = el.offsetLeft;
      let offsetTop = el.offsetTop;
      let startX = e.clientX - offsetLeft;
      let startY = e.clientY - offsetTop;

      // 绑定全局事件，实现拖拽
      document.onmousemove = (e) => {
        let left = e.clientX - startX;
        let top = e.clientY - startY;
        el.style.left = left + "px";
        el.style.top = top + "px";
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  },
};
