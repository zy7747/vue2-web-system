import Vue from "vue";

import dragDialog from "./dragDialog";
import loadMore from "./loadMore";
import audio from "./buttonSound";

Vue.directive("dragDialog", dragDialog);
Vue.directive("loadMore", loadMore);
Vue.directive("audio", audio);
