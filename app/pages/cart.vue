<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header -->
      <div
        class="rounded-3xl bg-gradient-to-r from-black via-gray-900 to-gray-700 text-white p-8 shadow-lg mb-8"
      >
        <h1 class="text-3xl md:text-4xl font-bold mb-3">
          {{ t("cart.title") }}
        </h1>

        <p class="text-gray-300">
          {{ t("cart.desc") }}
        </p>
      </div>

      <ClientOnly>
        <div
          v-if="cartStore.currentUserCart.length > 0"
          class="grid lg:grid-cols-3 gap-8"
        >
          <!-- Items -->
          <div class="lg:col-span-2 space-y-5">
            <div
              v-for="item in cartStore.currentUserCart"
              :key="item.id"
              class="bg-white rounded-3xl shadow border border-gray-100 p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center"
            >
              <img
                :src="item.image || '/images/products/towel-1.jpg'"
                class="w-full sm:w-32 h-32 object-cover rounded-2xl"
              />

              <div class="flex-1">
                <h2 class="text-xl font-bold text-gray-800">
                  {{ item.title || item.name }}
                </h2>

                <p class="text-gray-500 mt-2">
                  {{ item.price }} {{ t("cart.currency") }}
                </p>

                <div class="flex items-center gap-3 mt-4">
                  <button @click="cartStore.decreaseQuantity(item.id)">
                    -
                  </button>
                  <span>{{ item.quantity }}</span>
                  <button @click="cartStore.addToCart(item)">+</button>
                </div>

                <p class="font-semibold text-lg mt-3">
                  {{ item.price * item.quantity }} {{ t("cart.currency") }}
                </p>
              </div>

              <button
                @click="cartStore.removeFromCart(item.id)"
                class="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition w-full sm:w-auto shadow"
              >
                {{ t("cart.remove") }}
              </button>
            </div>
          </div>

          <!-- Summary -->
          <div class="bg-white p-6 rounded-3xl">
            <h2 class="text-2xl font-bold mb-6">
              {{ t("cart.summary") }}
            </h2>

            <div class="flex justify-between">
              <span>{{ t("cart.items") }}</span>
              <span>{{ cartStore.totalItems }}</span>
            </div>

            <div class="flex justify-between">
              <span>{{ t("cart.subtotal") }}</span>
              <span>{{ cartStore.totalPrice }} {{ t("cart.currency") }}</span>
            </div>

            <div class="flex justify-between">
              <span>{{ t("cart.shipping") }}</span>
              <span class="text-green-600">
                {{ t("cart.free") }}
              </span>
            </div>

            <div class="flex justify-between font-bold mt-4">
              <span>{{ t("cart.total") }}</span>
              <span>{{ cartStore.totalPrice }} {{ t("cart.currency") }}</span>
            </div>

            <NuxtLink
              :to="localePath('/checkout')"
              class="block mt-6 text-center bg-black text-white p-3 rounded-xl"
            >
              {{ t("cart.checkout") }}
            </NuxtLink>
          </div>
        </div>

        <div v-else class="text-center p-10">
          <p>{{ t("cart.empty") }}</p>
          <br />

          <NuxtLink
            :to="localePath('/products')"
            class="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            {{ t("cart.shop") }}
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

import { onMounted } from "vue";
import { useCartStore } from "~/stores/cart";
import { useProductsStore } from "~/stores/products";

const localePath = useLocalePath();
const cartStore = useCartStore();
const productsStore = useProductsStore();
const { t } = useI18n();

const getDiscountPercent = (originalPrice, finalPrice) => {
  if (!originalPrice || originalPrice <= finalPrice) return 0;
  return Math.round(((originalPrice - finalPrice) / originalPrice) * 100);
};

onMounted(async () => {
  if (!productsStore.products.length) {
    await productsStore.fetchProducts();
  }

  cartStore.refreshCartPrices(productsStore.products);
});
</script>
