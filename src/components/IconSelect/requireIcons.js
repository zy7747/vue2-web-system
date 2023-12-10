const icon = require.context("@/svg/icon", false, /\.svg$/);
const appIcon = require.context("@/svg/icon/app", false, /\.svg$/);
const menuIcon = require.context("@/svg/menu", false, /\.svg$/);

const requireAll = (requireContext) => requireContext.keys();

const icons = [
  ...requireAll(icon),
  ...requireAll(appIcon),
  ...requireAll(menuIcon),
];

export default icons.map((i) => {
  return i.match(/\.\/(.*)\.svg/)[1];
});
