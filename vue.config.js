const path = require("path");
module.exports = {
  lintOnSave: false,
  publicPath: "./",
  pages: {
    index: {
      entry: "examples/main.ts",
      template: "public/index.html",
      filename: "index.html"
    }
  },

  chainWebpack: config => {
    config.resolve.alias.set('pkg', path.resolve(__dirname, 'packages'))
    if (process.env.NODE_ENV === "production") {
      config.externals({
        echarts: "echarts"
      });
    }
  }
};
