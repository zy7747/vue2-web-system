<!--  -->
<template>
  <div class="HeaderLine">
    <!-- 系统公告 -->
    <div class="lineItem">
      <Message />
    </div>

    <!-- 翻译 -->
    <div class="lineItem">
      <Language />
    </div>

    <!-- 主题 -->
    <div class="lineItem">
      <Theme />
    </div>

    <!-- 用户中心 -->
    <div class="user">
      <User />
    </div>

    <!-- 电量 -->
    <div class="user">
      <Battery />
    </div>
  </div>
</template>

<script>
import Language from "./components/Language";
import User from "./components/User";
import Theme from "./components/Theme";
import Message from "./Message";
import Battery from "./components/Battery";

export default {
  name: "HeaderLine",
  components: {
    User,
    Theme,
    Language,
    Message,
    Battery,
  },
};
</script>

<style lang="scss" scoped>
.HeaderLine {
  margin-right: 10px;
  display: flex;
  font-size: 25px;
  justify-content: space-between;
  align-items: center;
  float: right;
  height: var(--headerHeight);
  .lineItem {
    margin: 0 7px;
  }
}

.el-dropdown {
  width: 100%;
}

.cursor {
  cursor: pointer;
}
</style>
