module.exports = {
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/proxy"],
  proxy: {
    "/api/": { target: "api.example.com", pathRewrite: { "^/api/": "" } }
  }
};
