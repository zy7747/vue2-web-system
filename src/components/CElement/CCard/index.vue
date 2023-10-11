<!--  -->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="ribbon">{{ title }}</div>

        <div style="float: right; padding: 3px 0">
          <slot name="right-action" />
        </div>
      </div>
      <slot name="body" />
    </el-card>
  </div>
</template>

<script>
import CardData from './mixins/index'

export default {
  mixins: [CardData]
}
</script>

<style lang="scss" scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>
