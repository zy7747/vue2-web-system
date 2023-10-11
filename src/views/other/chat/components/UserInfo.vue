<!--  -->
<template>
  <div class="userInfo">
    <div class="avatar">
      <el-image
        style="width: 100%"
        :src="baseUrl + userInfo.avatar"
        :preview-src-list="[baseUrl + userInfo.avatar]"
        fit="cover"
      ></el-image>
    </div>
    <div>{{ userInfo.user }}</div>
    <div>{{ userInfo.email }}</div>
    <div>{{ userInfo.sex }}</div>
    <el-button type="primary" @click="sendUser">发送消息</el-button>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: [Object],
      text: "用户详情",
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
    };
  },
  methods: {
    sendUser() {
      this.$emit("sendUser", this.userInfo);
    },
  },
};
</script>

<style lang="scss" scoped>
.userInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .avatar {
    width: 100px;
    height: 100px;
    background-color: #fff;
    border-radius: 15px;
    margin: 15px 0;
    overflow: hidden;
  }
}
</style>
