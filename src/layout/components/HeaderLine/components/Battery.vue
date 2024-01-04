<!--  -->
<template>
  <div>
    <dv-percent-pond
      :config="{ value: 66, textColor: 'transparent' }"
      style="width: 50px; height: 20px"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
::v-deep .dv-percent-pond {
  margin: 0 5px;
  text {
    font-size: 12px;
  }
}
</style>
