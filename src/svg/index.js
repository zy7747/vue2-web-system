const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);

const req = require.context("./icon", true, /\.svg$/);
const flag = require.context("./flag", false, /\.svg$/);
const menu = require.context("./menu", false, /\.svg$/);

requireAll(req);
requireAll(menu);
requireAll(flag);
