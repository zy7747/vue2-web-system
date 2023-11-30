<!--  -->
<template>
  <div
    class="message"
    :style="{
      backgroundColor: backgroundColor,
    }"
  >
    <div
      class="textBox"
      :style="{
        backgroundColor: color,
      }"
    >
      <span class="text">
        {{ text }}
      </span>
    </div>
    <span class="title">{{ title }}</span>
    <span class="time">{{ time }}</span>
  </div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      text: "背景颜色",
      type: String,
      default: "#e4f0fd",
    },
    color: {
      text: "标题颜色",
      type: String,
      default: "#1e87f0",
    },
    text: {
      text: "标题文字",
      type: String,
      default: "",
    },
    title: {
      text: "标题",
      type: String,
      default: "",
    },
    time: {
      text: "时间",
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
  height: 34px;
  width: 300px;
  position: relative;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px 0 34px;
  font-size: 12px;
  background: rgba(30, 135, 240, 0.12);
  .textBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 34px;
    font-size: 12px;
    z-index: 1;
    clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 100%, 0% 100%);
    .text {
      margin-top: 5px;
      position: absolute;
      color: #fff;
      transform: scale(0.9) rotate(-45deg);
    }
  }
}
</style>
