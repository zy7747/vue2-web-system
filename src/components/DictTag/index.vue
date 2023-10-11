<!--  -->
<template>
  <div>
    <template v-for="(item, index) in getDictLabel(dict, value)">
      <el-tag v-if="item?.color !== null" :type="item?.color" :key="index">
        {{ item?.label }}
      </el-tag>
      <span :key="index" v-else>{{ item?.label }}</span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      text: "值",
      type: [String, Number],
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
};
</script>

<style lang="scss" scoped></style>
