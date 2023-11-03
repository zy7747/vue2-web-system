const path = require("path");
const { defineConfig } = require("@vue/cli-service");
const APP_TITLE = process.env.VUE_APP_TITLE; // 网页标题

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  publicPath: "/web-system",
  transpileDependencies: true,
  devServer: {
    port: 3002,
    client: {
      overlay: false,
    },
    host: "localhost",
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8880",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/api": "",
    //     },
    //   },
    // },
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
