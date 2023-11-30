<!--  -->
<template>
  <div class="swagger">
    <iframe
      :src="baseUrl + '/doc.html#/default'"
      frameborder="0"
      width="100%"
      height="98%"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
    };
  },
};
</script>

<style lang="scss" scoped>
.swagger {
  width: 100%;
  height: 100%;
}
</style>
