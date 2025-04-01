// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ["~/assets/base2ef2.css", "~/assets/bootstrap.min.css","~/assets/stylesee4f.css"],
  plugins: [
    { src: "~/plugins/jquery", mode: "client" },
  ],
})
