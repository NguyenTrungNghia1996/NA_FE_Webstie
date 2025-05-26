// https://nuxt.com/docs/api/configuration/nuxt-config
const isDev = process.env.NODE_ENV === "development";
export default defineNuxtConfig({
  app: {
    head: {
      // title: "Nguyên Anh EST",
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  image: {
    dir: 'public',
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    'nuxt-swiper',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@nuxt/image',
    'nuxt-google-translate'
  ],
  googleTranslate: {
    defaultLanguage: 'vi',
    supportedLanguages: ['vi', 'en'],
    autoTranslate: false,
  },
  css: ['~/assets/css/tailwind.css'],
  ui: {
    colorMode: false
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL || "http://api.nguyenanh-est.com",
    },
  },
})