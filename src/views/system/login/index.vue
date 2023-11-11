<!-- 登录页 -->
<template>
  <div class="backGround" @click.once="play()">
    <video loop="loop" class="video" ref="video" muted>
      <source src="@/assets/video/黄金铃.mp4" type="video/mp4" />
    </video>
    <div class="main">
      <Login />
    </div>
  </div>
</template>

<script>
import Login from "./login";

export default {
  components: {
    Login,
  },
  mounted() {
    this.play();
  },
  methods: {
    play() {
      this.$refs.video.play();
    },
  },
};
</script>

<style lang="scss" scoped>
.backGround {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .video {
    transform: scale(1.2);
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .main {
    position: absolute;
    right: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 100vh;
    z-index: 1;
  }
}
</style>
