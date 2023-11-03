import Vue from "vue";
import Vuex from "vuex";

import app from "./modules/app";
import user from "./modules/user";
import config from "./modules/config";
import tagsView from "./modules/tagsView";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    config,
    tagsView,
  },
  getters,
});

export default store;
