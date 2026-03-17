export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  runtimeConfig: {
    public: {
      supabaseUrl: "https://aunilwswuewifrgfoaad.supabase.co",
      supabaseKey: "sb_publishable_HS7ko9T2UMM4JetfAodV0w_iziE5qyR",
    },
  },
});
