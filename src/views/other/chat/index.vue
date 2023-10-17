<!--  -->
<template>
  <div>
    <div class="header">聊天</div>
    <div class="body">
      <el-tabs
        v-model="tabPane"
        class="tabs"
        type="border-card"
        tab-position="left"
        @tab-click="handleClick"
      >
        <el-tab-pane label="消息" name="news">
          <div class="news">
            <div class="newsList">
              <div
                class="newsListItem"
                v-for="item in chatFriendList"
                :key="item.id"
                :class="{ active: active === item.id }"
                @click="changeChatFriend(item)"
              >
                <div class="item">
                  <div class="avatar"></div>
                  <div class="user">
                    <div class="top">{{ item.user }}</div>
                    <div class="bottom">与{{ item.user }}的聊天框</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="chat">
              <div class="chatHistory">
                <ChatHistory
                  ref="chatHistory"
                  :chatHistory="chatHistory"
                ></ChatHistory>
              </div>
              <div class="chatInput">
                <Editor
                  @keyup.native.enter="sendMessage"
                  v-model="chatInfo"
                  :min-height="180"
                ></Editor>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="通讯录" name="friends">
          <div class="friends">
            <div class="friendList">
              <!-- 新增好友 -->
              <div
                class="friendItem"
                :class="{ active: action === 'addFriend' }"
              >
                <div class="item" @click="friendBtn('addFriend')">
                  <div class="avatar"></div>
                  <div class="user">
                    <div class="top">{{ "新增好友" }}</div>
                  </div>
                </div>
              </div>
              <!-- 好友请求 -->
              <el-badge
                class="friendItem"
                :class="{ active: action === 'agreeFriend' }"
                :is-dot="hasAgree"
              >
                <div class="item" @click="friendBtn('agreeFriend')">
                  <div class="avatar"></div>
                  <div class="user">
                    <div class="top">{{ "同意请求" }}</div>
                  </div>
                </div>
              </el-badge>

              <!-- 好友列表 -->
              <div
                class="friendItem"
                v-for="(item, index) in friendList"
                :key="index"
                @click="getFriendInfo(item)"
                :class="{ active: action === item.id }"
              >
                <div class="item">
                  <div class="avatar"></div>
                  <div class="user">
                    <div class="top">{{ item.user }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="friendInfo">
              <!-- 加好友 -->
              <div v-if="action === 'addFriend'">
                <AddFriend ref="addFriend"></AddFriend>
              </div>
              <!-- 同意好友申请 -->
              <div v-else-if="action === 'agreeFriend'">
                <AgreeFriend
                  :agreeFriendList="agreeFriendList"
                  @refreshList="getAgreeFriendInfo"
                ></AgreeFriend>
              </div>

              <!-- 用户详细信息 -->
              <div v-else>
                <UserInfo @sendUser="sendUser" :userInfo="userInfo"></UserInfo>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AddFriend from "./components/AddFriend.vue";
import AgreeFriend from "./components/AgreeFriend.vue";
import UserInfo from "./components/UserInfo.vue";
import ChatHistory from "./components/ChatHistory";

export default {
  name: "chat",
  components: {
    AddFriend,
    AgreeFriend,
    UserInfo,
    ChatHistory,
  },
  data() {
    return {
      tabPane: "news",
      action: "addFriend",
      friendAction: [
        { label: "新增好友", value: "addFriend" },
        { label: "好友请求", value: "agreeFriend" },
      ],
      //未经同意的好友请求列表
      agreeFriendList: [],
      //已同意的好友列表
      friendList: [],
      //聊天的用户框
      chatFriendList: [],
      //用户详情
      userInfo: {},
      //被选中的聊天人
      active: null,
      //被选中的聊天人的信息
      activeInfo: {},
      //登录人信息
      loginInfo: {},
      //聊天输入框内容
      chatInfo: "",
      //聊天记录
      chatHistory: [],
    };
  },
  created() {
    //实时接收消息
    this.getMessage();
    //好友聊天列表
    this.getChatFriendList();
    //登录人信息
    this.getLoginInfo();
    //聊天记录
    this.getChatHistory();
  },
  methods: {
    /*
     *
     *
     * 上面是通讯录的操作
     *
     *
     */
    //获取好友列表
    getFriendList() {
      this.$service.baseData.user.friendList().then((res) => {
        this.friendList = res.data;
      });
    },
    //获取登录人信息
    getLoginInfo() {
      this.loginInfo = JSON.parse(localStorage.getItem("userInfo"));
    },
    //获取需要同意的好友操作
    getAgreeFriendInfo() {
      this.$service.baseData.user.getFriend().then((res) => {
        this.agreeFriendList = res.data;
        this.getFriendList();
      });
    },
    //获取好友详情
    getFriendInfo(item) {
      this.action = item.id;
      this.userInfo = item;
    },
    //切换通讯录操做
    friendBtn(value) {
      this.action = value;
      //切换到同意好友列表
      if (value === "agreeFriend") {
        //获取请求好友列表
        this.getAgreeFriendInfo();
        //获取好友列表
        this.getFriendList();
        //
        this.$nextTick(() => {
          if (this.action === "addFriend") {
            this.$refs.addFriend.resetQueryData();
          }
        });
      }
    },
    /*
     *
     *
     *  中间是切换操
     *
     *
     *
     */
    //切换大页签
    handleClick(tab, event) {
      //通讯录
      if (this.tabPane === "friends") {
        //获取好友列表
        this.getFriendList();
        //获取请求好友列表
        this.getAgreeFriendInfo();
        this.$nextTick(() => {
          if (this.action === "addFriend") {
            this.$refs.addFriend.resetQueryData();
          }
        });
      } else if (this.tabPane === "news") {
      }
    },
    //获取消息
    getMessage() {
      const that = this;
      let websocket = null;

      // 获取登录用户
      const userId = JSON.parse(localStorage.getItem("userInfo")).id;

      //判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        websocket = new WebSocket("ws://localhost:8080/websocket/" + userId);
      } else {
        alert("当前浏览器 不支持 websocket");
      }

      //连接发生错误的回调方法
      websocket.onerror = function () {
        console.log("WebSocket连接发生错误");
      };

      //连接成功建立的回调方法
      websocket.onopen = function () {
        console.log("WebSocket连接成功");
      };

      //接收到消息的回调方法
      websocket.onmessage = function (event) {
        //存储接收人的信息
        const msg = event.data;
        if (msg === "有新的好友请求") {
          that.getAgreeFriendInfo();
        } else {
          //判断收到数据类型
          const massage = JSON.parse(msg);

          that.sendUser(massage.userInfo);
          that.setChatInfo(massage.message, that, massage.userInfo);
        }
      };
    },
    /*
     *
     *
     * 下面是聊天框的操作
     *
     *
     */
    //发送信息给好友前将好友加入聊天列表
    sendUser(userInfo) {
      this.tabPane = "news";
      //加入聊天人
      if (!this.chatFriendList.some((item) => item.id === userInfo.id)) {
        this.chatFriendList.push(userInfo);
      }
      //切换聊天对象
      this.changeChatFriend(userInfo);
      //存储聊天对象
      localStorage.setItem(
        "chatFriendList",
        JSON.stringify(this.chatFriendList)
      );
    },
    //获取聊天好友列表
    getChatFriendList() {
      if (localStorage.getItem("chatFriendList")) {
        this.chatFriendList = JSON.parse(
          localStorage.getItem("chatFriendList")
        );
        this.active = this.chatFriendList[0].id;
      }
    },
    //切换聊天对象
    changeChatFriend(item) {
      this.active = item.id;
      this.activeInfo = item;
      this.getChatHistory();
      this.$refs.chatHistory.setScrollTop();
    },
    //发送消息
    sendMessage() {
      this.$service.baseData.message.sendOne({
        friendId: this.active,
        message: JSON.stringify({
          userInfo: this.loginInfo,
          message: this.chatInfo,
        }),
      });
      //存储发送人信息
      this.setChatInfo(this.chatInfo, this, this.loginInfo);
      //清空输入框
      this.$set(this, "chatInfo", "");
      this.$refs.chatHistory.setScrollTop();
    },
    //聊天记录存储本地
    setChatInfo(message, that, userInfo) {
      that.chatHistory.push({ message: message, time: new Date(), userInfo });
      //存储聊天记录
      if (localStorage.getItem([this.loginInfo.id])) {
        //获取当前登录人的聊天记录
        const chatInfo = JSON.parse(localStorage.getItem([this.loginInfo.id]));
        //将聊天记录存储进之前和对象的聊天记录中
        chatInfo[that.active] = that.chatHistory;
        //上传本地
        localStorage.setItem([this.loginInfo.id], JSON.stringify(chatInfo));
      } else {
        //创建登录人聊天记录
        localStorage.setItem(
          [this.loginInfo.id],
          JSON.stringify({
            [that.active]: that.chatHistory,
          })
        );
      }
    },
    //获取聊天记录
    getChatHistory() {
      if (localStorage.getItem([this.loginInfo.id])) {
        const chatInfo = JSON.parse(localStorage.getItem([this.loginInfo.id]));

        this.chatHistory = chatInfo[this.active] ? chatInfo[this.active] : [];
        this.$refs.chatHistory.setScrollTop();
      }
    },
  },
  computed: {
    //是否有新的好友请求
    hasAgree() {
      return this.agreeFriendList.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  padding-left: 15px;
  background-color: rgb(22, 131, 189);
  color: #fff;
  font-size: 14px;
  font-weight: 550;
  width: 100%;
  height: 50px;
}

.tabs {
  width: 100%;
  height: 85vh;
  // 消息
  .news {
    display: flex;
    width: 100%;
    height: 85vh;
    .newsList {
      width: 20%;
      min-width: 200px;
      height: 100%;
      background-color: #d5e0f6;
      .newsListItem {
        border-radius: 5px;
        height: 50px;
        margin: 5px 5px;
        width: calc(100% - 10px);
        background-color: #3b4255;
        color: #fff;
        font-size: 15px;
        .item {
          width: 100%;
          height: 100%;
          padding: 5px;
          display: flex;
          .avatar {
            width: 40px;
            height: 40px;
            border-radius: 5px;
            background-color: #fff;
            margin-right: 25px;
          }
          .user {
            width: 70%;
            height: 100%;
            .top {
              width: 100%;
              height: 50%;
            }
            .bottom {
              width: 100%;
              height: 50%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }

      .newsListItem:hover {
        background-color: #f0d895;
        color: #3b4255 !important;
        cursor: pointer;
      }
    }
    .chat {
      width: 80%;
      height: 100%;
      background-color: #f1f2f3;
      .chatHistory {
        width: 100%;
        height: 70%;
      }

      .chatInput {
        border-top: 1px solid #888a8b;
        width: 100%;
        height: 30%;
        background-color: #f1f2f3;
      }
    }
  }
  //通讯录
  .friends {
    display: flex;
    width: 100%;
    height: 85vh;
    .friendList {
      width: 200px;
      height: 100%;
      background-color: #d5e0f6;
      .friendItem {
        border-radius: 5px;
        height: 50px;
        margin: 5px 5px;
        width: calc(100% - 10px);
        background-color: #3b4255;
        color: #fff;
        font-size: 15px;
        .item {
          width: 100%;
          height: 100%;
          padding: 5px;
          display: flex;
          .avatar {
            border-radius: 5px;
            width: 40px;
            height: 40px;
            background-color: #fff;
            margin-right: 25px;
          }
          .user {
            width: 70%;
            height: 100%;
            font-size: 15px;

            .top {
              display: flex;
              align-items: center;
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .friendItem:hover {
        background-color: #f0d895;
        color: #3b4255 !important;
        cursor: pointer;
      }
    }
    .friendInfo {
      width: 85%;
      height: 100%;
    }
  }
  //选中
  .active {
    background-color: #fdf3d8 !important;
    color: #3b4255 !important;
  }
}

::v-deep .el-tabs__header {
  margin-right: 0 !important;
}

::v-deep .el-tabs__content {
  padding: 0;
  box-shadow: 4px 7px 11px 7px rgba(0, 0, 0, 0.4) !important;
  height: 100%;
}
</style>
