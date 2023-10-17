<!-- 自定义鼠标样式 -->
<template>
  <div ref="mouse" :class="{ pointer: 'pointer', hidden: hideCursor }">
    <svg-icon icon-class="鼠标" class="icon" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      hideCursor: false,
    };
  },
  mounted() {
    const mouse = this.$refs.mouse;
    let rad = 0;
    window.onmousemove = (e) => {
      const cursorStyle = window.getComputedStyle(e.target).cursor;
      if (cursorStyle === "none") {
        this.hideCursor = false;
      } else {
        this.hideCursor = true;
      }
      if (Math.abs(e.movementX) + Math.abs(e.movementY) > 1) {
        mouse.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
        rad = Math.atan2(e.movementX, -e.movementY);
        mouse.style.transform = `translate(${e.clientX}px,${e.clientY}px) rotate(${rad}rad)`;
      }
    };
  },
};
</script>

<style lang="scss" scoped>
html {
  cursor: none;
}

.app {
  position: relative;
}

.pointer {
  font-size: 30px;
  position: fixed;
  margin-left: -10px;
  margin-top: -10px;
  z-index: 9999 !important;
  pointer-events: none; /* 禁用鼠标事件 */
}

.hidden {
  display: none; /* 隐藏自定义鼠标样式 */
}
</style>
