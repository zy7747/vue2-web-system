<!--  -->
<template>
  <div>
    <div class="action">
      <c-button class="btn" text="清除已读" @click="clearRead"></c-button>
      <c-button text="清除所有"></c-button>
    </div>

    <div class="main">
      <ul class="left">
        <vxe-list
          height="40vh"
          auto-resize
          :data="list"
          :scroll-y="{ enabled: true }"
        >
          <template #default="{ items }">
            <li
              :class="
                'messageBox ' +
                (item.isRead === '1' ? 'readClass' : 'noReadClass')
              "
              v-for="(item, index) in items"
              :key="index"
              @click="handleClick(item, index)"
            >
              <div class="icon">
                <svg-icon
                  style="font-size: 40px"
                  v-if="item.isRead === '1'"
                  icon-class="已读邮件"
                  class="action-icon"
                />

                <svg-icon
                  style="font-size: 40px"
                  v-if="item.isRead === '0'"
                  icon-class="新邮件"
                  class="action-icon"
                />
              </div>

              <div class="title">
                <div class="noticeName">{{ item.noticeName }}</div>
                <div>{{ getDictLabel("user", item.receiver) }}</div>
              </div>
            </li>
          </template>
        </vxe-list>
      </ul>
      <transition name="el-fade-in-linear">
        <ul class="right" v-show="show">
          <li>
            {{ checkMessage.noticeName }}
          </li>
          <li>
            {{ "时间：" + checkMessage.createTime }}
          </li>
          <li>
            {{
              "发件人：" +
              (checkMessage.creator
                ? getDictLabel("user", checkMessage.creator)
                : "")
            }}
          </li>
          <li>
            {{ checkMessage.noticeContent }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkMessage: {},
      show: false,
    };
  },
  props: {
    list: {
      text: "数据对象",
      type: [Array],
      default: () => {
        return [];
      },
    },
  },
  methods: {
    handleClick(item, index) {
      this.show = false;

      setTimeout(() => {
        this.checkMessage = item;
        this.show = true;

        this.$service.functional.notice.saveList([
          { ...item, receiverList: [item.receiver], isRead: "1" },
        ]);
      }, 30);
    },
    //清除已读
    clearRead() {},
    //清除已读
    clearRead() {},
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  width: 100%;
  height: 40vh;
  .left {
    width: 40%;
    overflow-y: auto;
    height: 40vh;
    .messageBox {
      display: flex;
      padding: 2px 5px;
      border: 1px solid black;
      border-radius: 3px;
      margin-bottom: 5px;
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 50px;
        border: 1px solid black;
      }

      .title {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 15px;
        .noticeName {
          width: 100%;
          font-weight: 550;
          color: #fff;
        }
      }
    }
  }

  .right {
    padding-left: 15px;
    display: flex;
    flex-direction: column;
    width: 60%;
  }
}

.readClass {
  background-color: rgb(162, 226, 142);
}

.noReadClass {
  background-color: rgb(78, 210, 228);
}

.messageBox:hover {
  cursor: pointer;
  opacity: 0.9;
}

.action {
  display: flex;
  margin-bottom: 5px;
}
</style>
