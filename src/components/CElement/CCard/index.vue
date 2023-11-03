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
import CardData from "./mixins/index";

export default {
  mixins: [CardData],
};
</script>

<style lang="scss" scoped>
.clearfix {
  display: flex;
  align-items: center;
}

::v-deep .el-card__header {
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  height: 48px;
  background: var(--collapseBackGround);
}

.box-card {
  width: 100%;
}
</style>
