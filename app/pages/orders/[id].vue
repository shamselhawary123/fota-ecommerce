<template>
  <div class="min-h-screen bg-gray-100 py-10">
    <div class="max-w-4xl mx-auto px-4">
      <ClientOnly>
        <div v-if="order" class="bg-white rounded-2xl shadow p-8">
          <h1 class="text-2xl font-bold mb-6">Order Details</h1>

          <div class="mb-6">
            <p class="font-semibold">Order ID: {{ order.id }}</p>
            <p class="text-gray-500 text-sm">
              {{ order.createdAt }}
            </p>
          </div>

          <div
            v-for="item in order.items"
            :key="item.id"
            class="flex justify-between border-t py-4"
          >
            <div>
              <p class="font-medium">
                {{ item.title || item.name }}
              </p>
              <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
            </div>

            <p class="font-semibold">{{ item.price * item.quantity }} EGP</p>
          </div>

          <div class="border-t mt-6 pt-4 text-right text-lg font-bold">
            Total: {{ order.total }} EGP
          </div>
        </div>

        <div
          v-else
          class="bg-white p-10 rounded-2xl shadow text-center text-gray-500"
        >
          Order not found.
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

import { computed } from "vue";
import { useRoute } from "vue-router";
import { useOrdersStore } from "~/stores/orders";
import { useUserStore } from "~/stores/auth";

const route = useRoute();
const ordersStore = useOrdersStore();
const userStore = useUserStore();

const order = computed(() => {
  const email = userStore.user?.email;
  if (!email) return null;

  const userOrders = ordersStore.getUserOrders(email) || [];
  return userOrders.find((o) => String(o.id) === String(route.params.id));
});
</script>
