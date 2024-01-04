<!-- 标题与APP名字 -->
<template>
  <div class="app">
    <div class="main" @click="home">
      <div class="logo">
        <img class="logoPng" src="@/assets/images/logo/logo.png" alt="" />
      </div>
      <div class="appTitle">
        <!-- <dv-decoration-11 style="width: 250px; height: 40px">
          <span class="title">{{ appTitle }}</span>
        </dv-decoration-11> -->
        <span class="title">{{ appTitle }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appTitle: process.env.VUE_APP_TITLE,
    };
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
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  .main {
    width: 240px;
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

    .appTitle {
      padding: 5px 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      width: 200px;
      height: 30px;
      background: url("@/assets/images/button/输入框.png") no-repeat center;
      background-size: 100% 30px;
      background-position: 0;
    }
  }
}
</style>
