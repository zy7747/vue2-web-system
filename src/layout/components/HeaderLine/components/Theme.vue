<!--  -->
<template>
  <div>
    <div class="item" title="主题">
      <a class="cursor" href="JavaScript:void(0)" @click="theme">
        <svg-icon icon-class="Photo" class="icon" style="font-size: 26px" />
      </a>
    </div>

    <!-- 主题配置 -->
    <Config ref="config" />
  </div>
</template>

<script>
import Config from "@/layout/config/index.vue";

export default {
  components: {
    Config,
  },
  methods: {
    //修改主题
    theme() {
      this.$refs.config.handleOpen();
    },
  },
};
</script>

<style lang="scss" scoped></style>
