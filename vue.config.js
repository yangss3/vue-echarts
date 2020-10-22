const path = require("path");
module.exports = {
  lintOnSave: false,
  publicPath: "./",
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },

  chainWebpack: config => {
    config.module
      .rule("js")
      .include.add(path.resolve(__dirname, "packages"))
      .end();

    if (process.env.NODE_ENV === "production") {
      config.externals({
        echarts: "echarts"
      });
    }
  }
};
