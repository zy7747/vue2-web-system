<!--  -->
<template>
  <div></div>
</template>

<script>
export default {
  props: {
    list: {
      text: "数据对象",
      type: [Array],
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      read: [], //已读
      noRead: [], //未读
    };
  },
  methods: {},
  watch: {
    list() {
      const read = [];
      const noRead = [];

      this.list.forEach((element) => {
        if (element.isRead === "1") {
          read.push(element);
        } else {
          noRead.push(element);
        }
      });

      this.read = read;
      this.noRead = noRead;
    },
  },
};
</script>

<style lang="scss" scoped></style>
