import Vue from "vue";
import App from "./App.vue";
import router from "@/permission";
import store from "./store";
import i18n from "./i18n";
import Print from "vue-print-nb";
import consoleColor from "./utils/consoleColor";

//全局指令
import "@/directive";

//插件
import "@/plugin/apis";
import "@/plugin/element";
import "@/plugin/modal";
import "@/plugin/download";

//样式
import "@/icons";
import "@/styles/index.scss";
import "hover.css";

//全局组件
import "@/components";

//字典
import "@/dict";

//工具
import "@/utils/formatData";

Vue.config.productionTip = false;
Vue.prototype.$log = consoleColor;

Vue.use(Print); //注册

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
