<!--  -->
<template>
  <div style="margin-left: 5px">
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

    <el-dialog :visible.sync="accountVisible" width="0">
      <SignIn></SignIn>
    </el-dialog>
  </div>
</template>

<script>
import SignIn from "@/views/system/login/login.vue";

export default {
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  components: {
    SignIn,
  },
  data() {
    return {
      userInfo: {},
      accountVisible: false, //切换账号弹窗
      baseUrl: process.env.VUE_APP_BASE_API,
    };
  },
  methods: {
    handleCommand(command) {
      if (command === "logOut") {
        this.logOut();
      } else if (command === "changeAccount") {
        this.changeAccount();
      }
    },
    //登出
    logOut() {
      this.$store.dispatch("LogOut");
    },
    //切换账号
    changeAccount() {
      this.accountVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
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

.user {
  width: 80px;
  display: flex;
  align-items: center;

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

.cursor {
  cursor: pointer;
}
</style>
