<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header -->
      <div
        class="rounded-3xl bg-gradient-to-r from-black via-gray-900 to-gray-700 text-white p-8 shadow-lg mb-8"
      >
        <h1 class="text-3xl md:text-4xl font-bold mb-3">My Orders</h1>
        <p class="text-gray-300">
          Track your order history, shipping details, and payment method.
        </p>
      </div>

      <ClientOnly>
        <div v-if="userOrders.length > 0" class="space-y-6">
          <div
            v-for="order in userOrders"
            :key="order.id"
            class="bg-white rounded-3xl shadow border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg"
          >
            <!-- Top -->
            <div
              class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
            >
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-3 mb-3">
                  <h2 class="font-bold text-lg text-gray-800 break-all">
                    Order #{{ order.id }}
                  </h2>

                  <span
                    class="inline-flex px-3 py-1 rounded-full text-sm font-medium"
                    :class="statusBadge(order.status)"
                  >
                    {{ order.status }}
                  </span>

                  <span
                    class="inline-flex px-3 py-1 rounded-full text-sm font-medium"
                    :class="paymentBadge(order.payment_status)"
                  >
                    {{ order.payment_status }}
                  </span>
                </div>

                <p class="text-sm text-gray-500">
                  {{ formatDate(order.created_at) }}
                </p>

                <p class="text-sm text-gray-600 mt-2">
                  {{
                    order.items
                      ?.map((item) => item.title || item.name)
                      .join(" • ") || "No products"
                  }}
                </p>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                <div class="text-left sm:text-right">
                  <p class="text-sm text-gray-500">Total</p>
                  <p class="text-2xl font-bold text-gray-900">
                    {{ order.total }} EGP
                  </p>
                </div>

                <button
                  @click="toggleDetails(order.id)"
                  class="bg-black text-white px-5 py-3 rounded-2xl text-sm font-medium hover:bg-gray-800 transition"
                >
                  {{
                    expandedOrder === order.id ? "Hide Details" : "View Details"
                  }}
                </button>
              </div>
            </div>

            <!-- Expand -->
            <transition name="fade">
              <div
                v-if="expandedOrder === order.id"
                class="mt-6 border-t pt-5 space-y-6"
              >
                <!-- Shipping + Payment -->
                <div class="grid md:grid-cols-2 gap-4">
                  <div
                    class="bg-gray-50 rounded-2xl p-4 border border-gray-100"
                  >
                    <h3 class="font-semibold text-gray-800 mb-3">
                      Shipping Details
                    </h3>

                    <div class="space-y-2 text-sm text-gray-600">
                      <p>
                        <span class="font-medium text-gray-800">Name:</span>
                        {{ order.customer_name || "N/A" }}
                      </p>
                      <p>
                        <span class="font-medium text-gray-800">Phone:</span>
                        {{ order.phone || "N/A" }}
                      </p>
                      <p>
                        <span class="font-medium text-gray-800">City:</span>
                        {{ order.city || "N/A" }}
                      </p>
                      <p>
                        <span class="font-medium text-gray-800">Address:</span>
                        {{ order.address || "N/A" }}
                      </p>
                      <p>
                        <span class="font-medium text-gray-800">Notes:</span>
                        {{ order.notes || "No notes" }}
                      </p>
                    </div>
                  </div>

                  <div
                    class="bg-gray-50 rounded-2xl p-4 border border-gray-100"
                  >
                    <h3 class="font-semibold text-gray-800 mb-3">
                      Payment Details
                    </h3>

                    <div class="space-y-2 text-sm text-gray-600">
                      <p>
                        <span class="font-medium text-gray-800">Method:</span>
                        {{ order.payment_method || "N/A" }}
                      </p>
                      <p>
                        <span class="font-medium text-gray-800">Status:</span>
                        {{ order.payment_status || "N/A" }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Items -->
                <div class="space-y-4">
                  <div
                    v-for="item in order.items"
                    :key="item.id"
                    class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100"
                  >
                    <div class="flex items-center gap-4">
                      <img
                        :src="item.image || 'https://picsum.photos/200/200'"
                        alt="product"
                        class="w-16 h-16 rounded-xl object-cover"
                      />

                      <div>
                        <p class="font-medium text-gray-800">
                          {{ item.title || item.name }}
                        </p>
                        <p class="text-sm text-gray-500">
                          Quantity: {{ item.quantity }}
                        </p>
                        <p class="text-sm text-gray-400">
                          {{ item.price }} EGP / item
                        </p>
                      </div>
                    </div>

                    <p class="font-semibold text-gray-900 text-lg">
                      {{ item.price * item.quantity }} EGP
                    </p>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <div
          v-else
          class="bg-white p-12 rounded-3xl shadow text-center text-gray-500"
        >
          <p class="text-xl mb-4">You have no orders yet.</p>
          <NuxtLink
            to="/products"
            class="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Start Shopping
          </NuxtLink>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

import { computed, ref, onMounted } from "vue";
import { useOrdersStore } from "~/stores/orders";
import { useUserStore } from "~/stores/auth";

const ordersStore = useOrdersStore();
const userStore = useUserStore();

const expandedOrder = ref(null);

const toggleDetails = (id) => {
  expandedOrder.value = expandedOrder.value === id ? null : id;
};

const userOrders = computed(() => {
  const userId = userStore.user?.id;
  if (!userId) return [];
  return ordersStore.getUserOrders(userId) || [];
});

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const statusBadge = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "confirmed":
      return "bg-blue-100 text-blue-700";
    case "shipped":
      return "bg-purple-100 text-purple-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const paymentBadge = (status) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-700";
    case "unpaid":
      return "bg-red-100 text-red-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "failed":
      return "bg-red-100 text-red-700";
    case "refunded":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

onMounted(async () => {
  await ordersStore.fetchOrders();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
