<!-- 下拉框组件 -->
<template>
  <div>
    <el-radio
      v-for="(item, index) in options"
      v-bind="$attrs"
      :key="index"
      v-model="radioValue"
      :label="item.value"
      v-on="$listeners"
    >
      {{ item.label }}
    </el-radio>
  </div>
</template>

<script>
import baseParams from './mixins/index'

export default {
  name: '',
  mixins: [baseParams],
  data() {
    return {
      radioValue: this.value
    }
  },
  watch: {
    value(val) {
      this.radioValue = val
    },
    radioValue(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss"></style>
