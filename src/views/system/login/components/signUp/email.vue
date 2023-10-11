<!--  -->
<template>
  <div>
    <el-form v-model="loginInfo">
      <el-form-item prop="email">
        <el-input
          v-model="loginInfo.email"
          size="medium"
          type="text"
          auto-complete="off"
          placeholder="请输入邮箱账号"
        />
      </el-form-item>
      <el-form-item prop="emailCode">
        <el-input
          v-model="loginInfo.emailCode"
          type="text"
          size="medium"
          auto-complete="off"
          placeholder="邮箱验证码"
        >
          <template slot="append">
            <span
              v-if="emailCodeTimer <= 0" 
              style="cursor: pointer;width:150px" 
              @click="getEmailCode"
            >
              获取验证码
            </span>
            <span v-if="emailCodeTimer > 0" style="width:150px">{{ emailCodeTimer }}秒后可重新获取</span>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginInfo: {
        email: '',
        emailCode: '',
        loginType: 'email'
      },
      emailCodeTimer: 0
    }
  },
  methods: {
    getEmailCode() {
      if (this.emailCodeTimer > 0) return
      this.$message.success('获取验证码成功')
      this.emailCodeTimer = 60
      let msgTimer = setInterval(() => {
        this.emailCodeTimer = this.emailCodeTimer - 1
        if (this.emailCodeTimer <= 0) {
          clearInterval(msgTimer)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.check {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
