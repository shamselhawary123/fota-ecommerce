<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Navbar />

    <main class="flex-1 container mx-auto px-4 py-6">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup>
const { locale } = useI18n();

const dir = computed(() => (locale.value === "ar" ? "rtl" : "ltr"));

const pageTransition = {
  name: "page",
  mode: "out-in",
};

useHead(() => ({
  htmlAttrs: {
    dir: dir.value,
    lang: locale.value,
  },
}));
</script>

<style>
/* Smooth Page Transition */
.page-enter-active,
.page-leave-active {
  transition: all 0.35s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
