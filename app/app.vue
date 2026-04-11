<template>
  <div>
    <NuxtLoadingIndicator color="#1e2f49" :height="3" />

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showGlobalLoading"
        class="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-white/70 backdrop-blur-md"
      >
        <div
          class="pointer-events-auto ui-panel flex w-[min(90vw,18rem)] flex-col items-center gap-4 px-6 py-7 text-center"
        >
          <div
            class="h-11 w-11 animate-spin rounded-full border-[3px] border-brand-100 border-t-brand-700"
          ></div>

          <div class="space-y-1">
            <p class="text-sm font-semibold tracking-tight text-neutral-900">
              Fota Store
            </p>
            <p class="text-sm text-neutral-500">
              {{ locale.toUpperCase() }}
            </p>
          </div>
        </div>
      </div>
    </transition>

    <NuxtLayout>
      <NuxtPage :transition="pageTransition" />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useUserStore } from "~/stores/auth";

const userStore = useUserStore();
const nuxtApp = useNuxtApp();
const { locale } = useI18n();

const isLangLoading = ref(false);
const isRouteLoading = ref(false);
let localeLoadingTimer = null;

const pageTransition = {
  name: "ui-page",
  mode: "out-in",
};

const showGlobalLoading = computed(
  () => isLangLoading.value || isRouteLoading.value,
);

watch(locale, () => {
  if (!import.meta.client) return;

  isLangLoading.value = true;
  clearTimeout(localeLoadingTimer);
  localeLoadingTimer = window.setTimeout(() => {
    isLangLoading.value = false;
  }, 260);
});

nuxtApp.hook("page:start", () => {
  isRouteLoading.value = true;
});

nuxtApp.hook("page:finish", () => {
  isRouteLoading.value = false;
});

onMounted(async () => {
  isRouteLoading.value = false;
  await userStore.loadUser();
});
</script>
