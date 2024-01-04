const icon = require.context("@/svg/icon", false, /\.svg$/);
const appIcon = require.context("@/svg/icon/app", false, /\.svg$/);
const menuIcon = require.context("@/svg/menu", false, /\.svg$/);
const flagIcon = require.context("@/svg/flag", false, /\.svg$/);

const requireAll = (requireContext) => requireContext.keys();

const icons = {
  icon: requireAll(icon),
  appIcon: requireAll(appIcon),
  menuIcon: requireAll(menuIcon),
  flagIcon: requireAll(flagIcon),
};

export default function iconSelect(arr) {
  const arrList = [];

  arr.forEach((item) => {
    const list = icons[item].map((i) => {
      return i.match(/\.\/(.*)\.svg/)[1];
    });

    arrList.push(...list);
  });

  return arrList;
}
