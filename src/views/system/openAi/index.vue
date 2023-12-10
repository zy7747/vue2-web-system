<!--  -->
<template>
  <div class="openAi">
    <c-input
      class="talkInput"
      type="textarea"
      placeholder="$t('qing-shu-ru-nei-rong-kai-shi-liao-tian')"
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
          <pre><code class="hljs" v-html="highlightedCode(item.content)"></code></pre>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import OpenAI from "openai";
import highlight from "@/plugin/highlight";
import { speak } from "@/plugin/speak";

//openAi
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
      languages: [
        "javascript",
        "html",
        "vue",
        "java",
        "bash",
        "typescript",
        "shell",
      ],
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
      // 用户说的话
      this.talkAbout.push({ role: "user", content: this.talk });
      //AI说的话
      this.talkAbout.push(completion.choices[0].message);
      speak(completion.choices[0].message.content);

      //清空输入框
      this.talk = "";
      //滚动条到最底下
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
    //将ai生成的代码片段经行处理
    aiTalk(talk) {},
    //vue中使用highlight.js
    /** 高亮显示 */
    highlightedCode(code) {
      const arr = code.split("```");
      let text = "";

      //将代码部分与普通文字抽离出来
      arr.forEach((item) => {
        let result;

        const arr2 = item.split("\n");

        let language = arr2[0];

        if (this.languages.includes(language)) {
          arr2.shift();
          result = highlight(language, arr2.join("\n"));
        } else {
          result = item;
        }

        text += result || "&nbsp;";
      });

      return text;
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

<style lang="scss">
.botTalkCode {
  margin: 5px 0;
  border-radius: 10px;
  padding: 10px 20px;
  background-color: #282c34;
}

.hljs {
  color: black;
  background-color: #fff;
}
</style>
