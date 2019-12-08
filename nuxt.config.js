export default {
  mode: "spa",
  head: {
    title: "Stretch",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: { color: "#000" },
  css: ["@/assets/main.scss"],
  plugins: ["~/plugins/icons"],
  buildModules: ["@nuxtjs/eslint-module"],
  modules: ["bootstrap-vue/nuxt"]
};
