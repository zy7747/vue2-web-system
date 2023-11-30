const path = require("path");

const { defineConfig } = require("@vue/cli-service");
const APP_TITLE = process.env.VUE_APP_TITLE; // 网页标题

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  publicPath: process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  devServer: {
    port: 3002,
    open: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
      fallback: {
        path: require.resolve("path-browserify"),
      },
    },
  },
  chainWebpack(config) {
    config.plugin("html").tap((args) => {
      args[0].title = APP_TITLE;
      return args;
    });
    config.module.rule("svg").exclude.add(resolve("src/svg")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
});
