<!--  -->
<template>
  <div class="numberBox">
    <div
      class="numberBoxItem"
      :style="{ backgroundColor: color }"
      v-for="(item, index) in text"
      :key="index"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      text: "颜色",
      type: String,
      default: "#1e87f0",
    },
    text: {
      text: "文字",
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.numberBox {
  display: flex;
  .numberBoxItem {
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-weight: 540;
    text-align: center;
    font-size: 16px;
    margin: 0 3px;
    color: #ffffff;
    border-radius: 2px;
  }
}
</style>
