const path = require("path");
const { defineConfig } = require("@vue/cli-service");
const name = "后台系统"; // 网页标题

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
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
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
      args[0].title = name;
      return args;
    });
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
});