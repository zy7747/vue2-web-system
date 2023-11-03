const icon = require.context("@/svg/icon", false, /\.svg$/);
const appIcon = require.context("@/svg/icon/app", false, /\.svg$/);
const fruit = require.context("@/svg/icon/fruit", false, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys();

const icons = [
  ...requireAll(icon),
  ...requireAll(appIcon),
  ...requireAll(fruit),
];

export default icons.map((i) => {
  return i.match(/\.\/(.*)\.svg/)[1];
});
