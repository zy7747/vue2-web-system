<template>
  <div>
    <el-popover
      placement="bottom-start"
      width="460"
      trigger="click"
      @show="reset()"
    >
      <div class="icon-body">
        <vxe-list height="300" :data="iconList" :scroll-y="{ enabled: true }">
          <template #default="{ items }">
            <div v-for="(item, index) in items" :key="index" class="icon-list">
              <div
                @click="selectedIcon(i)"
                class="list-item"
                v-for="(i, index) in item"
                :key="index"
              >
                <svg-icon
                  :icon-class="i"
                  style="height: 35px; width: 26px; margin-right: 15px"
                />
                <span class="icon-name" :title="i">{{ i }}</span>
              </div>
            </div>
          </template>
        </vxe-list>
      </div>

      <el-input
        slot="reference"
        v-model="inputValue"
        v-audio="'input'"
        placeholder="点击选择图标"
        :size="size"
        v-bind="$attrs"
        v-on="$listeners"
        :style="`width:${width};min-width:${minWidth};`"
        readonly
        clearable
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
      iconList: [],
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
    selectedIcon(name) {
      this.inputValue = name;
      document.body.click();
    },
    splitIntoGroups(array) {
      let groups = [];
      while (array.length > 0) {
        groups.push(array.splice(0, 3));
      }
      return groups;
    },
    reset() {
      this.name = "";
      const iconList = icons(this.loadIconList);
      this.iconList = this.splitIntoGroups(iconList);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-body {
  width: 100%;
  .icon-list {
    display: flex;
    align-items: center;
  }
  .list-item {
    display: flex;
    align-items: center;
    width: 33.33%;
    cursor: pointer;
    .icon-name {
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .icon-name:hover {
      color: aqua;
      text-decoration: underline;
    }
  }
}

::v-deep .el-input__prefix {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
