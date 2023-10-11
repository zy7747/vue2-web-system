import Vue from "vue";
import SvgIcon from "@/components/SvgIcon"; // svg组件

Vue.component("SvgIcon", SvgIcon);

const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);

const req = require.context("./svg", true, /\.svg$/);
const flag = require.context("./flag", false, /\.svg$/);

requireAll(req);
requireAll(flag);
