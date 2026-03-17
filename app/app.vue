<template>
  <div>
    <NuxtLoadingIndicator color="#111827" :height="3" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "~/stores/auth";

const userStore = useUserStore();

onMounted(async () => {
  await userStore.loadUser();
});
</script>
