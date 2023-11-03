import Vue from "vue";
import App from "./App.vue";
//router
import router from "@/permission";
//store
import store from "@/store";
//language
import i18n from "@/language";
//directive
import "@/directive";
//plugin
import "@/plugin";
//utils
import "@/utils";
//components
import "@/components";
//mock
import "@/mock";
//svg
import "@/svg";
//dict
import "@/dict";
//styles
import "@/styles";

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
