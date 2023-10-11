<!--  -->
<template>
  <div class="appMain">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.appMain {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  overflow-y: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>
