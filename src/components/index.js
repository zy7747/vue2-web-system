// 全局组件
import Vue from "vue";

import CInput from "./CElement/CInput/index.vue";
import CSelect from "./CElement/CSelect/index.vue";
import CCheckbox from "./CElement/CCheckbox/index.vue";
import CRadio from "./CElement/CRadio/index.vue";
import CNumber from "./CElement/CNumber/index.vue";
import CButton from "./CElement/CButton/index.vue";
import CSwitch from "./CElement/CSwitch/index.vue";
import CColorPicker from "./CElement/CColorPicker/index.vue";

import CCard from "./CElement/CCard/index.vue";
import CForm from "./CElement/CForm/index.vue";
import CTable from "./CElement/CTable/index.vue";
import CDialog from "./CElement/CDialog/index.vue";
import CTree from "./CElement/CTree/index.vue";

import CDatePicker from "./CElement/CDatePicker/index.vue";
import CTimePicker from "./CElement/CTimePicker/index.vue";
import CDateTimePicker from "./CElement/CDateTimePicker/index.vue";
import CTreeSelect from "./CElement/CTreeSelect/index.vue";
import CPage from "./CElement/CPage/index.vue";
import CGrid from "./CElement/CGrid/index.vue";

import IconSelect from "./IconSelect/index.vue";
import VideoPlayer from "./VideoPlayer/index.vue";
import Toolbar from "./Toolbar/index.vue";
import DictTag from "./DictTag/index.vue";
import Pagination from "./Pagination/index.vue";
import Collapse from "./Collapse/index.vue";
import DraggableResizable from "vue-draggable-resizable";
import FileUpload from "./FileUpload/index.vue";
import AvatarUpload from "./CElement/AvatarUpload/index.vue";
import SvgIcon from "@/components/SvgIcon"; // svg组件

Vue.component("SvgIcon", SvgIcon);
Vue.component("CInput", CInput);
Vue.component("CSelect", CSelect);
Vue.component("CButton", CButton);
Vue.component("CSwitch", CSwitch);

Vue.component("CCheckbox", CCheckbox);
Vue.component("CRadio", CRadio);
Vue.component("CNumber", CNumber);
Vue.component("CColorPicker", CColorPicker);
Vue.component("CTimePicker", CTimePicker);
Vue.component("CDateTimePicker", CDateTimePicker);

Vue.component("CForm", CForm);
Vue.component("CPage", CPage);
Vue.component("CGrid", CGrid);
Vue.component("CTree", CTree);

Vue.component("CCard", CCard);
Vue.component("Toolbar", Toolbar);
Vue.component("CTable", CTable);
Vue.component("CDialog", CDialog);
Vue.component("Collapse", Collapse);
Vue.component("CDatePicker", CDatePicker);

Vue.component("Pagination", Pagination);
Vue.component("IconSelect", IconSelect);
Vue.component("VideoPlayer", VideoPlayer);
Vue.component("FileUpload", FileUpload);
Vue.component("AvatarUpload", AvatarUpload);

Vue.component("DictTag", DictTag);
Vue.component("CTreeSelect", CTreeSelect);
Vue.component("DraggableResizable", DraggableResizable);
