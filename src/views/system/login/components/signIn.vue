<!-- 登录页 -->
<template>
  <div class="signIn">
    <div class="signIn-box">
      <!-- 登录方式 -->
      <el-tabs v-model="loginType">
        <el-tab-pane label="账号登录" name="account">
          <Account ref="account" @signIn="signIn" />
        </el-tab-pane>
        <el-tab-pane label="邮箱登录" name="email">
          <Email ref="email" />
        </el-tab-pane>
        <el-tab-pane label="短信登录" name="sms">
          <Sms />
        </el-tab-pane>
      </el-tabs>

      <!-- 登录按钮 -->
      <el-button
        class="signInBtn"
        size="medium"
        type="primary"
        :loading="loading"
        @click="signIn"
      >
        {{ "登录" }}
      </el-button>

      <!-- 注册账号 -->
      <div class="signUp">
        <a href="JavaScript:void(0)" @click="signUp">注册账号</a>
      </div>

      <!-- 其他登录方式 -->
      <div class="otherLogin">
        <svg-icon icon-class="微信" class="loginLogo hvr-wobble-top" />
        <svg-icon icon-class="支付宝支付" class="loginLogo hvr-wobble-top" />
        <svg-icon icon-class="github" class="loginLogo hvr-wobble-top" />
        <svg-icon icon-class="推特" class="loginLogo hvr-wobble-top" />
      </div>
    </div>
  </div>
</template>

<script>
import Account from "./signIn/account";
import Sms from "./signIn/sms";
import Email from "./signIn/email";

export default {
  name: "SignIn",
  components: {
    Account,
    Sms,
    Email,
  },
  data() {
    return {
      loading: false,
      isAgree: false,
      loginType: "account",
    };
  },

  methods: {
    // 登录
    async signIn() {
      // 1.账号密码登录
      if (this.loginType === "account") {
        const loginInfo = this.$refs.account.loginInfo;
        this.$refs["account"]
          .validate()
          .then(() => {
            this.loading = true;
            this.$store.dispatch("Login", loginInfo).then((res) => {
              if (res) {
                //1.记住密码
                if (loginInfo.rememberMe) {
                  localStorage.setItem(
                    "rememberMe",
                    JSON.stringify({
                      ...loginInfo,
                      rememberMe: true,
                    })
                  );
                } else {
                  localStorage.removeItem("rememberMe");
                }

                this.$message.success("登录成功");

                if (this.$route.fullPath !== "/login") {
                  location.reload();
                }
                this.$router.push("/");
                this.loading = false;
              } else {
                this.loading = false;
              }
            });
          })
          .catch(() => {
            this.loading = false;
          });

        //邮箱登录
      } else if (this.loginType === "email") {
        this.$refs["email"].validate().then(() => {
          this.$store
            .dispatch("Login", this.$refs.email.loginInfo)
            .then((res) => {
              this.loading = false;
            });
        });
        this.loading = false;
      }
    },
    // 注册账号
    signUp() {
      this.$emit("signUp");
    },
  },
};
</script>

<style lang="scss" scoped>
.signIn {
  background: #f6f5f5;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  .signIn-box {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 50px;
    width: 80%;
    ::v-deep .el-tabs {
      width: 100% !important;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-bottom: none;
    }

    ::v-deep .el-tabs__content {
      width: 100% !important;
    }

    ::v-deep .el-tabs__nav-wrap::after {
      background-color: transparent !important;
    }

    .signInBtn {
      margin-top: 15px;
      width: 100%;
      background-color: #f8c80a;
      color: #704a1d;
      border: 0;
      border-radius: 5px;
    }

    .signInBtn:hover {
      background-color: #f8d753;
    }
  }
  .signUp {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
  }
  .otherLogin {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-top: 15px;
    .loginLogo {
      font-size: 35px;
      color: #293146;
      cursor: pointer;
    }

    .loginLogo:hover {
      color: #c3a469;
    }
  }
}

.signIn:before {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  width: 0;
  height: 0;
  border-top: 36px solid #f6f5f5; /* 三角形高度 */
  border-right: 36px solid #f6f5f5; /* 三角形颜色 */
  z-index: 1;
  clip-path: polygon(100% 100%, 0% 100%, 0% 100%, 100% 0%);
}
</style>
