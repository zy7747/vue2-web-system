<!--  -->
<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="first">
        <template slot="title">
          <div class="header" @click="stopProp">
            <span class="title"> {{ title }}<slot name="title" /> </span>
            <span class="button">
              <div v-if="isSearch" class="button">
                <c-button
                  icon="el-icon-search"
                  type="primary"
                  class="btn"
                  :text="$t('system.query')"
                  @click="search"
                  v-audio="'search'"
                  :hasPermission="permission.search"
                />
                <c-button
                  icon="el-icon-refresh"
                  class="btn"
                  :text="$t('system.reset')"
                  @click="reset"
                  :hasPermission="permission.reset"
                />
              </div>

              <slot name="button" />
            </span>
          </div>
        </template>
        <div class="content">
          <slot name="content" />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      text: "标题",
      type: [String],
      default: () => {
        return "";
      },
    },
    permission: {
      text: "权限列表",
      type: [Object],
      default: () => {
        return {
          search: [],
          reset: [],
        };
      },
    },
    isSearch: {
      text: "是否需要搜索按钮",
      type: [Boolean],
      default: () => {
        return true;
      },
    },
    isReset: {
      text: "是否需要重置按钮",
      type: [Boolean],
      default: () => {
        return true;
      },
    },
    isExpand: {
      text: "是否展开",
      type: [Boolean],
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      activeNames: this.isExpand ? ["first"] : [],
    };
  },
  methods: {
    //阻止冒泡事件
    stopProp(e) {
      e.stopPropagation();
    },
    //搜索
    search() {
      this.$emit("search");
    },
    //重置
    reset() {
      this.$emit("reset");
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-collapse-item__header {
  background-image: var(--collapseBackGround);
}

.header {
  width: 100%;
  display: flex;
  padding: 0 15px;
  align-items: center;
  justify-content: space-between;
  .button {
    display: flex;
  }
  .title {
    color: #fff;
    font-weight: 600;
    font-size: 14px;
  }
}

::v-deep .el-collapse-item__arrow {
  color: #fff;
  font-weight: 700;
}

.query {
  background-color: #066aff !important;
  border: 0;
  color: #fff;
  font-weight: 550;
}

.query:hover {
  background-color: #2775eb !important;
}

.content {
  padding: 15px 20px 0;
  // max-height: 210px;
  // overflow-y: auto;
}
</style>
