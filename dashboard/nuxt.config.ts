// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/icon",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@ant-design-vue/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
  ],
  antd: {
    extractStyle: true,
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
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
    bundle: {
      optimizeTranslationDirective: false,
    },
    lazy: true,
    defaultLocale: "vi",
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL || "https://67ec945faa794fb3222e241d.mockapi.io",
    },
  },
});
