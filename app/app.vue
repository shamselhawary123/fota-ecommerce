<template>
  <div>
    <NuxtLoadingIndicator color="#111827" :height="3" />

    <transition name="fade">
      <div
        v-if="isLangLoading"
        class="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <div class="loader"></div>
      </div>
    </transition>

    <NuxtLayout>
      <NuxtPage :transition="pageTransition" />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useUserStore } from "~/stores/auth";

const userStore = useUserStore();
const { locale } = useI18n();

const isLangLoading = ref(false);

const pageTransition = {
  name: "page",
  mode: "out-in",
};

watch(locale, async () => {
  isLangLoading.value = true;

  setTimeout(() => {
    isLangLoading.value = false;
  }, 500);
});

onMounted(async () => {
  await userStore.loadUser();
});
</script>

<style>
.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #ddd;
  border-top-color: black;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
