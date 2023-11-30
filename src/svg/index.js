const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);

const req = require.context("./icon", true, /\.svg$/);
const flag = require.context("./flag", false, /\.svg$/);

requireAll(req);

requireAll(flag);
