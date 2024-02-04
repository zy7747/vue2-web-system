<!--  -->
<template>
  <div class="cell">
    <!-- 标签 -->
    <el-tag
      v-if="column.type === 'tag' && row[prop] !== ''"
      :type="column.options[row[prop]]"
    >
      {{ row[prop] }}
    </el-tag>

    <!-- 图片框 -->
    <el-image
      v-else-if="column.type === 'picture'"
      style="width: 50px; height: 50px; border-radius: 5px; overflow: hidden"
      :src="fileUrl + row[prop]"
      :preview-src-list="[fileUrl + row[prop]]"
      fit="cover"
    />

    <!-- 链接 -->
    <a
      v-else-if="column.type === 'link'"
      class="link"
      v-bind="column.form"
      href="JavaScript:void(0)"
      v-on="column.on"
      @click="column.click ? column.click(row, rowIndex) : selectFn()"
    >
      {{ row[prop] }}
    </a>

    <!-- 拖拽排序框 -->
    <div
      v-else-if="column.type === 'sort'"
      style="justify-content: center; display: flex; align-items: center"
    >
      <c-button type="text" icon="el-icon-d-caret" size="medium" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      text: "行信息",
      type: [Object],
      default: () => {
        return {};
      },
    },
    rowIndex: {
      text: "行下标",
      type: [Number],
    },
    prop: {
      text: "字段",
      type: [String],
    },
    column: {
      text: "列信息",
      type: [Object],
    },
  },
  data() {
    return {
      fileUrl: process.env.VUE_APP_FILE_API,
    };
  },
  methods: {
    selectFn(row, index) {},
  },
};
</script>

<style lang="scss" scoped>
.cell {
  width: 100%;
}
.link {
  color: #45b3ee;
  font-weight: 550;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.link:hover {
  color: #196a96;
  text-decoration: underline;
}
</style>
