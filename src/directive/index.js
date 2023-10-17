import Vue from "vue";

import dragDialog from "./dragDialog";
import loadMore from "./loadMore";
import audio from "./buttonSound";
import debounce from "./debounce";

Vue.directive("dragDialog", dragDialog);
Vue.directive("loadMore", loadMore);
Vue.directive("audio", audio);
Vue.directive("debounce", debounce);
