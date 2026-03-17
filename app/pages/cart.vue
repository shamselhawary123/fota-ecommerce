<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header -->
      <div
        class="rounded-3xl bg-gradient-to-r from-black via-gray-900 to-gray-700 text-white p-8 shadow-lg mb-8"
      >
        <h1 class="text-3xl md:text-4xl font-bold mb-3">Your Cart</h1>
        <p class="text-gray-300">
          Review your selected products before proceeding to checkout.
        </p>
      </div>

      <ClientOnly>
        <div
          v-if="cartStore.currentUserCart.length > 0"
          class="grid lg:grid-cols-3 gap-8"
        >
          <!-- Cart Items -->
          <div class="lg:col-span-2 space-y-5">
            <div
              v-for="item in cartStore.currentUserCart"
              :key="item.id"
              class="bg-white rounded-3xl shadow border border-gray-100 p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center"
            >
              <img
                :src="item.image || 'https://picsum.photos/300/250'"
                alt="product"
                class="w-full sm:w-32 h-32 object-cover rounded-2xl"
              />

              <div class="flex-1">
                <h2 class="text-xl font-bold text-gray-800">
                  {{ item.title || item.name }}
                </h2>

                <div class="mt-2">
                  <template
                    v-if="item.originalPrice && item.originalPrice > item.price"
                  >
                    <div class="flex items-center gap-3 flex-wrap">
                      <p class="text-gray-900 font-semibold">
                        {{ item.price }} EGP / item
                      </p>
                      <p class="text-sm text-gray-400 line-through">
                        {{ item.originalPrice }} EGP
                      </p>
                      <span
                        class="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700 font-medium"
                      >
                        {{
                          getDiscountPercent(item.originalPrice, item.price)
                        }}% OFF
                      </span>
                    </div>
                  </template>

                  <p v-else class="text-gray-500">
                    {{ item.price }} EGP / item
                  </p>
                </div>

                <!-- Quantity Controls -->
                <div class="flex items-center gap-3 mt-4">
                  <button
                    @click="cartStore.decreaseQuantity(item.id)"
                    class="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-100 transition"
                  >
                    -
                  </button>

                  <span
                    class="min-w-[40px] text-center font-semibold text-gray-800"
                  >
                    {{ item.quantity }}
                  </span>

                  <button
                    @click="cartStore.addToCart(item)"
                    class="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>

                <div class="mt-4">
                  <p class="font-semibold text-lg text-gray-900">
                    {{ item.price * item.quantity }} EGP
                  </p>

                  <p
                    v-if="item.originalPrice && item.originalPrice > item.price"
                    class="text-sm text-gray-400 line-through"
                  >
                    {{ item.originalPrice * item.quantity }} EGP
                  </p>
                </div>
              </div>

              <button
                class="bg-red-50 text-red-500 px-4 py-2 rounded-xl hover:bg-red-100 transition"
                @click="cartStore.removeFromCart(item.id)"
              >
                Remove
              </button>
            </div>
          </div>

          <!-- Summary -->
          <div
            class="bg-white rounded-3xl shadow border border-gray-100 p-6 h-fit sticky top-24"
          >
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Cart Summary</h2>

            <div class="space-y-4 text-gray-600">
              <div class="flex justify-between">
                <span>Total Items</span>
                <span class="font-semibold text-gray-800">
                  {{ cartStore.totalItems }}
                </span>
              </div>

              <div class="flex justify-between">
                <span>Subtotal</span>
                <span class="font-semibold text-gray-800">
                  {{ cartStore.totalPrice }} EGP
                </span>
              </div>

              <div class="flex justify-between">
                <span>Shipping</span>
                <span class="font-semibold text-green-600">Free</span>
              </div>
            </div>

            <div class="border-t my-6"></div>

            <div
              class="flex justify-between text-lg font-bold text-gray-900 mb-6"
            >
              <span>Total</span>
              <span>{{ cartStore.totalPrice }} EGP</span>
            </div>

            <NuxtLink
              to="/checkout"
              class="block w-full text-center bg-black text-white px-6 py-4 rounded-2xl hover:bg-gray-800 transition font-semibold"
            >
              Proceed to Checkout
            </NuxtLink>
          </div>
        </div>

        <div
          v-else
          class="bg-white rounded-3xl shadow p-12 text-center text-gray-500"
        >
          <p class="text-xl mb-4">Your cart is empty.</p>
          <NuxtLink
            to="/products"
            class="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Continue Shopping
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

const cartStore = useCartStore();
const productsStore = useProductsStore();

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
