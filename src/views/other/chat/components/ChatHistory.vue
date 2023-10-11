<!--  -->
<template>
  <div id="scroll-container" class="info">
    <div v-for="(item, index) in chatHistory" :key="index">
      <div v-if="item.userInfo.id === loginInfo.id" class="news left">
        <div class="avatar" style="margin-right: 15px"></div>
        <span> {{ item.userInfo.user }}</span>
        <div class="leftBox massageBox">
          <div class="message" v-html="item.message"></div>
        </div>
      </div>

      <div v-else class="news right">
        <div class="rightBox massageBox">
          <div class="message" v-html="item.message"></div>
        </div>
        <span> {{ item.userInfo.user }}</span>
        <div class="avatar" style="margin-left: 15px"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chatHistory: {
      type: [Array],
      default: [],
    },
  },
  data() {
    return {
      loginInfo: {},
    };
  },
  created() {
    this.getLoginInfo();
  },
  methods: {
    getLoginInfo() {
      this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    },
    //滚动条到最底下
    setScrollTop() {
      this.$nextTick(() => {
        // 获取滚动容器的 DOM 元素
        var container = document.getElementById("scroll-container");
        if (container) {
          // 将滚动位置设置为最底部
          container.scrollTop = container.scrollHeight + 200;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  height: 100%;
  overflow: auto;

  .left {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 15px;
    margin: 5px 0;
  }

  .right {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
    margin: 5px 0;
    min-width: 50px;
  }

  .leftBox {
    height: 40px;
    background: #ffffff;
    display: flex;
    align-items: center;
    margin-left: 15px;
    border-radius: 5px;
    padding: 0 15px;
    min-width: 50px;
  }

  .rightBox {
    height: 40px;
    background: #c9e7ff;
    display: flex;
    align-items: center;
    margin-right: 15px;
    border-radius: 5px;
    padding: 0 15px;
    min-width: 50px;
  }

  .message {
    display: flex;
  }

  .avatar {
    border-radius: 5px;
    width: 40px;
    height: 40px;
    background-color: #fff;
  }
}
</style>
