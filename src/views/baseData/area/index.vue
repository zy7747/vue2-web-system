<!--
 * @Author: Zy
 * @Date: 2023-10-16 14:22:12
 * @LastEditTime: 2023-10-19 16:15:38
 * @Description: 简介
-->
<!--  -->
<template>
  <div>地区</div>
</template>

<script>
export default {
  created() {
    this.test();
  },
  data() {
    return {};
  },
  methods: {
    test() {
      this.$uniqBy(
        [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "3",
          },
          {
            label: "2",
            value: "3",
          },
          {
            label: "1",
            value: "1",
          },
        ],
        "value"
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
