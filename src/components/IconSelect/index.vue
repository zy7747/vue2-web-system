<template>
  <div>
    <el-popover
      placement="bottom-start"
      width="460"
      trigger="click"
      @show="reset()"
    >
      <div class="icon-body">
        <div class="icon-list">
          <div
            v-for="(item, index) in iconList"
            :key="index"
            @click="selectedIcon(item)"
            class="icon-item"
          >
            <svg-icon
              :icon-class="item"
              style="height: 30px; width: 16px; margin-right: 5px"
            />
            <span class="icon-name" :title="item">{{ item }}</span>
          </div>
        </div>
      </div>
      <el-input
        slot="reference"
        v-model="inputValue"
        v-audio="'input'"
        placeholder="点击选择图标"
        :size="size"
        v-bind="$attrs"
        v-on="$listeners"
        :clearable="clearable"
        :style="`width:${width};min-width:${minWidth};`"
        readonly
      >
        <svg-icon
          v-if="inputValue"
          slot="prefix"
          :icon-class="inputValue"
          style="height: 32px; width: 16px"
        />
        <i v-else slot="prefix" class="el-icon-search el-input__icon" />
      </el-input>
    </el-popover>
  </div>
</template>

<script>
import icons from "./requireIcons";
import baseParams from "./mixins/index";

export default {
  name: "IconSelect",
  mixins: [baseParams],
  data() {
    return {
      name: "",
      iconList: icons,
      inputValue: this.value,
    };
  },
  watch: {
    value(val) {
      this.inputValue = val;
    },
    inputValue(value) {
      this.$emit("input", value);
    },
  },
  methods: {
    filterIcons() {
      this.iconList = icons;
      if (this.name) {
        this.iconList = this.iconList.filter((item) =>
          item.includes(this.name)
        );
      }
    },
    selectedIcon(name) {
      this.inputValue = name;
      document.body.click();
    },
    reset() {
      this.name = "";
      this.iconList = icons;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icon-body {
  width: 100%;
  padding: 10px;
  .icon-list {
    height: 200px;
    overflow-y: scroll;
    div {
      height: 30px;
      line-height: 30px;
      margin-bottom: -5px;
      cursor: pointer;
      width: 33%;
      float: left;
    }
    span {
      display: inline-block;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  }
}

.icon-item {
  display: flex;
  .icon-name {
    width: 160px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

::v-deep .el-input__prefix {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
