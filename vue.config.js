module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  devServer: {
    proxy: {
      "^/api": {
        target: "https://api.wynncraft.com/v2/ingredient", // 自分のポートにする
        pathRewrite: {
          "^/api/": "/"
        }
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  }
};
