<template>
  <div class="ui-app-shell flex min-h-screen flex-col">
    <div
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        class="absolute inset-x-0 top-0 h-[28rem] bg-dot-grid opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      ></div>
      <div
        class="absolute left-[6%] top-10 h-72 w-72 rounded-full bg-brand-200/35 blur-3xl"
      ></div>
      <div
        class="absolute right-[8%] top-32 h-80 w-80 rounded-full bg-accent-200/25 blur-3xl"
      ></div>
      <div
        class="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-100/25 blur-3xl"
      ></div>
    </div>

    <Navbar />

    <main class="relative flex-1">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Footer from "~/components/Footer.vue";
import Navbar from "~/components/Navbar.vue";

const { locale } = useI18n();

const dir = computed(() => (locale.value === "ar" ? "rtl" : "ltr"));

useHead(() => ({
  htmlAttrs: {
    dir: dir.value,
    lang: locale.value,
  },
}));
</script>
