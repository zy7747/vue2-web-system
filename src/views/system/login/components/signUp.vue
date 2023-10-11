<!-- 注册页 -->
<template>
  <div class="signUp">
    <div class="header">
      <!-- 返回登录界面 -->
      <div class="back" @click="signIn">
        <el-button type="text">
          <svg-icon icon-class="返回" class="icon backBtn" />
        </el-button>
      </div>
    </div>
    <!-- 注册方式 -->
    <el-tabs
      v-model="signUpType"
      class="signUp-box"
      type="border-card"
      tab-position="left"
    >
      <el-tab-pane label="账号注册" name="account">
        <Account ref="account" />
        <el-button
          style="margin-top: 25px; width: 100%"
          size="medium"
          type="primary"
          :loading="loading"
          @click="signUp"
          >{{ "注册" }}
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="邮箱注册" name="email">
        <Email ref="email" />
      </el-tab-pane>
      <el-tab-pane label="手机注册" name="phone">
        <Sms />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Account from "./signUp/account";
import Sms from "./signUp/sms";
import Email from "./signUp/email";

export default {
  name: "SignUp",
  components: {
    Account,
    Sms,
    Email,
  },
  data() {
    return {
      signUpType: "account",
      loading: false,
    };
  },
  methods: {
    signUp() {
      // 1.账号密码注册
      if (this.signUpType === "account") {
        const signUpInfo = this.$refs.account.signUpInfo;
        this.$refs["account"]
          .validate()
          .then(() => {
            if (signUpInfo.password === signUpInfo.confirmPassword) {
              this.$service.system.user.signUp(signUpInfo).then((res) => {
                if (res.code === 200) {
                  this.$message.success("注册成功");
                  // 清空表单
                  this.$refs.account.reset();
                  // 跳转回登录页
                  this.$emit("signIn");
                } else {
                  this.$message.error(res.message);
                }
              });
            } else {
              this.$message.warning("填写的两次密码不一样");
            }
          })
          .catch();
      }
    },
    signIn() {
      this.$emit("signIn");
    },
  },
};
</script>

<style lang="scss" scoped>
.signUp {
  width: 100%;
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5%;
    .backBtn {
      margin-left: 3px;
      font-size: 18px;
      color: rgb(94, 96, 96);
    }

    .backBtn:hover {
      color: rgb(43, 213, 94);
    }
  }
  .signUp-box {
    height: 95%;
  }

  ::v-deep .el-tabs {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    background-color: #ffffff !important;
    border: 0 !important;
  }

  // 切换栏样式
  ::v-deep .el-tabs__item {
    margin-bottom: 5px !important;
    background-color: #3e7d94;
    color: aliceblue !important;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  //选中切换栏的样式
  ::v-deep .el-tabs__item.is-active {
    background-color: #ebe4dc !important;
    color: #866242 !important;
    font-weight: 700 !important;
  }

  ::v-deep .el-tabs__header {
    margin-right: 0 !important;
  }

  ::v-deep .el-tabs__content {
    background-color: #ebe4dc;
    box-shadow: 4px 7px 11px 7px rgba(0, 0, 0, 0.4) !important;
    height: 100%;
  }
}
</style>
