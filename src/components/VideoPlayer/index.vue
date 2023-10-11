<!--  -->
<template>
  <div class="videoPlay">
    <video ref="video" class="video" style="width: 100%" controls>
      <source type="video/mp4" :src="src" />
    </video>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      src: "",
    };
  },
  methods: {
    setVideo(src) {
      this.$refs.video.src = JSON.parse(JSON.stringify(src));
      this.$refs.video.load();
    },
  },
};
</script>

<style lang="scss" scoped>
.videoPlay {
  width: 100%;
}
</style>
