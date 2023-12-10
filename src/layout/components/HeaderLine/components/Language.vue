<!--  -->
<template>
  <div>
    <el-dropdown
      @command="handleLangs"
      trigger="click"
      placement="bottom-start"
    >
      <div class="item" title="语言">
        <a class="cursor" style="" href="JavaScript:void(0)">
          <svg-icon
            :icon-class="languageIcon"
            class="icon"
            style="font-size: 28px"
          />
        </a>
      </div>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          :command="item"
          v-for="(item, index) in langs"
          :key="index"
        >
          <span>
            <svg-icon :icon-class="item.icon" class="icon" />
            <span style="margin-left: 10px">{{ item.lang }}</span>
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langs: [
        { icon: "cn", lang: "中文", language: "zh" },
        { icon: "us", lang: "English", language: "en" },
        { icon: "jp", lang: "日本語", language: "jp" },
        { icon: "kr", lang: "한국인", language: "kr" },
      ],
    };
  },
  computed: {
    languageIcon() {
      const result = this.langs.find(
        (item) => item.language === this.$i18n.locale
      );

      return result?.icon;
    },
  },
  methods: {
    //修改语言
    handleLangs(item) {
      localStorage.setItem("language", item.language);
      this.$i18n.locale = item.language;
      this.refresh();
    },
    //刷新界面
    refresh() {
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped></style>
