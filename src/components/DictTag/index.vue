<!-- tag标签 -->
<template>
  <div>
    <template v-for="(item, index) in options">
      <el-tag v-if="item?.color" :type="item?.color" :key="index">
        {{ item?.label }}
      </el-tag>
      <span :key="index" v-else>{{ item?.label }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: "DictTag",
  props: {
    value: {
      text: "值",
      type: [String, Number, Array],
      default: () => {
        return "";
      },
    },
    dict: {
      text: "字典",
      type: [String, Array],
      default: () => {
        return "";
      },
    },
  },
  computed: {
    options() {
      if (Array.isArray(this.dict)) {
        const data = this.dict.find((item) => item.value === this.value);
        return [data];
      } else {
        return this.getDictTag(this.dict, this.value);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
