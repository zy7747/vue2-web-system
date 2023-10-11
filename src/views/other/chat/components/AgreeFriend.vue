<!--  -->
<template>
  <div>
    <div class="userInfo" v-for="item in agreeFriendList" :key="item.id">
      <div class="user">
        <div class="avatar"></div>
        <span>{{ item.user }}</span>
      </div>
      <div class="agreeBtn">
        <c-button
          class="btn"
          @click="agreeFriend(item)"
          text="同意"
          color=""
          type="text"
        />
        <c-button class="btn" text="拒绝" color="red" type="text" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    agreeFriendList: {
      type: [Array],
      default: [],
    },
  },
  methods: {
    agreeFriend(item) {
      this.$service.system.user
        .agreeFriend({ friendId: item.id })
        .then((res) => {
          this.$message.success("已同意好友请求");
          this.$emit("refreshList");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.userInfo {
  width: calc(100% - 10px);
  height: 50px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #dcdfe6;
  margin: 15px 5px;
  padding: 0 15px;
  align-items: center;
  border-radius: 5px;
  .user {
    display: flex;
    align-items: center;
    .avatar {
      width: 45px;
      height: 45px;
      background-color: #cb2424;
      margin-right: 5px;
    }
  }
}

.userInfo:hover {
  background-color: #526b83;
  cursor: pointer;
}

.agreeBtn {
  display: flex;
}
</style>
