import Vue from 'vue'
import VueI18n from 'vue-i18n'
// 从语言包文件中导入语言包对象
import zh from './locales/zh'
import en from './locales/en'
import jp from './locales/jp'
import kr from './locales/kr'

// 从LocalStorage中引入保存的语言

Vue.use(VueI18n)

const messages = {
  zh,
  en,
  jp,
  kr
}

let lang = JSON.parse(localStorage.getItem('language'))

// 处理language
if (!lang) {
  lang = 'zh'
} else {
  lang = lang.language
}
const i18n = new VueI18n({
  messages,
  locale: lang
})

export default i18n
