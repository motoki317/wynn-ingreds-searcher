module.exports = {
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],
  axios: {},
  proxy: {
    "/api": "https://api.wynncraft.com/v2/ingredient"
  }
};
