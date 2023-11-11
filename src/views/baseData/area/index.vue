<!--  -->
<template>
  <div>地区</div>
</template>

<script>
export default {
  name: "AreaPage",
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
