<template>
  <div class="min-h-screen bg-gray-100 py-10">
    <div class="max-w-4xl mx-auto px-4">
      <ClientOnly>
        <div v-if="order" class="bg-white rounded-2xl shadow p-8">
          <div class="mb-6 flex items-center justify-between gap-4">
            <h1 class="text-2xl font-bold">
              {{ t("orderDetails.title") }}
            </h1>

            <NuxtLink
              :to="localePath('/orders')"
              class="text-sm font-medium text-black hover:underline"
            >
              {{ t("orderDetails.back") }}
            </NuxtLink>
          </div>

          <div class="mb-6 space-y-2">
            <p class="font-semibold">
              {{ t("orderDetails.orderId") }}: {{ order.id }}
            </p>
            <p class="text-gray-500 text-sm">
              {{ formatDate(order.created_at) }}
            </p>
          </div>

          <div
            v-for="item in order.items"
            :key="item.id"
            class="flex justify-between gap-4 border-t py-4"
          >
            <div>
              <p class="font-medium">
                {{ item.title || item.name }}
              </p>
              <p class="text-sm text-gray-500">
                {{ t("orderDetails.quantity") }}: {{ item.quantity }}
              </p>
            </div>

            <p class="font-semibold">
              {{ item.price * item.quantity }} {{ t("cart.currency") }}
            </p>
          </div>

          <div class="border-t mt-6 pt-4 text-end text-lg font-bold">
            {{ t("orderDetails.total") }}: {{ order.total }}
            {{ t("cart.currency") }}
          </div>
        </div>

        <div
          v-else
          class="bg-white p-10 rounded-2xl shadow text-center text-gray-500"
        >
          {{ t("orderDetails.notFound") }}
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useOrdersStore } from "~/stores/orders";
import { useUserStore } from "~/stores/auth";

const localePath = useLocalePath();
const route = useRoute();
const ordersStore = useOrdersStore();
const userStore = useUserStore();
const { t, locale } = useI18n();

const order = computed(() => {
  const userId = userStore.user?.id;
  if (!userId) return null;

  const userOrders = ordersStore.getUserOrders(userId) || [];
  return userOrders.find((entry) => String(entry.id) === String(route.params.id));
});

const formatDate = (date) => {
  if (!date) return t("orders.fallback.na");

  return new Intl.DateTimeFormat(locale.value === "ar" ? "ar-EG" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

onMounted(async () => {
  await ordersStore.fetchOrders();
});
</script>
