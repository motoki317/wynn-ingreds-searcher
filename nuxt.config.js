module.exports = {
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],
  axios: {
    proxy: true
  },
  proxy: {
    "/api/": {
      target: "https://api.wynncraft.com/v2/ingredient",
      pathRewrite: { "^/api/": "" }
    }
  }
};
