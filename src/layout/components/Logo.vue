<!-- 标题与APP名字 -->
<template>
  <div class="app">
    <div class="main" @click="home">
      <div class="logo">
        <img class="logoPng" src="@/assets/images/派蒙.png" alt="" />
      </div>
      <div class="appName">
        <span class="title">数据管理中心</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    home() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  .main {
    width: 150px;
    height: 30px;
    display: flex;
    cursor: pointer;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;
      width: 30px;
      .logoPng {
        width: 100%;
        object-fit: cover;
      }
    }

    .title {
      padding-top: 2px;
      font-weight: 700;
      font-size: 18px;
      color: #fff;
      text-align: center;
      text-shadow: 1px -2px 0px black; /* 描边效果 */
    }

    .appName {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      width: 120px;
      height: 30px;
    }
  }
}
</style>
