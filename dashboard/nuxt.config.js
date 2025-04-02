import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
const isDev = process.env.NODE_ENV === "development";
export default defineNuxtConfig({
  app: {
    // pageTransition: { name: "page", mode: "out-in" },
    // layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      title: "Dashboard",
      link: [
        { rel: "stylesheet", href: "https://unpkg.com/mathlive/dist/mathlive-static.css" },
        // { rel: 'icon', type: 'image/png', href: "/img/logo.png" }
      ],
      script: [
        // { src: "https://unpkg.com/mathlive@0.95.4/dist/mathlive.min.js" }
        // { src: "https://cdn.jsdelivr.net/npm/katex@0.16.6/dist/katex.min.js", defer: true, integrity: "sha384-j/ZricySXBnNMJy9meJCtyXTKMhIJ42heyr7oAdxTDBy/CYA9hzpMo+YTNV5C+1X", crossorigin: "anonymous" },
        // { src: "/tinymce/tinymce.min.js", referrerpolicy: "origin" },
      ],
    },
  },

  modules: ["@unocss/nuxt", "@pinia/nuxt", "@nuxtjs/i18n", "@vueuse/nuxt", "nuxt-icon", "nuxt-lodash"],
  css: ["@unocss/reset/tailwind.css", "~/assets/main.css", "~/assets/global.less"],

  pinia: {
    autoImports: [
      ["defineStore", "acceptHMRUpdate"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },

  imports: {
    dirs: ["stores"],
  },

  i18n: {
    langDir: "locales",
    defaultLocale: "vi",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
    locales: [
      { code: "en", iso: "en-US", name: "English", file: "en-US.json" },
      { code: "vi", iso: "vi-VN", name: "Tiếng Việt", file: "vi-VN.json" },
    ],
    lazy: true,
  },

  build: {
    transpile: [
      ...(isDev ? ["@css-render/vue3-ssr"] : ["@babel/runtime"]),
      // 'ant-design-vue',
      // 'lodash-es',
      // '@prisma/client',
      // '@trpc',
      // 'trpc-nuxt',
    ],
  },

  vite: {
    ssr: {
      noExternal: [
        "compute-scroll-into-view",
        "ant-design-vue",
        // "@ant-design/icons-vue",
        "@css-render/vue3-ssr",
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // https://www.antdv.com/docs/vue/customize-theme/#Ant-Design-Vue-Less-variables
          // modifyVars: antdTheme(),
        },
      },
    },
    plugins: [
      Components({
        resolvers: [AntDesignVueResolver({ resolveIcons: true, importStyle: "less" })],
      }),
    ],
    dts: "types/components.d.ts",
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL || "https://67ec945faa794fb3222e241d.mockapi.io",
    },
  },

  devtools: {
    enabled: true,
  },
});
