<!--  -->
<template>
  <div class="HeaderLine">
    <div class="lock">
      <el-tooltip
        class="item"
        effect="light"
        :open-delay="300"
        content="锁屏"
        placement="top-start"
      >
        <a class="cursor" href="JavaScript:void(0)">
          <svg-icon icon-class="解锁" class="icon" />
        </a>
      </el-tooltip>
    </div>
    <div class="search">
      <el-tooltip
        class="item"
        effect="light"
        :open-delay="300"
        content="搜索"
        placement="top-start"
      >
        <a class="cursor" href="JavaScript:void(0)">
          <svg-icon icon-class="搜索" class="icon" />
        </a>
      </el-tooltip>
    </div>
    <div class="news">
      <el-popover placement="bottom" trigger="click">
        <el-tooltip
          slot="reference"
          class="item"
          effect="light"
          :open-delay="300"
          content="系统公告"
          placement="top-start"
        >
          <el-badge is-dot class="dot">
            <a class="cursor" href="JavaScript:void(0)">
              <svg-icon
                icon-class="系统公告"
                class="icon"
                style="font-size: 25px"
              />
            </a>
          </el-badge>
        </el-tooltip>

        <div class="notice">
          <el-tabs v-model="activeName">
            <el-tab-pane label="通知" name="通知">通知</el-tab-pane>
            <el-tab-pane label="邮件" name="邮件">邮件</el-tab-pane>
            <el-tab-pane label="公告" name="公告">公告</el-tab-pane>
          </el-tabs>
        </div>
      </el-popover>
    </div>
    <div class="screen">
      <el-tooltip
        class="item"
        effect="light"
        :open-delay="300"
        content="全屏显示"
        placement="top-start"
      >
        <a class="cursor" href="JavaScript:void(0)" @click="changeScreen">
          <svg-icon v-if="!isScreen" icon-class="全屏显示" class="icon" />
          <svg-icon v-else icon-class="退出全屏" class="icon" />
        </a>
      </el-tooltip>
    </div>
    <div class="translate">
      <el-dropdown trigger="click" placement="bottom-start">
        <el-tooltip
          class="item"
          effect="light"
          :open-delay="300"
          content="语言翻译"
          placement="top-start"
        >
          <a class="cursor" href="JavaScript:void(0)">
            <svg-icon
              icon-class="语言翻译"
              class="icon"
              style="font-size: 25px"
            />
          </a>
        </el-tooltip>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) in langs" :key="index">
            <span>
              <svg-icon :icon-class="item.icon" class="icon" />
              <span style="margin-left: 10px">{{ item.lang }}</span></span
            >
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="theme">
      <el-tooltip
        class="item"
        effect="light"
        :open-delay="300"
        content="主题风格"
        placement="top-start"
      >
        <a class="cursor" href="JavaScript:void(0)" @click="theme">
          <svg-icon icon-class="主题" class="icon" style="font-size: 24px" />
        </a>
      </el-tooltip>
    </div>
    <div class="refresh">
      <el-tooltip
        class="item"
        effect="light"
        :open-delay="300"
        content="刷新页面"
        placement="top-start"
      >
        <a class="cursor" href="JavaScript:void(0)" @click="refresh">
          <svg-icon
            icon-class="刷新图标"
            class="icon"
            style="font-size: 23px"
          />
        </a>
      </el-tooltip>
    </div>
    <div class="user">
      <el-dropdown @command="handleCommand" trigger="hover">
        <div class="avatar-wrapper cursor">
          <img
            class="avatar"
            :src="
              userInfo.avatar
                ? baseUrl + userInfo.avatar
                : '@/assets/avatar/avatar.gif'
            "
          />
          <p style="font-weight: 600">
            {{ userInfo.name }}
          </p>
          <svg-icon
            style="font-size: 20px"
            icon-class="向下箭头"
            class="icon round"
          />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div class="action" v-if="userInfo.account === 'visitor'">
              <svg-icon icon-class="访客" class="action-icon" />
              <span style="margin-left: 5px">访客中心</span>
            </div>

            <div class="action" v-else>
              <svg-icon icon-class="男士" class="action-icon" />
              <span style="margin-left: 5px">个人中心</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="changeAccount">
            <div class="action">
              <svg-icon icon-class="切换账号" class="action-icon" />
              <span style="margin-left: 5px">切换账号</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="logOut">
            <div class="action">
              <svg-icon icon-class="关闭" class="action-icon" />
              <span style="margin-left: 5px">退出登录 </span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <Config ref="config" />

    <el-dialog :visible.sync="accountVisible" width="0">
      <SignIn></SignIn>
    </el-dialog>
  </div>
</template>

<script>
import ScreenFull from "screenfull";
import Config from "@/layout/config/index.vue";
import SignIn from "@/views/system/login/login.vue";

export default {
  components: {
    Config,
    SignIn,
  },
  data() {
    return {
      activeName: "邮件",
      isScreen: false,
      langs: [
        { icon: "cn", lang: "中文", language: "zh" },
        { icon: "us", lang: "English", language: "en" },
        { icon: "jp", lang: "日本語", language: "jp" },
        { icon: "kr", lang: "한국인", language: "kr" },
      ],
      userInfo: {},
      accountVisible: false, //切换账号弹窗
      baseUrl: process.env.VUE_APP_BASE_API,
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  methods: {
    //登出
    logOut() {
      this.$store.dispatch("LogOut");
    },
    //修改主题
    theme() {
      this.$refs.config.handleOpen();
    },
    //刷新界面
    refresh() {
      location.reload();
    },
    handleCommand(command) {
      if (command === "logOut") {
        this.logOut();
      } else if (command === "changeAccount") {
        this.changeAccount();
      }
    },
    //切换账号
    changeAccount() {
      this.accountVisible = true;
    },
    // 改变全屏
    changeScreen() {
      // 此时全屏不可用
      if (!ScreenFull.isEnabled) {
        this.$message.warning("此时全屏组件不可用");
        return;
      }
      //   如果可用 就可以全屏
      ScreenFull.toggle();
      this.isScreen = !this.isScreen;
    },
  },
};
</script>

<style lang="scss" scoped>
.HeaderLine {
  display: flex;
  font-size: 25px;
  justify-content: space-between;
  align-items: center;
  float: right;
  width: 400px;
  height: var(--headerHeight);
}
.user {
  width: 100px;
}

.el-dropdown {
  width: 100%;
}
.avatar-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .avatar {
    border-radius: 50%;
    border: 2px solid #fff;
    height: 30px;
    width: 30px;
  }
}

.cursor {
  cursor: pointer;
}

.notice {
  width: 300px;
  height: 500px;
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(180deg);
  }
}

.avatar-wrapper:hover .round {
  animation: rotate 0.5s linear;
  transform: rotate(180deg);
}

::v-deep .el-drawer__header {
  font-size: 16px;
}

.icon {
  font-size: 22px;
}

.action {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.action-icon {
  font-size: 16px;
}

.el-badge__content.is-dot {
  top: 5px;
}
</style>
