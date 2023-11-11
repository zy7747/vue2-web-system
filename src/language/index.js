import Vue from "vue";
import VueI18n from "vue-i18n";
// 从语言包文件中导入语言包对象
import zh from "./locales/zh.json";
import en from "./locales/en.json";
import jp from "./locales/jp.json";
import kr from "./locales/kr.json";

// 从LocalStorage中引入保存的语言

Vue.use(VueI18n);

let lang = localStorage.getItem("language");

// 处理language
if (!lang) {
  lang = "zh";
} else {
  lang = lang;
}

const i18n = new VueI18n({
  messages: {
    zh,
    en,
    jp,
    kr,
  },
  locale: lang,
});

export default i18n;
