module.exports = {
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/proxy"],
  proxy: {
    "^/api": {
      target: "https://api.wynncraft.com/v2/ingredient",
      pathRewrite: {
        "^/api/": "/"
      }
    }
  }
};
