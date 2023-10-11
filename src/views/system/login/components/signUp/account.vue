<!-- 账号注册 -->
<template>
  <div>
    <c-form ref="signUpForm" :form-data="signUpInfo" :form-params="loginForm" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      signUpInfo: {
        account: '',
        user: '',
        password: '',
        confirmPassword: '',
        signUpType: 'account'
      }
    }
  },
  computed: {
    loginForm() {
      return [
        {
          prop: 'account',
          type: 'input',
          attributes: {
            disabled: false,
            placeholder: '请输入账号',
            'prefix-icon': 'el-icon-postcard'
          },
          rules: [{ required: true, message: '账号不能为空' }]
        },
        {
          prop: 'user',
          type: 'input',
          attributes: {
            disabled: false,
            placeholder: '请输入用户名',
            'prefix-icon': 'el-icon-user'
          },
          rules: [{ required: true, message: '用户名不能为空' }]
        },
        {
          prop: 'password',
          type: 'input',
          attributes: {
            disabled: false,
            placeholder: '请输入密码',
            type: 'password',
            'show-password': true,
            'prefix-icon': 'el-icon-lock'
          },
          rules: [{ required: true, message: '密码不能为空' }]
        },
        {
          prop: 'confirmPassword',
          type: 'input',
          attributes: {
            disabled: false,
            placeholder: '请重复密码',
            type: 'password',
            'show-password': true,
            'prefix-icon': 'el-icon-lock'
          },
          rules: [{ required: true, message: '重复密码不能为空' }]
        }
      ]
    }
  },
  methods: {
    // 校验
    validate() {
      return this.$refs['signUpForm'].validate()
    },
    // 重置表单
    reset() {
      this.$refs.signUpForm.reset()
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
