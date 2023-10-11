<!-- 登录面板 -->
<template>
  <div>
    <draggable-resizable :w="500" :h="400" drag-handle=".drag">
      <div class="content">
        <div class="drag"></div>
        <div class="login-box">
          <!-- 扫码登录 -->
          <div v-show="show === 'signIn'" class="box">
            <a href="JavaScript:void(0)" @click="show = 'qrCode'">
              <svg-icon icon-class="二维码" class="icon left-box" />
            </a>
            <SignIn @signUp="signUp" />
          </div>
          <!-- 普通登录 -->
          <div v-show="show === 'qrCode'" class="box">
            <a href="JavaScript:void(0)" @click="show = 'signIn'">
              <svg-icon icon-class="电脑" class="icon left-box" />
            </a>
            <QrCode />
          </div>
          <!-- 注册 -->
          <div v-show="show === 'signUp'" class="box">
            <SignUp @signIn="signIn" />
          </div>
        </div>
      </div>
    </draggable-resizable>
  </div>
</template>

<script>
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import QrCode from "./components/qrCode";

export default {
  name: "Login",
  components: {
    SignIn,
    QrCode,
    SignUp,
  },
  data() {
    return {
      show: "signIn",
    };
  },
  methods: {
    // 注册
    signUp() {
      this.show = "signUp";
    },
    // 登录
    signIn() {
      this.show = "signIn";
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  position: relative;
  height: 500px;
  width: 400px;
  .drag {
    z-index: 1;
    position: absolute;
    width: 80%;
    height: 50px;
    cursor: grab;
  }

  .login-box {
    width: 100%;
    height: 100%;
    position: absolute;
    position: relative;
    border-radius: 5px;
    background-color: #fff;
    overflow: hidden;
    padding: 5px;

    .box {
      width: 100%;
      height: 100%;
      .left-box {
        font-size: 35px;
        position: absolute;
      }
    }
  }
}
</style>
