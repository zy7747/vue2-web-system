<!-- 短信验证码登录 -->
<template>
  <div>
    <el-form v-model="useInfo">
      <el-form-item prop="phone">
        <el-input
          v-model="useInfo.phone"
          size="medium"
          type="text"
          auto-complete="off"
          prefix-icon="el-icon-mobile-phone"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item prop="mobileCode">
        <el-input
          v-model="useInfo.mobileCode"
          type="text"
          size="medium"
          auto-complete="off"
          placeholder="短信验证码"
        >
          <template slot="append">
            <span
              v-if="mobileCodeTimer <= 0" 
              style="cursor: pointer" 
              @click="getSmsCode"
            >
              获取验证码
            </span>
            <span v-if="mobileCodeTimer > 0">{{ mobileCodeTimer }}秒后可重新获取</span>
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
      useInfo: {
        loginType: 'sms'
      },
      mobileCodeTimer: 0
    }
  },
  methods: {
    getSmsCode() {
      if (this.mobileCodeTimer > 0) return
      this.$message.success('获取验证码成功')
      this.mobileCodeTimer = 60
      let msgTimer = setInterval(() => {
        this.mobileCodeTimer = this.mobileCodeTimer - 1
        if (this.mobileCodeTimer <= 0) {
          clearInterval(msgTimer)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
    
</style>
