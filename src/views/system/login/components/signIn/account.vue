<!-- 账号/邮箱/登录 -->
<template>
  <div class="account">
    <el-form name="loginForm" :model="loginInfo" :rules="rules" ref="loginForm">
      <el-form-item prop="account">
        <el-input
          v-model="loginInfo.account"
          size="medium"
          type="text"
          clearable
          placeholder="请输入账号"
          prefix-icon="el-icon-user"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginInfo.password"
          size="medium"
          clearable
          placeholder="请输入密码"
          type="password"
          :show-password="true"
          prefix-icon="el-icon-unlock"
          @keyup.enter.native="signIn"
        />
      </el-form-item>
    </el-form>

    <div class="check">
      <el-checkbox v-model="loginInfo.rememberMe" label="记住我" />
      <a href="JavaScript:void(0)" class="forgotPassword">忘记密码？</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginInfo: {
        account: "",
        password: "",
        loginType: "account",
        rememberMe: false,
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 4,
            max: 18,
            message: "账号长度长度在 4 到 18 个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码长度长度在 6 到 18 个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    validate() {
      return this.$refs["loginForm"].validate();
    },
    signIn() {
      this.$emit("signIn");
    },
  },
};
</script>

<style lang="scss" scoped>
.check {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.account {
  width: 100%;
}
</style>
