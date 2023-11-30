<!--  -->
<template>
  <div class="openAi">
    <c-input
      class="talkInput"
      type="textarea"
      placeholder="请输入内容开始聊天"
      v-model="talk"
      @keyup.native.enter="say"
      :autosize="{ minRows: 6, maxRows: 10 }"
    />
    <ul class="talkList" ref="talkList">
      <li class="talkBox" v-for="(item, index) in talkAbout" :key="index">
        <div class="user">
          <img
            v-if="item.role === 'user'"
            class="avatar"
            :src="baseUrl + userInfo.avatar"
          />
          <img
            v-else
            class="avatar"
            src="~@/assets/images/avatar/chatgpt.png"
          />
        </div>

        <div v-if="item.role === 'user'" class="userTalk">
          {{ item.content }}
        </div>

        <div v-else class="botTalk">
          {{ item.content }}
        </div>

        <!-- <pre>
            <code class="javascirpt">{{item.content}}</code>
        </pre> -->
      </li>
    </ul>
  </div>
</template>

<script>
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export default {
  created() {
    this.setScrollTop();
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  data() {
    return {
      talk: "",
      talkAbout: [],
      userInfo: null,
      baseUrl: process.env.VUE_APP_BASE_API,
    };
  },
  methods: {
    async say() {
      if (this.talk == "") {
        return;
      }
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: this.talk }],
        model: "gpt-3.5-turbo",
      });
      this.talkAbout.push({ role: "user", content: this.talk });
      this.talkAbout.push(completion.choices[0].message);
      this.talk = "";
      this.setScrollTop();
    },
    //滚动条到最底下
    setScrollTop() {
      this.$nextTick(() => {
        // 获取滚动容器的 DOM 元素
        var container = this.$refs["talkList"];
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
.openAi {
  position: relative;
  height: 100%;
  background-color: #293266;
  padding: 10px;
}

.talkInput {
  width: 98%;
  position: absolute;
  bottom: 20px;
}

.talkList {
  height: calc(100% - 162px);
  overflow-y: auto;
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
  scrollbar-color: transparent !important;
  .talkBox {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 15px;
    border-radius: 5px;
    height: 30px;
    width: 30px;
  }

  .userTalk {
    background-color: #3a4684;
    color: #fff;
    margin: 15px 0;
    padding: 15px;
    border-radius: 15px;
  }

  .botTalk {
    background-color: #fff;
    margin: 15px 0;
    padding: 15px;
    border-radius: 15px;
  }
}

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
