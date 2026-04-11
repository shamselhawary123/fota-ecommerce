export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  css: ["~/assets/css/main.css"],

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxtjs/i18n"],

  tailwindcss: {
    configPath: "tailwind.config.js",
  },

  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.json", dir: "ltr" },
      { code: "ar", iso: "ar-EG", file: "ar.json", dir: "rtl" },
    ],

    defaultLocale: "en",

    langDir: "locales/",

    strategy: "prefix",
  },

  runtimeConfig: {
    public: {
      supabaseUrl: "https://aunilwswuewifrgfoaad.supabase.co",
      supabaseKey: "sb_publishable_HS7ko9T2UMM4JetfAodV0w_iziE5qyR",
    },
  },
});
