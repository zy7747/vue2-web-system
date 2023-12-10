<!--  -->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">{{ title + " ：" }}</span>
        <div>
          <slot name="tag"></slot>
        </div>
      </div>
      <div class="content">
        <count-to
          :start-val="0"
          :end-val="sum"
          :duration="3000"
          class="card-panel-num"
        />
        <svg-icon :icon-class="icon" class="icon" />
      </div>
    </el-card>
  </div>
</template>

<script>
import CountTo from "vue-count-to";

export default {
  components: {
    CountTo,
  },
  props: {
    title: {
      text: "标题",
      type: String,
      default: "总数",
    },
    icon: {
      text: "图标",
      type: String,
      default: "",
    },
    sum: {
      text: "总数",
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  width: 300px;
  border-radius: 5px;
  overflow: hidden;
  margin: 15px 15px 15px 0;
  .clearfix {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-weight: 600;
    }
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .card-panel-num {
      font-size: 20px;
    }
  }
}

::v-deep .el-card__header {
  padding: 10px 10px;
  font-size: 15px;
}

.icon {
  font-size: 30px;
}
</style>
