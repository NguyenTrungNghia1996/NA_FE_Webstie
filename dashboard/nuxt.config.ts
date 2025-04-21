// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
        },
      ],
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxt/icon", "@vueuse/nuxt", "@nuxtjs/i18n", "@ant-design-vue/nuxt", "@pinia/nuxt", "pinia-plugin-persistedstate/nuxt", "@nuxtjs/tailwindcss"],
  antd: { extractStyle: true },
  pinia: { storesDirs: ["./stores/**"] },
  i18n: {
    locales: [
      {
        code: "en",
        file: "en-US.json",
      },
      {
        code: "vi",
        file: "vi-VN.json",
      },
    ],
    bundle: { optimizeTranslationDirective: false },
    lazy: true,
    defaultLocale: "vi",
  },
  runtimeConfig: { public: { baseURL: process.env.NUXT_PUBLIC_BASE_URL || "http://api.nguyenanh-est.com" } },
  //  runtimeConfig: { public: { baseURL: process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:3001" } },
});
