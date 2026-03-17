<template>
  <ClientOnly>
    <div class="min-h-screen bg-gray-100 p-4 md:p-8">
      <!-- Header -->
      <div
        class="mb-8 rounded-3xl bg-gradient-to-r from-black via-gray-900 to-gray-700 text-white p-6 md:p-8 shadow-lg"
      >
        <div
          class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div>
            <p class="text-sm uppercase tracking-widest text-gray-300 mb-2">
              Admin Panel
            </p>
            <h1 class="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p class="text-gray-300 max-w-2xl">
              Manage orders, track revenue, shipping details, and payment status
              from one place.
            </p>
          </div>

          <div
            class="bg-white/10 backdrop-blur-md rounded-2xl p-4 min-w-[220px] border border-white/10"
          >
            <p class="text-sm text-gray-300 mb-1">Current View</p>
            <p class="text-xl font-semibold capitalize">
              {{ selectedStatus === "all" ? "All Orders" : selectedStatus }}
            </p>
            <p class="text-sm text-gray-300 mt-2">
              Showing {{ filteredOrders.length }} order(s)
            </p>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="bg-white rounded-3xl shadow p-4 md:p-6 mb-8">
        <div class="grid xl:grid-cols-3 gap-4">
          <!-- Search -->
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-600 mb-2">
              Search by Order ID
            </label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Type order id..."
              class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <!-- Date Filter -->
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-600 mb-2">
              Filter by Time
            </label>
            <select
              v-model="selectedDateFilter"
              class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black bg-white"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
            </select>
          </div>

          <!-- Status Pills -->
          <div class="flex flex-wrap gap-3 items-end">
            <button
              v-for="status in statusFilters"
              :key="status.value"
              @click="selectedStatus = status.value"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border',
                selectedStatus === status.value
                  ? 'bg-black text-white border-black shadow-lg scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100',
              ]"
            >
              {{ status.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <div
          class="bg-white rounded-3xl shadow p-6 border border-gray-100 hover:shadow-lg transition"
        >
          <p class="text-sm text-gray-500">Total Orders</p>
          <h2 class="text-3xl font-bold mt-3">{{ totalOrders }}</h2>
          <p class="text-sm text-gray-400 mt-2">All placed orders</p>
        </div>

        <div
          class="bg-white rounded-3xl shadow p-6 border border-gray-100 hover:shadow-lg transition"
        >
          <p class="text-sm text-gray-500">Total Revenue</p>
          <h2 class="text-3xl font-bold mt-3">{{ totalRevenue }} EGP</h2>
          <p class="text-sm text-gray-400 mt-2">Total sales amount</p>
        </div>

        <div
          class="bg-white rounded-3xl shadow p-6 border border-gray-100 hover:shadow-lg transition"
        >
          <p class="text-sm text-gray-500">Pending Orders</p>
          <h2 class="text-3xl font-bold mt-3 text-yellow-500">
            {{ pendingOrders }}
          </h2>
          <p class="text-sm text-gray-400 mt-2">Waiting for action</p>
        </div>

        <div
          class="bg-white rounded-3xl shadow p-6 border border-gray-100 hover:shadow-lg transition"
        >
          <p class="text-sm text-gray-500">Delivered Orders</p>
          <h2 class="text-3xl font-bold mt-3 text-green-600">
            {{ deliveredOrders }}
          </h2>
          <p class="text-sm text-gray-400 mt-2">Completed deliveries</p>
        </div>
      </div>

      <!-- Loading -->
      <div
        v-if="isLoading"
        class="bg-white rounded-3xl shadow p-10 text-center text-gray-500"
      >
        Loading dashboard...
      </div>

      <!-- Orders List -->
      <div v-else>
        <div
          v-if="filteredOrders.length === 0"
          class="bg-white rounded-3xl shadow p-10 text-center text-gray-500"
        >
          No orders found for this filter.
        </div>

        <transition-group name="orders" tag="div" class="space-y-5">
          <div
            v-for="order in filteredOrders"
            :key="order.id"
            class="bg-white rounded-3xl shadow border border-gray-100 p-5 md:p-6 hover:shadow-lg transition-all duration-300"
          >
            <div
              class="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6"
            >
              <!-- Main info -->
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-3 mb-3">
                  <h3 class="font-bold text-lg text-gray-800 break-all">
                    Order #{{ order.id }}
                  </h3>

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

                <div class="grid md:grid-cols-2 gap-5 text-sm text-gray-600">
                  <div class="space-y-2">
                    <p>
                      <span class="font-medium text-gray-800">Date:</span>
                      {{ formatDate(order.created_at) }}
                    </p>

                    <p>
                      <span class="font-medium text-gray-800">Customer:</span>
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
                  </div>

                  <div class="space-y-2">
                    <p>
                      <span class="font-medium text-gray-800">Address:</span>
                      {{ order.address || "N/A" }}
                    </p>

                    <p>
                      <span class="font-medium text-gray-800"
                        >Payment Method:</span
                      >
                      {{ order.payment_method || "N/A" }}
                    </p>

                    <p>
                      <span class="font-medium text-gray-800">Notes:</span>
                      {{ order.notes || "No notes" }}
                    </p>
                  </div>
                </div>

                <p class="mt-4 text-sm text-gray-600">
                  <span class="font-medium text-gray-800">Products:</span>
                  {{
                    order.items
                      ?.map((item) => item.title || item.name)
                      .join(" • ") || "No products"
                  }}
                </p>

                <p class="mt-2 text-sm text-gray-600">
                  <span class="font-medium text-gray-800">Items Count:</span>
                  {{ getItemsCount(order.items) }}
                </p>
              </div>

              <!-- Right side -->
              <div class="flex flex-col gap-4 xl:min-w-[240px]">
                <div class="text-left xl:text-right">
                  <p class="text-sm text-gray-500">Total Amount</p>
                  <p class="text-2xl font-bold text-gray-900">
                    {{ order.total }} EGP
                  </p>
                </div>

                <div class="flex flex-col gap-3">
                  <label
                    class="text-xs font-medium text-gray-500 uppercase tracking-wide"
                  >
                    Order Status
                  </label>

                  <StatusDropdown
                    :model-value="order.status"
                    :options="orderStatusOptions"
                    @change="ordersStore.updateOrderStatus(order.id, $event)"
                  />
                </div>

                <div class="flex flex-col gap-3">
                  <label
                    class="text-xs font-medium text-gray-500 uppercase tracking-wide"
                  >
                    Payment Status
                  </label>

                  <StatusDropdown
                    :model-value="order.payment_status"
                    :options="paymentStatusOptions"
                    @change="
                      ordersStore.updateOrderPaymentStatus(order.id, $event)
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
definePageMeta({
  middleware: ["auth", "admin"],
});

import { computed, onMounted, ref } from "vue";
import { useOrdersStore } from "~/stores/orders";
import StatusDropdown from "~/components/StatusDropdown.vue";

const ordersStore = useOrdersStore();

const isLoading = ref(true);
const selectedStatus = ref("all");
const selectedDateFilter = ref("all");
const searchQuery = ref("");

const orderStatusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const paymentStatusOptions = [
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
  { label: "Refunded", value: "refunded" },
];

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

onMounted(async () => {
  isLoading.value = true;
  await ordersStore.fetchOrders();
  isLoading.value = false;
});

const allOrders = computed(() => {
  return ordersStore.getAllOrders() || [];
});

const filteredOrders = computed(() => {
  let orders = [...allOrders.value];
  const now = new Date();

  // Status filter
  if (selectedStatus.value !== "all") {
    orders = orders.filter((order) => order.status === selectedStatus.value);
  }

  // Search filter
  if (searchQuery.value.trim()) {
    orders = orders.filter((order) =>
      String(order.id).toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  }

  // Date filter
  if (selectedDateFilter.value !== "all") {
    orders = orders.filter((order) => {
      if (!order.created_at) return false;

      const orderDate = new Date(order.created_at);

      switch (selectedDateFilter.value) {
        case "today":
          return orderDate.toDateString() === now.toDateString();

        case "7days": {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(now.getDate() - 7);
          return orderDate >= sevenDaysAgo;
        }

        case "30days": {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(now.getDate() - 30);
          return orderDate >= thirtyDaysAgo;
        }

        case "thisMonth":
          return (
            orderDate.getMonth() === now.getMonth() &&
            orderDate.getFullYear() === now.getFullYear()
          );

        default:
          return true;
      }
    });
  }

  return orders.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
});

const totalOrders = computed(() => {
  return filteredOrders.value.length;
});

const totalRevenue = computed(() => {
  return filteredOrders.value.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0,
  );
});

const pendingOrders = computed(() => {
  return filteredOrders.value.filter((order) => order.status === "pending")
    .length;
});

const deliveredOrders = computed(() => {
  return filteredOrders.value.filter((order) => order.status === "delivered")
    .length;
});

const getItemsCount = (items) => {
  if (!items?.length) return 0;

  return items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
};

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
</script>

<style scoped>
.orders-enter-active,
.orders-leave-active {
  transition: all 0.3s ease;
}
.orders-enter-from,
.orders-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
