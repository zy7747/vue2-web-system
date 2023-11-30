<!--  -->
<template>
  <div class="HeaderLine">
    <div class="screen lineItem">
      <div class="item" title="全屏显示">
        <a class="cursor" href="JavaScript:void(0)" @click="changeScreen">
          <svg-icon v-if="!isScreen" icon-class="全屏显示" class="icon" />
          <svg-icon v-else icon-class="退出全屏" class="icon" />
        </a>
      </div>
    </div>

    <div class="news lineItem">
      <el-popover placement="bottom" trigger="click">
        <div class="item" title="系统公告" slot="reference">
          <el-badge is-dot class="dot">
            <a class="cursor" href="JavaScript:void(0)">
              <svg-icon
                icon-class="系统公告"
                class="icon"
                style="font-size: 25px"
              />
            </a>
          </el-badge>
        </div>
        <div class="notice">
          <el-tabs v-model="activeName">
            <el-tab-pane label="通知" name="通知">通知</el-tab-pane>
            <el-tab-pane label="邮件" name="邮件">邮件</el-tab-pane>
            <el-tab-pane label="公告" name="公告">公告</el-tab-pane>
          </el-tabs>
        </div>
      </el-popover>
    </div>

    <div class="theme lineItem">
      <div class="item" title="主题">
        <a class="cursor" href="JavaScript:void(0)" @click="theme">
          <svg-icon icon-class="Photo" class="icon" style="font-size: 24px" />
        </a>
      </div>
    </div>

    <div class="translate lineItem">
      <el-dropdown
        @command="handleLangs"
        trigger="click"
        placement="bottom-start"
      >
        <div class="item" title="语言">
          <a class="cursor" href="JavaScript:void(0)">
            <svg-icon
              :icon-class="languageIcon"
              class="icon"
              style="font-size: 25px"
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

    <div class="user">
      <el-dropdown @command="handleCommand" trigger="hover">
        <div class="avatar-wrapper cursor">
          <img class="avatar" :src="baseUrl + userInfo.avatar" />
          <p style="font-weight: 520; color: #108adc">
            {{ userInfo.user }}
          </p>
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
  name: "HeaderLine",
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
    //修改语言
    handleLangs(item) {
      localStorage.setItem("language", item.language);
      this.$i18n.locale = item.language;
      this.refresh();
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
  computed: {
    languageIcon() {
      const result = this.langs.find(
        (item) => item.language === this.$i18n.locale
      );

      return result?.icon;
    },
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
}

.lineItem {
  margin: 0 7px;
}
.user {
  width: 80px;
  display: flex;
  align-items: center;
  margin-left: 5px;
  .avatar-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar {
      margin-right: 8px;
      border-radius: 5px;
      border: 1px solid #fff;
      height: 30px;
      width: 30px;
    }
  }
}

.el-dropdown {
  width: 100%;
}

.cursor {
  cursor: pointer;
}

.notice {
  width: 300px;
  height: 500px;
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
  .action-icon {
    font-size: 16px;
  }
}

.el-badge__content.is-dot {
  top: 5px;
}
</style>
