import Vue from "vue";

import dragDialog from "./dragDialog";
import loadMore from "./loadMore";
import sound from "./sound";
import debounce from "./debounce";

Vue.directive("dragDialog", dragDialog);
Vue.directive("loadMore", loadMore);
Vue.directive("audio", sound);
Vue.directive("debounce", debounce);
